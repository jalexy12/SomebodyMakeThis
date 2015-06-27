Rails.application.routes.draw do
  resources :projectideas
  root 'site#home'
  devise_for :developers
  devise_for :creatives
 
end

