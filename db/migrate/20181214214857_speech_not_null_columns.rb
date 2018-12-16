class SpeechNotNullColumns < ActiveRecord::Migration[5.2]
  def change
    change_column_null(:speeches, :buzzword_id, false)
    change_column_null(:speeches, :user_id, false)
  end
end
