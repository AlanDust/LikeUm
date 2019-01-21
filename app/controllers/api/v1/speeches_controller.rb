class Api::V1::SpeechesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: Speech.all
  end

  def create

    user_id = params[:user_id].to_i
    title = params[:title]
    word = params[:word]
    speech = params[:speech]
    timer = params[:timer]

    title_success = "SUCCESS!"
    text_success = "Your speech has been recorded"

    title_oops = "OOPS!"
    text_oops = "Something went wrong recording your speech"

    if Buzzword.find_or_create_by(word: word).id.nil?
      buzzword_id = nil
      text_oops =  "Your cannot save a speech without a buzzword."
    else
      buzzword_id = Buzzword.find_or_create_by(word: word).id
    end

    newSpeech = Speech.new(speech: speech,
                           title: title,
                           user_id: user_id,
                           buzzword_id: buzzword_id,
                           timer: timer)

    if newSpeech.save
      render json: { title: title_success, text: text_success }
    else
      render json: { title: title_oops, text: text_oops }
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
