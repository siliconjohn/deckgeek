class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :name
      t.string :description
      t.references :user

      t.timestamps
    end
    add_index :games, :user_id
  end
end
