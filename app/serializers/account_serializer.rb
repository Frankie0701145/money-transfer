# == Schema Information
#
# frozen_string_literal: true

# Table name: accounts
#
#  id         :bigint           not null, primary key
#  amount     :decimal(15, 2)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_accounts_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class AccountSerializer
  include FastJsonapi::ObjectSerializer
  attributes :amount, :user_id, :created_at,
             :updated_at

  attribute :transaction do |object|
    MTransactionSerializer.new object.m_transactions
  end
  has_many :m_transactions
end
