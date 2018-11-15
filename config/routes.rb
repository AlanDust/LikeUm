Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :users, only: [:index, :create, :show] do
        resources :buzzwords, only: [:index, :create, :show]
        resources :speeches, only: [:index, :create, :show]
      end
    end
  end
  get '/', to: 'homes#index'
  get '/users/:user_id/speeches', to: 'homes#index'
  get '/users/:user_id/buzzwords', to: 'homes#index'
end
