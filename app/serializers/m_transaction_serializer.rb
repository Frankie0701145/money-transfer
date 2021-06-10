# frozen_string_literal: true

# == Schema Information
#
# Table name: m_transactions
#
#  id                :bigint           not null, primary key
#  transactable_type :string
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  account_id        :bigint
#  transactable_id   :bigint
#
# Indexes
#
#  index_m_transactions_on_account_id                             (account_id)
#  index_m_transactions_on_transactable_type_and_transactable_id  (transactable_type,transactable_id)
#
class MTransactionSerializer
  include FastJsonapi::ObjectSerializer
  attributes :transactable_type, :transactable_id, :created_at,
             :updated_at

  attribute :transactable do |object|
    case object.transactable_type
    when 'DepositTransaction'
      DepositTransactionSerializer.new object.transactable
    when 'TransferTransaction'
      TransferTransactionSerializer.new object.transactable
    end
  end

  belongs_to :transactable, polymorphic: true
end
