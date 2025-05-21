import api from './client';
import type { MiniGameResponse, BooleanRequestResponse, MiniGameSubmission } from "./types";

export const getMiniGame = async (customer_id: number): Promise<MiniGameResponse> => {
  const response = await api.post('api/smile/mini_game/status', {
     customer_id 
  });
  return response.data;
};

export const submitMiniGame = async (submission: MiniGameSubmission): Promise<BooleanRequestResponse> => {
  
  const response = await api.post('api/smile/mini_game/submit', {
     ...submission
  });
  return response.data;
};