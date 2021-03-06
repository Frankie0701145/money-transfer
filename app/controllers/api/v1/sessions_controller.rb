# frozen_string_literal: true

module Api
  module V1
    # SessionsController for login and logout
    class SessionsController < Devise::SessionsController
      respond_to :json

      private

      def respond_with(resource, _opt = {})
        render json: UserSerializer.new(resource).serialized_json, status: 200
      end

      def respond_to_on_destroy
        head :ok
      end
    end
  end
end
