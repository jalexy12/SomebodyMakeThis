class SiteController < ApplicationController

  before_action :authenticate_creative!, :except => [:home]
  before_action :authenticate_developer!, :except => [:home]


  def home
  end

  def dashboard
  end
  
end
