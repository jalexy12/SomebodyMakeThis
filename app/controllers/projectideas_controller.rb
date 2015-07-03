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
		current_user.voted_up_on?(@project_idea) ? @project_idea.unliked_by(current_user) : @project_idea.liked_by(current_user)
		# emit_socket_update([@project_idea, @project_idea.votes_for.count])
		render :json => @project_idea.votes_for.count
	end

	protected

	# def emit_socket_update(project)
	# 	project = project.to_json
	# 	$firehose.publish(project).to("/projects")
	# end

end
