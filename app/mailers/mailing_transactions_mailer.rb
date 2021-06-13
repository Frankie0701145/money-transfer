class MailingTransactionsMailer < ApplicationMailer
    default from: Rails.application.credentials.sender_identity

    def daily m_transactions, user
        @m_transactions = m_transactions
        @full_name = "#{user.first_name} #{user.last_name}"
        mail(:to => "coulsorfrancois@gmail.com", subject: "Daily Transactions.")
    end
end
