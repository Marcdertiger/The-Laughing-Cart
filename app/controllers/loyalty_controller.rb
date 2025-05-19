require 'pry'

class LoyaltyController < ApplicationController
  def auth_token
    customer_id = params.require('customer_id')
    token = SmileAuthToken.generate(customer_id)

    render json: {
        token: token
    }
  end
end
  