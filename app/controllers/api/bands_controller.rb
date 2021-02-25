class Api::BandsController < ApplicationController
  protect_from_forgery :except => [:create,:update]
    rescue_from Exception, with: :render_status_500
    rescue_from ActiveRecord::RecordNotFound, with: :render_status_404
    def index
      @bands = Band.all
      render "index", formats: :json, handlers: "jbuilder"
    end
    def show
      @band = Band.find(params[:id])
      render "show", formats: :json, handlers: "jbuilder"
    end
    def create
      @band = Band.new(band_params)
      if @band.save
        head :no_content
      else
        render json: @band.errors, status: :unprocessable_entity
      end
    end
    def update
      @band = Band.find(params[:id])
      if @band.update(band_params)
        render "index", formats: :json, handlers: "jbuilder"
      else
        render json: @band.errors, status: :unprocessable_entity
      end
    end
    def destroy
      @band = Band.find(params[:id])
      if @band.destroy
        head :no_content
      else
        render json: @band.errors, status: :unprocessable_entity
      end
    end

    private

    def band_params
      params.fetch(:band, {}).permit(
        :bandTitle, :bandContent
      )
    end
    def render_status_404(exception)
      render json: { errors: [exception] }, status: 404
    end

    def render_status_500(exception)
      render json: { errors: [exception] }, status: 500
    end
end
