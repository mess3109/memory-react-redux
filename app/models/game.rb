class Game < ApplicationRecord
	validates :name, :timer, presence: true
end