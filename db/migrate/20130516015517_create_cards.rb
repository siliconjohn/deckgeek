class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.string :name, :default => "My Card"
      t.string :description, :default => "Describe your card here"
      t.string :border_color, :default => "rgba(20, 27, 39, 0.74)"
      t.integer :border_width,   :default => 10
      t.boolean :border_visible, :default => true
      t.boolean :border_inline,  :default => true
      t.boolean :border_outline, :default => true
      t.boolean :background_visible, :default => true
      t.string  :background_color, :default => "#ffffff"
      t.references :deck
      t.references :style, :default => 1
      t.references :background, :default => 1
      t.integer :title_width,       :default => 100
      t.string  :title_alignment, :default => "center"
      t.integer :title_top_margin,  :default => 0
      t.integer :title_height,      :default => 39
      t.boolean :title_border_outline, :default => false
      t.boolean :title_visible, :default => true
      t.string :title_bg_color, :default => "rgba(9, 10, 12, 0.34)"
      t.integer :title_border_radius,  :default => 0
      t.integer :description_width,       :default => 100
      t.string  :description_alignment, :default => "center"
      t.integer :description_bottom,  :default => 0
      t.integer :description_height,      :default => 48
      t.boolean :description_border_outline, :default => false
      t.boolean :description_visible, :default => true
      t.string :description_bg_color, :default => "rgba(9, 10, 12, 0.41)"
      t.integer :description_border_radius,  :default => 0
      t.timestamps
    end
    add_index :cards, :deck_id
  end  
end
