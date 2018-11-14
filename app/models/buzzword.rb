class Buzzword < ApplicationRecord
  has_many :users, through: :speeches
  has_many :speeches

  validates :word, presence: true

end
