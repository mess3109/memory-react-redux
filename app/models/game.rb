class Game < ApplicationRecord
	validates :name, :counter, presence: true
end