class RenameAccountPhoneNumberToReceiverPhoneNumberInTransferTransaction < ActiveRecord::Migration[6.0]
  def change
    rename_column :transfer_transactions, :account_phone_number, :receiver_phone_number
    #Ex:- rename_column("admin_users", "pasword","hashed_pasword")
  end
end
