import api from './client';

import type { AdminPointsAdjustment, BooleanRequestResponse, DeleteRequestResponse } from "./types";


export const adjustPoints = async (payload: AdminPointsAdjustment): Promise<BooleanRequestResponse> => {
  const response = await api.post('api/smile/admin/adjust_points', {
     ...payload 
  });
  return response.data;
};