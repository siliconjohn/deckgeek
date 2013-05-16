class CreateDecks < ActiveRecord::Migration
  def change
    create_table :decks do |t|
      t.string :name
      t.string :description
      t.references :game

      t.timestamps
    end
    add_index :decks, :game_id
  end
end

