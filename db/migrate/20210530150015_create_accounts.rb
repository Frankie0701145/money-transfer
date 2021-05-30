class CreateAccounts < ActiveRecord::Migration[6.0]
  def change
    create_table :accounts do |t|
      t.decimal :amount, precision: 15, scale: 2
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
