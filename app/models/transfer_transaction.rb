# == Schema Information
#
# Table name: transfer_transactions
#
#  id                   :bigint           not null, primary key
#  account_phone_number :string
#  amount               :decimal(15, 2)
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#
class TransferTransaction < ApplicationRecord
end
