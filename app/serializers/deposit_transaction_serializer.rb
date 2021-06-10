# frozen_string_literal: true

# == Schema Information
#
# Table name: deposit_transactions
#
#  id                     :bigint           not null, primary key
#  amount                 :decimal(15, 2)
#  deposit_type           :integer
#  initiator_phone_number :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
class DepositTransactionSerializer
  include FastJsonapi::ObjectSerializer
  attributes :amount, :deposit_type,
             :initiator_phone_number
end
