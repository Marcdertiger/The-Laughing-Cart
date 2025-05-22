import { useEffect, useState } from "react";

interface PointsBalanceProps {
  refreshTrigger?: number;
}

const PointsBalance = ({ refreshTrigger }: PointsBalanceProps) => {
  const [points, setPoints] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSmilePoints = async () => {
      const waitForSmileSDK = () =>
        new Promise<void>((resolve) => {
          if ((window as any).SmileUI?.ready && (window as any).Smile) {
            resolve();
          } else {
            document.addEventListener("smile-ui-loaded", () => resolve(), {
              once: true,
            });
          }
        });

      await waitForSmileSDK();

      try {
        await (window as any).SmileUI.ready();
        // we re-retch the customer to ensure we update the points values on refreshTrigger
        const customer = await (window as any).Smile.fetchCustomer();

        if (customer) {
          const Smile = (window as any).Smile;
          const formatted = Smile.formatPoints(customer.points_balance, {
            with_label: true,
            with_formatting: true,
          });
          setPoints(formatted);
        } else {
          console.warn("Smile did not find a logged-in customer");
          setPoints("0 points");
        }
      } catch (err) {
        console.error("Failed to load Smile customer data:", err);
        setPoints("unknown points");
      } finally {
        setLoading(false);
      }
    };

    loadSmilePoints();
  }, [refreshTrigger]);

  return (
    <p className="text-gray-800 text-sm">
      You have{" "}
      {loading ? (
        <span className="inline-block w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin align-middle"></span>
      ) : (
        <span className="font-semibold">{points}</span>
      )}
    </p>
  );
};

export default PointsBalance;
