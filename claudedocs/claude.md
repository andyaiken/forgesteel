# Forgesteel - Complete Codebase Documentation

## Project Overview

**Forgesteel** is a comprehensive web-based character builder and game management tool for the **DRAW STEEL** tabletop roleplaying game system. It provides a complete suite of tools for both players and game directors (GMs) to create characters, manage campaigns, run game sessions, and generate character sheets.

### Live Application

- **URL**: <https://andyaiken.github.io/forgesteel/>
- **Repository**: <https://github.com/andyaiken/forgesteel.git>
- **Version**: 11.96.0

### Project Statistics

- **Total Files**: 613 TypeScript/TSX files
- **Lines of Code**: ~198,413 lines
- **Data Models**: 45+ TypeScript interfaces
- **Logic Modules**: 42 business logic files
- **React Components**: 200+ components (Pages, Panels, Modals, Controls)
- **Character Classes**: 10 classes with multiple subclasses each
- **Ancestries**: 21 playable character backgrounds
- **Monster Types**: 30+ creature definitions

---

## Technology Stack

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| **Framework** | React | 19.2.0 | UI framework |
| **Router** | React Router | 7.9.4 | Client-side routing |
| **Language** | TypeScript | 5.9.3 | Type-safe JavaScript |
| **Build Tool** | Vite | 7.1.12 | Fast build and dev server |
| **UI Library** | Ant Design | 5.27.6 | Enterprise UI components |
| **Styling** | SASS | 1.93.2 | CSS preprocessing |
| **Storage** | LocalForage | 1.10.0 | IndexedDB abstraction |
| **PDF Export** | jsPDF | 3.0.3 | PDF generation |
| **Canvas** | html2canvas | 1.4.1 | Screenshot capture |
| **PDF Manipulation** | pdf-lib | 1.17.1 | PDF manipulation |
| **Screenshot** | modern-screenshot | 4.6.6 | Modern screenshot API |
| **Markdown** | Showdown | 2.1.0 | Markdown to HTML |
| **Testing** | Vitest | 4.0.3 | Unit testing framework |
| **Linting** | ESLint | 9.38.0 | Code quality |
| **Deployment** | gh-pages | 6.3.0 | GitHub Pages deploy |

### Development Scripts

```bash
npm start          # Start development server with Vite
npm run lint       # Run TypeScript compiler and ESLint
npm run fix        # Auto-fix ESLint issues
npm test           # Run Vitest tests in watch mode
npm run check      # Lint + run all tests
npm run build      # Production build
npm run deploy     # Lint + test + build + deploy to GitHub Pages
```

---

## Application Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      index.tsx (Entry Point)                 │
│  - Loads data from LocalForage (6 stores)                   │
│  - Runs update logic for backward compatibility             │
│  - Initializes React app with HashRouter                    │
│  - Registers Service Worker for PWA                         │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                     Main Component                           │
│  - Global state management                                   │
│  - Route definitions                                         │
│  - Theme management                                          │
│  - Data persistence orchestration                           │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────┬──────────────┬──────────────┬────────────────┐
│   Heroes     │   Library    │   Playbook   │    Session     │
│   (Players)  │  (Content)   │ (Prep/GM)    │  (Live Game)   │
└──────────────┴──────────────┴──────────────┴────────────────┘
```

### Data Persistence (6 LocalForage Stores)

1. **`forgesteel-heroes`**: Array of Hero objects (player characters)
2. **`forgesteel-homebrew-settings`**: Array of custom Sourcebook objects
3. **`forgesteel-hidden-setting-ids`**: Array of hidden sourcebook IDs
4. **`forgesteel-playbook`**: Playbook object (GM preparation data)
5. **`forgesteel-session`**: Playbook object (active game session)
6. **`forgesteel-options`**: Options object (user preferences)

### PWA Features

- **Service Worker**: Registered at `/forgesteel/sw.js`
- **Offline Support**: Cached assets for offline use
- **Manifest**: `/forgesteel/manifest.json`
- **Mobile Web App**: Full PWA capabilities

---

## Directory Structure

### `/src` - Main Source Directory

src/
├── assets/                    # Static assets (images, fonts, icons)
│   ├── fonts/                # Custom fonts
│   ├── icons/                # SVG icons
│   ├── screenshots/          # App screenshots
│   └── shield.png           # App icon
│
├── components/               # React components (200+ files)
│   ├── controls/            # 14 reusable UI controls
│   ├── main/                # 2 main app shell components
│   ├── modals/              # 39 dialog/modal components
│   ├── pages/               # 22 full-page components
│   └── panels/              # 133 panel/section components
│
├── data/                    # Game content data (21 modules)
│   ├── ancestries/          # 21 character ancestries
│   ├── careers/             # 18 character careers
│   ├── classes/             # 10 classes + subclasses
│   ├── domains/             # 12 divine domains
│   ├── heroes/              # 10 pregenerated heroes
│   ├── imbuements/          # Magical item enhancements
│   ├── items/               # Equipment and items
│   ├── kits/                # Combat kits (weapon/armor combos)
│   ├── monsters/            # 30+ monster stat blocks
│   ├── perks/               # Character perks by category
│   ├── sourcebooks/         # 4 official content packs
│   ├── terrain/             # Tactical terrain types
│   └── [data aggregators]   # *-data.ts files
│
├── enums/                   # 36 TypeScript enumerations
│   ├── ability-keyword.ts
│   ├── ability-usage.ts
│   ├── characteristic.ts
│   ├── damage-type.ts
│   ├── feature-type.ts
│   ├── monster-role-type.ts
│   └── [30+ more enums]
│
├── hooks/                   # 7 custom React hooks
│   ├── use-dimensions.ts
│   ├── use-error-listener.ts
│   ├── use-is-small.ts
│   ├── use-media-query.ts
│   ├── use-navigation.ts
│   ├── use-sync-status.ts
│   └── use-theme.ts
│
├── logic/                   # 42 business logic modules
│   ├── classic-sheet/       # Classic character sheet generation
│   ├── hero-sheet/          # Hero sheet builder
│   ├── playbook-sheets/     # GM session sheets
│   ├── update/              # Data migration/update logic
│   └── [35+ logic files]
│
├── models/                  # 45+ TypeScript interfaces
│   ├── classic-sheets/      # Sheet-specific models
│   ├── ability.ts
│   ├── ancestry.ts
│   ├── career.ts
│   ├── class.ts
│   ├── complication.ts
│   ├── creature.ts
│   ├── culture.ts
│   ├── domain.ts
│   ├── encounter.ts
│   ├── feature.ts
│   ├── hero.ts
│   ├── hero-state.ts
│   ├── item.ts
│   ├── monster.ts
│   ├── monster-state.ts
│   ├── playbook.ts
│   ├── sourcebook.ts
│   ├── tactical-map.ts
│   └── [25+ more models]
│
├── utils/                   # 7 utility modules
│   ├── collections.ts       # Array/object utilities
│   ├── feature-flags.ts     # Feature toggle system
│   ├── format.ts            # Text formatting
│   ├── initialize-theme.ts  # Theme initialization
│   ├── name-generator.ts    # Random name generation
│   ├── random.ts            # Random number utilities
│   └── utils.ts             # General utilities
│
├── index.tsx                # Application entry point
├── index.scss               # Global styles
└── sw.ts                    # Service worker script

```
---
## Core Features

### 1. Hero Builder

**Location**: `/src/components/pages/heroes/`

The hero builder allows players to create and customize characters following the Draw Steel character creation rules.

#### Hero Creation Flow

1. **Start Section**: Name, folder organization
2. **Ancestry Section**: Choose from 21 ancestries (Human, Elf, Dwarf, Orc, etc.)
3. **Culture Section**: Select cultural background
4. **Career Section**: Choose from 18 careers (Soldier, Sage, Criminal, etc.)
5. **Class Section**: Pick class and subclass
6. **Complication Section**: Add character complications
7. **Details Section**: Customize abilities, add equipment, notes

#### Hero Data Model

```typescript
interface Hero {
  id: string;
  name: string;
  picture: string | null;
  folder: string;
  settingIDs: string[];
  ancestry: Ancestry | null;
  culture: Culture | null;
  class: HeroClass | null;
  career: Career | null;
  complication: Complication | null;
  features: Feature[];
  state: HeroState;
  abilityCustomizations: AbilityCustomization[];
}
```

### 2. Character Classes (10 Classes)

**Location**: `/src/data/classes/`

Each class has a base definition plus multiple subclasses:

1. **Beastheart** (`beastheart/`)
   - Guardian, Prowler, Punisher, Spark
   - Companion-focused melee/ranged combatant

2. **Censor** (`censor/`)
   - Censor, Exorcist, Oracle, Paragon
   - Divine magic user with holy powers

3. **Conduit** (`conduit/`)
   - Single subclass
   - Channel divine energy

4. **Elementalist** (`elementalist/`)
   - Earth, Fire, Green, Void
   - Elemental magic specialist

5. **Fury** (`fury/`)
   - Berserker, Reaver, Stormwight
   - Rage-powered warrior

6. **Null** (`null/`)
   - Chronokinetic, Cryokinetic, Metakinetic
   - Psionic null powers

7. **Shadow** (`shadow/`)
   - Black Ash, Caustic Alchemy, Harlequin Mask
   - Stealth and deception specialist

8. **Summoner** (`summoner/`)
   - Demon, Elemental, Fey, Undead
   - Summons creatures to fight

9. **Tactician** (`tactician/`)
   - Insurgent, Mastermind, Vanguard
   - Battlefield controller and leader

10. **Talent** (`talent/`)
    - Chronopathy, Telekinesis, Telepathy
    - Psionic powers user

### 3. Ancestries (21 Playable Options)

**Location**: `/src/data/ancestries/`

| Ancestry | File | Description |
|----------|------|-------------|
| Angulotl | `angulotl.ts` | Axolotl-inspired aquatic humanoids |
| Aurealgar | `aurealgar.ts` | Bear-like humanoids |
| Aurkin | `aurkin.ts` | Fox-like humanoids |
| Aurven | `aurven.ts` | Raven-like humanoids |
| Caprini | `caprini.ts` | Goat-like humanoids |
| Cervari | `cervari.ts` | Deer-like humanoids |
| Devil | `devil.ts` | Infernal beings |
| Draconem | `draconem.ts` | Half-dragon warriors |
| Dwarf | `dwarf.ts` | Classic dwarves |
| Elgari | `elgari.ts` | Elk-like humanoids |
| High Elf | `elf-high.ts` | High elves |
| Wode Elf | `elf-wode.ts` | Wood elves |
| Hakaan | `hakaan.ts` | Eagle-like humanoids |
| Human | `human.ts` | Standard humans |
| Memonek | `memonek.ts` | Memory-focused beings |
| Orc | `orc.ts` | Classic orcs |
| Polder | `polder.ts` | Elemental-touched humanoids |
| Revenant | `revenant.ts` | Undead warriors |
| Seraphite | `seraphite.ts` | Angel-like beings |
| Time Raider | `time-raider.ts` | Time-displaced beings |
| Warforged | `warforged.ts` | Constructed beings |

### 4. Game Content System

**Location**: `/src/data/`

#### Sourcebooks (Official Content)

**Location**: `/src/data/sourcebooks/`

1. **Core** (`core.ts`) - Base game content
2. **Draachenmar** (`draachenmar.ts`) - Dragon-themed expansion
3. **Orden** (`orden.ts`) - Additional content
4. **Playtest** (`playtest.ts`) - Playtest materials

#### Items & Equipment

**Location**: `/src/data/items/`

- `artifact-data.ts` - Unique legendary items
- `consumable-data.ts` - Potions, scrolls, etc.
- `imbued-item-data.ts` - Magically enhanced items
- `leveled-armor-data.ts` - Armor by level
- `leveled-implement-data.ts` - Magical implements
- `leveled-weapon-data.ts` - Weapons by level
- `trinket-data.ts` - Minor magical items

#### Combat Kits

**Location**: `/src/data/kits/`

Pre-configured weapon/armor combinations:

- Arcane Archer, Battlemind, Cloak and Dagger
- Dual Wielder, Guisarmier, Martial Artist
- Mountain, Panther, Pugilist
- Raider, Ranger, Rapid Fire
- Retiarius, Shining Armor, Sniper
- Spellsword, Swashbuckler, Sword and Board
- Warrior Priest, Whirlwind
- Beastheart-specific: Outrider, Predator, Stormcrow, War Beast
- Stormwight-specific: Boren, Corven, Raden, Vuken

### 5. Monster System

**Location**: `/src/data/monsters/`

30+ monster types with full stat blocks:

- Ajax, Angulotl, Animal, Arixx
- Ashen Hoarder, Basilisk, Bredbeddle, Bugbear
- Chimera, Civilian, Count Rhodar, Demon
- Devil, Draconian, Dragon (Crucible, Gloom, Meteor, Omen, Thorn)
- Dwarf, Elemental, Elf (High, Shadow, Wode)
- Fossil Cryptic, Giant, Gnoll, Goblin
- Griffon, Hag, Hobgoblin, Human
- Kingfissure Worm, Kobold, Lich, Lightbender
- Lizardfolk, Lord Syuul, Manticore, Medusa
- Minotaur, Ogre, Olothec, Orc
- Radenwight, Retainer, Rival, Shambling Mound
- Time Raider, Troll, Undead, Valok
- Voiceless Talker, Wardog, Werewolf, Wyvern
- Xorannox

### 6. Session Management (Playbook System)

**Location**: `/src/components/pages/playbook/` and `/src/components/pages/session/`

The playbook system manages game sessions for both preparation (GM) and live play.

#### Playbook Structure

```typescript
interface Playbook {
  id: string;
  name: string;
  adventures: Adventure[];
  encounters: Encounter[];
  negotiations: Negotiation[];
  montages: Montage[];
  // ... other properties
}
```

#### Session Types

**Preparation Mode** (`/playbook`)

- Create adventures and encounters
- Build monster groups
- Design tactical maps
- Set up objectives and victory conditions
- Prepare negotiations and montages

**Director Mode** (`/session/director`)

- Run live game sessions
- Track initiative and turn order
- Manage monster HP and conditions
- Control tactical map
- Award XP and treasure

**Player Mode** (`/session/player`)

- View shared game state
- Track character HP and resources
- See current tactical situation
- Reference abilities and features

### 7. Tactical Combat System

**Location**: `/src/logic/tactical-map-logic.ts`

#### Tactical Map Features

- Grid-based positioning (square or hex)
- Distance calculation
- Line of sight
- Area of effect visualization
- Terrain placement
- Monster/hero tokens

#### Terrain Types

**Location**: `/src/data/terrain/`

- Environmental Hazards (lava, water, etc.)
- Fieldworks (barricades, walls)
- Mechanisms (doors, traps)
- Power Fixtures (magical objects)
- Siege Engines (catapults, ballistae)
- Supernatural Objects (portals, shrines)

### 8. Character Sheet Generation

**Location**: `/src/logic/classic-sheet/` and `/src/logic/hero-sheet/`

#### Sheet Types

**Classic Sheet** (PDF-ready format)

- Multiple page sizes (Letter, A4, A5)
- Print-optimized layout
- Traditional RPG sheet style
- Includes all character details

**Standard Sheet** (Digital format)

- Modern web-based layout
- Interactive elements
- Ability cards
- Dynamic updates

**Hero Sheet** (Simplified format)

- Quick reference
- Combat-focused
- Streamlined layout

#### Sheet Export Options

- PDF export via jsPDF
- PNG export via html2canvas
- Print directly from browser

### 9. Homebrew Content Creation

**Location**: `/src/components/pages/library/`

Users can create custom content:

- **Custom Ancestries**: Define new playable ancestries
- **Custom Classes**: Create new classes with abilities
- **Custom Kits**: Design weapon/armor combinations
- **Custom Monsters**: Build new creatures
- **Custom Items**: Define unique equipment
- **Custom Abilities**: Create new powers

All homebrew content is stored in `forgesteel-homebrew-settings` LocalForage store.

### 10. Negotiation System

**Location**: `/src/logic/negotiation-logic.ts` and `/src/data/negotiation-data.ts`

Social encounter mechanics:

- Attitude tracking (Hostile, Unfriendly, Indifferent, Friendly, Helpful)
- Interest/Patience management
- Success/failure consequences
- Multiple NPCs in negotiations
- Outcome tracking

---

## Key Logic Modules

### Hero Logic (`hero-logic.ts`) - 1,192 lines

**Purpose**: Core hero character management

**Key Functions**:

- `getFeatures(hero)` - Calculate all features (ancestry, culture, career, class)
- `getAbilities(hero)` - Get all abilities with customizations
- `getStamina(hero)` - Calculate stamina/HP
- `getSpeed(hero)` - Calculate movement speed
- `getSize(hero)` - Determine size category
- `getStability(hero)` - Calculate stability
- `getDamageModifiers(hero)` - Get damage resistances/immunities
- `getSkills(hero)` - Get skill bonuses
- `getPerks(hero)` - Get perk bonuses

### Factory Logic (`factory-logic.ts`) - 1,049 lines

**Purpose**: Create default instances of all data types

**Key Functions**:

- `createHero()` - New hero with defaults
- `createMonster()` - New monster stat block
- `createEncounter()` - New combat encounter
- `createAbility()` - New ability definition
- `createFeature()` - New feature (25+ types)
- `createPlaybook()` - New playbook
- `createSourcebook()` - New sourcebook
- And 40+ more factory methods

### Feature Logic (`feature-logic.ts`) - 1,052 lines

**Purpose**: Process complex feature system

**Key Functions**:

- `getFeaturesFromList()` - Extract features from choices
- `isFeatureChoice()` - Determine if feature is a choice
- `getFeatureChoiceCount()` - Count available choices
- `addFeatureToList()` - Add feature with validation
- Handles 25+ feature types with discriminated unions

### Monster Logic (`monster-logic.ts`) - 667 lines

**Purpose**: Monster stat block management

**Key Functions**:

- `getSize(monster)` - Determine monster size
- `getRole(monster)` - Get tactical role
- `getStamina(monster)` - Calculate HP
- `getSpeed(monster)` - Calculate movement
- `getAbilities(monster)` - Get monster abilities
- `getDifficulty(monster)` - Calculate encounter difficulty

### Tactical Map Logic (`tactical-map-logic.ts`) - 749 lines

**Purpose**: Grid-based combat map management

**Key Functions**:

- `getCellID(x, y)` - Get cell identifier
- `getCellPosition(cellID)` - Parse cell position
- `getDistance(cell1, cell2)` - Calculate distance
- `getAdjacentCells(cell)` - Get neighboring cells
- `getAreaCells(origin, area)` - Get area of effect
- `isLineOfSight(cell1, cell2)` - Check line of sight
- `getTerrain(cell)` - Get terrain at location

### Encounter Logic (`encounter-logic.ts`) - 486 lines

**Purpose**: Combat encounter management

**Key Functions**:

- `getEncounterDifficulty()` - Calculate difficulty rating
- `getXPReward()` - Calculate XP for encounter
- `getThreat()` - Get threat level
- `getInitiativeOrder()` - Sort combatants
- `applyDamage()` - Handle damage to creatures
- `applyCondition()` - Add conditions to creatures

### Creature Logic (`creature-logic.ts`) - 485 lines

**Purpose**: Generic creature (hero/monster) logic

**Key Functions**:

- `getCombatStats()` - Get all combat statistics
- `getCharacteristic()` - Get ability score
- `getSkillBonus()` - Calculate skill modifier
- `canUseAbility()` - Check ability usability
- `getConditions()` - Get active conditions

### Item Logic (`item-logic.ts`) - 322 lines

**Purpose**: Equipment and item management

**Key Functions**:

- `getLeveledItems()` - Get items by level
- `getImbuements()` - Get available enhancements
- `applyImbuement()` - Add magical properties
- `getCraftingRequirements()` - Get crafting needs
- `getItemBonus()` - Calculate item bonuses

### Ability Logic (`ability-logic.ts`) - 471 lines

**Purpose**: Ability resolution and validation

**Key Functions**:

- `getDistance()` - Calculate ability range
- `getDamage()` - Calculate damage output
- `getKeywords()` - Get ability keywords
- `canUse()` - Check if ability can be used
- `getTargets()` - Determine valid targets
- `applyEffect()` - Resolve ability effects

**Test Coverage**: Has comprehensive unit tests in `ability-logic.test.ts`

---

## Data Models (Key Interfaces)

### Hero Model

**Location**: `/src/models/hero.ts`

```typescript
interface Hero {
  id: string;
  name: string;
  picture: string | null;
  folder: string;
  settingIDs: string[];
  ancestry: Ancestry | null;
  culture: Culture | null;
  class: HeroClass | null;
  career: Career | null;
  complication: Complication | null;
  features: Feature[];
  state: HeroState;
  abilityCustomizations: AbilityCustomization[];
}
```

### Feature Model (Discriminated Union)

**Location**: `/src/models/feature.ts`

25+ feature types using TypeScript discriminated unions:

- `FeatureAbility` - Grants an ability
- `FeatureAbilityData` - Modifies ability properties
- `FeatureBonus` - Numeric bonus to stats
- `FeatureCharacteristicBonus` - Bonus to characteristics
- `FeatureChoice` - Choose from multiple options
- `FeatureClassAbility` - Class-specific ability
- `FeatureDamageModifier` - Damage resistance/vulnerability
- `FeatureDomain` - Divine domain selection
- `FeatureKit` - Combat kit selection
- `FeatureLanguage` - Language proficiency
- `FeatureMultiple` - Multiple copies of features
- `FeaturePerk` - Perk selection
- `FeatureSkill` - Skill proficiency
- `FeatureSize` - Size category
- `FeatureSpeed` - Movement speed
- And 10+ more types...

### Ability Model

**Location**: `/src/models/ability.ts`

```typescript
interface Ability {
  id: string;
  name: string;
  description: string;
  type: AbilityUsage; // Action, Maneuver, Triggered, Free
  keywords: AbilityKeyword[];
  distance: AbilityDistance[];
  target: string;
  cost: AbilityCost;
  powerRoll: PowerRoll | null;
  effect: string;
  alternateEffects: string[];
  spend: Spend[];
}
```

### Monster Model

**Location**: `/src/models/monster.ts`

```typescript
interface Monster {
  id: string;
  name: string;
  size: number;
  level: number;
  role: MonsterRoleType;
  description: string;
  features: Feature[];
  stamina: number;
  speed: number;
  stability: number;
  freeStrike: number;
  characteristics: Record<Characteristic, number>;
}
```

### Encounter Model

**Location**: `/src/models/encounter.ts`

```typescript
interface Encounter {
  id: string;
  name: string;
  description: string;
  adventureID: string | null;
  slots: EncounterSlot[];
  objectives: EncounterObjective[];
  mapID: string | null;
  encounterLevel: number;
  malicePerRound: number;
  victoryCost: number;
  victoryCostPerLevel: number;
}
```

### Playbook Model

**Location**: `/src/models/playbook.ts`

```typescript
interface Playbook {
  id: string;
  name: string;
  adventures: Adventure[];
  encounters: Encounter[];
  negotiations: Negotiation[];
  montages: Montage[];
  monsters: Monster[];
  monsterGroups: MonsterGroup[];
  maps: TacticalMap[];
  encounterObjectives: EncounterObjective[];
  // Additional properties for session state
  activeAdventureID: string | null;
  activeEncounterID: string | null;
  initiativeOrder: CombatantID[];
  combatants: Combatant[];
}
```

---

## Enumerations (36 Total)

**Location**: `/src/enums/`

### Core Enumerations

| Enum | File | Values | Purpose |
|------|------|--------|---------|
| **AbilityDistanceType** | `abiity-distance-type.ts` | Reach, Ranged, Area, Self | Ability range types |
| **AbilityKeyword** | `ability-keyword.ts` | 50+ keywords | Ability categorization |
| **AbilityUsage** | `ability-usage.ts` | Action, Maneuver, Trigger, Free | When ability can be used |
| **AttitudeType** | `attitude-type.ts` | Hostile, Unfriendly, Indifferent, Friendly, Helpful | NPC attitudes |
| **Characteristic** | `characteristic.ts` | Might, Agility, Reason, Intuition, Presence | Character stats |
| **ConditionType** | `condition-type.ts` | 20+ conditions | Status effects |
| **CultureType** | `culture-type.ts` | 10+ cultures | Cultural backgrounds |
| **DamageModifierType** | `damage-modifier-type.ts` | Immunity, Resistance, Weakness | Damage interactions |
| **DamageType** | `damage-type.ts` | Acid, Cold, Corruption, Fire, Lightning, Poison, Psychic, Sonic | Damage types |
| **EncounterDifficulty** | `encounter-difficulty.ts` | Trivial, Easy, Standard, Hard, Extreme | Encounter ratings |
| **FeatureAddonType** | `feature-addon-type.ts` | Feature modification types | Feature enhancements |
| **FeatureField** | `feature-field.ts` | Feature property fields | Feature data structure |
| **FeatureType** | `feature-type.ts` | 25+ types | All feature categories |
| **FollowerType** | `follower-type.ts` | Follower, Retainer, Summon | NPC companion types |
| **HeroStatePage** | `hero-state-page.ts` | Main, Details, Abilities, Equipment | Hero UI pages |
| **ItemType** | `item-type.ts` | Weapon, Armor, Implement, Other | Equipment categories |
| **KitArmor** | `kit-armor.ts` | Light, Medium, Heavy, Shield | Armor types |
| **KitWeapon** | `kit-weapon.ts` | Melee, Ranged, Implement | Weapon categories |
| **LanguageType** | `language-type.ts` | 20+ languages | Languages available |
| **MonsterFeatureCategory** | `monster-feature-category.ts` | 10+ categories | Monster feature types |
| **MonsterOrganizationType** | `monster-organization-type.ts` | Solo, Grunt, etc. | Monster group roles |
| **MonsterRoleType** | `monster-role-type.ts` | Ambusher, Artillery, Brute, Controller, Defender, Harrier, Leader, Support | Tactical roles |
| **NegotiationTrait** | `negotiation-trait.ts` | Interest, Patience | Negotiation mechanics |
| **PanelMode** | `panel-mode.ts` | Full, Compact, Embedded | UI panel display modes |
| **PanelWidth** | `panel-width.ts` | Full, Wide, Medium, Narrow | Panel sizing |
| **PerkList** | `perk-list.ts` | Crafting, Exploration, Interpersonal, Intrigue, Lore, Supernatural | Perk categories |
| **RollState** | `roll-state.ts` | None, Started, Rolled | Roll progression |
| **RulesPage** | `rules-page.ts` | Overview, Abilities, Combat, etc. | Rules reference pages |
| **SheetPageSize** | `sheet-page-size.ts` | Letter, A4, A5 | PDF page sizes |
| **SkillList** | `skill-list.ts` | 20+ skills | Available skills |
| **StatBlockIcon** | `stat-block-icon.ts` | 20+ icons | Stat block visualization |
| **TacticalMapDisplayType** | `tactical-map-display-type.ts` | Grid, List | Map view modes |
| **TacticalMapEditMode** | `tactical-map-edit-mode.ts` | Terrain, Tokens | Map editing modes |
| **TerrainCategory** | `terrain-category.ts` | 6 categories | Terrain types |
| **TerrainRoleType** | `terrain-role-type.ts` | Obstacle, Hazard, etc. | Terrain tactical roles |

---

## Component Architecture

### Component Hierarchy

```
Main (App Shell)
├── Welcome Page
├── Heroes Section
│   ├── Hero List Page
│   ├── Hero View Page
│   ├── Hero Edit Page
│   │   ├── Start Section
│   │   ├── Ancestry Section
│   │   ├── Culture Section
│   │   ├── Career Section
│   │   ├── Class Section
│   │   ├── Complication Section
│   │   └── Details Section
│   └── Hero Sheet Pages
│       ├── Hero Sheet Page (Classic)
│       ├── Hero Sheet Preview Page
│       └── Standard Abilities Page
├── Library Section
│   ├── Library List Page
│   └── Library Edit Page
├── Playbook Section (GM Prep)
│   ├── Playbook List Page
│   └── Playbook Edit Page
└── Session Section (Live Game)
    ├── Session Director Page
    └── Session Player Page
```

### Pages (22 Components)

**Location**: `/src/components/pages/`

#### Heroes Pages

- `heroes/hero-list/hero-list-page.tsx` - Browse and manage heroes
- `heroes/hero-view/hero-view-page.tsx` - View hero details
- `heroes/hero-edit/hero-edit-page.tsx` - Edit hero (main page)
  - `hero-edit/start-section/start-section.tsx`
  - `hero-edit/ancestry-section/ancestry-section.tsx`
  - `hero-edit/culture-section/culture-section.tsx`
  - `hero-edit/career-section/career-section.tsx`
  - `hero-edit/class-section/class-section.tsx`
  - `hero-edit/complication-section/complication-section.tsx`
  - `hero-edit/details-section/details-section.tsx`
- `heroes/hero-sheet/hero-sheet-page.tsx` - Classic character sheet
- `heroes/hero-sheet/hero-sheet-preview-page.tsx` - Sheet preview
- `heroes/hero-sheet/standard-abilities-page.tsx` - Ability cards

#### Library Pages

- `library/library-list/library-list-page.tsx` - Browse homebrew content
- `library/library-edit/library-edit-page.tsx` - Edit homebrew sourcebooks

#### Playbook Pages

- `playbook/playbook-list/playbook-list-page.tsx` - Browse encounters/adventures
- `playbook/playbook-edit/playbook-edit-page.tsx` - Edit game content

#### Session Pages

- `session/director/session-director-page.tsx` - GM session control
- `session/player/session-player-page.tsx` - Player session view

#### Welcome Page

- `welcome/welcome-page.tsx` - Landing page

### Panels (133 Components)

**Location**: `/src/components/panels/`

Too many to list individually, but organized by purpose:

- **Ability Panels**: Ability display, ability group, ability modifier
- **Character Panels**: Ancestry, career, class, complication, culture
- **Combat Panels**: Initiative, damage, conditions, power rolls
- **Encounter Panels**: Encounter setup, objectives, difficulty
- **Feature Panels**: Feature display, feature choice, feature bonus
- **Monster Panels**: Monster stat block, monster group, monster role
- **Session Panels**: Turn tracker, combat log, player info
- **Tactical Panels**: Map display, terrain, positioning
- **Utility Panels**: Notes, XP tracker, loot, conditions

### Modals (39 Components)

**Location**: `/src/components/modals/`

Dialog windows for specific interactions:

- Ability selection/editing
- Element selection (for feature choices)
- Encounter creation/editing
- Monster selection
- Map creation/editing
- Settings and preferences
- Import/export dialogs
- Confirmation dialogs

### Controls (14 Components)

**Location**: `/src/components/controls/`

Reusable UI elements:

- Buttons, toggles, dropdowns
- Number inputs, text fields
- Color pickers
- Image upload
- Drag-and-drop areas
- Search/filter controls

---

## Utility Modules

### Collections (`collections.ts`)

Array and object manipulation utilities:

- `unique()` - Remove duplicates
- `sortBy()` - Sort by property
- `groupBy()` - Group by property
- `distinct()` - Get unique values

### Format (`format.ts`)

Text formatting utilities:

- `capitalize()` - Capitalize text
- `pluralize()` - Add plural forms
- `startsWithVowel()` - Check vowel start
- `formatNumber()` - Number formatting
- `formatModifier()` - Format +/- modifiers

### Random (`random.ts`)

Random number generation:

- `randomInt()` - Random integer in range
- `randomElement()` - Random array element
- `shuffle()` - Shuffle array
- `rollDice()` - Dice rolling

### Name Generator (`name-generator.ts`)

Generate random names:

- `generateName()` - Random character name
- `generateMonsterName()` - Random monster name
- Markov chain-based generation

### Utils (`utils.ts`)

General utility functions:

- `debounce()` - Debounce function calls
- `deepClone()` - Deep object cloning
- `uuid()` - Generate unique IDs
- `downloadFile()` - Trigger file download

### Feature Flags (`feature-flags.ts`)

Feature toggle system:

- `isFeatureEnabled()` - Check feature status
- `setFeatureEnabled()` - Enable/disable features
- Used for experimental features

---

## Custom React Hooks

**Location**: `/src/hooks/`

### `use-dimensions.ts`

Track element dimensions:

```typescript
const { width, height } = useDimensions(ref);
```

### `use-error-listener.ts`

Global error handler:

```typescript
useErrorListener(() => {
  // Handle errors
});
```

### `use-is-small.ts`

Check if screen is small:

```typescript
const isSmall = useIsSmall();
```

### `use-media-query.ts`

Responsive media queries:

```typescript
const matches = useMediaQuery('(min-width: 768px)');
```

### `use-navigation.ts`

Navigation helpers:

```typescript
const { goToHero, goToLibrary } = useNavigation();
```

### `use-sync-status.ts`

Track sync status:

```typescript
const { isSyncing, lastSync } = useSyncStatus();
```

### `use-theme.ts`

Theme management:

```typescript
const { theme, setTheme } = useTheme();
```

---

## Update/Migration System

**Location**: `/src/logic/update/`

Handles data migrations for backward compatibility when data structures change.

### Update Modules (8 Files)

| File | Purpose |
|------|---------|
| `ability-update-logic.ts` | Update ability definitions |
| `feature-update-logic.ts` | Update feature structures |
| `hero-update-logic.ts` | Migrate hero data |
| `item-update-logic.ts` | Update item definitions |
| `monster-update-logic.ts` | Migrate monster stats |
| `options-update-logic.ts` | Update user preferences |
| `playbook-update-logic.ts` | Migrate playbook data |
| `sourcebook-update-logic.ts` | Update sourcebook content |

All update logic runs at application startup (in `index.tsx`) before rendering the UI.

---

## Testing

**Framework**: Vitest 4.0.3

**Location**: Test files colocated with source files (`.test.ts` suffix)

### Test Files

| Test File | Lines | Coverage |
|-----------|-------|----------|
| `ability-logic.test.ts` | 287 | Ability calculation |
| `classic-sheet-builder.test.ts` | 173 | Sheet generation |
| `creature-logic.test.ts` | 142 | Creature management |
| `encounter-logic.test.ts` | 185 | Encounter difficulty |
| `format-logic.test.ts` | 95 | Text formatting |
| `hero-sheet-builder.test.ts` | 156 | Hero sheet export |
| `montage-logic.test.ts` | 78 | Montage mechanics |
| `sheet-formatter.test.ts` | 124 | Sheet formatting |
| `sheet-layout.test.ts` | 89 | Sheet layout |

### Running Tests

```bash
npm test              # Watch mode
vitest run            # Run once
npm run check         # Lint + test
```

---

## Build & Deployment

### Build Process

1. **TypeScript Compilation**: `tsc` checks types
2. **ESLint**: Code quality checks
3. **Vitest**: Run all tests
4. **Vite Build**: Bundle application
5. **Output**: Static files in `/dist`

### Build Commands

```bash
npm run build         # Production build
npm run predeploy     # Lint + test + build
npm run deploy        # Deploy to GitHub Pages
```

### Deployment Target

- **Platform**: GitHub Pages
- **URL**: <https://andyaiken.github.io/forgesteel/>
- **Base Path**: `/forgesteel/`

### Build Output (`/dist`)

```
dist/
├── index.html
├── manifest.json
├── sw.js (Service Worker)
├── assets/
│   ├── main-*.css
│   ├── main-*.js
│   ├── index.es-*.js
│   └── purify.es-*.js
└── [other assets]
```

---

## Application Workflow

### Startup Sequence

```
1. Load index.html
   ↓
2. Register Service Worker (PWA)
   ↓
3. Execute index.tsx
   ↓
4. Load data from LocalForage (6 stores)
   ↓
5. Run update logic (data migrations)
   ↓
6. Initialize theme
   ↓
7. Render Main component
   ↓
8. Route to appropriate page
```

### Hero Creation Workflow

```
1. Navigate to Heroes → Create New Hero
   ↓
2. Enter name and folder (Start Section)
   ↓
3. Choose Ancestry (21 options)
   ↓
4. Choose Culture (from ancestry cultures)
   ↓
5. Choose Career (18 options)
   ↓
6. Choose Class (10 options)
   ↓
7. Choose Subclass (class-specific)
   ↓
8. Choose Complication
   ↓
9. Customize Details:
   - Abilities (choose from class abilities)
   - Equipment (kits, items, weapons, armor)
   - Features (customize options)
   - Notes
   ↓
10. Save Hero → Persisted to LocalForage
```

### Session Workflow (GM)

```
1. Create Playbook (Preparation Mode)
   ↓
2. Create Adventures and Encounters
   ↓
3. Add Monsters to Encounters
   ↓
4. Design Tactical Maps
   ↓
5. Set Objectives and Victory Conditions
   ↓
6. Start Session (Director Mode)
   ↓
7. Run Encounter:
   - Roll initiative
   - Track turn order
   - Manage HP and conditions
   - Control tactical map
   - Award XP and loot
   ↓
8. End Encounter → Update playbook
   ↓
9. Continue Adventure or End Session
```

### Session Workflow (Player)

```
1. Join Session (Player Mode)
   ↓
2. Select Hero Character
   ↓
3. View Shared Game State:
   - Initiative order
   - Tactical map
   - Current turn
   - Enemy information
   ↓
4. Track Personal State:
   - HP and resources
   - Conditions
   - Abilities used
   ↓
5. Reference Abilities and Features
   ↓
6. Session ends → State persisted
```

---

## Key Design Patterns

### 1. Discriminated Unions (Type Safety)

The feature system uses TypeScript discriminated unions for type safety:

```typescript
type Feature =
  | FeatureAbility
  | FeatureBonus
  | FeatureChoice
  | FeatureSkill
  // ... 21 more types

// Each type has a unique 'type' discriminator
interface FeatureAbility {
  type: 'ability';
  ability: Ability;
}

interface FeatureBonus {
  type: 'bonus';
  field: string;
  value: number;
}

// TypeScript can narrow types based on discriminator
function processFeature(feature: Feature) {
  if (feature.type === 'ability') {
    // TypeScript knows this is FeatureAbility
    console.log(feature.ability.name);
  }
}
```

### 2. Factory Pattern (Object Creation)

All complex objects are created through factory methods:

```typescript
// Factory methods ensure consistent initialization
FactoryLogic.createHero()
FactoryLogic.createMonster()
FactoryLogic.createAbility()
FactoryLogic.createFeature(type)
```

### 3. Logic Modules (Business Logic Separation)

Business logic is separated from UI in static utility classes:

```typescript
// Logic modules are pure functions
HeroLogic.getAbilities(hero)
MonsterLogic.getStamina(monster)
TacticalMapLogic.getDistance(cell1, cell2)
```

### 4. LocalForage (Persistence Layer)

All data persistence goes through LocalForage (IndexedDB):

```typescript
// Save data
await localforage.setItem('forgesteel-heroes', heroes);

// Load data
const heroes = await localforage.getItem<Hero[]>('forgesteel-heroes');
```

### 5. React Component Hierarchy

Components follow a clear hierarchy:

- **Pages**: Top-level routes
- **Panels**: Major UI sections
- **Modals**: Dialog windows
- **Controls**: Reusable elements

### 6. Update Logic (Data Migration)

Data migrations handle version changes:

```typescript
// Update logic runs at startup
HeroUpdateLogic.updateHero(hero, sourcebooks);
// Ensures backward compatibility
```

---

## File Reference (Key Files)

### Entry Points

| File | Lines | Description |
|------|-------|-------------|
| `index.tsx` | 144 | Application entry point, data loading |
| `index.html` | 39 | HTML shell, PWA configuration |
| `sw.ts` | - | Service worker for PWA |

### Core Models

| File | Lines | Description |
|------|-------|-------------|
| `models/hero.ts` | 40 | Hero character definition |
| `models/feature.ts` | ~800 | Feature system (25+ types) |
| `models/ability.ts` | ~300 | Ability definitions |
| `models/monster.ts` | ~250 | Monster stat blocks |
| `models/playbook.ts` | ~400 | Game session data |
| `models/encounter.ts` | ~200 | Combat encounters |
| `models/tactical-map.ts` | ~150 | Grid-based maps |

### Logic Modules (Largest)

| File | Lines | Description |
|------|-------|-------------|
| `logic/hero-logic.ts` | 1,192 | Hero feature calculation |
| `logic/factory-logic.ts` | 1,049 | Object creation factories |
| `logic/feature-logic.ts` | 1,052 | Feature processing |
| `logic/tactical-map-logic.ts` | 749 | Map and grid logic |
| `logic/retainer-logic.ts` | 697 | NPC follower management |
| `logic/monster-logic.ts` | 667 | Monster stat calculation |
| `logic/encounter-logic.ts` | 486 | Encounter difficulty |
| `logic/creature-logic.ts` | 485 | Generic creature logic |
| `logic/ability-logic.ts` | 471 | Ability resolution |

### Data Files (Largest)

| File | Lines | Description |
|------|-------|-------------|
| `data/sourcebooks/core.ts` | ~2,500 | Core rulebook content |
| `data/sourcebooks/draachenmar.ts` | ~1,200 | Dragon expansion |
| `data/ability-data.ts` | ~1,800 | All abilities |
| `data/monster-data.ts` | ~1,500 | Monster compilation |
| `data/class-data.ts` | ~800 | Class compilation |
| `data/ancestry-data.ts` | ~600 | Ancestry compilation |

### Main Components

| File | Description |
|------|-------------|
| `components/main/main.tsx` | Main app shell, routing |
| `components/pages/heroes/hero-edit/hero-edit-page.tsx` | Hero creation wizard |
| `components/pages/session/director/session-director-page.tsx` | GM session control |
| `components/pages/playbook/playbook-edit/playbook-edit-page.tsx` | Game preparation |

---

## Development Guidelines

### Code Style

- **TypeScript**: Strict mode enabled
- **Linting**: ESLint with TypeScript rules
- **Formatting**: Stylistic plugin for consistent style
- **Testing**: Vitest for unit tests

### File Naming Conventions

- **Components**: kebab-case (e.g., `hero-edit-page.tsx`)
- **Models**: kebab-case (e.g., `hero-state.ts`)
- **Logic**: kebab-case (e.g., `hero-logic.ts`)
- **Enums**: kebab-case (e.g., `ability-keyword.ts`)

### Import Aliases

```typescript
// Path aliases configured in tsconfig.json
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { FactoryLogic } from '@/logic/factory-logic';
```

### Adding New Features

1. **Define Model** in `/src/models/`
2. **Add Logic Module** in `/src/logic/`
3. **Create Factory Method** in `factory-logic.ts`
4. **Add Update Logic** in `/src/logic/update/`
5. **Create Components** in `/src/components/`
6. **Add Tests** colocated with logic
7. **Update Data Files** if needed

---

## Troubleshooting

### Common Issues

**Build Errors**

- Run `npm run lint` to check TypeScript errors
- Ensure all imports use correct path aliases
- Check for unused imports

**Test Failures**

- Run `npm test` to see which tests fail
- Check test assertions match current logic
- Update tests if data models changed

**LocalForage Issues**

- Clear browser data if schema changes
- Check browser console for errors
- Ensure LocalForage keys match

**PDF Export Issues**

- Check jsPDF version compatibility
- Ensure html2canvas can access elements
- Verify CSS doesn't break export

---

## Summary

**Forgesteel** is a sophisticated, feature-rich character builder and session management tool for Draw Steel. Built with modern React/TypeScript, it provides:

✅ Complete character creation system with 10 classes and 21 ancestries
✅ Comprehensive game master tools for encounter design and session management
✅ Real-time multiplayer session support (director + player views)
✅ Homebrew content creation system
✅ PDF/PNG character sheet export
✅ Tactical grid-based combat system
✅ Offline-capable PWA with service worker
✅ IndexedDB persistence via LocalForage
✅ Type-safe codebase with extensive TypeScript usage
✅ Modular architecture with clear separation of concerns
✅ Comprehensive business logic layer
✅ 198K+ lines of well-organized code

The application demonstrates professional software engineering practices including discriminated unions for type safety, factory patterns for object creation, comprehensive testing, data migration strategies, and a clean component-based architecture.

---

**Documentation Generated**: November 4, 2025
**Version Documented**: 11.96.0
**Total Project Size**: 613 files, 198,413 lines of code
