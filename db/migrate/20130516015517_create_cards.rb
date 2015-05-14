class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.string :name, :default => "My Card"
      t.references :deck
      t.text :html, :default => '<div class="jcard"><img class="jcard-bg-image" style="position: relative; left: -18px; top: -21px; display: inline-block; width: 328px;" src="http://deckgeek.herokuapp.com/assets/images/31.jpg" alt="31.jpg" data-id="31"><div class="jcard-border"></div><div class="jcard-text" style="left: 17px; top: 16px;"><div class="jtext">Click me to change this text.</div></div></div>'
      t.timestamps
    end
    add_index :cards, :deck_id
  end
end
