class ChangeColumnName < ActiveRecord::Migration[5.1]
  def change
  	rename_column :games, :timer, :counter
  end
end
