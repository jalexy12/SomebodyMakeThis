class ProjectIdea < ActiveRecord::Base
  include ActiveModel::Serialization
  belongs_to :creative
  has_many :comments
  acts_as_votable
 
  def self.page_count
  	(ProjectIdea.count / 20.0).ceil + 1 
  end

  def self.get_with_likes(page_number)
  	self.includes(:votes_for).page(page_number).per(10)
  end

  def self.get_serialized_with_likes_and_comments(user, page_number)
  	project_list = ProjectIdea
  						.includes(:votes_for)
  						.includes(:comments)
  						.page(page_number)
  						.per(10)

  	serialized_list = project_list.map do | project |
  	   {
  		  project: project,
  		  likes: project.votes_for.count,
  		  comments: project.comments.to_a,
  		  liked: user.voted_for?(project)
  		}.as_json
  	end
  end

end