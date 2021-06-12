class AddIndexToCreatedAt < ActiveRecord::Migration[6.0]
  def change
    add_index :m_transactions, :created_at
  end
end
