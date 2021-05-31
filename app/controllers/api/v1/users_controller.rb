# frozen_string_literal: true

module Api
  module V1
    # This is the User Controller
    class UsersController < ApplicationController
      respond_to :json
      before_action :authenticate_user!

      def show
        user = current_user
        render json: UserSerializer.new(user).serialized_json, status: 200
      end
    end
  end
end