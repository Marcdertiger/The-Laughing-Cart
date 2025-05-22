import { useState } from "react";
import type { SmileCustomer } from "../api/types";
import { adjustPoints } from "../api/admin";

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
        description: "Manual adjustment via admin tools",
      });
      setFeedback(`✅ Points were updated by: ${amount} points.`);
      onSuccess();
    } catch (err) {
      setFeedback("❌ Error adjusting points.");
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

      {feedback && <p className="text-sm text-gray-700">{feedback}</p>}
    </div>
  );
};

export default AdminTools;