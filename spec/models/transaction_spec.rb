# == Schema Information
#
# Table name: transactions
#
#  id               :bigint           not null, primary key
#  paymentable_type :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  paymentable_id   :bigint
#
# Indexes
#
#  index_transactions_on_paymentable_type_and_paymentable_id  (paymentable_type,paymentable_id)
#
require 'rails_helper'

RSpec.describe Transaction, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
