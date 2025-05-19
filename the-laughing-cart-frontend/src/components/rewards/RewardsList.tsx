import { useEffect, useState } from "react";
import RewardCard from "./RewardCard";
import RewardCardSkeleton from "./RewardCardSkeleton";
import Coupon from "./Coupon";
import type { Reward, PointsPurchase } from "./types";

const RewardsList = ({ onRedeemSuccess }: { onRedeemSuccess?: () => void }) => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [redeemingId, setRedeemingId] = useState<number | null>(null);
  const [redeemedPurchase, setRedeemedPurchase] = useState<PointsPurchase | null>(null);
  const [customerPoints, setCustomerPoints] = useState<number>(0);

  useEffect(() => {
    const loadRewards = async () => {
      const waitForSDK = () =>
        new Promise<void>((resolve) => {
          if ((window as any).SmileUI?.ready && (window as any).Smile) {
            resolve();
          } else {
            document.addEventListener("smile-ui-loaded", () => resolve(), {
              once: true,
            });
          }
        });

      await waitForSDK();
      await (window as any).SmileUI.ready();

      try {
        const customer = await (window as any).SmileUI.customerReady();
        if (!customer) {
          console.warn("No customer identified by Smile");
          return;
        }

        setCustomerPoints(customer.points_balance);

        const Smile = (window as any).Smile;
        const rewards = await Smile.fetchAllPointsProducts();
        setRewards(rewards);
      } catch (err) {
        console.error("Failed to load rewards:", err);
      } finally {
        setLoading(false);
      }
    };

    loadRewards();
  }, []);

  const redeem = async (productId: number, pointsAmount?: number) => {
  try {
    setRedeemingId(productId);
    const Smile = (window as any).Smile;
    const product = await Smile.fetchPointsProduct(productId);

    let purchase: PointsPurchase;

    if (product.exchange_type === "variable") {
      if (!pointsAmount) throw new Error("Variable reward requires a points amount.");
      purchase = await Smile.purchasePointsProduct(productId, { points_to_spend: pointsAmount });
    } else {
      purchase = await Smile.purchasePointsProduct(productId);
    }
    console.log(purchase);
    setRedeemedPurchase(purchase);
    onRedeemSuccess?.();
  } catch (err) {
    console.error("Failed to redeem reward:", err);
    setRedeemedPurchase(null);
  } finally {
    setRedeemingId(null);
  }
};

  return (
    <div className="transition-all duration-700 ease-in-out">
      <div className="space-y-4">
        {loading ? (
          <RewardCardSkeleton />
        ) : rewards.length === 0 ? (
          <p className="text-gray-500 italic">No rewards available.</p>
        ) : (
          rewards.map((reward) => (
            <RewardCard
              key={reward.id}
              reward={reward}
              customerPoints={customerPoints}
              isRedeeming={redeemingId === reward.id}
              onRedeem={(id) => redeem(id)}
              onRedeemWithAmount={(id, amount) => redeem(id, amount)}
            />
          ))
        )}
      {redeemedPurchase?.fulfilled_reward && (
        <Coupon reward={redeemedPurchase.fulfilled_reward} />
      )}

      </div>
    </div>
  );
};

export default RewardsList;