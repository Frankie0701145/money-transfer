# frozen_string_literal: true

# == Schema Information
#
# Table name: transfer_transactions
#
#  id                    :bigint           not null, primary key
#  amount                :decimal(15, 2)
#  receiver_phone_number :string
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#
class TransferTransactionSerializer
  include FastJsonapi::ObjectSerializer
  attributes :amount, :receiver_phone_number,
             :created_at, :updated_at
end
