# frozen_string_literal: true

# == Schema Information
#
# Table name: deposit_transactions
#
#  id                     :bigint           not null, primary key
#  amount                 :decimal(15, 2)
#  initiator_phone_number :string
#  type                   :integer
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
class DepositTransaction < ApplicationRecord
  DEPOSIT_TYPE = %i[mpesa account].freeze
  enum type: DEPOSIT_TYPE
  has_one :transaction, as: :transactable
end
