class CreateBackground < ActiveRecord::Migration
  def change
    create_table :backgrounds do |t|
      t.string :name
      t.string :url
      t.timestamps
    end
  end
end
