class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :name, :default => "My Game!"
      t.string :description, :default => "This is my game. There are many like it, but this one is mine."
      t.references :user

      t.timestamps
    end
    add_index :games, :user_id
  end
end
