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
		@project = []

		if current_user.voted_up_on?(@project_idea)
			@project_idea.unliked_by(current_user)
			@project.push(@project_idea, @project_idea.votes_for.count, false)
		else
			@project_idea.liked_by(current_user)
			@project.push(@project_idea, @project_idea.votes_for.count, true)
		end

		@json_project = @project.to_json
		Pusher.trigger('ProjectIdeas', 'updateliked', {message: @json_project})
		render :nothing => true
	end

	

end
