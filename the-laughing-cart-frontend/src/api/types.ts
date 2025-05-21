export interface SmileCustomer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  state: string;
  date_of_birth: string;
  points_balance: number;
  referral_url: string;
  vip_tier_id: number|null;
  created_at: string;
  updated_at: string;
}

export interface MiniGameResponse {
  completed: boolean;
  question: Problem;
}

export interface Problem {
  a: number;
  b: number;
}

export interface MiniGameSubmission {
  customer_id: number;
  answer: number;
}

export interface BooleanRequestResponse {
  success: boolean;
}
export interface DeleteRequestResponse {
  success: boolean;
  deleted: boolean;
}

export interface AdminPointsAdjustment {
  customer_id: number;
  points_change: number;
  description: string;
}
