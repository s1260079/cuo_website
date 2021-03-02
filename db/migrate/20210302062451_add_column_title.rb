class AddColumnTitle < ActiveRecord::Migration[6.0]
  def change
    add_column :bands, :message, :text
  end
end
