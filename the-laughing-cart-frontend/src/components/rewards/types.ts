export interface Reward {
  id: number;
  created_at: string;
  updated_at: string;
  exchange_description: string;
  exchange_type: string;
  formatted_variable_points_step_reward_value: string;
  minimum_points_price: number;
  points_price: number | null;
  variable_points_max: number | null;
  variable_points_min: number | null;
  variable_points_step: number;
  variable_points_step_reward_value: number;
  reward: {
    id: number;
    name: string;
    description: string | null;
    value: number | null;
    image_url: string;
  };
}

export interface PointsPurchase {
  id: number;
  created_at: string;
  updated_at: string;
  points_product_id: number;
  points_spent: number;
  fulfilled_reward: FulfilledReward;
}


export interface FulfilledReward {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  code: string;
  expires_at: string;
  image_url: string;
  used_at: string;
  action_text: string;
  source_description: string;
  terms_and_conditions: string;
  usage_instructions: string;
}
