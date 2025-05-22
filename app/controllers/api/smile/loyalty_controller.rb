module Api
  module Smile
    class LoyaltyController < ApplicationController
      def authorize
        customer_id = params.require('customer_id')
        token = SmileAuthToken.generate(customer_id)

        render json: {
            token: token
        }
      end
    end
  end
end