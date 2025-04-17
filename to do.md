# Development Plans

### Heroes

* Make sure multiple melee / ranged damage bonuses are handled correctly
* Hero Builder:
  * Revenants should have 3 ancestry points if small
  * Auto-create heroes

### Library

* It should be possible to add custom keywords to abilities
* It should be possible to create a homebrew subclass / class ability / monster individually
* Add data:
  * Rivals
* Monster Builder:
  * Auto-create monsters

### Playbook

* Adventure Builder:
  * Allow subplots
* Encounter Builder:
  * Set number of squares for per-square terrain
  * Use encounter templates
  * Auto-create encounters
* Tactical Maps:
  * Switch map Z level
    * Show (blurred, translucent, no pointer events) levels below / above
  * Ability to destroy tile squares / wall sections
* Regional Maps

### Session

* Encounter
  * Monsters:
    * Ability to set 'used reaction' flag on heroes / monsters / minions
    * Ability to duplicate / delete monsters in a slot
    * Button to roll for initiative (heroes / monsters)
    * Button to end current turn
      * Handle EoT (remove) / save ends (roll to remove) conditions on combatants in current group
      * Select (ready, active) group from other faction; if no more, next turn (mark all as ready)
  * Terrain:
    * Show number of squares on terrain encounter row
    * Show 'should be N squares' for terrain
    * Ability to add new terrain objects
* Tactical map
  * Minis should not be allowed to walk through walls
  * Add terrain minis / overlays

### Player View

* Add a way to check if data has changed; if it has, update the screen

### Ideas

* Add a way to load / save data from a remote folder / OneDrive / Google Docs / iCloud
* Add guides for specific features
  * Heroes / hero state / PDF export
  * Monster building / genesplice
  * Encounter building / running
  * Map making / adding minis
