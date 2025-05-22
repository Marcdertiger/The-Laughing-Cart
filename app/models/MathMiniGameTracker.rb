class MathMiniGameTracker < ApplicationRecord
  validates :customer_id, presence: true
  default_scope { order(updated_at: :desc) }

  def refresh
    self.a = rand(5..15)
    self.b = rand(5..15)
    self.correct_answer = self.a + self.b
    self.updated_at = Time.now
    self.save!
    self
  end

  def self.find_or_create_unsolved_problem(customer_id)
    problem = MathMiniGameTracker.find_or_initialize_by(customer_id: customer_id, correct: false)
    problem.refresh
  end
end
