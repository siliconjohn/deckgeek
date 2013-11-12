class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :name, :default => "My Game!"
      t.string :description, :default => "This is an example game, you can do anything you want to it."
      t.references :user

      t.timestamps
    end
    add_index :games, :user_id
  end
end
