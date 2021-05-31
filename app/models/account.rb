# == Schema Information
#
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
class Account < ApplicationRecord
  belongs_to :user

  def deposited(amount)
    self.amount += amount
  end

  def transfered(amount)
    balance = self.amount - amount
    # Check and see if it is posible to transfer
    raise ActiveRecord::RecordInvalid.new, { errors: { message: 'Insufficient funds' } } if balance.negative?

    self.amount = balance
  end
end
