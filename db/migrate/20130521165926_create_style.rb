class CreateStyle < ActiveRecord::Migration
  def change
    create_table :styles do |t|
      t.string :name
      t.string :description
      t.string :template_name
      t.integer :width, :default => 250
      t.integer :height, :default => 350
      t.timestamps
    end
  end
end
