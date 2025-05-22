module Api
  module Smile
    class AdminController < ApplicationController
      before_action :logged_in_user_in_context

      def adjust_points
        customer_id = params.require(:customer_id)
        points_change = params.require(:points_change)
        description = params[:description] || "Manual adjustment via admin panel"

        client = SmileClient.new
        client.adjust_points(customer_id, points_change, description)

        render json: { success: true }
      end

      private

      def logged_in_user_in_context
        # This is where you would check that : 
        # 1. user is in trusted context and logged in
        # 2. use has the appropriate roles/persmissions to access these actions.
        true # yolo 💅
      end
    end
  end
end
