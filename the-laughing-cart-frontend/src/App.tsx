import { useEffect, useRef, useState } from 'react';
import { initializeSmile } from "./lib/smile";
import type { SmileCustomer } from './api/types';
import logo from './assets/thelaughingcartlogo.png';
import PointsBalance from "./components/PointsBalance";
import RewardsList from "./components/rewards/RewardsList";
import MathMiniGame from "./components/MathMiniGame";
import AdminTools from "./components/AdminTools";

function App() {
  const isAdmin = new URLSearchParams(window.location.search).get("admin") === "true";
  const hasInitializedSmile = useRef(false);
  const [pointsVersion, setPointsVersion] = useState(0);

  const mockCustomer: SmileCustomer = {
    id: 304169228,
    first_name: "Jane",
    last_name: "Doe",
    email: "jane@doe.com",
    state: "member",
    date_of_birth: "1004-05-27",
    points_balance: 0,
    referral_url: "http://i.refs.cc/9qr5Pw",
    vip_tier_id: null,
    created_at: "2024-04-04T15:10:42.030Z",
    updated_at: "2024-04-04T15:10:42.030Z"
  };

  const [customer, setCustomer] = useState<SmileCustomer>(mockCustomer);

  useEffect(() => {
    if (hasInitializedSmile.current) return;
    hasInitializedSmile.current = true;
  
    const initialize = async () => {
      initializeSmile();
  
      const waitForSmile = () =>
        new Promise<void>((resolve) => {
          if ((window as any).SmileUI?.ready && (window as any).Smile) {
            resolve();
          } else {
            document.addEventListener("smile-ui-loaded", () => resolve(), {
              once: true,
            });
          }
        });
  
      await waitForSmile();
  
      try {
        await (window as any).SmileUI.ready();
        const result = await (window as any).SmileUI.customerReady();
  
        if (result) {
          setCustomer(result as SmileCustomer);
        } else {
          console.warn("No Smile customer found");
        }
      } catch (err) {
        console.error("Error initializing Smile SDK:", err);
      }
    };
  
    initialize();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="flex flex-col items-center py-6 border-b border-gray-200 bg-white shadow-sm">
        <img
          src={logo}
          alt="The Laughing Cart Logo"
          className="w-32 h-32 mb-2"
        />
        <h1 className="text-3xl font-extrabold tracking-tight">The Laughing Cart</h1>
        <p className="text-sm text-gray-500">All of your carts and loyalty points in one place.</p>
      </header>

      <main className="max-w-3xl mx-auto py-10 px-4 space-y-12">
        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">Your Points</h2>
          <PointsBalance refreshTrigger={pointsVersion} />
        </section>

        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Available Rewards</h2>
          <RewardsList onRedeemSuccess={() => setPointsVersion((v) => v + 1)} />
        </section>

        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Daily Math Mini Game</h2>
          <MathMiniGame onSuccess={() => setPointsVersion((v) => v + 1)} />
        </section>

        {isAdmin &&  (
          <section className="bg-white p-6 rounded-xl shadow-md border border-yellow-300">
            <h2 className="text-xl font-semibold mb-4 text-yellow-600">Admin Tools</h2>
            <AdminTools customer={customer} onSuccess={() => setPointsVersion((v) => v + 1)} />
          </section>
        )}
      </main>

      <footer className="text-center text-sm text-gray-400 py-4 border-t mt-8">
        &copy; {new Date().getFullYear()} The Laughing Cart. All rights reserved.
      </footer>
    </div>
  );
}

export default App;