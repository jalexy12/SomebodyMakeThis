class Comment < ActiveRecord::Base
	belongs_to :projectidea
	belongs_to :creative
	belongs_to :developer

	def with_author
		
	end
end


