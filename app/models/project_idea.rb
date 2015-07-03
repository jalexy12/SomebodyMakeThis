class ProjectIdea < ActiveRecord::Base
  belongs_to :creative
  acts_as_votable
 
  def self.page_count
  	(ProjectIdea.count / 20.0).ceil + 1 
  end

  def update_likes(project)
  	current_user.voted_up_on?(@project_idea) ? @project_idea.unliked_by(current_user) : @project_idea.liked_by(current_user)
  end
end