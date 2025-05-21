import api from './client';

import type { AdminPointsAdjustment, BooleanRequestResponse, DeleteRequestResponse } from "./types";


export const adjustPoints = async (payload: AdminPointsAdjustment): Promise<BooleanRequestResponse> => {
  const response = await api.post('api/smile/admin/adjust_points', {
     ...payload 
  });
  return response.data;
};

export const deleteTodayMiniGame = async (customer_id: number): Promise<DeleteRequestResponse> => {
  
  const response = await api.delete('api/smile/admin/reset_mini_game', {
     data: { customer_id }
  });
  return response.data;
};