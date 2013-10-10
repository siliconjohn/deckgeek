# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).

users=User.create(
  [{ email: 'johndoerfler@gmail.com', password:'111111', password_confirmation:'111111', remember_me:true, admin:true },
   { email: '1@1.com', password:'111111', password_confirmation:'111111', remember_me:true},
   { email: '2@2.com', password:'111111', password_confirmation:'111111', remember_me:true},
   { email: 'charlie651@gmail.com', password:'111111', password_confirmation:'111111', remember_me:true},
  ])

backgrounds=Background.create(
  [{ name: 'background 1', url:'4.jpg'},
   { name: 'background 2', url:'2.jpg'},
   { name: 'background 3', url:'3.jpg'},
   { name: 'background 4', url:'1.jpg'}
  ])

images=Image.create(
  [{ name: 'background 4', url:'http://www.google.com/images/srpr/logo6w.png'},
   { name: 'background 2', url:'2.jpg'},
   { name: 'background 3', url:'3.jpg'},
   { name: 'background 1', url:'1.jpg'},
   { name: 'background 5', url:'5.jpg'},
   { name: 'background 6', url:'6.jpg'},
   { name: 'background 7', url:'7.jpg'},
   { name: 'background 8', url:'8.jpg'},
  ])

tags=Tag.create(
  [{ title: 'All' },
   { title: '1 Images' },
   { title: '2 Images' }
  ])

imageTags=ImageTag.create(
  [ { image_id: images[1].id, tag_id: tags[1].id },
    { image_id: images[2].id, tag_id: tags[2].id },
    { image_id: images[3].id, tag_id: tags[2].id }
  ])

games=Game.create(
  [{ name: 'My Sweet Game', description:'My awesome game description.', user_id:users[0].id},
   { name: 'Long long long long game name', description:'desc 2:1', user_id:users[1].id}
  ])

decks=Deck.create(
  [{ name: 'Deck 1', description:'Deck description 1', game_id:games[0].id},
   { name: 'Deck 2', description:'Deck description 2', game_id:games[0].id},
   { name: 'Deck 3', description:'Deck description 3', game_id:games[1].id}
  ])

cards=Card.create(
[
{
  deck_id: decks[0].id,
},
{
  name: "Sample Card 3",
  deck_id: decks[0].id,
},
{
  name: "Sample Card 4",
  deck_id: decks[0].id,
},
{
  name: "Sample Card 1",
  deck_id: decks[1].id,
},
{
  name: "Sample Card 2",
  deck_id: decks[1].id,
},
{
  name: "Sample Card 3",
  deck_id: decks[1].id,
},
{
  name: "Sample Card 4",
  deck_id: decks[1].id,
},
{
  deck_id: decks[0].id,
},
{
  deck_id: decks[0].id,
},
{
  deck_id: decks[0].id,
},
{
  deck_id: decks[0].id,
},
{
  deck_id: decks[0].id,
},
{
  deck_id: decks[0].id,
},
{
  deck_id: decks[0].id,
},
{
  deck_id: decks[0].id,
},
{
  deck_id: decks[0].id,
},
{
  deck_id: decks[0].id,
},
{
  deck_id: decks[0].id,
},
{
  deck_id: decks[0].id,
},
{
  deck_id: decks[0].id,
},
{
  deck_id: decks[0].id,
},
{
  deck_id: decks[0].id,
},
{
  deck_id: decks[0].id,
},
{
  deck_id: decks[0].id,
},
]
)
