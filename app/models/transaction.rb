# == Schema Information
#
# Table name: transactions
#
#  id                :bigint           not null, primary key
#  transactable_type :string
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  transactable_id   :bigint
#
# Indexes
#
#  index_transactions_on_transactable_type_and_transactable_id  (transactable_type,transactable_id)
#
class Transaction < ApplicationRecord
end
