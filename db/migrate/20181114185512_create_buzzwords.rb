class CreateBuzzwords < ActiveRecord::Migration[5.2]
  def change
    create_table :buzzwords do |t|
      t.string :word, null: false

      t.timestamps null: false
    end
  end
end
