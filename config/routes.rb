Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :buzzwords, only: [:index, :create]
      resources :users, only: [:index, :create]
      resources :speeches, only: [:index, :create]
    end
  end
end
