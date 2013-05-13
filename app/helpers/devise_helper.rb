module DeviseHelper
  def devise_error_messages!

    if resource.errors.full_messages
      flash[:alert]=resource.errors.full_messages[0]
    end

    ""
  end
end
