class AddColumnTitles < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :studentId, :string
    add_column :bands, :password, :string
  end
end
