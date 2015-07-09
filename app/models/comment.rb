class Comment < ActiveRecord::Base
	belongs_to :projectidea
	belongs_to :creative
	belongs_to :developer
	after_create :show_comment

	def show_comment
		puts "\n\n\n\n\n", self
	end


	def with_author
		
	end
end


