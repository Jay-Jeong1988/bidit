ActionMailer::Base.smtp_settings = {
    address: 'smtp.gmail.com',
    port: 587,
    domain: 'gmail.com',
    user_name: ENV['EMAIL_USERNAME'],
    password: ENV['EMAIL_PASSWORD'],
    authentication: 'plain',
    enable_starttls_auto: true
}

# http://guides.rubyonrails.org/action_mailer_basics.html#action-mailer-configuration-for-gmail