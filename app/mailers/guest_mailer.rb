class GuestMailer < ActionMailer::Base
  default from: "app@deckgeek.com" #app18557776@heroku.com"

  def new_guest(user,ip)
    @user = user
    @ip = ip
    mail(to: "johndoerfler@gmail.com", subject: 'New Guest User')
  end

end
