# frozen_string_literal: true

require 'rails_helper'
require 'swagger_helper'

RSpec.describe "Api::Vi::Registrations", type: :request do
  let(:invalid_user) do
    User.new first_name: 'Joe'
  end
  path '/users' do
    post 'Create a User' do
      tags 'User'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :user, in: :body, schema: {
        type: :object,
        properties: {
          first_name: { type: :string },
          last_name: { type: :string },
          password: { type: :string },
          email: { type: :string },
          phone_number: { type: :string },
          required: %w[first_name last_name password email phone_number]
        }
      }
      response '201', 'User created' do
        schema type: :object,
               properties: {
                 data: {
                   type: :object,
                   properties: {
                     id: { type: :string },
                     type: { type: :string },
                     attributes: {
                       type: :object,
                       properties: {
                         full_name: { type: :string },
                         email: { type: :string },
                         phone_number: { type: :string },
                         created_at: { type: :string, format: "date-time" },
                         updated_at: { type: :string, format: "date-time" }
                       }
                     }
                   }
                 }
               }
        let(:user) do
          { first_name: 'Joe', last_name: 'Doe',
            password: 'password', email: 'joe@gmail.com', 
            phone_number: "254701345123" }
        end
        run_test!
      end
      response '422', 'invalid request' do
        schema type: :object,
               properties: {
                 type: { type: :string },
                 errors: {
                   type: :array,
                   errors: {
                     type: :array,
                     ites: {
                       type: :object,
                       properties: {
                         type: :string
                       }
                     }
                   }
                 }
               }
        let(:user) { { first_name: 'senga' } }
        run_test!
      end
    end
  end
end
