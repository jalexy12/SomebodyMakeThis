class ProjectideasController < ApplicationController
	def index
		@projects = ProjectIdea.includes(:votes_for).page(params[:page]).per(10)
		@project_likes = @projects.map do | project |
			[project, project.votes_for.count]
		end
		render json: {projects: @project_likes, page_count: ProjectIdea.page_count}
	end

	def updateliked
		current_user ||= current_developer || current_creative

		@project_idea = ProjectIdea.find_by_id(params[:id])
		@project_idea.liked_by(current_user)

		render json: @project_idea.votes_for.size
	end

end
