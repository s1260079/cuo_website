class CreateBands < ActiveRecord::Migration[6.0]
  def change
    create_table :bands do |t|
      t.string :bandTitle
      t.text :bandContent

      t.timestamps
    end
  end
end
