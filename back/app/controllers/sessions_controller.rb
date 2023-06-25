class SessionsController < ApplicationController
  skip_before_action :authenticate, only: :create
  before_action :set_session, only: %i[ show destroy ]

  # Renvoie la liste des sessions de l'utilisateur actuel
  def index
    render json: Current.user.sessions.order(created_at: :desc)
  end

  # Recupere les données de l'utilisateur actuel
  def show
    user = Current.user
      render json: { email: user.email, username: user.username, user_id: user.id, session_id: @session.id }
  end
  
  
  # Crée une nouvelle session pour l'utilisateur
  def create
    user = User.find_by(email: params[:email])

    if user && user.authenticate(params[:password])
      active_session = user.sessions.find_by("expires_at > ?", Time.now)

      if active_session
        render json: { error: "User already has an active session" }, status: :unprocessable_entity
      else
        @session = user.sessions.create!(expires_at: 3.hours.from_now)
        token = response.set_header "token", @session.signed_id

        render json: {token: token, session_id: @session.id }, status: :created
      end
    else
      render json: { error: "That email or password is incorrect" }, status: :unauthorized
    end
  end
  
  # Détruit une session existante
  def destroy
    @session.destroy
    render json: { message: "Session successfully destroyed" }
  end
  
  private
    # Récupère la session de l'utilisateur actuel
    def set_session
      @session = Current.user.sessions.find(params[:id])
    end
end
