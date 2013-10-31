# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).

users=User.create(
  [{ email: 'johndoerfler@gmail.com', password:'111111', password_confirmation:'111111', remember_me:true, admin:true },
   { email: '1@1.com', password:'111111', password_confirmation:'111111', remember_me:true},
   { email: '2@2.com', password:'111111', password_confirmation:'111111', remember_me:true},
   { email: 'charlie651@gmail.com', password:'111111', password_confirmation:'111111', remember_me:true},
  ])

images=Image.create(
  [
    { name: 'background', url:'1.jpg'},
    { name: 'background', url:'2.jpg'},
    { name: 'background', url:'3.jpg'},
    { name: 'background', url:'4.jpg'},
    { name: 'background', url:'5.jpg'},
    { name: 'background', url:'6.jpg'},
    { name: 'background', url:'7.jpg'},
    { name: 'background', url:'8.jpg'},
    { name: 'background', url:'9.jpg'},
    { name: 'background', url:'10.jpg'},
    { name: 'background', url:'11.jpg'},
    { name: 'background', url:'12.jpg'},
    { name: 'background', url:'13.jpg'},
    { name: 'background', url:'14.jpg'},
    { name: 'background', url:'15.jpg'},
    { name: 'background', url:'16.jpg'},
    { name: 'background', url:'17.jpg'},
    { name: 'background', url:'18.jpg'},
    { name: 'background', url:'19.jpg'},
    { name: 'background', url:'20.jpg'},
    { name: 'background', url:'21.jpg'},
    { name: 'background', url:'22.jpg'},
    { name: 'background', url:'23.jpg'},
    { name: 'background', url:'24.jpg'},
    { name: 'background', url:'25.jpg'},
    { name: 'background', url:'26.jpg'},
    { name: 'background', url:'27.jpg'},
    { name: 'background', url:'28.jpg'},
    { name: 'background', url:'29.jpg'},
    { name: 'background', url:'30.jpg'},
    { name: 'background', url:'31.jpg'},
    { name: 'background', url:'32.jpg'},
    { name: 'background', url:'33.jpg'},
    { name: 'background', url:'34.jpg'},
    { name: 'background', url:'35.jpg'},
    
    { name: 'background', url:'36.jpg'},
    
    
    ])

tags=Tag.create(
  [{ title: 'All' },
   { title: 'Tomasz Strzalkowski' },
   { title: 'George Grie' }
  ])

imageTags=ImageTag.create(
  [ { image_id: images[0].id, tag_id: tags[1].id },
    { image_id: images[1].id, tag_id: tags[1].id },
    { image_id: images[2].id, tag_id: tags[1].id },
    { image_id: images[3].id, tag_id: tags[1].id },
    { image_id: images[4].id, tag_id: tags[1].id },
    { image_id: images[5].id, tag_id: tags[1].id },
    { image_id: images[6].id, tag_id: tags[1].id },
    { image_id: images[7].id, tag_id: tags[1].id },
    { image_id: images[8].id, tag_id: tags[1].id },
    { image_id: images[9].id, tag_id: tags[1].id },
    { image_id: images[10].id, tag_id: tags[1].id },
    { image_id: images[11].id, tag_id: tags[1].id },
    { image_id: images[12].id, tag_id: tags[1].id },
    { image_id: images[13].id, tag_id: tags[1].id },
    { image_id: images[14].id, tag_id: tags[1].id },
    { image_id: images[15].id, tag_id: tags[1].id },
    { image_id: images[16].id, tag_id: tags[1].id },
    { image_id: images[17].id, tag_id: tags[1].id },
    { image_id: images[18].id, tag_id: tags[2].id },
{ image_id: images[19].id, tag_id: tags[2].id },
{ image_id: images[20].id, tag_id: tags[2].id },
{ image_id: images[21].id, tag_id: tags[2].id },
{ image_id: images[22].id, tag_id: tags[2].id },
{ image_id: images[23].id, tag_id: tags[2].id },
{ image_id: images[24].id, tag_id: tags[2].id },
{ image_id: images[25].id, tag_id: tags[2].id },
{ image_id: images[26].id, tag_id: tags[2].id },
{ image_id: images[27].id, tag_id: tags[2].id },
{ image_id: images[28].id, tag_id: tags[2].id },
{ image_id: images[29].id, tag_id: tags[2].id },
{ image_id: images[30].id, tag_id: tags[2].id },
{ image_id: images[31].id, tag_id: tags[2].id },
{ image_id: images[32].id, tag_id: tags[2].id },
{ image_id: images[33].id, tag_id: tags[2].id },
{ image_id: images[34].id, tag_id: tags[2].id },
{ image_id: images[35].id, tag_id: tags[2].id },


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
