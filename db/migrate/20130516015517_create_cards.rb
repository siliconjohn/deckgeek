class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.string :name, :default => "My Card"
      t.string :description, :default => "Describe your card here"
      t.string :border_color
      t.integer :border_width,   :default => 10
      t.boolean :border_visible, :default => true
      t.boolean :border_inline,  :default => true
      t.boolean :border_outline, :default => true
      t.references :deck
      t.references :style
      t.references :background
      t.timestamps
    end
    add_index :cards, :deck_id
  end
end
