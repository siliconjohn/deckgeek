class CreateDecks < ActiveRecord::Migration
  def change
    create_table :decks do |t|
      t.string :name, :default => "My deck of cards"
      t.string :description, :default => "Describe your deck here"
      t.references :game

      t.timestamps
    end
    add_index :decks, :game_id
  end
end

