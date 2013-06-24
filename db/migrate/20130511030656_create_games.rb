class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :name, :default => "My Sweet Game!"
      t.string :description, :default => "This game will impress all the girls."
      t.references :user

      t.timestamps
    end
    add_index :games, :user_id
  end
end
