class PlayersController < ApplicationController
  before_action :set_player, only: [:show, :edit, :update, :destroy]

  # GET /players
  # GET /players.json
  def index
    @players = Player.highest
    @playa = params[:playa]
    @notice = params[:notice]
  end

  # GET /players/1
  # GET /players/1.json
  def show
  end

  # GET /players/new
  def new
    @player = Player.new
  end

  # GET /players/1/edit
  def edit
  end

  # POST /players
  # POST /players.json
  def create
    @player = Player.new(player_params)
    sum = Player.all.map { |n| n.score }.reduce(:+)
    all = Player.all.count

    avr = sum/all

    score = nil
    respond_to do |format|
      if @player.save
        if @player.score >= avr*1.5
          score = 'WoW! Doge Slayer'
        elsif @player.score >= avr
          score = 'You did preety good..'
        elsif @player.score >= avr*0.5
          score = 'Why are you so mediocre?'
        else
          score = 'Plz noob, uninsTalLL'
        end
        format.html { redirect_to action: :index, notice: score, playa: @player.id }
      else
        format.html { redirect_to new_player_path }
      end
    end
  end

  # PATCH/PUT /players/1
  # PATCH/PUT /players/1.json
  def update
    respond_to do |format|
      if @player.update(player_params)
        format.html { redirect_to @player, notice: 'Player was successfully updated.' }
        format.json { render :show, status: :ok, location: @player }
      else
        format.html { render :edit }
        format.json { render json: @player.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /players/1
  # DELETE /players/1.json
  def destroy
    @player.destroy
    respond_to do |format|
      format.html { redirect_to players_url, notice: 'Player was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_player
      @player = Player.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def player_params
      params.require(:player).permit(:name, :score)
    end
end
