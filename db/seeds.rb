# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).

users=User.create(
  [{ email: 'johndoerfler@gmail.com', password:'111111', password_confirmation:'111111', remember_me:true},
   { email: '1@1.com', password:'111111', password_confirmation:'111111', remember_me:true},
   { email: '2@2.com', password:'111111', password_confirmation:'111111', remember_me:true},
   { email: '3@3.com', password:'111111', password_confirmation:'111111', remember_me:true},
  ])

games=Game.create(
  [{ name: 'Game 1:1', description:'desc 1:1', user_id:users[0].id},
   { name: 'Game 2:1', description:'desc 2:1', user_id:users[0].id},
   { name: 'Game 3:1', description:'desc 3:1', user_id:users[0].id},
   { name: 'Game 1:2', description:'desc 1:2', user_id:users[1].id},
   { name: 'Game 2:2', description:'desc 2:2', user_id:users[1].id},
   { name: 'Game 3:2', description:'desc 3:2', user_id:users[1].id}
  ])
