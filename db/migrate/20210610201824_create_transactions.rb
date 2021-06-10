class CreateTransactions < ActiveRecord::Migration[6.0]
  def change
    create_table :transactions do |t|
      t.references :paymentable, polymorphic: true
      t.timestamps
    end
  end
end
