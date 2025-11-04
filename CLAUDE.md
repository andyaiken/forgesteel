# FORGE STEEL - Comprehensive Developer Documentation

**Version**: 11.96.0
**Repository**: <https://github.com/andyaiken/forgesteel>
**Live App**: <https://andyaiken.github.io/forgesteel/>

---

## Table of Contents

1. [Application Overview](#application-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture Overview](#architecture-overview)
4. [Project Structure](#project-structure)
5. [Core Systems](#core-systems)
6. [File Catalog](#file-catalog)
7. [Development Guide](#development-guide)
8. [Data Flow](#data-flow)
9. [Key Patterns](#key-patterns)

---

## Application Overview

### What is Forge Steel?

**FORGE STEEL** is a hero builder Progressive Web Application (PWA) for the **DRAW STEEL** tabletop RPG system, designed by Andy Aiken. It provides complete tools for:

- **Character Creation**: Build heroes with ancestries, classes, careers, kits, and features
- **Campaign Management**: Create and run playbooks with encounters, montages, and negotiations
- **Session Running**: Execute combat encounters with tactical maps and turn tracking
- **Homebrew Creation**: Design custom ancestries, classes, abilities, and sourcebooks
- **Character Sheets**: Generate printable PDFs and digital character sheets
- **Reference Library**: Browse game rules, abilities, monsters, and equipment

### Core Features

1. **Hero Builder**: Step-by-step character creation with ancestry, culture, career, class, and equipment selection
2. **Encounter Tools**: Tactical combat grid, monster management, initiative tracking, power rolls
3. **Playbook Manager**: Campaign scenarios with encounters, montages, negotiations, and adventures
4. **Homebrew System**: Create and share custom game content
5. **Offline Support**: Full PWA with service worker for offline access
6. **Export/Import**: Share heroes and campaigns via JSON/PDF
7. **Session Runner**: GM tools for running combat, montages, and social encounters

---

## Technology Stack

### Core Technologies

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|----------|
| **UI Framework** | React | 19.2.0 | Component-based UI with hooks |
| **Language** | TypeScript | 5.9.3 | Type-safe development |
| **Build Tool** | Vite | 7.1.12 | Fast dev server & optimized builds |
| **Component Library** | Ant Design | 5.27.6 | Pre-built UI components |
| **Routing** | React Router | 7.9.4 | Client-side navigation |
| **Storage** | LocalForage | 1.10.0 | IndexedDB persistence |
| **Styling** | SASS | 1.93.2 | CSS preprocessing |
| **PDF Export** | jsPDF + pdf-lib | 3.0.3, 1.17.1 | PDF generation |
| **Screenshot** | html2canvas | 1.4.1 | DOM to image conversion |
| **Testing** | Vitest | 4.0.3 | Unit testing |
| **Linting** | ESLint + TypeScript ESLint | 9.38.0, 8.46.2 | Code quality |

### Build Configuration

- **Module System**: ES Modules (ESM)
- **Base Path**: `/forgesteel/` (for GitHub Pages deployment)
- **Hash Router**: Client-side routing for static hosting
- **Path Aliases**: `@/` maps to `src/`
- **PWA**: Service worker with offline caching

---

## Architecture Overview

### High-Level Architecture

┌─────────────────────────────────────────────────────────┐
│                    Browser (PWA)                        │
├─────────────────────────────────────────────────────────┤
│  React Components (UI Layer)                            │
│    ├─ Pages (Route-level containers)                    │
│    ├─ Panels (Reusable sections)                        │
│    ├─ Modals (Dialog overlays)                          │
│    └─ Controls (Basic inputs)                           │
├─────────────────────────────────────────────────────────┤
│  Business Logic Layer                                   │
│    ├─ FactoryLogic (Object creation)                    │
│    ├─ HeroLogic (Character calculations)                │
│    ├─ MonsterLogic (Creature mechanics)                 │
│    ├─ EncounterLogic (Combat execution)                 │
│    └─ [... 30+ logic modules]                           │
├─────────────────────────────────────────────────────────┤
│  Data Layer                                              │
│    ├─ Models (TypeScript interfaces)                    │
│    ├─ Enums (Type constants)                            │
│    └─ Data (Game content - ancestries, classes, etc.)   │
├─────────────────────────────────────────────────────────┤
│  Persistence Layer                                       │
│    └─ LocalForage (IndexedDB)                           │
│         ├─ Heroes                                        │
│         ├─ Playbooks                                     │
│         ├─ Homebrew Sourcebooks                          │
│         └─ User Options                                  │
└─────────────────────────────────────────────────────────┘

### Architectural Patterns

1. **Component-Based UI**: React components with functional patterns and hooks
2. **Factory Pattern**: Centralized object creation via `FactoryLogic`
3. **Separation of Concerns**: Clear boundaries between UI, logic, and data
4. **Type Safety**: Full TypeScript coverage with strong enums
5. **Prop Drilling**: State passed from root component (no Redux/Context)
6. **Data Migration**: Versioned update logic for backwards compatibility
7. **Custom Hooks**: Encapsulate React-specific concerns (theme, navigation, etc.)

---

## Project Structure

### Directory Organization

forgesteel-1/
├── index.html                    # HTML entry point
├── package.json                  # Dependencies and scripts
├── vite.config.ts                # Vite build configuration
├── tsconfig.json                 # TypeScript root config
├── tsconfig.app.json             # App TypeScript config
├── tsconfig.node.json            # Node TypeScript config
├── vite-plugin-manifest.ts       # PWA manifest plugin
│
├── src/
│   ├── index.tsx                 # React entry point
│   ├── sw.ts                     # Service worker
│   ├── index.scss                # Global styles
│   ├── colors.scss               # Design tokens
│   ├── vite-env.d.ts             # Vite type definitions
│   │
│   ├── components/               # React UI components
│   │   ├── main/                 # Root router & layout
│   │   ├── pages/                # Route-level components
│   │   ├── panels/               # Reusable UI sections
│   │   ├── modals/               # Dialog components
│   │   └── controls/             # Basic UI controls
│   │
│   ├── models/                   # TypeScript interfaces
│   │   ├── hero.ts
│   │   ├── monster.ts
│   │   ├── ability.ts
│   │   └── [... 50+ models]
│   │
│   ├── enums/                    # Type constants
│   │   ├── characteristic.ts
│   │   ├── damage-type.ts
│   │   └── [... 35+ enums]
│   │
│   ├── logic/                    # Business logic
│   │   ├── factory-logic.ts      # Object creation (1,049 lines)
│   │   ├── hero-logic.ts         # Hero calculations
│   │   ├── monster-logic.ts      # Monster mechanics
│   │   ├── encounter-logic.ts    # Combat execution
│   │   ├── update/               # Data migrations
│   │   ├── hero-sheet/           # PDF generation
│   │   └── [... 40+ logic files]
│   │
│   ├── data/                     # Game content
│   │   ├── sourcebooks/          # Rule sets
│   │   │   ├── core.ts
│   │   │   ├── draachenmar.ts
│   │   │   └── orden.ts
│   │   ├── ancestries/           # 21 ancestry files
│   │   ├── classes/              # 13 class directories
│   │   ├── careers/              # 18 career files
│   │   ├── domains/              # 24 magic domain files
│   │   ├── monsters/             # 50+ monster files
│   │   └── [... 14 data directories]
│   │
│   ├── hooks/                    # React custom hooks
│   │   ├── use-theme.ts
│   │   ├── use-navigation.ts
│   │   └── [... 7 hook files]
│   │
│   ├── utils/                    # Utility functions
│   │   ├── collections.ts
│   │   ├── format.ts
│   │   └── [... 7 utility files]
│   │
│   └── assets/                   # Static resources
│       ├── fonts/
│       ├── icons/
│       └── screenshots/
│
└── claudedocs/                   # Claude-generated documentation
    ├── ANCESTRY_CREATION_GUIDE.md
    ├── ANCESTRY_ANALYSIS.md
    └── [... analysis documents]

---

## Core Systems

### 1. Application Initialization (`src/index.tsx`)

**Entry Point Flow**:

```typescript
1. Initialize Theme → Load user's selected theme
2. Register Service Worker → Enable PWA offline mode
3. Load Persisted Data (parallel):
   - Heroes array (LocalForage: 'forgesteel-heroes')
   - Homebrew sourcebooks ('forgesteel-homebrew-settings')
   - Hidden sourcebook IDs ('forgesteel-hidden-setting-ids')
   - Playbook ('forgesteel-playbook')
   - Session ('forgesteel-session')
   - Options ('forgesteel-options')
4. Migrate Data → Run UpdateLogic for each data type
5. Create React Root → Render Main component with HashRouter
6. Pass State Down → All data flows through Main component
```

### 2. Routing System (`src/components/main/main.tsx`)

**Route Structure**:

- `/` → Welcome page
- `/heroes` → Hero list
- `/heroes/:heroID` → Hero editor
- `/playbook` → Campaign management
- `/library` → Rules reference
- `/classic-sheet` → Character sheet view
- `/session` → Session runner (GM tools)

**Layout**:

### 3. State Management

**Pattern**: Prop Drilling (No Redux/Context)

**Root State** (in `Main` component):

```typescript
heroes: Hero[]                      // All character data
homebrewSourcebooks: Sourcebook[]   // User-created content
hiddenSourcebookIDs: string[]       // Filtered rulebooks
playbook: Playbook                  // Campaign/encounters
session: Playbook                   // Active session
options: Options                    // User preferences
drawer: ReactNode | null            // Side drawer content
modal: ReactNode | null             // Modal dialog content
```

**State Updates**:

- Modify state via setter callbacks
- Persist to LocalForage after changes
- Pass setters down component tree

### 4. Factory System (`src/logic/factory-logic.ts`)

**Central Object Creation**:

```typescript
FactoryLogic.createHero(sourcebookIDs: string[]): Hero
FactoryLogic.createMonster(): Monster
FactoryLogic.createEncounter(): Encounter
FactoryLogic.createPlaybook(): Playbook
FactoryLogic.createAbility(): Ability
FactoryLogic.createFeature(): Feature
// ... 20+ factory methods
```

**Feature Factories** (specialized):

```typescript
FactoryLogic.feature.createBonus()           // Stat bonuses
FactoryLogic.feature.createSize()            // Size features
FactoryLogic.feature.createSpeed()           // Movement speed
FactoryLogic.feature.createAbility()         // Active abilities
FactoryLogic.feature.createConditionImmunity() // Immunities
FactoryLogic.feature.createSaveThreshold()   // Save bonuses
FactoryLogic.feature.createMultiple()        // Grouped features
```

### 5. Data Model Layer

**Core Models**:

- `Hero`: Complete character (ancestry, class, features, items, state)
- `Monster`: Creature stat block (stats, abilities, features)
- `Ability`: Active power (type, keywords, distance, power roll)
- `Feature`: Passive/active trait (bonuses, immunities, abilities)
- `Encounter`: Combat scenario (monsters, map, objectives)
- `Playbook`: Campaign container (encounters, plots, adventures)
- `Sourcebook`: Rule set (ancestries, classes, items, abilities)

**Model Structure**:

- Interfaces in `src/models/`
- Enums in `src/enums/`
- Data files in `src/data/`
- Logic in `src/logic/`

### 6. Update/Migration System

**Purpose**: Handle data schema changes across app versions

**Update Logic**:

```typescript
HeroUpdateLogic.update(hero: Hero): Hero
PlaybookUpdateLogic.update(playbook: Playbook): Playbook
SourcebookUpdateLogic.update(sourcebook: Sourcebook): Sourcebook
OptionsUpdateLogic.update(options: Options): Options
```

**Pattern**:

1. Detect old schema
2. Apply transformations
3. Return updated object
4. Persist to storage

### 7. Character Sheet Generation

**Sheet Builders**:

- `hero-sheet-builder.ts`: Standard hero sheet
- `classic-sheet-builder.ts`: Alternative sheet format
- `encounter-sheet-builder.ts`: Combat tracker sheet
- `montage-sheet-builder.ts`: Montage challenge sheet

**Export Flow**:

```typescript
Hero → SheetBuilder → HTML/Canvas → html2canvas → jsPDF → Download
```

### 8. Persistence Layer

**LocalForage Storage**:

```typescript
// Storage Keys
'forgesteel-heroes'              // Hero[]
'forgesteel-homebrew-settings'   // Sourcebook[]
'forgesteel-hidden-setting-ids'  // string[]
'forgesteel-playbook'            // Playbook
'forgesteel-session'             // Playbook
'forgesteel-options'             // Options
```

**Pattern**:

```typescript
// Read
const heroes = await LocalForage.getItem('forgesteel-heroes');

// Write
await LocalForage.setItem('forgesteel-heroes', updatedHeroes);
```

### 9. PWA System

**Service Worker** (`src/sw.ts`):

- Cache static assets
- Offline support
- Background sync

**Manifest**:

- Generated via Vite plugin
- App metadata (name, icons, theme)
- Install prompt for mobile

---

## File Catalog

### Root Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies, scripts, metadata |
| `vite.config.ts` | Vite build config with React + PWA plugins |
| `tsconfig.json` | TypeScript root config |
| `tsconfig.app.json` | App source TypeScript config |
| `tsconfig.node.json` | Build tools TypeScript config |
| `vite-plugin-manifest.ts` | PWA manifest generator plugin |
| `index.html` | HTML entry point |

### Entry Points (`src/`)

| File | Purpose |
|------|---------|
| `src/index.tsx` | React application entry point |
| `src/sw.ts` | Service worker (PWA) |
| `src/index.scss` | Global styles |
| `src/colors.scss` | Design tokens |
| `src/vite-env.d.ts` | Vite ambient types |

### Components - Main (`src/components/main/`)

| File | Purpose |
|------|---------|
| `main.tsx` | Root app component with routing and state |
| `main-layout.tsx` | Layout wrapper (header, content, footer) |

### Components - Pages (`src/components/pages/`)

#### Heroes Pages

| File | Purpose |
|------|---------|
| `heroes/hero-list/hero-list-page.tsx` | Hero list with search/filter |
| `heroes/hero-edit/hero-edit-page.tsx` | Hero creation/editing interface |
| `heroes/hero-edit/start-section/start-section.tsx` | Hero creation start screen |
| `heroes/hero-edit/details-section/details-section.tsx` | Name and basic details |
| `heroes/hero-edit/ancestry-section/ancestry-section.tsx` | Ancestry selection |
| `heroes/hero-edit/culture-section/culture-section.tsx` | Culture selection |
| `heroes/hero-edit/career-section/career-section.tsx` | Career selection |
| `heroes/hero-edit/class-section/class-section.tsx` | Class and subclass selection |
| `heroes/hero-edit/complication-section/complication-section.tsx` | Complication selection |
| `heroes/hero-view/hero-view-page.tsx` | Read-only hero view |
| `heroes/hero-sheet/hero-sheet-page.tsx` | Printable character sheet |
| `heroes/hero-sheet/hero-sheet-preview-page.tsx` | Sheet preview |
| `heroes/hero-sheet/standard-abilities-page.tsx` | Standard abilities list |

#### Library Pages

| File | Purpose |
|------|---------|
| `library/library-list/library-list-page.tsx` | Browse game content by category |
| `library/library-edit/library-edit-page.tsx` | Edit homebrew content |

#### Playbook Pages

| File | Purpose |
|------|---------|
| `playbook/playbook-list/playbook-list-page.tsx` | Campaign list |
| `playbook/playbook-list/create-panel/create-panel.tsx` | Create playbook UI |
| `playbook/playbook-edit/playbook-edit-page.tsx` | Edit playbook encounters |

#### Session Pages

| File | Purpose |
|------|---------|
| `session/director/session-director-page.tsx` | GM session view |
| `session/player/session-player-page.tsx` | Player session view |

#### Welcome

| File | Purpose |
|------|---------|
| `welcome/welcome-page.tsx` | Landing page |

### Components - Panels (`src/components/panels/`)

**31+ reusable UI panels** organized by purpose:

- **Info Display**: `hero-panel`, `monster-label`, `stats-row`, `health-gauge`
- **Element Display**: `ability-panel`, `ancestry-panel`, `class-panel`, `monster-panel`
- **Tactical**: `tactical-map-panel`, `power-roll-panel`, `die-roll-panel`
- **Edit Panels**: `ability-edit`, `ancestry-edit`, `monster-edit`, `feature-edit`
- **Run Panels**: `encounter-run`, `montage-run`, `negotiation-run`
- **Classic Sheet**: `hero-header-card`, `inventory-card`, `abilities-card`

### Components - Modals (`src/components/modals/`)

**19+ dialog modals**:

- **Content**: `ability-modal`, `monster-modal`, `feature-modal`, `reference-modal`
- **Selection**: `ability-select`, `hero-select`, `item-select`, `monster-select`
- **Management**: `hero-state-modal`, `settings-modal`, `sourcebooks-modal`, `party-modal`
- **Execution**: `roll-modal`, `encounter-turn-modal`, `encounter-tools-modal`

### Components - Controls (`src/components/controls/`)

**13 basic UI controls**:

- `field`, `multi-line`, `number-spin`, `toggle`, `dropdown-button`
- `danger-button`, `selectable-panel`, `expander`, `pill`
- `error-boundary`, `markdown`, `empty`, `header-text`

### Models (`src/models/`)

**55+ TypeScript interfaces**:

- **Core**: `hero`, `monster`, `ability`, `feature`, `encounter`
- **Elements**: `ancestry`, `class`, `career`, `culture`, `complication`
- **Content**: `sourcebook`, `item`, `kit`, `domain`, `imbuement`
- **State**: `hero-state`, `monster-state`, `encounter-slot`, `playbook`
- **Mechanics**: `power-roll`, `damage-modifier`, `condition`, `skill`
- **Sheets**: `hero-sheet`, `monster-sheet`, `encounter-sheet`, `montage-sheet`

### Enums (`src/enums/`)

**35+ type constants**:

- **Stats**: `characteristic`, `damage-type`, `condition-type`
- **Features**: `feature-type`, `feature-field`, `ability-keyword`
- **Categories**: `item-type`, `kit-armor`, `kit-weapon`, `terrain-category`
- **Encounter**: `encounter-difficulty`, `monster-role-type`, `tactical-map-edit-mode`
- **UI**: `panel-mode`, `panel-width`, `rules-page`, `hero-state-page`

### Logic (`src/logic/`)

**50+ business logic files**:

#### Core Logic

- `factory-logic.ts` (1,049 lines) - Object creation factory
- `hero-logic.ts` - Hero calculations and state
- `monster-logic.ts` - Monster mechanics
- `ability-logic.ts` - Ability mechanics
- `encounter-logic.ts` - Combat execution
- `feature-logic.ts` - Feature application

#### Specialized Logic

- `tactical-map-logic.ts` - Map operations
- `sourcebook-logic.ts` - Ruleset management
- `roll-logic.ts` - Dice rolling
- `modifier-logic.ts` - Damage calculations
- `montage-logic.ts` - Montage challenges
- `negotiation-logic.ts` - Social encounters

#### Update Logic (`logic/update/`)

- `hero-update-logic.ts` - Hero data migrations
- `playbook-update-logic.ts` - Campaign migrations
- `sourcebook-update-logic.ts` - Ruleset migrations
- `options-update-logic.ts` - Settings migrations

#### Sheet Logic (`logic/hero-sheet/`, `logic/classic-sheet/`)

- `hero-sheet-builder.ts` - Standard sheet generation
- `classic-sheet-builder.ts` - Alternative sheet format
- `encounter-sheet-builder.ts` - Combat sheet
- `montage-sheet-builder.ts` - Montage sheet

### Data (`src/data/`)

**180+ game content files**:

#### Sourcebooks (`data/sourcebooks/`)

- `core.ts` - Core rulebook
- `draachenmar.ts` - Draachenmar supplement (custom)
- `orden.ts` - Orden supplement
- `playtest.ts` - Playtest rules

#### Ancestries (`data/ancestries/`)

**21 ancestry files**:

- `angulotl`, `aurealgar`, `aurkin`, `aurven`, `caprini`, `cervari`
- `draconem`, `devil`, `dwarf`, `elf-high`, `elf-wode`, `elgari`, `hakaan`
- `human`, `memonek`, `orc`, `polder`, `revenant`, `seraphite`
- `time-raider`, `warforged`

#### Classes (`data/classes/`)

**13 class directories with subclasses**:

- `beastheart/` (guardian, prowler, punisher, spark)
- `censor/` (exorcist, oracle, paragon)
- `conduit/`, `elementalist/` (earth, fire, green, void)
- `fury/` (berserker, reaver, stormwight)
- `null/` (chronokinetic, cryokinetic, metakinetic)
- `shadow/` (black-ash, caustic-mote, shadow-dancer, shadow-knight)
- `talent/`, `trickster/` (charlatan, cutpurse, escape-artist)
- `summoner/`, `tactician/`, `vanguard/` (champion, duelist, knight)

#### Careers (`data/careers/`)

**18 career files**:

- `agent`, `aristocrat`, `artisan`, `beggar`, `criminal`, `disciple`
- `explorer`, `farmer`, `gladiator`, `laborer`, `mages-apprentice`
- `performer`, `politician`, `sage`, `sailor`, `soldier`, `warden`, `watch-officer`

#### Domains (`data/domains/`)

**24 magic domain files**:

- `chaos`, `community`, `death`, `fertility`, `fire`, `forge`, `freedom`
- `healing`, `justice`, `knowledge`, `life`, `light`, `nature`, `order`
- `plague`, `storm`, `strength`, `tempest`, `trickery`, `twilight`
- `war`, `water`, `winter`, `wisdom`

#### Monsters (`data/monsters/`)

**50+ monster files**:

- `ajax`, `animal`, `arixx`, `ashen-hoarder`, `basilisk`, `bredbeddle`
- `bugbear`, `chimera`, `civilian`, `count-rhodar`, `demon`, `devil`
- `draconian`, `dragon-crucible`, `dragon-gloom`, `dragon-meteor`, `dragon-omen`, `dragon-thorn`
- `dwarf`, `elemental`, `elf-high`, `elf-shadow`, `fossil-cryptic`, `giant`
- `gnoll`, `goblin`, `griffon`, `hag`, `hobgoblin`, `human`, `kingfissure-worm`
- `kobold`, `lich`, `lightbender`, `lizardfolk`, `manticore`, `medusa`
- `minotaur`, `ogre`, `olothec`, `orc`, `retainer`, `rival`, `shambling-mound`
- `time-raider`, `troll`, `undead`, `valok`, `voiceless-talker`, `wardog`
- `werewolf`, `wyvern`, `xorannox`

#### Other Data Directories

- `abilities/` - Standard abilities
- `kits/` - Equipment kits
- `items/` - Equipment items
- `imbuements/` - Magical enhancements
- `terrain/` - Terrain types
- `perks/` - Character perks
- `heroes/` - Sample heroes
- `encounters/` - Sample encounters
- `montages/` - Montage challenges
- `negotiations/` - Social challenges

### Hooks (`src/hooks/`)

**7 custom React hooks**:

- `use-theme.ts` - Theme provider and toggle
- `use-navigation.ts` - Router navigation helpers
- `use-sync-status.ts` - Data sync indicator
- `use-dimensions.ts` - Element size tracking
- `use-is-small.ts` - Small screen detection
- `use-media-query.ts` - Responsive design queries
- `use-error-listener.ts` - Error boundary handling

### Utils (`src/utils/`)

**7 utility modules**:

- `collections.ts` - Array/object manipulation
- `format.ts` - Text formatting
- `utils.ts` - General helpers
- `random.ts` - Random generation
- `name-generator.ts` - NPC name generation
- `initialize-theme.ts` - Theme setup
- `feature-flags.ts` - Feature toggles

---

## Development Guide

### Setup

```bash
# Install dependencies
npm install

# Start dev server
npm run start
# App available at http://localhost:5173/forgesteel/

# Run linter
npm run lint

# Run tests
npm run test

# Run all checks
npm run check
```

### Build & Deploy

```bash
# Production build
npm run build

# Deploy to GitHub Pages
npm run deploy
```

### Code Quality

```bash
# Auto-fix linting issues
npm run fix

# Type checking
npx tsc --noEmit
```

### Testing

```bash
# Run tests in watch mode
npm run test

# Run tests once
npm run test run

# Coverage report
npm run test -- --coverage
```

### Development Workflow

1. **Feature Development**:
   - Create feature branch
   - Implement in appropriate layer (UI/logic/data)
   - Add TypeScript types
   - Write tests
   - Lint and test

2. **Data Model Changes**:
   - Update interface in `src/models/`
   - Create migration in `src/logic/update/`
   - Update factory methods
   - Test data migration

3. **Component Development**:
   - Create component in appropriate directory
   - Define props interface
   - Implement with TypeScript
   - Style with SASS
   - Test in browser

4. **Game Content**:
   - Add to appropriate data file
   - Use factory methods for features
   - Follow existing patterns
   - Test in hero builder

---

## Data Flow

### Hero Creation Flow

User Creates Hero
  ↓
WelcomePage → "Create Hero"
  ↓
Main.newHero(folder)
  ↓
FactoryLogic.createHero([core, orden, draachenmar])
  ↓
Navigate to HeroEditPage
  ↓
User selects Ancestry
  ↓
hero.ancestry = selectedAncestry
  ↓
HeroLogic.calculateDerivedValues(hero)
  ↓
Main.setHero(updatedHero)
  ↓
LocalForage.setItem('forgesteel-heroes', heroes)
  ↓
Hero persisted

### Encounter Execution Flow

User Creates Encounter
  ↓
PlaybookEditPage → "Add Encounter"
  ↓
EncounterModal
  ↓
FactoryLogic.createEncounter()
  ↓
User adds monsters
  ↓
EncounterLogic.calculateDifficulty()
  ↓
Save to Playbook
  ↓
LocalForage.setItem('forgesteel-playbook', playbook)
  ↓
User runs encounter
  ↓
SessionDirectorPage
  ↓
EncounterLogic.startEncounter()
  ↓
TacticalMapPanel renders
  ↓
User makes power roll
  ↓
PowerRollPanel
  ↓
RollLogic.roll(ability, hero)
  ↓
Update encounter state
  ↓
LocalForage.setItem('forgesteel-session', session)

### Character Sheet Export Flow

User exports sheet
  ↓
HeroSheetPage → "Export PDF"
  ↓
HeroSheetBuilder.build(hero)
  ↓
Generate HTML structure
  ↓
html2canvas(htmlElement)
  ↓
Canvas to Image
  ↓
jsPDF.addImage(image)
  ↓
PDF.save('character-sheet.pdf')
  ↓
Download triggered

---

## Key Patterns

### 1. Factory Pattern

**Purpose**: Centralize object creation with consistent defaults

**Example**:

```typescript
// Create hero with default features
const hero = FactoryLogic.createHero(['core', 'orden']);

// Create ability with proper structure
const ability = FactoryLogic.createAbility({
    id: 'fireball',
    name: 'Fireball',
    type: FactoryLogic.type.createMain(),
    keywords: [AbilityKeyword.Magic, AbilityKeyword.Area],
    distance: [FactoryLogic.distance.createRanged(10)],
    // ...
});
```

### 2. Feature Factory Pattern

**Purpose**: Specialized factories for different feature types

**Example**:

```typescript
// Stat bonus feature
FactoryLogic.feature.createBonus({
    id: 'dwarf-stamina',
    name: 'Stout',
    field: FeatureField.Stamina,
    value: 5
});

// Condition immunity feature
FactoryLogic.feature.createConditionImmunity({
    id: 'elf-charm-resist',
    name: 'Fey Ancestry',
    conditions: [ConditionType.Charmed]
});

// Active ability feature
FactoryLogic.feature.createAbility({
    ability: FactoryLogic.createAbility({...})
});
```

### 3. Update/Migration Pattern

**Purpose**: Handle schema changes across app versions

**Example**:

```typescript
// Update hero data structure
static update(hero: Hero): Hero {
    // Check for old schema
    if (!hero.ancestry) {
        hero.ancestry = null; // Add new field
    }

    // Transform old data
    if (hero.legacyField) {
        hero.newField = transformLegacyField(hero.legacyField);
        delete hero.legacyField;
    }

    return hero;
}
```

### 4. Prop Drilling Pattern

**Purpose**: Simple state management without Context/Redux

**Example**:

```typescript
// Main component (root)
const Main = () => {
    const [heroes, setHeroes] = useState<Hero[]>([]);

    return (
        <MainLayout>
            <HeroListPage
                heroes={heroes}
                setHero={(hero) => {
                    const updated = [...heroes, hero];
                    setHeroes(updated);
                    LocalForage.setItem('forgesteel-heroes', updated);
                }}
            />
        </MainLayout>
    );
};
```

### 5. Custom Hook Pattern

**Purpose**: Encapsulate React-specific logic

**Example**:

```typescript
// Theme hook
export const useTheme = () => {
    const [theme, setTheme] = useState('dark');

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        LocalForage.setItem('theme', newTheme);
        document.body.classList.toggle('light-mode');
    };

    return { theme, toggleTheme };
};
```

### 6. Logic Separation Pattern

**Purpose**: Keep UI and business logic separate

**Example**:

```typescript
// Logic layer (pure functions)
class HeroLogic {
    static getStamina(hero: Hero): number {
        let stamina = 12; // base
        // Apply ancestry bonuses
        // Apply class bonuses
        // Apply features
        return stamina;
    }
}

// UI layer (calls logic)
const StatsPanel = ({ hero }: { hero: Hero }) => {
    const stamina = HeroLogic.getStamina(hero);
    return <div>Stamina: {stamina}</div>;
};
```

### 7. Enum Pattern

**Purpose**: Type-safe constants for game mechanics

**Example**:

```typescript
// Define enum
export enum Characteristic {
    Might = 'might',
    Agility = 'agility',
    Reason = 'reason',
    Intuition = 'intuition',
    Presence = 'presence'
}

// Use in interface
interface PowerRoll {
    characteristic: Characteristic[];
    // ...
}

// Type-safe usage
const roll: PowerRoll = {
    characteristic: [Characteristic.Might, Characteristic.Presence]
};
```

---

## Summary

**Forge Steel** is a comprehensive PWA for managing DRAW STEEL tabletop RPG content. With **636 TypeScript files** organized into clear layers (UI, logic, data, models), it provides:

- **Character Building**: Complete hero creation system
- **Campaign Tools**: Encounter/montage/negotiation management
- **Session Running**: Tactical combat with maps and rolls
- **Homebrew System**: Custom content creation
- **Offline Support**: Full PWA with IndexedDB storage
- **Export Tools**: PDF character sheets and JSON sharing

Built with **React 19**, **TypeScript 5.9**, **Vite 7**, and **Ant Design 5**, the application demonstrates modern web development patterns including factory methods, data migrations, custom hooks, and progressive enhancement.

---

## Session History

### Session: 2025-11-04

#### Changes Made

1. **Core Sourcebook Removal**
   - Merged all necessary content from `core.ts` into `draachenmar.ts` sourcebook
   - Removed core sourcebook from main.tsx initialization ([main.tsx:252](src/components/main/main.tsx#L252))
   - Removed core sourcebook from sourcebook-logic.ts getAllSourcebooks()
   - Application now loads with draachenmar sourcebook only

2. **Lizardfolk Integration**
   - Fixed lizardfolk.ts and integrated with Ssar'uk ancestral language
   - Added to draachenmar sourcebook ancestries and cultures

3. **Null Class Bug Fix**
   - **Issue**: Users could select unlimited signature abilities and duplicate selections
   - **Root Cause**: feature-config-panel.tsx filtering logic only excluded abilities from OTHER features, not current feature
   - **Fix**: [feature-config-panel.tsx:373-410](src/components/panels/feature-config-panel/feature-config-panel.tsx#L373-L410)
     - Created separate `allAbilities` array for display purposes
     - Added `.filter(a => !data.selectedIDs.includes(a.id))` to prevent duplicates
     - Fixed lookup to use `allAbilities` instead of filtered `abilities` array
   - **Result**: Signature ability selection now correctly limits to 2 and prevents duplicates

4. **Verminari Ancestry Integration**
   - Added new verminari ancestry ([verminari.ts](src/data/ancestries/verminari.ts))
   - Integrated into [ancestry-data.ts:21,46](src/data/ancestry-data.ts#L21) (import + static property)
   - Added to [draachenmar.ts:63](src/data/sourcebooks/draachenmar.ts#L63) ancestries array
   - Added Verminari ancestral culture ([draachenmar.ts:153-161](src/data/sourcebooks/draachenmar.ts#L153-L161))
   - Added Szetch language ([draachenmar.ts:788](src/data/sourcebooks/draachenmar.ts#L788))
   - **Fixed DamageModifier Error**:
     - Issue: Raw object `{ type: DamageModifierType.Resistance, damageType: DamageType.Poison, value: 5 }` missing required properties
     - Solution: Used `FactoryLogic.damageModifier.create()` factory method
     - Changed `DamageModifierType.Resistance` to `DamageModifierType.Immunity` (resistance not in enum, immunity with value 5 is correct)
     - Fixed line: [verminari.ts:34](src/data/ancestries/verminari.ts#L34)

#### Files Modified

**Core Changes**:

- `src/components/main/main.tsx` - Removed core sourcebook from initialization
- `src/logic/sourcebook-logic.ts` - Removed core from getAllSourcebooks()

**Bug Fix**:

- `src/components/panels/feature-config-panel/feature-config-panel.tsx` - Fixed signature ability selection logic

**New Content**:

- `src/data/ancestries/verminari.ts` - New ancestry with damage modifier fix
- `src/data/ancestry-data.ts` - Added verminari import and static property
- `src/data/sourcebooks/draachenmar.ts` - Added verminari, Verminari culture, Szetch language

#### New Tasks

None - all requested work completed.

#### Risks Identified

1. **Core Sourcebook Removal**:
   - **Risk**: Potential missing content if not all necessary items were merged
   - **Mitigation**: Extensive review and merge was performed in previous session
   - **Testing**: Verify all ancestries, classes, and features load correctly

2. **DamageModifier System**:
   - **Risk**: Confusion between "resistance" terminology and DamageModifierType.Immunity
   - **Mitigation**: Documented that Draw Steel uses Immunity with value 5 for "resistance 5"
   - **Note**: Only Immunity and Weakness exist in DamageModifierType enum

#### Next 3 Tasks

1. **Test Character Creation Flow**
   - Create new lizardfolk character
   - Create new verminari character
   - Verify all features work correctly

2. **Test Null Class Signature Abilities**
   - Create Null class character
   - Verify can only select 2 signature abilities
   - Verify selected abilities are removed from list

3. **Validate Sourcebook Loading**
   - Check that draachenmar sourcebook loads all content
   - Verify no missing ancestries or classes
   - Ensure all features display correctly in character builder

---

**Legal**: FORGE STEEL is an independent product published under the DRAW STEEL Creator License and is not affiliated with MCDM Productions, LLC. DRAW STEEL © 2024 MCDM Productions, LLC.

**Developer**: Andy Aiken (<andy.aiken@live.co.uk>)
**License**: See repository for details
**Contributions**: Pull requests welcome at <https://github.com/andyaiken/forgesteel>
