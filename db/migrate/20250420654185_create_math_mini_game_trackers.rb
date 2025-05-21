class CreateMathMiniGameTrackers < ActiveRecord::Migration[7.1]
  def change
    create_table :math_mini_game_trackers do |t|
      t.bigint :customer_id, null: false
      t.date :attempt_date, null: false
      t.integer :a, null: false
      t.integer :b, null: false
      t.integer :correct_answer, null: false
      t.integer :answer_given
      t.boolean :correct, default: false

      t.timestamps
    end

    add_index :math_mini_game_trackers, [:customer_id, :attempt_date], unique: true
  end
end