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
#  index_m_transactions_on_created_at                             (created_at)
#  index_m_transactions_on_transactable_type_and_transactable_id  (transactable_type,transactable_id)
#
class MTransaction < ApplicationRecord
  belongs_to :account
  belongs_to :transactable, polymorphic: true
  def self.today
    where(created_at: Time.zone.now.beginning_of_day..Time.zone.now.end_of_day)
  end
end
