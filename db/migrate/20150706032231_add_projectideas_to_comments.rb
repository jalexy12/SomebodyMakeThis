class AddProjectideasToComments < ActiveRecord::Migration
  def change
    add_reference :comments, :project_idea, index: true, foreign_key: true
  end
end
