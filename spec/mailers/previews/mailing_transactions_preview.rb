# Preview all emails at http://localhost:3000/rails/mailers/mailing_transactions
class MailingTransactionsPreview < ActionMailer::Preview
    def daily
        user = User.includes( { account: [ m_transactions: :transactable ] } ).first
        m_transactions = user.account.m_transactions
                             .where(created_at: Time.zone.now.beginning_of_day..Time.zone.now.end_of_day)
        p m_transactions
        MailingTransactionsMailer.daily m_transactions, user
    end
end
