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
      nil
    end
  end
  