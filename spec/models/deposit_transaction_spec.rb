# == Schema Information
#
# Table name: deposit_transactions
#
#  id                     :bigint           not null, primary key
#  amount                 :decimal(15, 2)
#  initiator_phone_number :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  account_id             :bigint           not null
#
# Indexes
#
#  index_deposit_transactions_on_account_id  (account_id)
#
# Foreign Keys
#
#  fk_rails_...  (account_id => accounts.id)
#
require 'rails_helper'

RSpec.describe DepositTransaction, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
