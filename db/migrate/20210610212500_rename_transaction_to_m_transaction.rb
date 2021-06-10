class RenameTransactionToMTransaction < ActiveRecord::Migration[6.0]
  def change
    rename_table :transactions, :m_transactions
  end
end
