class CreateProjectIdeas < ActiveRecord::Migration
  def change
    create_table :project_ideas do |t|
      t.string :name
      t.string :rating
      t.string :time
      t.references :creative, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end



