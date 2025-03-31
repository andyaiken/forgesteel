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
  * Imbued items
    * Add a toggle so the user can add enhancements by the rules or add anything
    * Imbued armor grants +6 / +12 / +21 stamina based on highest enhancement tier
    * Imbued implement grants +1 / +2 / +3 damage to magic / psionic abilities based on highest enhancement tier
    * Imbued weapon grants +1 / +2 / +3 damage to weapon abilities based on highest enhancement tier
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
  * Ability to add / fill / clear fog of war
  * Ability to destroy tile squares / wall sections
* Regional Maps

### Session

* Encounter
  * Monsters:
    * Set 'used reaction' flag on monsters / minions
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
  * Add hero tokens to map (automatically based on encounter setting)
  * Add monster tokens to map (automatically if there's an encounter active)
  * Add terrain tokens / overlays
  * In encounter, add monster tokens / terrain tokens / terrain overlays
* Player view
  * Ability to show certain information to players using a second window

### Ideas

* Add a way to load / save data from a remote folder / OneDrive / Google Docs / iCloud
* Add guides for specific features
  * Heroes / hero state / PDF export
  * Monster building / genesplice
  * Encounter building / running
