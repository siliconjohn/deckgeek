class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.string :name, :default => "My Card"
      t.string :description, :default => "Describe your card here"
      t.string :border_style, :default => "solid"
      t.string :border_color, :default => "#808080"
      t.integer :border_radius, :default => 10
      t.decimal :border_width, :precision => 2, :scale => 2 , :default => 0.2
      t.references :deck
      t.references :style
      t.references :image
      t.references :background
      t.timestamps
    end
    add_index :cards, :deck_id
  end
end
