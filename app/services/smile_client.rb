class SmileClient
    BASE_URL = 'https://api.smile.io/v1/'
  
    def initialize
      @conn = Faraday.new(url: BASE_URL) do |faraday|
        faraday.headers['Authorization'] = "Bearer #{ENV['LAUGHING_CART_API_KEY']}"
        faraday.headers['Content-Type'] = 'application/json'
        faraday.adapter Faraday.default_adapter
      end
    end
  
    def fetch_customer_by_email(email)
      response = @conn.get("customers?email=#{email}&limit=1")
      JSON.parse(response.body) if response.success?
    rescue Faraday::Error => e
      Rails.logger.error("SmileClient fetch failed: #{e.message}")
    end

    def adjust_points(customer_id, points_change, description, internal_note="System Generated")
      response = @conn.post("/v1/points_transactions") do |req|
        req.body = {
          points_transaction: {
            customer_id:,
            points_change:,
            description:,
            internal_note:
          }
        }.to_json
      end
      
      JSON.parse(response.body) if response.success?
    rescue Faraday::Error => e
      Rails.logger.error("SmileClient point issuing has failed: #{e.message}")
    end

    def award_custom_activity_to_customer(activity_id, customer_id)
      response = @conn.post("/v1/activities") do |req|
        req.body = {
          activity: {
            customer_id:,
            token: activity_id
          }
        }.to_json
      end
      
      JSON.parse(response.body) if response.success?
    rescue Faraday::Error => e
      Rails.logger.error("Creating the activity has failed: #{e.message}")
    end
  end
  