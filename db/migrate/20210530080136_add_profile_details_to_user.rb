# frozen_string_literal: true

# Migration for create the User table
class AddProfileDetailsToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
    add_column :users, :phone_number, :string
  end
end
