class CreateDepositTransactions < ActiveRecord::Migration[6.0]
  def change
    create_table :deposit_transactions do |t|
      t.decimal :amount, precision: 15, scale: 2
      t.references :account, null: false, foreign_key: true
      t.string :initiator_phone_number
      t.timestamps
    end
  end
end
