class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.string :name, :default => "My Card"
      t.references :deck
      t.references :style, :default => 1
      t.string :html, :default => '<div class="jcard"><img class="jcard-bg-image"/><div class="jcard-border"/></div>'
      t.timestamps
    end
    add_index :cards, :deck_id
  end
end
