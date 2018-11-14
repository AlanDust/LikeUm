class Speech < ApplicationRecord
  belongs_to :user
  belongs_to :buzzword

  validates :speech, presence: true

end
