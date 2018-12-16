class AddTitleToSpeeches < ActiveRecord::Migration[5.2]
  def change
    add_column :speeches, :title, :string, null: false, :default => "test"
  end
end
