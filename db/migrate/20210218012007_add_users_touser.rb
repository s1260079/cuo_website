class AddUsersTouser < ActiveRecord::Migration[6.0]
  def change
    remove_column :users, :part, :text
    remove_column :users, :message, :text
    add_column :users, :part, :text
    add_column :users, :message, :text
  end
end
