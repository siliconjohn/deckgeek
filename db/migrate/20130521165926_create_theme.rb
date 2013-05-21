class CreateTheme < ActiveRecord::Migration
  def change
    create_table :themes do |t|
      t.string :name
      t.string :description
      t.string :class_name
      t.timestamps
    end
  end
end
