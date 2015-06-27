class ProjectideasController < ApplicationController
	def index
		puts "\n\n\n\n"
		puts params[:page]
		@projects = ProjectIdea.page(params[:page]).per(10)
		render json: {projects: @projects, page_count: ProjectIdea.page_count}
	end
end
