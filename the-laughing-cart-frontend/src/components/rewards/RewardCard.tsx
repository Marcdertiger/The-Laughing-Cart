import { useState } from "react";
import type { Reward } from "./types";

interface RewardCardProps {
  reward: Reward;
  customerPoints: number;
  isRedeeming: boolean;
  onRedeem: (id: number) => void;
  onRedeemWithAmount: (id: number, amount: number) => void;
}

const RewardCard = ({
  reward,
  customerPoints,
  isRedeeming,
  onRedeem,
  onRedeemWithAmount,
}: RewardCardProps) => {
  const isVariable = reward.exchange_type === "variable";
  const [customAmount, setCustomAmount] = useState(reward.minimum_points_price);
  const canRedeem = !isRedeeming && (customerPoints >= customAmount);

  return (
    <div className="border rounded-lg shadow-sm p-4 flex gap-4 items-start bg-white">
      <img
        src={reward.reward.image_url}
        alt={reward.reward.name}
        className="w-16 h-16 object-contain"
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-1">{reward.reward.name}</h3>
        <p className="text-sm text-gray-600 mb-1">{reward.exchange_description}</p>
        {reward.reward.description && (
          <p className="text-sm text-gray-500 mb-2">{reward.reward.description}</p>
        )}

        {isVariable && (
          <div className="flex items-center space-x-2 mb-2">
            <input
              type="number"
              min={reward.minimum_points_price}
              max={customerPoints}
              step={reward.variable_points_step}
              value={customAmount}
              onChange={(e) => setCustomAmount(Number(e.target.value))}
              className="w-24 px-2 py-1 border rounded"
            />
            <span className="text-sm text-gray-500">
              = $
              {(
                (customAmount / reward.variable_points_step) *
                reward.variable_points_step_reward_value
              ).toFixed(2)}
            </span>
          </div>
        )}

        <button
          disabled={!canRedeem}
          onClick={() =>
            isVariable
              ? onRedeemWithAmount(reward.id, customAmount)
              : onRedeem(reward.id)
          }
          className={`mt-2 w-full py-2 px-4 text-white font-semibold rounded transition-colors duration-300 ${
            canRedeem
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {isRedeeming ? "Redeeming..." : "Redeem"}
        </button>
      </div>
    </div>
  );
};

export default RewardCard;
