class CreateTransferTransactions < ActiveRecord::Migration[6.0]
  def change
    create_table :transfer_transactions do |t|
      t.decimal :amount, precision: 15, scale: 2
      t.string :account_phone_number
      t.timestamps
    end
  end
end
