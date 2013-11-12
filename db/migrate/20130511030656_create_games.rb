class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :name, :default => "My Game!"
      t.string :description, :default => "Click the green 'Edit Game' button to make changes to this game."
      t.references :user

      t.timestamps
    end
    add_index :games, :user_id
  end
end
