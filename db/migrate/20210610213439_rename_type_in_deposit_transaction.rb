class RenameTypeInDepositTransaction < ActiveRecord::Migration[6.0]
  def change
    rename_column :deposit_transactions, :type, :deposit_type
    #Ex:- rename_column("admin_users", "pasword","hashed_pasword")
  end
end
