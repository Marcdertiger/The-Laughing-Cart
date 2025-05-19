import type { FulfilledReward } from "./types";

const Coupon = ({ reward }: { reward: FulfilledReward }) => (
  <div className="border rounded-lg bg-green-50 p-4 shadow-sm text-left space-y-2">
    <div className="flex items-center gap-4">
      <img src={reward.image_url} alt={reward.name} className="w-12 h-12 object-contain" />
      <div>
        <h3 className="text-lg font-semibold text-green-800">🎉 You've redeemed:</h3>
        <p className="text-xl font-bold text-green-900">{reward.code}</p>
        <p className="text-sm text-gray-600">{reward.name}</p>
      </div>
    </div>

    {reward.expires_at && (
      <p className="text-xs text-gray-500">
        <strong>Expires:</strong> {new Date(reward.expires_at).toLocaleDateString()}
      </p>
    )}

    {reward.usage_instructions && (
      <p className="text-sm text-gray-700">
        <strong>How to use:</strong> {reward.usage_instructions}
      </p>
    )}

    {reward.terms_and_conditions && (
      <p className="text-xs text-gray-500 italic">
        {reward.terms_and_conditions}
      </p>
    )}

    {reward.source_description && (
      <p className="text-xs text-gray-400">
        <strong>Source:</strong> {reward.source_description}
      </p>
    )}
  </div>
);

export default Coupon;
