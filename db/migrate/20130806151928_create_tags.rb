class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.string :title, :default => "Image Tag"
      t.timestamps
    end
  end
end
