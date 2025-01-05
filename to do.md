# Development Plans

## Updating Forge Steel to Backer Packet #2

**Add and update element data**

* Go through all text features and see if they can be changed to more useful feature types (bonuses, damage modifiers, etc)
  * Classes
  * Complications
* Monsters
  * Update existing monsters
  * Add new monsters

**Miscellaneous changes**

* Remove the PowerRollType enum - resistance rolls are no longer in the game
* Some classes (conduit, elementalist, shadow) have only 1 primary characteristic - this means choosing their characteristic arrays will be a lot more tricky
* If a hero's power roll uses potencies, replace weak / average / strong with the hero's characteristic value
* If a hero's power roll adds a characteristic to damage, automatically calculate the total damage
* Add new feature type to allow Revenant to choose features from other ancestries
* Revenants should have either 2 or 3 ancestry points depending on size
* Elementalist has some abilities that can't be chosen until a particular level

## Future Work

**Heroes**

* More intelligent feature collation - for each one, look for sub-features
* Add hero inventory management
* Add a way for heroes to be modified - additional skills, languages, perks, titles, etc

**Library**

* Add titles
* Add items

**Monster Editor**

* Show similar monsters in monster editor
* Auto-create monsters

**Encounter Editor**

* Encounters should pull in monsters - like how heroes pull in elements
* Use encounter templates in encounter editor
* Auto-create encounters

**Sourcebooks**

* It should be possible to add custom languages and skills to sourcebooks
