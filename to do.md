# Development Plans

### Respite

* Create a new hero state page called Respite
* Move 'Take Respite' button here
* Add info on all the things that are going to be reset
* Add info about respite actions

### HealthPanel

HealthPanel is going to become the 'Encounter State' control
* This way there's a unified way to deal with stamina, conditions, etc
* Move conditions into HealthPanel
* Add HealthPanel to monsters, minion groups, and minions
* Use HealthPanel for heroes, heroes in an encounter, monsters, minion groups, and minions

| Feature           | Hero  | Hero (in encounter) | Monster | Minion Group | Minion  |
|:------------------|:-----:|:-------------------:|:-------:|:------------:|:-------:|
| Circles           |   X   |         X           |    X    |      X       |         |
| Stamina           |   X   |         X           |    X    |      X       |         |
| Recoveries        |   X   |         X           |         |              |         |
| Set Captain       |       |                     |         |      X       |         |
| Conditions        |   X   |         X           |    X    |      X       |    X    |
| Active / Defeated |       |         X           |    X    |      X       |    X    |
| Visible / Hidden  |       |         X           |    X    |              |    X    |
| Ready / Acted     |       |         X           |    X    |      X       |         |

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
* Imbued items:
  * Add a toggle so the user can add enhancements by the rules or add anything
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
  * Generate cavern map type
  * Switch map Z level
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
  * Add hero minis to map (automatically if there's an encounter active, or if not, then based on encounter setting)
  * Add monster minis to map (automatically if there's an encounter active)
  * Add terrain minis / overlays
  * In encounter, add monster minis / terrain minis / terrain minis
  * Minis should be able to be hidden (not shown on player view)

### Player View

* Add a way to check if data has changed; if it has, update the screen

### Ideas

* Add a way to load / save data from a remote folder / OneDrive / Google Docs / iCloud
* Add guides for specific features
  * Heroes / hero state / PDF export
  * Monster building / genesplice
  * Encounter building / running
