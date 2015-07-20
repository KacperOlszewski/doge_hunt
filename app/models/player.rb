class Player < ActiveRecord::Base
	
	validates :name, presence: true, length: {minimum: 4}

	scope :highest, -> {order("score DESC").first(25)}

end
