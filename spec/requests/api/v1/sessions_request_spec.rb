# frozen_string_literal: true

require 'rails_helper'
require 'swagger_helper'

RSpec.describe "Api::V1::Sessions", type: :request do
  fixtures :all
  path '/users/login' do
    post 'Create sessions' do
      tags 'Session'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :credentials, in: :body, schema: {
        type: :object,
        properties: {
          user: {
            type: :object,
            properties: {
              email: { type: :string },
              password: { type: :string }
            }
          }
        },
        required: %w[email password]
      }
      response '200', 'Session Created' do
        schema type: :object,
               properties: {
                   data: {
                     type: :object,
                     properties:{
                      id: { type: :string },
                      attributes: {
                        type: :object,
                        properties: {
                          type: { type: :string },
                          full_name: { type: :string },
                          email: { type: :string },
                          phone_number: { type: :string },
                          created_at: { type: :string, format: 'date-time' },
                          updated_at: { type: :string, format: 'date-time' }
                        }
                      }
                     }
                   }
               }
        let(:credentials) do
          {
            user: {
              email: 'joe@gmail.com',
              password: 'password'
            }
          }
        end
        run_test!
      end

      response 401, 'Invalid Email or password.' do
        schema type: :object,
               properties: {
                 error: { type: :string }
               }
        let(:credentials) do
          {
            user: {
              email: 'joe@gmail.com',
              password: 'wrongpassword'
            }
          }
        end
        run_test!
      end
    end
  end
end
