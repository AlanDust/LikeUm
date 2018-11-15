class Api::V1::SpeechesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: Speech.all
  end

  def create
    newSpeech = Speech.new(speech_params)

    if newSpeech.save
      render json: newSpeech
    else
      render json: { errors: newSpeech.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    render json: Speech.find(params[:id])
  end

  private

  def speech_params
    params.require(:speech).permit(:speech, :timestamps, :id)
  end
end
