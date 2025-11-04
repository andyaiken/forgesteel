# Forgesteel Codebase Analysis

## Application Overview

**Forgesteel** is a comprehensive web-based hero builder and session management tool for the **DRAW STEEL** tabletop RPG system, designed by Andy Aiken and published under the DRAW STEEL Creator License by MCDM Productions.

### Primary Purpose

Create, customize, and manage player heroes with complete character building mechanics including:

- Character ancestry, culture, career, class, and complication selection
- Ability customization and feature configuration
- Equipment, perks, and domain selection
- Character sheet generation and PDF export
- Session management for Game Masters (Game Directors)
- Monster and encounter management

### Key Features

1. **Hero Builder** - Full character creation with Draw Steel core rules
2. **Homebrew System** - Create custom ancestries, classes, kits, and other elements
3. **Session Management** - Director and player views for running sessions
4. **Encounter Tools** - Monster groups, tactical maps, terrain management
5. **Playbook System** - Adventures, encounters, negotiations, montages, and tactical maps
6. **Character Sheets** - Classic and standard sheet rendering with export capabilities

---

## Tech Stack

### Core Framework

- **React 19.2.0** - UI framework with React Router 7.9.4 for routing
- **TypeScript 5.9.3** - Type-safe language
- **Vite 7.1.12** - Build tool and dev server
- **SASS 1.93.2** - Stylesheet preprocessor

### UI Component Library

- **Ant Design (antd) 5.27.6** - Enterprise UI component library
- **Ant Design Icons** - Icon library for UI elements

### Data & Storage

- **LocalForage 1.10.0** - LocalStorage-based persistence for heroes, sourcebooks, settings
- **Browser Service Worker** - PWA functionality for offline support

### Document Generation

- **jsPDF 3.0.3** - PDF generation
- **html2canvas 1.4.1** - HTML to canvas rendering
- **pdf-lib 1.17.1** - PDF manipulation library
- **modern-screenshot 4.6.6** - Advanced screenshot capture

### Content Processing

- **Showdown 2.1.0** - Markdown to HTML converter
- **@types/showdown** - TypeScript definitions

### Development Tools

- **ESLint 9.38.0** - Code linting and quality
- **Vitest 4.0.3** - Unit testing framework
- **gh-pages 6.3.0** - GitHub Pages deployment

---

## Project Statistics

- **Total TypeScript/TSX Files**: 613
- **Total Lines of Code**: ~198K
- **Major Component Directories**:
  - Panels: 133 components
  - Modals: 39 components
  - Pages: 22 components
  - Controls: 14 components
- **Core Logic Files**: 42 logic modules
- **Data Definition Files**: 21 sourcebook/data modules
- **Model Types**: 45+ TypeScript interfaces

---

## Directory Structure

### `/src/` Root Components

src/
├── assets/              # Images, screenshots, static files
├── colors.scss          # Global color definitions
├── index.scss           # Global styles
├── index.tsx            # App entry point (React root & LocalForage init)
├── sw.ts                # Service worker for PWA
├── vite-env.d.ts        # Vite type definitions
└── [subdirectories below...]

---

## `/src/data/` - Game Content & Rules Data

**Purpose**: Centralized repository for all Draw Steel game mechanics and content definitions

### Root Data Files (21 modules)

- `ability-data.ts` - All available abilities and their properties
- `ancestry-data.ts` - Ancestry definitions and features
- `career-data.ts` - Career paths and progression
- `class-data.ts` - Class definitions index
- `condition-data.ts` - Conditions and their effects
- `culture-data.ts` - Cultural backgrounds
- `complication-data.ts` - Character complications (108KB - largest data file)
- `domain-data.ts` - Magical domains
- `encounter-data.ts` - Encounter templates and configurations
- `encounter-objective-data.ts` - Objectives for encounters
- `hero-data.ts` - Hero template examples
- `kit-data.ts` - Equipment kits
- `monster-data.ts` - Monster definitions
- `montage-data.ts` - Narrative montage encounters
- `negotiation-data.ts` - Social encounter mechanics
- `perk-data.ts` - Special perks and abilities
- `project-data.ts` - Crafting projects
- `rules-data.ts` - Game rules references (45KB)
- `sourcebook-data.ts` - Sourcebook metadata
- `terrain-data.ts` - Battlefield terrain types
- `title-data.ts` - Titles and honors (91KB - character progression)

### Data Subdirectories

#### `/ancestries/` - Character Ancestries (21 files)

Angulotl, Aurealgar, Aurkin, Aurven, Caprini, Cervari, Draconem, Devil, Dwarf, Elf-High, Elf-Wode, Elgari, Hakaan, Human, Kobold, Minotaur, Orc, Ravenfolk, Seraphite, Shimmerborn, Vulpid

#### `/careers/` - Career Paths

Career definitions that provide secondary progression and features

#### `/classes/` - Hero Classes (10 main + subclasses)

Primary character classes structure:

1. **Beastheart** - Summoner of animal companions
   - Guardian, Prowler, Punisher, Spark subclasses
2. **Censor** - Divine/anti-magic specialist
   - Exorcist, Oracle, Paragon subclasses
3. **Conduit** - Magic channeler
4. **Elementalist** - Element-based spellcaster
   - Earth, Fire, Green, Void specializations
5. **Fury** - Combat powerhouse
   - Berserker, Reaver, Stormwight subclasses
6. **Null** - Dimensional/kinetic powers
   - Chronokinetic, Cryokinetic, Metakinetic
7. **Shadow** - Stealth and manipulation
   - Black Ash, Caustic Alchemy, Harlequin Mask
8. **Summoner** - Summons creatures
   - Demon, Elemental, Fey, Undead specializations
9. **Tactician** - Strategic fighter
   - Insurgent, Mastermind, Vanguard subclasses
10. **Talent** - Psychic/supernatural
    - Chronopathy, Telekinesis, Telepathy

#### `/domains/` - Magical Domains

Domain specialization for magic-using classes

#### `/heroes/` - Pre-built Hero Examples

Template heroes for quick starts

#### `/imbuements/` - Item Imbuing System

Special properties that can be added to items

#### `/items/` - Equipment & Items

Weapons, armor, tools, and other equipment

#### `/kits/` - Equipment Kits

Pre-configured equipment loadouts:

- Beastheart kits
- Stormwight kits

#### `/monsters/` - Enemy Creatures (30+ files)

Pre-defined monsters for encounters:
Ajax, Animat, Animal, Arixx, Basilisk, Bredbeddle, Bugbear, Demon, Draconian, Dragon-Omen, Dragon-Thorn, Dwarf, Duskbringer, Draachenmar, Elemental, Elf-Shadow, Ghoul, Gnoll, Goblin, Hag, Hobgoblin, Human, Lich, Lightbender, Minotaur, Retainer, Rival, Time-Raider, Troll, Wardog, Werewolf, Wyvern

#### `/perks/` - Character Perks & Features

Special abilities and bonuses

#### `/sourcebooks/` - Official Content Packs (4 files)

- `core.ts` - Core Draw Steel rules
- `draachenmar.ts` - Draachenmar expansion
- `orden.ts` - Orden sourcebook
- `playtest.ts` - Playtest content

#### `/terrain/` - Battlefield Terrain

Different terrain types for tactical encounters

---

## `/src/models/` - TypeScript Data Models

**Purpose**: Define all domain models and their interfaces (45+ types)

### Core Character Models

- `hero.ts` - Hero interface with ancestry, class, career, complication, features, state
- `hero-state.ts` - Hero runtime state (health, momentum, resources)
- `class.ts` - Class definition with levels and abilities
- `ancestry.ts` - Ancestry with features and traits
- `culture.ts` - Cultural background
- `career.ts` - Career progression path
- `complication.ts` - Character complications
- `ability.ts` - Ability definition (1052 lines of feature types)

### Feature & Ability Models

- `feature.ts` - Complex discriminated union of 25+ feature types
  - FeatureAbility, FeatureAbilityCost, FeatureAbilityDamage
  - FeatureBonus, FeatureChoice, FeatureClassAbility
  - FeatureLanguageChoice, FeatureKit, FeatureModifier
  - And 15+ more specialized feature types
- `ability.ts` - Ability with distance, damage, keywords, modifiers
- `power-roll.ts` - Power roll results and mechanics
- `modifier.ts` - Damage modifiers and bonuses
- `damage-modifier.ts` - Specific damage modifier types

### Session & Combat Models

- `playbook.ts` - Session container with adventures, encounters, negotiations, montages
- `encounter.ts` - Encounter with groups, terrain, objectives, heroes, monsters
- `encounter-slot.ts` - Creature placement in encounters
- `monster.ts` - Monster definition with abilities and features
- `monster-state.ts` - Monster runtime state
- `monster-group.ts` - Named group of monsters
- `monster-roll.ts` - D20 roll for monster abilities

### Narrative & Special Systems

- `montage.ts` - Narrative montage scenes
- `negotiation.ts` - Social encounter mechanics
- `adventure.ts` - Campaign/adventure structure

### Equipment & Items

- `kit.ts` - Equipment loadout
- `item.ts` - Single item with properties
- `imbuement.ts` - Item imbuing/enchantment
- `perk.ts` - Character perk

### Game World

- `terrain.ts` - Terrain piece with properties
- `tactical-map.ts` - Encounter map with terrain placement
- `project.ts` - Crafting project
- `sourcebook.ts` - Collection of game content
- `domain.ts` - Magical domain
- `title.ts` - Character title/honor
- `language.ts` - Language
- `skill.ts` - Skill definition

### Utility Models

- `element.ts` - Base interface (id, name, description)
- `filter.ts` - Search/filter criteria
- `counter.ts` - Generic counter for tracking
- `options.ts` - User preferences
- `fixture.ts` - Generic named item
- `follower.ts` - Character follower/minion
- `summon.ts` - Summoned creature
- `size.ts` - Creature size category

---

## `/src/enums/` - Constants & Enumerations

**Purpose**: Define all domain-specific enumerations and constants (36 files)

### Core Game Systems

- `characteristic.ts` - Primary stats (Might, Agility, Reason, Intuition, Presence)
- `skill-list.ts` - Available skills
- `language-type.ts` - Available languages
- `perk-list.ts` - Perk categories
- `ability-keyword.ts` - Ability keywords (Melee, Ranged, Magic, etc.)
- `ability-usage.ts` - When abilities can be used
- `abiity-distance-type.ts` - Range types for abilities

### Feature & Building System

- `feature-type.ts` - 25+ different feature types
- `feature-field.ts` - Character sheet field types
- `feature-addon-type.ts` - Add-on categories

### Combat & Damage

- `damage-type.ts` - Damage types (Physical, Fire, Cold, Electric, etc.)
- `damage-modifier-type.ts` - Modifier application types
- `condition-type.ts` - Status conditions
- `stat-block-icon.ts` - Monster stat icons

### Monster/Creature Systems

- `monster-role-type.ts` - Monster roles (Brute, Controller, etc.)
- `monster-organization-type.ts` - Organization structure
- `monster-feature-category.ts` - Feature categories

### UI & Display

- `panel-mode.ts` - UI panel display states
- `panel-width.ts` - Panel width settings
- `hero-state-page.ts` - Session pages
- `roll-state.ts` - Die roll states
- `sheet-page-size.ts` - Page size for PDF

### Encounter & Combat

- `encounter-difficulty.ts` - Difficulty levels
- `attitude-type.ts` - Creature attitudes
- `negotiation-trait.ts` - Social interaction traits
- `tactical-map-display-type.ts` - Map display modes
- `tactical-map-edit-mode.ts` - Map editing modes
- `terrain-role-type.ts` - Terrain effect types
- `terrain-category.ts` - Terrain categories

### Equipment

- `kit-armor.ts` - Armor types
- `kit-weapon.ts` - Weapon types
- `item-type.ts` - Item categories (Weapon, Armor, Accessory, etc.)
- `culture-type.ts` - Culture categories
- `follower-type.ts` - Follower types

### References & Navigation

- `rules-page.ts` - Rules reference pages
- `culture-type.ts` - Culture background types

---

## `/src/logic/` - Business Logic & Rules Engine

**Purpose**: Implement Draw Steel game mechanics and rules (42 modules, ~9,264 lines)

### Core Hero & Character Logic

- `hero-logic.ts` (1,192 lines) - **LARGEST MODULE**
  - Feature calculation from ancestries, cultures, careers, classes
  - Ability resolution and customization
  - Characteristic calculation
  - Health, recovery, and resources
  - Language and skill assignment

- `feature-logic.ts` (1,052 lines)
  - Feature extraction from all sources
  - Feature type resolution and processing
  - Complex nested feature handling
  - Feature-based stat calculation

- `ability-logic.ts` (509 lines)
  - Ability availability and filtering
  - Distance and damage modifier calculation
  - Ability keyword processing

### Factory/Creation Logic

- `factory-logic.ts` (1,049 lines) - **PRIMARY FACTORY**
  - Create empty heroes, monsters, encounters, etc.
  - Initialize default options and playbooks

- `factory-feature-logic.ts` (638 lines)
  - Create feature instances from templates
  - Handle complex feature initialization

- `factory-ability-type-logic.ts` (104 lines)
  - Create ability distance/damage types

- `factory-damage-modifier-logic.ts` (84 lines)
- `factory-distance-logic.ts` (70 lines)

### Monster & Creature Systems

- `monster-logic.ts` (667 lines)
  - Monster creation and management
  - Monster ability calculation
  - Monster feature processing

- `creature-logic.ts` (122 lines)
  - Common creature mechanics
  - Size and characteristic calculation

- `retainer-logic.ts` (697 lines)
  - NPC retainer/follower mechanics
  - Follower ability assignment

### Session & Combat Systems

- `encounter-logic.ts` (271 lines)
  - Encounter setup and management
  - Group and slot handling
  - Initiative tracking

- `encounter-difficulty-logic.ts` (124 lines)
  - Difficulty calculation
  - Encounter balance metrics

- `tactical-map-logic.ts` (749 lines)
  - Map grid management
  - Terrain placement
  - Token positioning

- `playbook-logic.ts` (231 lines)
  - Playbook structure and management
  - Session workflow

### Narrative Systems

- `montage-logic.ts` (94 lines)
  - Montage scene mechanics

- `negotiation-logic.ts` (119 lines)
  - Social encounter mechanics

### Specialized Systems

- `sourcebook-logic.ts` (402 lines)
  - Sourcebook aggregation
  - Content filtering and retrieval

- `condition-logic.ts` (54 lines)
  - Condition effect tracking

- `modifier-logic.ts` (35 lines)
  - Damage modifier application

- `item-logic.ts` (33 lines)
  - Equipment handling

- `follower-logic.ts` (57 lines)
- `summon-logic.ts` (70 lines)
- `terrain-logic.ts` (102 lines)

### Formatting & Utilities

- `format-logic.ts` (230 lines)
  - Game rules formatting
  - Text conversion and display

- `roll-logic.ts` (65 lines)
  - Die roll mechanics

### Special Sheet Builders

- `classic-sheet/` - Character sheet rendering
  - `classic-sheet-builder.ts`
  - `classic-sheet-logic.ts`
  - `sheet-formatter.ts`

- `hero-sheet/` - Standard character sheet
  - `hero-sheet-builder.ts`

- `playbook-sheets/` - Session sheet generation
  - `encounter-sheet-builder.ts`
  - `montage-sheet-builder.ts`

### Update Logic (Migration & Migration)

- `update/` - Version migration and data updates
  - `hero-update-logic.ts`
  - `ability-update-logic.ts`
  - `feature-update-logic.ts`
  - `monster-update-logic.ts`
  - `item-update-logic.ts`
  - `playbook-update-logic.ts`
  - `sourcebook-update-logic.ts`
  - `options-update-logic.ts`

### Test Files

- `ability-logic.test.ts` (120 lines)
- `creature-logic.test.ts` (38 lines)
- `encounter-logic.test.ts` (40 lines)
- `format-logic.test.ts` (43 lines)
- `montage-logic.test.ts` (174 lines)

---

## `/src/components/` - React UI Components

**Purpose**: Build the entire user interface (2+ files, organized by type)

### Component Categories

#### 1. Pages (22 components) - Full Page Views

pages/
├── welcome/              # Landing page
├── heroes/
│   ├── hero-list/        # Hero list page
│   ├── hero-edit/        # Hero creation/editing (6 sections)
│   │   ├── start-section
│   │   ├── ancestry-section
│   │   ├── culture-section
│   │   ├── career-section
│   │   ├── class-section
│   │   └── complication-section
│   ├── hero-view/        # Hero detail view
│   └── hero-sheet/       # Character sheet views
├── library/
│   ├── library-list/     # Homebrew elements library
│   └── library-edit/     # Create/edit homebrew elements
├── playbook/
│   ├── playbook-list/    # Session/playbook list
│   └── playbook-edit/    # Session editing
├── session/
│   ├── player/           # Player view during session
│   └── director/         # GM/director session control
└── classic-sheet/        # Legacy character sheet

#### 2. Panels (133 components) - Major UI Sections

panels/
├── ability-info/         # Ability details display
├── app-header/           # Top navigation bar
├── app-footer/           # Bottom information bar
├── classic-sheet/        # Character sheet sections (30 subcomponents)
├── condition/            # Status condition display
├── die-roll/             # D20 roll visualization
├── edit/                 # Element editing panels (27 subcomponents)
├── elements/             # Game element displays (31 subcomponents)
├── encounter-difficulty/ # Difficulty calculation
├── encounter-group/      # Creature group management
├── feature-config/       # Feature configuration UI
├── health/               # Hit point tracking
├── health-gauge/         # Visual health bar
├── hero/                 # Hero information panels
├── histogram/            # Statistical visualization
├── logo/                 # Branding display
├── malice/               # Malice point tracker
├── monster-filter/       # Monster selection filters
├── monster-label/        # Monster name/ID display
├── plot-graph/           # Plot visualization
├── power-roll/           # Power roll interface
├── run/                  # Session running panels (6 subcomponents)
├── sash/                 # Hero status ribbon
├── selector-row/         # Selection UI row
├── standard-abilities/   # Ability list display
├── stats-row/            # Characteristic display
├── sync-status/          # Data sync indicator
├── terrain-filter/       # Terrain selection
└── token/                # Game piece/token display

#### 3. Modals (39 components) - Dialog Windows

modals/
├── ability/              # Ability detail modal
├── about/                # Application information
├── element/              # Game element creation/editing
├── encounter-tools/      # Encounter creation tools
├── encounter-turn/       # Turn management
├── feature/              # Feature configuration
├── follower/             # Follower/minion management
├── hero-state/           # Session hero state
├── modal/                # Base modal wrapper
├── monster/              # Monster editor
├── party/                # Party/group management
├── player-view/          # Player-visible information
├── reference/            # Rules reference display
├── roll/                 # Dice roll interface
├── select/ (20 submodals) # Element selection dialogs
│   ├── ability-select
│   ├── ancestry-select
│   ├── career-select
│   ├── class-select
│   ├── complication-select
│   ├── culture-select
│   ├── domain-select
│   ├── item-select
│   ├── kit-select
│   ├── language-select
│   ├── monster-select
│   ├── perk-select
│   ├── project-select
│   ├── skill-select
│   ├── sourcebook-select
│   ├── terrain-select
│   ├── title-select
│   └── [more...]
├── settings/             # User preferences
├── sourcebooks/          # Sourcebook management
└── terrain/              # Terrain editor

#### 4. Controls (14 components) - Reusable UI Elements

controls/
├── danger-button/        # Delete/destructive action button
├── dropdown-button/      # Button with dropdown menu
├── empty/                # Empty state display
├── error-boundary/       # Error handling wrapper
├── expander/             # Collapsible section
├── field/                # Form field wrapper
├── header-text/          # Section heading
├── markdown/             # Markdown content display
├── multi-line/           # Multi-line text input
├── number-spin/          # Number input control
├── pill/                 # Tag/badge display
├── radial/               # Radial selector
├── selectable-panel/     # Selectable content panel
└── toggle/               # Boolean toggle switch

#### 5. Main Layout Components (2 components)

- `main.tsx` - Main app router and state management
- `main-layout.tsx` - Page layout wrapper

#### 6. Standalone Components

- `ability-component.tsx`
- `characteristics-component.tsx`
- `ds-symbol-text-component.tsx`
- `feature-component.tsx`
- `labeled-field.tsx`
- `project-info-component.tsx`
- `recoveries-component.tsx`
- `stamina-component.tsx`
- `title-component.tsx`

---

## `/src/hooks/` - Custom React Hooks

**Purpose**: Shared state and logic hooks (7 files)

- `use-dimensions.ts` - Window dimension tracking
- `use-error-listener.ts` - Global error handling
- `use-is-small.ts` - Responsive breakpoint detection
- `use-media-query.ts` - Media query listener
- `use-navigation.ts` - Router navigation
- `use-sync-status.ts` - LocalForage sync status
- `use-theme.ts` - Dark/light theme management

---

## `/src/utils/` - Utility Functions

**Purpose**: Helper functions and general utilities (7 modules)

- `collections.ts` - Array/collection operations (sort, find, group, etc.)
- `feature-flags.ts` - Feature toggle system
- `format.ts` - String formatting utilities
- `initialize-theme.ts` - Theme initialization
- `name-generator.ts` - Random name generation
- `random.ts` - Random number utilities
- `utils.ts` - General utility functions (copy, UUID, etc.)

---

## `/src/assets/` - Static Assets

assets/
├── screenshots/          # UI screenshot documentation
├── images/              # Game art and icons
└── [other static files]

---

## `/src/styles/`

- `index.scss` - Global application styles
- `colors.scss` - Color palette definitions

---

## Application Entry Points & Initialization

### `/src/index.tsx` - App Bootstrap

1. Service Worker registration for PWA
2. LocalForage data loading:
   - Heroes
   - Homebrew sourcebooks
   - Hidden sourcebook IDs
   - Playbook (GM preparation)
   - Session (active game session)
   - User options
3. Data migration via UpdateLogic classes
4. React root initialization with Router

### `/src/components/main/main.tsx` - Main App Router

- Route definitions for all pages
- Global state management (heroes, sourcebooks, playbook, session, options)
- Modal and context providers
- Error boundary wrapper

---

## Data Flow & Application Architecture

### Hero Creation Flow

1. Welcome Page → Hero List Page
2. Create New Hero → Hero Edit Page
3. Select Ancestry → Apply ancestry features
4. Select Culture → Add culture features
5. Select Career → Add career features
6. Select Class → Add class features, abilities
7. Select Complication → Add complication features
8. Save → LocalForage storage

### Feature Resolution Chain

Hero → Ancestry features + Culture features + Career features + Class features + Complication features + Customizations → Full feature list → Ability calculation → Character sheet

### Session (Playbook) Flow

1. Create Adventure/Encounter → Playbook List
2. Edit Encounter → Define monsters, terrain, objectives
3. Start Session → Playbook Edit (GM) or Session Player (Players)
4. Track monsters, terrain, turn order, malice
5. Resolve encounters → Save session progress

### Data Persistence

- **LocalForage**: Primary persistence (IndexedDB with fallbacks)
- **Keys**:
  - `forgesteel-heroes` - Character array
  - `forgesteel-homebrew-settings` - Custom sourcebooks
  - `forgesteel-hidden-setting-ids` - Hidden sourcebook IDs
  - `forgesteel-playbook` - GM preparation
  - `forgesteel-session` - Active session
  - `forgesteel-options` - User preferences

---

## Key Design Patterns

### 1. Discriminated Unions (Feature Types)

```typescript
type Feature = FeatureAbility | FeatureAbilityCost | FeatureBonus | ...
// Each feature type has unique 'type' discriminator and 'data' payload
```

### 2. Factory Pattern

- `FactoryLogic` - Create default instances of any model
- Used throughout for initialization

### 3. Update/Migration Pattern

- Separate `*UpdateLogic` classes for version migrations
- Applied during app boot for all loaded data

### 4. Logic Module Organization

- One module per domain (hero-logic, monster-logic, etc.)
- Static method organization (no class instantiation needed)
- Composed logic for complex features

### 5. Component Organization

- Pages handle routing and top-level state
- Panels handle major sections
- Modals for dialogs
- Controls for reusable elements

---

## Key Technologies & Patterns Used

| Technology | Purpose |
|-----------|---------|
| React Hooks | State management, side effects |
| React Router | Client-side routing |
| Ant Design | Enterprise UI components |
| TypeScript | Type safety |
| LocalForage | Client-side data persistence |
| Service Worker | Offline PWA support |
| jsPDF/html2canvas | PDF export |
| Showdown | Markdown rendering |
| SASS | Stylesheet compilation |
| Vitest | Unit testing |
| ESLint | Code quality |

---

## Deployment & Build

- **Build Tool**: Vite
- **Target**: GitHub Pages
- **Command**: `npm run deploy`
- **Live URL**: <https://andyaiken.github.io/forgesteel/>
- **Build Output**: `/dist` directory
- **Deployment Flow**: `predeploy` (lint + test + build) → `deploy` (push to gh-pages)

---

## File Size & Complexity Metrics

- **Largest Logic Module**: `hero-logic.ts` (1,192 lines)
- **Largest Data File**: `complication-data.ts` (108KB)
- **Largest Model**: `feature.ts` with 25+ feature type discriminations
- **Total Component Files**: 200+
- **Total Model Types**: 45+

---

## Application Workflow Summary

App Start
  ↓
Load persisted data (LocalForage)
  ↓
Apply update migrations
  ↓
Initialize theme & UI
  ↓
Render Router with Pages
  ↓
User Navigation
  ├→ Welcome Page
  ├→ Heroes (List/Create/View/Edit/Sheet)
  ├→ Library (Browse/Create Homebrew)
  ├→ Playbook (GM Session Management)
  └→ Session (Player or Director View)
  ↓
Save changes to LocalForage
  ↓
Export as PDF/Image (optional)
