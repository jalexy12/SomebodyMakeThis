class AddColumnsToComment < ActiveRecord::Migration
  def change
    add_reference :comments, :creative, index: true, foreign_key: true
    add_reference :comments, :developer, index: true, foreign_key: true
  end
end
