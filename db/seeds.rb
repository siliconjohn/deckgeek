# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).

users=User.create(
  [{ email: 'johndoerfler@gmail.com', password:'111111', password_confirmation:'111111', remember_me:true},
   { email: '1@1.com', password:'111111', password_confirmation:'111111', remember_me:true},
   { email: '2@2.com', password:'111111', password_confirmation:'111111', remember_me:true},
   { email: '3@3.com', password:'111111', password_confirmation:'111111', remember_me:true},
  ])

games=Game.create(
  [{ name: 'Game 1:1', description:'My awesome game descriptions. Kiss my ass if you do not like it.', user_id:users[0].id},
   { name: 'Game 2:1 long long long long game name', description:'desc 2:1', user_id:users[0].id},
   { name: 'Game 3:1', description:'desc 3:1', user_id:users[0].id},
   { name: 'Game 4:1', description:'desc 1:1', user_id:users[0].id},
   { name: 'Game 5:1', description:'desc 2:1', user_id:users[0].id},
   { name: 'Game 6:1', description:'desc 3:1', user_id:users[0].id},
   { name: 'Game 7:1', description:'desc 1:1', user_id:users[0].id},
   { name: 'Game 8:1', description:'desc 2:1', user_id:users[0].id},
   { name: 'Game 1:2', description:'desc 1:2', user_id:users[1].id},
   { name: 'Game 2:2', description:'desc 2:2', user_id:users[1].id},
   { name: 'Game 3:2', description:'desc 3:2', user_id:users[1].id}
  ])

decks=Deck.create(
  [{ name: 'Deck 1:1', description:'Deck description 1:1', game_id:games[0].id},
   { name: 'Deck 1:2', description:'Deck description 1:2', game_id:games[0].id},
   { name: 'Deck 1:3', description:'Deck description 1:3', game_id:games[0].id},
   { name: 'Deck 2:1', description:'Deck description 2:1', game_id:games[1].id},
   { name: 'Deck 2:2', description:'Deck description 2:2', game_id:games[1].id},
   { name: 'Deck 2:3', description:'Deck description 2:3', game_id:games[1].id},
   { name: 'Deck 3:1', description:'Deck description 3:1', game_id:games[2].id},
   { name: 'Deck 3:2', description:'Deck description 3:2', game_id:games[2].id},
   { name: 'Deck 3:3', description:'Deck description 3:3', game_id:games[2].id}
  ])

cards=Card.create(
  [{ name: 'Card 1:1', description:'Card description 1:1', deck_id:games[0].id},
   { name: 'Card 1:2', description:'Card description 1:2', deck_id:games[0].id},
   { name: 'Card 1:3', description:'Card description 1:3', deck_id:games[0].id},
   { name: 'Card 1:4', description:'Card description 1:4', deck_id:games[0].id},
   { name: 'Card 1:5', description:'Card description 1:5', deck_id:games[0].id},
   { name: 'Card 1:6', description:'Card description 1:6', deck_id:games[0].id},
   { name: 'Card 1:7', description:'Card description 1:7', deck_id:games[0].id},
   { name: 'Card 1:8', description:'Card description 1:8', deck_id:games[0].id},
   { name: 'Card 1:9', description:'Card description 1:9', deck_id:games[0].id},
   { name: 'Card 2:1', description:'Card description 2:1', deck_id:games[1].id},
   { name: 'Card 2:2', description:'Card description 2:2', deck_id:games[1].id},
   { name: 'Card 2:3', description:'Card description 2:3', deck_id:games[1].id},
   { name: 'Card 2:4', description:'Card description 2:4', deck_id:games[1].id},
   { name: 'Card 2:5', description:'Card description 2:5', deck_id:games[1].id},
   { name: 'Card 2:6', description:'Card description 2:6', deck_id:games[1].id},
   { name: 'Card 2:7', description:'Card description 2:7', deck_id:games[1].id},
   { name: 'Card 2:8', description:'Card description 2:8', deck_id:games[1].id},
   { name: 'Card 2:9', description:'Card description 2:9', deck_id:games[1].id}
   ])


