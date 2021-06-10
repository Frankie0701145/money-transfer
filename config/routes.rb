# frozen_string_literal: true

# == Route Map
#
#                                Prefix Verb   URI Pattern                                                                              Controller#Action
#                                  root GET    /                                                                                        homepage#index
#                              rswag_ui        /api-docs                                                                                Rswag::Ui::Engine
#                             rswag_api        /api-docs                                                                                Rswag::Api::Engine
#                      new_user_session GET    /users/login(.:format)                                                                   api/v1/sessions#new {:format=>:json}
#                          user_session POST   /users/login(.:format)                                                                   api/v1/sessions#create {:format=>:json}
#                  destroy_user_session DELETE /users/logout(.:format)                                                                  api/v1/sessions#destroy {:format=>:json}
#                     new_user_password GET    /users/password/new(.:format)                                                            devise/passwords#new {:format=>:json}
#                    edit_user_password GET    /users/password/edit(.:format)                                                           devise/passwords#edit {:format=>:json}
#                         user_password PATCH  /users/password(.:format)                                                                devise/passwords#update {:format=>:json}
#                                       PUT    /users/password(.:format)                                                                devise/passwords#update {:format=>:json}
#                                       POST   /users/password(.:format)                                                                devise/passwords#create {:format=>:json}
#              cancel_user_registration GET    /users/cancel(.:format)                                                                  api/v1/registrations#cancel {:format=>:json}
#                 new_user_registration GET    /users/sign_up(.:format)                                                                 api/v1/registrations#new {:format=>:json}
#                edit_user_registration GET    /users/edit(.:format)                                                                    api/v1/registrations#edit {:format=>:json}
#                     user_registration PATCH  /users(.:format)                                                                         api/v1/registrations#update {:format=>:json}
#                                       PUT    /users(.:format)                                                                         api/v1/registrations#update {:format=>:json}
#                                       DELETE /users(.:format)                                                                         api/v1/registrations#destroy {:format=>:json}
#                                       POST   /users(.:format)                                                                         api/v1/registrations#create {:format=>:json}
#               api_v1_accounts_deposit PATCH  /api/v1/accounts/deposit(.:format)                                                       api/v1/accounts#deposit {:format=>:json}
#              api_v1_accounts_transfer PATCH  /api/v1/accounts/transfer(.:format)                                                      api/v1/accounts#transfer {:format=>:json}
#                          api_v1_users GET    /api/v1/users(.:format)                                                                  api/v1/users#show {:format=>:json}
#                                       GET    /*all(.:format)                                                                          homepage#index
#         rails_postmark_inbound_emails POST   /rails/action_mailbox/postmark/inbound_emails(.:format)                                  action_mailbox/ingresses/postmark/inbound_emails#create
#            rails_relay_inbound_emails POST   /rails/action_mailbox/relay/inbound_emails(.:format)                                     action_mailbox/ingresses/relay/inbound_emails#create
#         rails_sendgrid_inbound_emails POST   /rails/action_mailbox/sendgrid/inbound_emails(.:format)                                  action_mailbox/ingresses/sendgrid/inbound_emails#create
#   rails_mandrill_inbound_health_check GET    /rails/action_mailbox/mandrill/inbound_emails(.:format)                                  action_mailbox/ingresses/mandrill/inbound_emails#health_check
#         rails_mandrill_inbound_emails POST   /rails/action_mailbox/mandrill/inbound_emails(.:format)                                  action_mailbox/ingresses/mandrill/inbound_emails#create
#          rails_mailgun_inbound_emails POST   /rails/action_mailbox/mailgun/inbound_emails/mime(.:format)                              action_mailbox/ingresses/mailgun/inbound_emails#create
#        rails_conductor_inbound_emails GET    /rails/conductor/action_mailbox/inbound_emails(.:format)                                 rails/conductor/action_mailbox/inbound_emails#index
#                                       POST   /rails/conductor/action_mailbox/inbound_emails(.:format)                                 rails/conductor/action_mailbox/inbound_emails#create
#     new_rails_conductor_inbound_email GET    /rails/conductor/action_mailbox/inbound_emails/new(.:format)                             rails/conductor/action_mailbox/inbound_emails#new
#    edit_rails_conductor_inbound_email GET    /rails/conductor/action_mailbox/inbound_emails/:id/edit(.:format)                        rails/conductor/action_mailbox/inbound_emails#edit
#         rails_conductor_inbound_email GET    /rails/conductor/action_mailbox/inbound_emails/:id(.:format)                             rails/conductor/action_mailbox/inbound_emails#show
#                                       PATCH  /rails/conductor/action_mailbox/inbound_emails/:id(.:format)                             rails/conductor/action_mailbox/inbound_emails#update
#                                       PUT    /rails/conductor/action_mailbox/inbound_emails/:id(.:format)                             rails/conductor/action_mailbox/inbound_emails#update
#                                       DELETE /rails/conductor/action_mailbox/inbound_emails/:id(.:format)                             rails/conductor/action_mailbox/inbound_emails#destroy
# rails_conductor_inbound_email_reroute POST   /rails/conductor/action_mailbox/:inbound_email_id/reroute(.:format)                      rails/conductor/action_mailbox/reroutes#create
#                    rails_service_blob GET    /rails/active_storage/blobs/:signed_id/*filename(.:format)                               active_storage/blobs#show
#             rails_blob_representation GET    /rails/active_storage/representations/:signed_blob_id/:variation_key/*filename(.:format) active_storage/representations#show
#                    rails_disk_service GET    /rails/active_storage/disk/:encoded_key/*filename(.:format)                              active_storage/disk#show
#             update_rails_disk_service PUT    /rails/active_storage/disk/:encoded_token(.:format)                                      active_storage/disk#update
#                  rails_direct_uploads POST   /rails/active_storage/direct_uploads(.:format)                                           active_storage/direct_uploads#create
#
# Routes for Rswag::Ui::Engine:
#
#
# Routes for Rswag::Api::Engine:

Rails.application.routes.draw do
  root 'homepage#index'

  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'
  devise_for :users, defaults: { format: :json },
                     path_names: {
                       sign_in: 'login',
                       sign_out: 'logout'
                     },
                     controllers: {
                       registrations: 'api/v1/registrations',
                       sessions: 'api/v1/sessions'
                     }
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      # Accounts
      patch '/accounts/mpesa_deposit', to: 'accounts#mpesa_deposit'
      patch '/accounts/account_transfer', to: 'accounts#account_transfer'

      # Users
      get '/users', to: 'users#show'
    end
  end

  get '*all', to: 'homepage#index', constraints: lambda { |req|
    req.path.exclude? 'rails/active_storage'
  }
end
