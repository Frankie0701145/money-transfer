# frozen_string_literal: true

module Api
  module ModuleName
    # The Registration Controller
    class RegistrationsController < Devise::RegistrationsController
      respond_to :json
      before_action :build_userable, only: [:create]

      def create
        build_resource(registration_params)
        if resource.save
          render json: UserSerializer.new(resource).serialized_json,
                 status: :created
        else
          render json: { type: 'error', errors: resource.errors.full_messages },
                 status: 422
        end
      end

      private

      def registration_params
        params.require(:registration)
              .permit(%i[password email phone_number first_name last_name])
      end
    end
  end
end
