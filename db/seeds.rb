# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).

users=User.create(
  [{ email: 'johndoerfler@gmail.com', password:'111111', password_confirmation:'111111', remember_me:true},
   { email: '1@1.com', password:'111111', password_confirmation:'111111', remember_me:true},
   { email: '2@2.com', password:'111111', password_confirmation:'111111', remember_me:true},
   { email: 'charlie651@gmail.com', password:'111111', password_confirmation:'111111', remember_me:true},
  ])

images=Image.create(
  [{ name: 'Image 1', url:'image1.jpeg'},
   { name: 'Image 2', url:'image2.jpeg'},
   { name: 'Image 3', url:'image3.jpeg'},
   { name: 'Image 4', url:'image4.jpeg'},
   { name: 'Image 5', url:'image5.jpeg'},
   { name: 'Image 6', url:'image6.jpeg'},
   { name: 'Image 7', url:'image7.jpeg'}
  ])

backgrounds=Background.create(
  [{ name: 'background 1', url:'1.jpg'},
   { name: 'background 2', url:'2.jpg'}
  ])

styles=Style.create(
   [{name: 'Title Here', description:'Description 1.',background_id:backgrounds[0].id, template_name:'style-1', image_id:images[0].id, width:250, height: 350},
   { name: 'Title Here', description:'Description 2.',background_id:backgrounds[1].id, template_name:'style-2', image_id:images[1].id, width:350, height: 250},
   { name: 'Title Here', description:'Description 3.',background_id:backgrounds[0].id, template_name:'style-3', image_id:images[2].id, width:300, height: 300},
   { name: 'Title Here', description:'Description 4.',background_id:backgrounds[1].id, template_name:'style-4', image_id:images[3].id, width:200, height: 200}
   ])

games=Game.create(
  [{ name: 'My Sweet Game', description:'My awesome game description.', user_id:users[0].id},
   { name: 'Long long long long game name', description:'desc 2:1', user_id:users[1].id}
  ])

decks=Deck.create(
  [{ name: 'Deck 1:1', description:'Deck description 1:1', game_id:games[0].id},
   { name: 'Deck 1:2', description:'Deck description 1:2', game_id:games[0].id},
   { name: 'Deck 2:1', description:'Deck description 2:1', game_id:games[1].id}
  ])

cards=Card.create(
  [{ name: 'Card 1:1', description:'Card description 1:1', style_id:styles[0].id, background_id:backgrounds[0].id, deck_id:games[0].id, image_id:images[0].id},
   { name: 'Card 1:2', description:'Card description 1:2', style_id:styles[0].id, background_id:backgrounds[1].id, deck_id:games[0].id, image_id:images[1].id},
   { name: 'Card 1:3', description:'Card description 1:3', style_id:styles[0].id, background_id:backgrounds[0].id, deck_id:games[0].id, image_id:images[2].id},
   { name: 'Card 1:4', description:'Card description 1:4', style_id:styles[0].id, background_id:backgrounds[1].id, deck_id:games[0].id, image_id:images[3].id},
   { name: 'Card 1:5', description:'Card description 1:5', style_id:styles[0].id, background_id:backgrounds[0].id, deck_id:games[0].id, image_id:images[4].id},
   { name: 'Card 2:1', description:'Card description 2:3', style_id:styles[1].id, background_id:backgrounds[1].id, deck_id:games[1].id, image_id:images[5].id},
   { name: 'Card 2:2', description:'Card description 2:3', style_id:styles[1].id, background_id:backgrounds[1].id, deck_id:games[1].id, image_id:images[5].id},
   { name: 'Card 2:3', description:'Card description 2:3', style_id:styles[1].id, background_id:backgrounds[1].id, deck_id:games[1].id, image_id:images[5].id}
   ])
