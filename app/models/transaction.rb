# == Schema Information
#
# Table name: transactions
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
#  index_transactions_on_account_id                             (account_id)
#  index_transactions_on_transactable_type_and_transactable_id  (transactable_type,transactable_id)
#
class Transaction < ApplicationRecord
  belongs_to :account
end
