class BooksController < ApplicationController

    def index
        user_id = Current.user.id
        book_ids = BookUserRelations.where(user_id: user_id).pluck(:book_id)
      

        render json: book_ids
      end

      def create
        book_id = request[:book_id]
        user_id = Current.user.id 
    
        if BookUserRelations.exists?(user_id: user_id, book_id: book_id)
          render json: { error: "Ce livre est déjà stoqué" }, status: :unprocessable_entity
        else
          BookUserRelations.create(user_id: user_id, book_id: book_id)
          render json: { message: "Livre stoqué avec succès" }
        end
      end

      def destroy
        user_id = Current.user.id 
        book_id = params[:id] 
    
        relation = BookUserRelations.find_by(user_id: user_id, book_id: book_id)
        if relation
          relation.destroy
          render json: { message: "Livre supprimé avec succès" }
        else
          render json: { error: "Livre non trouvé" }, status: :unprocessable_entity
        end
      end
end
