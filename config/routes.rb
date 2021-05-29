# frozen_string_literal: true

Rails.application.routes.draw do
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

  root 'homepage#index'
end
