class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.string :name
      t.string :description
      t.references :deck
      t.references :style
      t.references :image
      t.timestamps
    end
    add_index :cards, :deck_id
  end
end
