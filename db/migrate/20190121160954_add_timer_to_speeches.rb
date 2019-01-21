class AddTimerToSpeeches < ActiveRecord::Migration[5.2]
  def change
    add_column :speeches, :timer, :string
  end
end
