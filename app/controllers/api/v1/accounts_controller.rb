# frozen_string_literal: true

module Api
  module V1
    # Account Controller that is responsible for deposit to account and transfer from an account.
    class AccountsController < ApplicationController
      before_action :authenticate_user!

      def mpesa_deposit
        account = Account.create_with(amount: 0, user_id: current_user.id)
                         .find_or_create_by(user_id: current_user.id)
        account.deposit deposit_params[:amount].to_f
        # create the deposit transaction
        deposit_transaction = DepositTransaction.new amount: deposit_params[:amount].to_f, deposit_type: 0,
                                                     initiator_phone_number: deposit_params[:phone_number]
        # create the transaction
        account.m_transactions.build transactable: deposit_transaction
        if account.save
          render json: AccountSerializer.new(account).serialized_json, status: :ok
        else
          render json: { type: 'error', errors: account.errors.full_messages }, status: 422
        end
      end

      def account_transfer
        # find the account of the (sender) login in user or create one if it is not there.
        # this is the account of the sender
        sender_account = Account.create_with(amount: 0, user_id: current_user.id)
                                .find_or_create_by(user_id: current_user.id)
        # find the account of the receiver
        receiver_account = User.includes(:account).find_by(phone_number: transfer_params[:receiver_phone_number])
                               .account

        # transfer amount and will raise an error if the amount in the sender account is insuffiecient
        receiver_account = sender_account.transfer transfer_params[:amount], receiver_account

        # create the transfer transaction for the sender account
        transfer_transaction = TransferTransaction.new receiver_phone_number: transfer_params[:receiver_phone_number],
                                                       amount: transfer_params[:amount].to_f
        sender_account.m_transactions.build transactable: transfer_transaction

        # create the deposit transaction for the receiver account
        deposit_transaction = DepositTransaction.new amount: transfer_params[:amount].to_f, deposit_type: 1,
                                                     initiator_phone_number: current_user[:phone_number]
        receiver_account.m_transactions.build transactable: deposit_transaction

        if sender_account.valid? && receiver_account.valid?
          sender_account.save!
          receiver_account.save!
          render json: AccountSerializer.new(sender_account).serialized_json, status: :ok
        else
          render json: { type: 'error', errors: sender_account.errors.full_messages }, status: 422
        end
      rescue ActiveRecord::RecordInvalid => e
        # return the error if the account has insufficien ammount
        p e
        render json: { type: 'error', error: e.message.to_s }, status: 422
      end

      private

      def deposit_params
        params.require(:accounts)
              .permit(%i[amount phone_number])
      end

      def transfer_params
        params.require(:accounts)
              .permit(%i[amount receiver_phone_number])
      end
    end
  end
end
