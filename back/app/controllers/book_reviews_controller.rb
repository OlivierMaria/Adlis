class BookReviewsController < ApplicationController
    skip_before_action :authenticate, only: :index

      def index
        book_id = params[:book_id]
        book_reviews = BookReview.where(book_id: book_id).pluck(:user_username, :review )
      
        render json: book_reviews
      end

      # def show
      #   book_id = params[:book_id]
      #   user_book_reviews = BookReview.where(user_id: user_id).pluck(:book_id, :review )
      
      #   render json: user_book_reviews
      # end

      def create
        book_id = params[:book_id]
        user_id = Current.user.id
        user_username = Current.user.username
        book_review = params[:review]
      
        review = BookReview.create(user_id: user_id, book_id: book_id, user_username: user_username, review: book_review)
    
      
        render json: { message: "Critique stockée avec succès", review_id: review_id }
      end
      
      def destroy
        review_id = params[:id]
        relation = BookReview.find_by(id: review_id)
      
        if relation
          relation.destroy
          render json: { message: "Critique supprimée avec succès" }
        else
          render json: { error: "Critique non trouvée" }, status: :unprocessable_entity
        end
      end
      
end
