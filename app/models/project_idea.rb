class ProjectIdea < ActiveRecord::Base
  belongs_to :creative
  has_many :comments
  acts_as_votable
 
  def self.page_count
  	(ProjectIdea.count / 20.0).ceil + 1 
  end

end