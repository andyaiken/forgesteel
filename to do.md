# Development Plans

### Bug Reports

* Add a new hero builder step for skills / languages

* Currently, if a hero has multiple kits, and the selected kits each has a melee damage bonus, and there is no strictly better option, the various options are shown beneath each action power roll that uses melee weapons
  * For example, a damage bonus of +2/+2/+2 is strictly better than +1/+1/+1 but not +0/+0/+4
  * The same is true for multiple kits with ranged damage bonuses
* What we want is for the user to select one of the damage bonuses
* Add fields (to the Kit feature model? to the Hero model?) to specify the selected melee damage bonus / ranged damage bonus
  * Set whenever a kit is chosen
  * Used when calculating tier damage
  * Do not show different kit options below the power roll - the selected damage bonus is the only one that matters
  * If multiple kits selected, and none is strictly better, the user is given a 'changeable at will' option on the hero sheet (equivalent to a selectAt: 'play' Choice feature)

The Reference screen shows all languages for every sourcebook

### Plans

* Improve editors:
  * Modifier editor

* Update:
  * Vampire
  * Vessel
* Monster customization should include:
  * Monster group add-ons
  * Retainer level up choices

### Heroes

* Classic Sheet
  * Add ability to create standalone 'reference sheets' with selectable 'reference cards'
  * (possibly solved along with above) Have ability to create handout sheets with items, followers, etc without being attached to a character
  * Check hero features/abilities for certain keywords and ensure relevant reference cards get put into the character sheet?
  * Add user-selectable color scheme

### Library

* It should be possible to add custom keywords to abilities / custom weapon or armor types in kits
* It should be possible to create a homebrew class ability / monster individually
* Monster Builder:
  * Auto-create monsters
* Encounter Builder:
  * Encounter customization:
    * Modify monster stamina
  * When an encounter has monsters with items, this should be noted in the encounter info (monster info and running encounter notes)
  * Encounters should pull in monsters, rather than storing monster / group IDs
  * Set number of squares for per-square terrain
  * Use encounter templates
* Tactical Maps:
  * Add / move minis using drag-and-drop
  * Switch map Z level
    * Show (blurred, translucent, no pointer events) levels below / above
  * Ability to destroy tile squares / wall sections
* Regional Maps

### Session

* Encounter
  * Ability to set 'used reaction' flag on heroes / monsters / minions
  * Monsters:
    * Ability to duplicate / delete monsters in a slot
    * It should be possible to pull 'quick condition' things from monsters and apply them
  * Terrain:
    * Show number of squares on terrain encounter row
    * Show 'should be N squares' for terrain
    * Ability to add new terrain objects
* Tactical map
  * Show altitude on minis
  * Minis should not be allowed to walk through walls
  * Add terrain minis / overlays
  * Show distance between selected mini and hovered square

### Ideas

* Add a way to load / save data from a remote folder / OneDrive / Google Docs / iCloud
* Add guides for specific features
  * Heroes / hero state / PDF export
  * Monster building / genesplice
  * Encounter building / running
  * Map making / adding minis
