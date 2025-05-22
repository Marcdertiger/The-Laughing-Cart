require 'pry'
module Api
  module Smile
    class MiniGameController < ApplicationController
      before_action :set_customer_id

      MINIGAME_ACTIVITY_ID = ENV['SMILE_MATH_MINIGAME_ACTIVITY_ID']

      def status
        problem = MathMiniGameTracker.find_or_create_unsolved_problem(@customer_id)

        render json: { completed: false, question: { id: problem.id, a: problem.a, b: problem.b } }
      rescue StandardError => _e
        render json: { error: "Something went wrong." }, status: :bad_request
      end

      def submit
        problem_id = params.require(:id)
        problem = MathMiniGameTracker.find_by(id: problem_id, customer_id: @customer_id)

        return render(json: { error: "Could not retrieve the problem." }, status: :bad_request) if problem.blank?
        return render(json: { error: "This problem has already been solved." }, status: :bad_request) if problem.correct

        submitted = params.require(:answer).to_i
        is_correct = submitted == problem.correct_answer

        problem.update!(
          answer_given: submitted,
          correct: is_correct,
          updated_at: Time.now
        )

        if is_correct
          # award points then create a new unsolved problem to return
          award_successful_mini_game_points
          problem = MathMiniGameTracker.find_or_create_unsolved_problem(@customer_id)
        else
          return render json: { success: false }
        end

        render json: { success: true, question: { id: problem.id, a: problem.a, b: problem.b } }
      rescue StandardError => _e
        render json: { error: "Something went wrong." }, status: :bad_request
      end

      private

      def set_customer_id
        @customer_id = params.require(:customer_id)
      end

      def award_successful_mini_game_points
        client = SmileClient.new
        client.award_custom_activity_to_customer(MINIGAME_ACTIVITY_ID, @customer_id)
      end
    end
  end
end
