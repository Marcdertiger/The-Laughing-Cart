Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    namespace :smile do
      post '/authorize', to: 'loyalty#authorize'
      post '/mini_game/status', to: 'mini_game#status'
      post '/mini_game/submit', to: 'mini_game#submit'
      post "admin/adjust_points", to: "admin#adjust_points"
      delete "admin/reset_mini_game", to: "admin#reset_mini_game"
    end
  end  
end