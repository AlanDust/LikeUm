# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

like = Buzzword.create({ word: "like"})
um = Buzzword.create({ word: "um"})

Speech.create([
  {user_id: 1, buzzword_id: 2, speech: "Fourscore and um seven years ago our fathers brought forth, on this continent, a new nation, conceived in liberty, and dedicated to the proposition that all men are created um equal. Now we are engaged in a great civil war, testing whether that nation, or any nation so conceived, and so dedicated, can long endure. Um We are met on a great battle-field of that war. We have come to dedicate a portion of that field, as a final resting place for those who here gave their lives, that that nation might live. Um it is altogether fitting and proper um, that we should do this. But, um, in a larger sense, we cannot dedicate, we cannot consecrate, we cannot hallow, this ground. Um, The brave men, um living and dead, who struggled here, have consecrated it um far above our poor power to add or um detract. The world will little note, nor long remember what we say here, but it can never forget what they did here. It is um for us the living, um, rather, to be dedicated here to the unfinished work which they who fought here have thus far so nobly advanced. It is rather for us to be here dedicated to the great task remaining before us, um that from these honored dead we take increased devotion to that cause for which they here gave the last full measure of devotion, that we here highly resolve that these dead shall not have died in vain, um, that this nation, under God, shall have a new birth of freedom, and that government of the people, by the people, um for the people, um shall not perish from the earth."
  }
])
