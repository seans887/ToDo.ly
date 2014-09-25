Listly2::Application.routes.draw do
  resources :users

  resources :todos, only: [:destroy, :index, :create, :update]
  root 'todos#index'
end
