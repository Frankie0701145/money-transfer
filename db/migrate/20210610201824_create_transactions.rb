class CreateTransactions < ActiveRecord::Migration[6.0]
  def change
    create_table :transactions do |t|
      t.references :transactable, polymorphic: true
      t.references :account
      t.timestamps
    end
  end
end
