Rails.application.routes.draw do
  root to: 'home#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api ,{format: 'json'} do
    resources :users, only: [:index,:show,:create,:update,:destroy]
  end

end
