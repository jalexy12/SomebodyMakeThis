Rails.application.routes.draw do
  post 'pusher/auth'

  resources :projectideas

  post '/updatelike' => "projectideas#updateliked"
  get '/updatelike' => "projectideas#updateliked"
  devise_for :developers
  devise_for :creatives

  unauthenticated do
    root "site#home"
  end
 
  authenticated do 
  	root "site#dashboard", as: :authenticated_root
  end

end

