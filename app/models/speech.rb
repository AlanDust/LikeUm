class Speech < ApplicationRecord
  belongs_to :user
  belongs_to :buzzword

  validates :speech, presence: true
  validates :buzzword_id, presence: true
  validates :user_id, presence: true

end
