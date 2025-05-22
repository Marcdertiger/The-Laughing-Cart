class CreateMathMiniGameTrackers < ActiveRecord::Migration[7.1]
  def change
    create_table :math_mini_game_trackers do |t|
      t.bigint "customer_id", null: false
      t.integer "a", null: false
      t.integer "b", null: false
      t.integer "correct_answer", null: false
      t.integer "answer_given"
      t.boolean "correct", default: false
      t.datetime "created_at", null: false
      t.datetime "updated_at", null: false

      add_index :math_mini_game_trackers, :updated_at
    end
  end
end