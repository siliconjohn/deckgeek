class CreateStyle < ActiveRecord::Migration
  def change
    create_table :styles do |t|
      t.string :name
      t.string :description
      t.string :template_name
      t.timestamps
    end
  end
end
