class CreateDepositTransactions < ActiveRecord::Migration[6.0]
  def change
    create_table :deposit_transactions do |t|
      t.decimal :amount, precision: 15, scale: 2
      t.integer :type
      t.string :initiator_phone_number
      t.timestamps
    end
  end
end
