class MathMiniGameTracker < ApplicationRecord
  validates :customer_id, :attempt_date, presence: true

  def refresh
    self.a = rand(5..15)
    self.b = rand(5..15)
    self.correct_answer = self.a + self.b
    self.save!
  end
end
