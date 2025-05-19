import { useEffect, useRef, useState } from 'react';
import { initializeSmile } from "./lib/smile";
import logo from './assets/thelaughingcartlogo.png';
import PointsBalance from "./components/PointsBalance";
import RewardsList from "./components/rewards/RewardsList";

function App() {
  const isAdmin = new URLSearchParams(window.location.search).get("admin") === "true";
  const hasInitializedSmile = useRef(false);
  const [pointsVersion, setPointsVersion] = useState(0);

  useEffect(() => {
    if (hasInitializedSmile.current) return;
    hasInitializedSmile.current = true;

    initializeSmile();
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
          <h2 className="text-xl font-semibold mb-4">Daily Math Challenge</h2>
          {/* Replace with actual component */}
          <div className="text-gray-500 italic">[Math Challenge Placeholder]</div>
        </section>

        {isAdmin && (
          <section className="bg-white p-6 rounded-xl shadow-md border border-yellow-300">
            <h2 className="text-xl font-semibold mb-4 text-yellow-600">Admin Tools</h2>
            {/* Replace with actual component */}
            <div className="text-gray-500 italic">[Admin Points Adjuster Placeholder]</div>
          </section>
        )}
      </main>

      <footer className="text-center text-sm text-gray-400 py-4 border-t mt-8">
        &copy; {new Date().getFullYear()} The Laughing Cart. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
