class ProjectideasController < ApplicationController
	
	def index
		@projects = ProjectIdea.get_with_likes(params[:page])

		@project_likes = @projects.map do | project |
			current_user.voted_up_on?(project) ? [project, project.votes_for.count, true] : [project, project.votes_for.count, false]
		end

		render json: {projects: @projects.to_a, 
					  page_count: ProjectIdea.page_count}
	end

	def comment_create
		@project = ProjectIdea.find_by_id(params[:id])

		if current_creative
			@comment = @project.comments.new(creative_id: current_creative.id, comment_text: params[:text])
		else
			@comment = @project.comments.new(developer_id: current_developer.id, comment_text: params[:text])
		end
		# @comment.save!

		# @project_comments_array = @project.comments.joins(:creative)

		# @json_array = @project_comments_array.map do | comment |
		# 	puts comment.developer
		# 	puts comment.creative
			
		# 	{comment: comment.comment_text, author: {name: author.name, image: "/assets/personplaceholder.jpg"}}
		# end

		# render json: @json_array.to_json
	end

	def like
		@project_idea = ProjectIdea.find_by_id(params[:id])
		@project_idea.liked_by(current_user)
		Pusher.trigger('ProjectIdeas', 'liked', {message: @project_idea.liked_count})
		render :nothing => true
	end

	def unlike
		@project_idea = ProjectIdea.find_by_id(params[:id])
		@project_idea.liked_by(current_user)
		Pusher.trigger('ProjectIdeas', 'unliked', {message: @project_idea.liked_count})
		render :nothing => true
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
