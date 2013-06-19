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
      t.integer :title_width,       :default => 100
      t.integer :title_horz_margin, :default => 0
      t.integer :title_top_margin,  :default => 0
      t.integer :title_height,      :default => 40
      t.boolean :title_border_outline, :default => false
      t.boolean :title_visible, :default => true
      t.string :title_bg_color, :default => "rgba(248,248,248, 0.7)"
      t.integer :title_border_radius,  :default => 0

      t.timestamps
    end
    add_index :cards, :deck_id
  end
end
