namespace :mailing do
    desc "This task is called by the Cron To Go"
    task :daily_transactions => :environment do
        User.includes( { account: [ m_transactions: :transactable ] } ).find_each do |user|
            m_transactions = user.account.m_transactions
                                 .where(created_at: Time.zone.now.beginning_of_day..Time.zone.now.end_of_day)
            if(m_transactions.size >= 1)
                puts "There is m_transactions"
                p m_transactions[0].transactable
                MailingTransactionsMailer.daily m_transactions, user
            end
        end

    end
end
