# frozen_string_literal: true

require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module MoneyTransfer
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.0
    # remove the generation of view_specs and helper_specs when generating a controller
    config.generators do |g|
      g.view_specs false
      g.stylesheets = false
      config.generators.javascripts = false
      g.helper_specs false
    end

    if Rails.env.test?
      RSpec.configure do |config|
        config.swagger_dry_run = false
      end
    end
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.
  end
end
