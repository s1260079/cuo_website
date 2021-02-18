class Api::UsersController < ApplicationController
    protect_from_forgery :except => [:create,:update]
    rescue_from Exception, with: :render_status_500
    rescue_from ActiveRecord::RecordNotFound, with: :render_status_404
    def index
      @users = User.all
      render "index", formats: :json, handlers: "jbuilder"
    end
    def show
      @user = User.find(params[:id])
      render "show", formats: :json, handlers: "jbuilder"
    end
    def create
      @user = User.new(user_params)
      if @user.save
        head :no_content
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end
    def update
      @user = User.find(params[:id])
      if @user.update(user_params)
        render "index", formats: :json, handlers: "jbuilder"
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end
    def destroy
      @user = User.find(params[:id])
      if @user.destroy
        head :no_content
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end

    private

    def user_params
      params.fetch(:user, {}).permit(
        :username, :email, :password, :part, :likeBand, :message
      )
    end
    def render_status_404(exception)
      render json: { errors: [exception] }, status: 404
    end

    def render_status_500(exception)
      render json: { errors: [exception] }, status: 500
    end

end
