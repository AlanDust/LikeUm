class BuzzwordSerializer < ActiveModel::Serializer
  attributes :id, :word, :timestamps

  has_many :speeches
  has_many :users, through: :speeches

end
