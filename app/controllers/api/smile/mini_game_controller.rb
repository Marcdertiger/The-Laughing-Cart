require 'pry'
module Api
  module Smile
    class MiniGameController < ApplicationController
      before_action :set_customer_id

      def status
        attempt = MathMiniGameTracker.find_or_initialize_by(customer_id: @customer_id, attempt_date: Date.today)
      
        if attempt.correct
          render json: { completed: true }
        else
          # Refresh on page reload (everytime today's question is fetched)
          attempt.refresh

          render json: { completed: false, question: { a: attempt.a, b: attempt.b } }
        end
      rescue StandardError => _e
        render json: { error: "Something went wrong." }, status: :bad_request
      end
      

      def submit
        binding.pry
        attempt = MathMiniGameTracker.where(customer_id: @customer_id, attempt_date: Date.today).last

        if attempt.correct
          render json: { error: "Already completed today's challenge." }, status: :forbidden
          return
        end

        submitted = params.require(:answer).to_i
        is_correct = submitted == attempt.correct_answer

        attempt.update!(
          answer_given: submitted,
          correct: is_correct
        )

        if is_correct
          award_points_to_customer
          render json: { success: true }
        else
          render json: { success: false }
        end
      rescue StandardError => _e
        render json: { error: "Something went wrong." }, status: :bad_request
      end

      private

      def set_customer_id
        @customer_id = params.require(:customer_id)
      end

      def award_points_to_customer
        client = SmileClient.new
        client.issue_points(@customer_id, 50, "Completed daily math mini game", "Only cool companies use this!")
      end
    end
  end
end
