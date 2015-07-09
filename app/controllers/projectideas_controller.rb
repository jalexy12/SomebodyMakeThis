class ProjectideasController < ApplicationController
	
	def index
		@projects = ProjectIdea.get_serialized_with_likes_and_comments(current_user, params[:page])

		render json: {
					  projects:   @projects, 
					  page_count: ProjectIdea.page_count
					}
	end

	def comment_create
		@project = ProjectIdea.find_by_id(params[:id])

		if current_creative
			@comment = @project.comments.new(creative_id: current_creative.id, comment_text: params[:text])
		else
			@comment = @project.comments.new(developer_id: current_developer.id, comment_text: params[:text])
		end

		@comment.save!
		Pusher.trigger("ProjectIdeas", "new_comment", {message: {project_id: @project.id, comment: @comment}})
		render :nothing => true
	end

	def like
		@project_idea = ProjectIdea.find_by_id(params[:id])
		@project_idea.liked_by(current_user)
		Pusher.trigger('ProjectIdeas', 'liked', {message: {project_id: @project_idea.id, votes_for: @project_idea.votes_for.count}})
		render :nothing => true
	end

	def unlike
		@project_idea = ProjectIdea.find_by_id(params[:id])
		@project_idea.unliked_by(current_user)
		Pusher.trigger('ProjectIdeas', 'unliked', {message: {project_id: @project_idea.id, votes_for: @project_idea.votes_for.count}})
		render :nothing => true
	end
end
