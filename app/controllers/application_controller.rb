# frozen_string_literal: true

# The main controller.
class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token, if: :json_request?

  def json_request?
    request.format.json?
  end
end
