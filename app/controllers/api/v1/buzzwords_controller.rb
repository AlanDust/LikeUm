class Api::V1::BuzzwordsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: Buzzword.all
  end

  def create
    newBuzzword = Buzzword.new(buzzword_params)

    if newBuzzword.save
      render json: newBuzzword
    else
      render json: { errors: newBuzzword.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    render json: Buzzword.find(params[:id])
  end

  private

  def buzzword_params
    params.require(:buzzword).permit(:word, :timestamps, :id)
  end
end
