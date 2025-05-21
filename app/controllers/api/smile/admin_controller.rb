module Api
  module Smile
    class AdminController < ApplicationController
      before_action :logged_in_user_in_context

      def adjust_points
        customer_id = params.require(:customer_id)
        points_change = params.require(:points_change)
        description = params[:description] || "Manual adjustment via admin panel"

        client = SmileClient.new
        client.issue_points(customer_id, points_change, description)

        render json: { success: true }
      end

      def reset_mini_game
        customer_id = params.require(:customer_id)
        deleted = MathMiniGameTracker.where(customer_id: customer_id, attempt_date: Date.today.to_s).delete_all

        render json: { success: true, deleted: deleted > 0 }
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
