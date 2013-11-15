class GuestMailer < ActionMailer::Base
  default from: "app@deckgeek.com"

  def new_guest(user)
    @user = user
    mail(to: "johndoerfler@gmail.com", subject: 'New Guest User')
  end

end
