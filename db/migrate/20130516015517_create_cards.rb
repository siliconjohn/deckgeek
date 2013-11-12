class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.string :name, :default => "My Card"
      t.references :deck
      t.text :html, :default => '<div class="jcard"><img class="jcard-bg-image" style="position: relative;" src="http://www.siliconjohn.com/deckgeek/images/2.jpg" alt="2.jpg" data-id="2"><div class="jcard-border"></div><div class="jcard-text" style="left: 17px; top: 16px;"><span>Card title, click me to change the text.</span></div><div class="jcard-text" style="left: 17px; top: 279px;"><span>Card description </span></div></div>'
      t.timestamps
    end
    add_index :cards, :deck_id
  end
end
