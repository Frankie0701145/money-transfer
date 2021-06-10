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
require 'rails_helper'

RSpec.describe Transaction, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
