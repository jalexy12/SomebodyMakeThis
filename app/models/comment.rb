class Comment < ActiveRecord::Base
	belongs_to :projectidea
	belongs_to :creative
	belongs_to :developer
end


