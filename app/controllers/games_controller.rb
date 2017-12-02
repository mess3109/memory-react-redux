class GamesController < ApplicationController

	def index
		@games = Game.all.order(:counter => :asc)
		render json: @games.to_json(:only => [:counter, :name, :created_at])
	end

	def create
		@game = Game.new(game_params)
		if @game.save
			render json: @game.to_json
		end
	end

	private

	def game_params
		params.require(:game).permit(:name, :counter)
	end

end