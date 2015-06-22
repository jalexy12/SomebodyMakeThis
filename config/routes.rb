Rails.application.routes.draw do
	
  root 'site#home'
  devise_for :developers
  devise_for :creatives
 
end

