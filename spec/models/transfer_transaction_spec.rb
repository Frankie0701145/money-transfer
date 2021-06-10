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
require 'rails_helper'

RSpec.describe TransferTransaction, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
