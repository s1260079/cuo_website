class AddUsersTousers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :likeBand, :text  ,null: false
  end
end
