class ProjectideasController < ApplicationController
	def index
		@projects = ProjectIdea.includes(:votes_for).page(params[:page]).per(10)
		@project_likes = @projects.map do | project |
			current_user.voted_up_on?(project) ? [project, project.votes_for.count, true] : [project, project.votes_for.count, false]
		end
		render json: {projects: @project_likes, page_count: ProjectIdea.page_count}
	end

	def updateliked
		
		@project_idea = ProjectIdea.find_by_id(params[:id])
		@project_idea.liked_by(current_user)

		render json: @project_idea.votes_for.size
	end

end
