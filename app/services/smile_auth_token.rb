require "jwt"

class SmileAuthToken
  # Here we should cache the token for the TTL and only re-generate it once it expires
  def self.generate(customer_id)
    payload = {
      customer_identity: {
        distinct_id: customer_id.to_s
      },
      exp: Time.now.to_i + 300 # 5-minute expiry
    }
    JWT.encode(payload, ENV['SMILE_API_PRIVATE_KEY'], 'HS256')
  end
end
