class Api::V1::SpeechesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: Speech.all
  end

  def create

    user_id = params[:user_id].to_i
    word = params[:word]
    speech = params[:speech]

    buzzword_id = Buzzword.find_or_create_by(word: word).id

    newSpeech = Speech.new(speech: speech,
                           user_id: user_id,
                           buzzword_id: buzzword_id)

    if newSpeech.save
      render json: { title: "SUCCESS!", text: "Your speech has been recorded" }
    else
      render json: { title: "OOPS!", text:  "Something went wrong recording your speech" }
    end

  end

  def show
    render json: Speech.find(params[:id])
  end

  private

  def speech_params
    params.require(:speech).permit(:word, :speech, :user_id)
  end
end
