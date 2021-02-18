class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :studentId ,null: false
      t.string :username ,null: false
      t.string :email, null: false
      t.string :password, null: false
      t.text :part, null: false
      t.text :message ,null: false

      t.timestamps
    end
  end
end
