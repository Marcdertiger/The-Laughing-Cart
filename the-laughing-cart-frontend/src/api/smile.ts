import api from './client';

export interface SmileAuthResponse {
  token: string;
}

export const getSmileAuthToken = async (customer_id: string): Promise<SmileAuthResponse> => {
  const response = await api.post('api/smile/authorize', {
     customer_id 
  });
  return response.data;
};