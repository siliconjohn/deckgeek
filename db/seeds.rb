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
  [{ name: 'background 1', url:'4.jpg'},
   { name: 'background 2', url:'2.jpg'},
   { name: 'background 3', url:'3.jpg'},
   { name: 'background 4', url:'1.jpg'}
  ])


tags=Tag.create(
  [{ title: 'All' },
   { title: '1 Images' },
   { title: '2 Images' }
  ])

imageTags=ImageTag.create(
  [ { image_id: images[0].id, tag_id: tags[0].id },
    { image_id: images[1].id, tag_id: tags[0].id },
    { image_id: images[2].id, tag_id: tags[0].id },
    { image_id: images[3].id, tag_id: tags[0].id },
    { image_id: images[1].id, tag_id: tags[1].id },
    { image_id: images[2].id, tag_id: tags[2].id },
    { image_id: images[2].id, tag_id: tags[2].id }
  ])

styles=Style.create(
   [{name: 'Title Here', description:'Description 1.', template_name:'style-1', width:250, height: 350},
   { name: 'Title Here', description:'Description 2.', template_name:'style-2', width:350, height: 250},
   { name: 'Title Here', description:'Description 3.', template_name:'style-3', width:300, height: 300},
   { name: 'Title Here', description:'Description 4.', template_name:'style-4', width:200, height: 200}
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

# The first card is the sample default card and is needed!!
[{
  name: "Awesome Card"
},
{
  name: "Sample Card 2",
  description: "Sample Card Description",
  border_color: "rgba(0, 0, 0, 0.45)",
  border_inline: true,
  border_outline: true,
  border_visible: true,
  border_width: 9,
  description_alignment: "center",
  description_bg_color: "rgba(103, 116, 50, 0.38)",
  description_border_outline: false,
  description_border_radius: 0,
  description_bottom: 0,
  description_height: 97,
  description_visible: true,
  description_width: 100,
  title_alignment: "center",
  title_bg_color: "rgba(103, 116, 50, 0.38)",
  title_border_outline: false,
  title_border_radius: 0,
  title_height: 39,
  title_top_margin: 0,
  title_visible: true,
  title_width: 100,
  style_id: styles[0].id,
  deck_id: decks[0].id,
  background_id: backgrounds[1].id,
},
{
  name: "Sample Card 3",
  description: "Sample Card Description",
  border_color: "rgba(152, 142, 72, 0.45)",
  border_inline: true,
  border_outline: true,
  border_visible: true,
  border_width: 9,
  description_alignment: "center",
  description_bg_color: "rgba(94, 26, 71, 0.45)",
  description_border_outline: false,
  description_border_radius: 0,
  description_bottom: 0,
  description_height: 97,
  description_visible: true,
  description_width: 100,
  title_alignment: "center",
  title_bg_color: "rgba(236, 238, 59, 0.14)",
  title_border_outline: false,
  title_border_radius: 0,
  title_height: 39,
  title_top_margin: 0,
  title_visible: true,
  title_width: 100,
  style_id: styles[0].id,
  deck_id: decks[0].id,
  background_id: backgrounds[2].id,
},
{
  name: "Sample Card 4",
  description: "Sample Card Description",
  border_color: "rgba(0, 0, 0, 0.45)",
  border_inline: true,
  border_outline: true,
  border_visible: true,
  border_width: 9,
  description_alignment: "center",
  description_bg_color: "rgba(95, 49, 49, 0.41)",
  description_border_outline: false,
  description_border_radius: 0,
  description_bottom: 0,
  description_height: 97,
  description_visible: true,
  description_width: 100,
  title_alignment: "center",
  title_bg_color: "rgba(0, 0, 0, 0.45)",
  title_border_outline: false,
  title_border_radius: 0,
  title_height: 39,
  title_top_margin: 0,
  title_visible: true,
  title_width: 100,
  style_id: styles[0].id,
  deck_id: decks[0].id,
  background_id: backgrounds[3].id,
},
{
  name: "Sample Card 1",
  description: "Sample Card Description",
  border_color: "rgba(0, 0, 0, 0.45)",
  border_inline: true,
  border_outline: true,
  border_visible: true,
  border_width: 9,
  description_alignment: "center",
  description_bg_color: "rgba(103, 116, 50, 0.38)",
  description_border_outline: false,
  description_border_radius: 0,
  description_bottom: 0,
  description_height: 97,
  description_visible: true,
  description_width: 100,
  title_alignment: "center",
  title_bg_color: "rgba(103, 116, 50, 0.38)",
  title_border_outline: false,
  title_border_radius: 0,
  title_height: 39,
  title_top_margin: 0,
  title_visible: true,
  title_width: 100,
  style_id: styles[1].id,
  deck_id: decks[1].id,
  background_id: backgrounds[0].id,
},
{
  name: "Sample Card 2",
  description: "Sample Card Description",
  border_color: "rgba(0, 0, 0, 0.45)",
  border_inline: true,
  border_outline: true,
  border_visible: true,
  border_width: 9,
  description_alignment: "center",
  description_bg_color: "rgba(103, 116, 50, 0.38)",
  description_border_outline: false,
  description_border_radius: 0,
  description_bottom: 0,
  description_height: 97,
  description_visible: true,
  description_width: 100,
  title_alignment: "center",
  title_bg_color: "rgba(103, 116, 50, 0.38)",
  title_border_outline: false,
  title_border_radius: 0,
  title_height: 39,
  title_top_margin: 0,
  title_visible: true,
  title_width: 100,
  style_id: styles[1].id,
  deck_id: decks[1].id,
  background_id: backgrounds[1].id,
},
{
  name: "Sample Card 3",
  description: "Sample Card Description",
  border_color: "rgba(152, 142, 72, 0.45)",
  border_inline: true,
  border_outline: true,
  border_visible: true,
  border_width: 9,
  description_alignment: "center",
  description_bg_color: "rgba(94, 26, 71, 0.45)",
  description_border_outline: false,
  description_border_radius: 0,
  description_bottom: 0,
  description_height: 97,
  description_visible: true,
  description_width: 100,
  title_alignment: "center",
  title_bg_color: "rgba(236, 238, 59, 0.14)",
  title_border_outline: false,
  title_border_radius: 0,
  title_height: 39,
  title_top_margin: 0,
  title_visible: true,
  title_width: 100,
  style_id: styles[1].id,
  deck_id: decks[1].id,
  background_id: backgrounds[2].id,
},
{
  name: "Sample Card 4",
  description: "Sample Card Description",
  border_color: "rgba(0, 0, 0, 0.45)",
  border_inline: true,
  border_outline: true,
  border_visible: true,
  border_width: 9,
  description_alignment: "center",
  description_bg_color: "rgba(95, 49, 49, 0.41)",
  description_border_outline: false,
  description_border_radius: 0,
  description_bottom: 0,
  description_height: 97,
  description_visible: true,
  description_width: 100,
  title_alignment: "center",
  title_bg_color: "rgba(0, 0, 0, 0.45)",
  title_border_outline: false,
  title_border_radius: 0,
  title_height: 39,
  title_top_margin: 0,
  title_visible: true,
  title_width: 100,
  style_id: styles[1].id,
  deck_id: decks[1].id,
  background_id: backgrounds[3].id,
}]
)
