import { useState } from "react";
import type { SmileCustomer } from "../api/types";
import { adjustPoints, deleteTodayMiniGame } from "../api/admin";

interface AdminToolsProps {
  customer: SmileCustomer;
  onSuccess: () => void;
}

const AdminTools = ({ customer, onSuccess }: AdminToolsProps) => {
  const [amount, setAmount] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleAdjustPoints = async () => {
    try {
      await adjustPoints({
        customer_id: customer.id,
        points_change: Number(amount),
        description: "Manual adjustment via admin tools"
      });
      setFeedback("✅ Points were updated by: " + amount + "points."
      );
      onSuccess();
    } catch (err) {
      setFeedback("❌ Error adjusting points.");
    }
  };

  const handleDeleteMiniGame = async () => {
    try {
      const res = await deleteTodayMiniGame(customer.id);
      console.log(res);
      if (res.success && res.deleted) {
        // We'd be nice to include reloading the mini game component here.
        // This could be done better by trigger or state etc
        // I'm just a bit tired so this will do for an MVP
        setFeedback("Mini Game was deleted.");
      } else if (res.success) {
        setFeedback(" No Minigame to delete. Reload your page (sorry about that!).");
      } else {
        setFeedback("An error occured.");
      }
    } catch (err) {
      setFeedback("❌ Error deleting the mini game.");
    }
  };

  return (
    <div className="mt-6 p-4 border rounded bg-gray-50 space-y-3">
      <h2 className="text-lg font-bold">🔧 Admin Tools</h2>
      <p className="text-sm text-gray-500 mb-2">
        Admin actions for <strong>{customer.email}</strong>
      </p>

      <div className="flex gap-2 items-center">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-24 px-2 py-1 border rounded text-center"
          placeholder="Points"
        />
        <button
          onClick={handleAdjustPoints}
          className="px-4 py-1 bg-green-600 text-white rounded"
        >
          Add/Remove Points
        </button>
      </div>

      <button
        onClick={handleDeleteMiniGame}
        className="px-4 py-1 bg-red-600 text-white rounded"
      >
        Delete Today’s Completed Mini Game
      </button>

      {feedback && <p className="text-sm text-gray-700">{feedback}</p>}
    </div>
  );
};

export default AdminTools;