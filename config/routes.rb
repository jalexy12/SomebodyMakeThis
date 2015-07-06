Rails.application.routes.draw do
  post 'pusher/auth'

  resources :projectideas
  get '/updatelike' => "projectideas#updateliked"
  post '/updatelike' => "projectideas#updateliked"
  post '/projectideas/:id/comments/create' => "projectideas#comment_create"

  devise_for :developers
  devise_for :creatives

  unauthenticated do
    root "site#home"
  end
 
  authenticated do 
  	root "site#dashboard", as: :authenticated_root
  end

end

