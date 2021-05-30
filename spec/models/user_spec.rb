# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  confirmation_sent_at   :datetime
#  confirmation_token     :string
#  confirmed_at           :datetime
#  current_sign_in_at     :datetime
#  current_sign_in_ip     :string
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  first_name             :string
#  last_name              :string
#  last_sign_in_at        :datetime
#  last_sign_in_ip        :string
#  phone_number           :string
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string
#  sign_in_count          :integer          default(0), not null
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#
require 'rails_helper'

RSpec.describe User, type: :model do
  before(:each) do
    @user = User.new email: 'doe@gmail.com',
                     password: 'password',
                     last_name: 'Senga',
                     first_name: 'Technologies',
                     phone_number: '254701146644'
  end

  it 'is invalid if the email is not present' do
    @user.email = nil
    expect(@user).to be_invalid
  end

  it 'is invalid if the password is not present' do
    @user.password = nil
    expect(@user).to be_invalid
  end

  it 'is invalid if the phone_number is not present' do
    @user.phone_number = nil
    expect(@user).to be_invalid
  end

  it 'is invalid if the first_name is not present' do
    @user.first_name = nil
    expect(@user).to be_invalid 
  end

  it 'is invalid if the last_name is not present' do
    @user.last_name = nil
    expect(@user).to be_invalid
  end

  it 'is invalid if the email does not conform to email format' do
    @user.email = 'joe'
    expect(@user).to be_invalid
  end

  it 'is invalid when the email is not unique' do
    user2 = @user.dup
    @user.save
    expect(user2).to be_invalid
  end

  it 'is invalid when the phone_number is not unique' do
    user3 = @user.dup
    user3.email = 'somethingDifferent@gmail.com'
    @user.save
    expect(user3).to be_valid
  end

  it 'is valid with valid attributes' do
    expect(@user).to be_valid
  end
end
