class Api::V1::UsersController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: User.all
  end

  def create
    newUser = User.new(user_params)

    if newUser.save
      render json: newUser
    else
      render json: { errors: newUser.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    render json: User.find(params[:id])
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :encrypted_password, :timestamps, :id)
  end
end
