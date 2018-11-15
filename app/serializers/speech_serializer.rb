class SpeechSerializer < ActiveModel::Serializer
  attributes :buzzword_id, :user_id, :id, :timestamps

  belongs_to :user
  belongs_to :buzzword

end
