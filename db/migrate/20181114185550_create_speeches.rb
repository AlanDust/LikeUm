class CreateSpeeches < ActiveRecord::Migration[5.2]
  def change
    create_table :speeches do |t|
      t.text :speech, null: false

      t.timestamps null: false
    end
  end
end
