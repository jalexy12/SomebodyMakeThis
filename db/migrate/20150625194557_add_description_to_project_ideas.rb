class AddDescriptionToProjectIdeas < ActiveRecord::Migration
  def change
    add_column :project_ideas, :description, :text
  end
end
