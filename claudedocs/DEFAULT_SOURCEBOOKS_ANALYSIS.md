# Default Sourcebooks Analysis

## Overview

Analysis of how default sourcebooks are loaded when creating a new hero in the Forgesteel application.

## Key Findings

### Default Sourcebooks Location

**File**: [src/components/main/main.tsx:252](../src/components/main/main.tsx#L252)

```typescript
const newHero = (folder: string) => {
	const hero = FactoryLogic.createHero([ SourcebookData.core.id, SourcebookData.orden.id ]);
	hero.folder = folder;

	setDrawer(null);
	persistHero(hero).then(() => navigation.goToHeroEdit(hero.id, 'start'));
};
```

### Current Default Sourcebooks

When a new hero is created, these sourcebooks are **automatically loaded**:

1. **core** - `SourcebookData.core.id`
2. **orden** - `SourcebookData.orden.id`

### Available Sourcebooks

**File**: [src/data/sourcebook-data.ts](../src/data/sourcebook-data.ts)

```typescript
export class SourcebookData {
	static core = core;
	static orden = orden;
	static playtest = playtest;
	static draachenmar = draachenmar;  // ← Your new sourcebook!
}
```

**Available sourcebooks**:
- ✅ `core` - Core rulebook (default)
- ✅ `orden` - Orden sourcebook (default)
- ⚪ `playtest` - Playtest content (not loaded by default)
- ⚪ `draachenmar` - Your homebrew world (not loaded by default)

---

## How It Works

### 1. Hero Creation Flow

```
User clicks "New Hero"
    ↓
main.tsx → newHero(folder)
    ↓
FactoryLogic.createHero([ core.id, orden.id ])
    ↓
Hero object created with settingIDs = [ 'core', 'orden' ]
    ↓
Hero saved and character creator opens
```

### 2. Factory Logic Implementation

**File**: [src/logic/factory-logic.ts:75-97](../src/logic/factory-logic.ts#L75)

```typescript
static createHero = (sourcebookIDs: string[]): Hero => {
	return {
		id: Utils.guid(),
		name: '',
		picture: null,
		folder: '',
		settingIDs: sourcebookIDs,  // ← Sourcebooks stored here
		ancestry: null,
		culture: null,
		class: null,
		career: null,
		complication: null,
		features: [
			FactoryLogic.feature.createLanguageChoice({
				id: 'default-language',
				name: 'Default Language',
				selected: [ 'Caelian' ]
			})
		],
		state: FactoryLogic.createHeroState(),
		abilityCustomizations: []
	};
};
```

The `settingIDs` array determines which sourcebooks' content is available to the hero:
- **Ancestries** from those sourcebooks
- **Cultures** from those sourcebooks
- **Classes** from those sourcebooks
- **Careers**, **Complications**, **Kits**, **Perks**, etc.

### 3. Content Filtering

When a hero is being edited, the application filters available options based on `hero.settingIDs`:

```typescript
// Typical pattern in the codebase
const availableAncestries = SourcebookLogic.getAncestries(
	sourcebooks.filter(sb => hero.settingIDs.includes(sb.id))
);
```

---

## Adding Draachenmar to Default Sourcebooks

### Option 1: Make Draachenmar Default for All New Heroes

**File to modify**: [src/components/main/main.tsx:252](../src/components/main/main.tsx#L252)

**Change**:
```typescript
// BEFORE
const hero = FactoryLogic.createHero([ SourcebookData.core.id, SourcebookData.orden.id ]);

// AFTER
const hero = FactoryLogic.createHero([
	SourcebookData.core.id,
	SourcebookData.orden.id,
	SourcebookData.draachenmar.id  // ← Add your sourcebook
]);
```

**Impact**:
- ✅ All new heroes will have access to Draachenmar ancestries (Seraphite, Warforged, etc.)
- ✅ All new heroes will have access to Draachenmar cultures (Seraphite, Aurian, Hornvar, Warforged)
- ✅ No impact on existing heroes

### Option 2: Make Draachenmar Optional (User Chooses)

This would require creating a sourcebook selection UI during hero creation. This is more complex and requires:

1. Add a sourcebook selection step in hero creation flow
2. Store user's selection
3. Pass selected sourcebooks to `createHero()`

**Example implementation**:
```typescript
const newHero = (folder: string, selectedSourcebooks: string[]) => {
	const hero = FactoryLogic.createHero(selectedSourcebooks);
	hero.folder = folder;

	setDrawer(null);
	persistHero(hero).then(() => navigation.goToHeroEdit(hero.id, 'start'));
};
```

### Option 3: Replace Orden with Draachenmar

If Draachenmar is your primary setting:

```typescript
// Use Core + Draachenmar instead of Core + Orden
const hero = FactoryLogic.createHero([
	SourcebookData.core.id,
	SourcebookData.draachenmar.id
]);
```

---

## Sourcebook Structure Reference

Each sourcebook file (like [draachenmar.ts](../src/data/sourcebooks/draachenmar.ts)) contains:

```typescript
export const draachenmar: Sourcebook = {
	id: 'draachenmar',                    // ← Used in settingIDs
	name: 'Draachenmar',
	description: '32Gamers home brew game world.',
	isHomebrew: false,

	// Content arrays
	ancestries: [ ... ],                  // Your ancestry references
	cultures: [ ... ],                    // Your culture definitions
	careers: [],                          // Career options
	classes: [],                          // Class options
	subclasses: [],                       // Subclass options
	complications: [],                    // Complication options
	domains: [],                          // Domain options
	kits: [],                             // Kit options
	perks: [],                            // Perk options
	titles: [],                           // Title options
	items: [],                            // Item options
	imbuements: [],                       // Imbuement options
	monsterGroups: [],                    // Monster groups
	skills: [ ... ],                      // Custom skills
	languages: [ ... ],                   // Custom languages
	projects: [],                         // Project options
	terrain: []                           // Terrain options
};
```

---

## Testing After Changes

After modifying default sourcebooks, test:

1. **Create New Hero**:
   - Click "New Hero" button
   - Verify character creator opens

2. **Check Available Options**:
   - Go to Ancestry selection
   - Verify your ancestries appear in the list (Seraphite, Warforged, etc.)

3. **Check Cultures**:
   - Go to Culture selection
   - Verify your cultures appear (Seraphite, Aurian, Hornvar, Warforged)

4. **Verify Existing Heroes**:
   - Open an existing hero
   - Verify their sourcebooks remain unchanged
   - Existing heroes maintain their original `settingIDs`

5. **Check Character Sheet**:
   - Create a hero with Seraphite ancestry
   - Verify all features display correctly
   - Check abilities appear in action lists

---

## Related Files

### Core Files
- [src/components/main/main.tsx](../src/components/main/main.tsx) - Hero creation UI
- [src/logic/factory-logic.ts](../src/logic/factory-logic.ts) - Hero factory method
- [src/data/sourcebook-data.ts](../src/data/sourcebook-data.ts) - Sourcebook registry

### Your Sourcebook Files
- [src/data/sourcebooks/draachenmar.ts](../src/data/sourcebooks/draachenmar.ts) - Your sourcebook definition
- [src/data/ancestries/seraphite.ts](../src/data/ancestries/seraphite.ts) - Seraphite ancestry
- [src/data/ancestries/warforged.ts](../src/data/ancestries/warforged.ts) - Warforged ancestry
- [src/data/ancestries/aurealgar.ts](../src/data/ancestries/aurealgar.ts) - Aurealgar ancestry
- [src/data/ancestries/aurkin.ts](../src/data/ancestries/aurkin.ts) - Aurkin ancestry
- [src/data/ancestries/aurven.ts](../src/data/ancestries/aurven.ts) - Aurven ancestry
- [src/data/ancestries/caprini.ts](../src/data/ancestries/caprini.ts) - Caprini ancestry
- [src/data/ancestries/cervari.ts](../src/data/ancestries/cervari.ts) - Cervari ancestry
- [src/data/ancestries/elgari.ts](../src/data/ancestries/elgari.ts) - Elgari ancestry

### Sourcebook Logic
- [src/logic/sourcebook-logic.ts](../src/logic/sourcebook-logic.ts) - Sourcebook filtering and content access

---

## Recommendation

**For your use case (homebrew campaign)**:

Add Draachenmar to the default sourcebooks so all new heroes have access to your custom ancestries and cultures:

```typescript
// File: src/components/main/main.tsx line 252
const hero = FactoryLogic.createHero([
	SourcebookData.core.id,
	SourcebookData.orden.id,
	SourcebookData.draachenmar.id
]);
```

This gives players access to:
- **All Core content** (standard classes, base ancestries)
- **Orden content** (if you use it)
- **Your Draachenmar content** (Seraphite, Warforged, Aurians, Hornvar, custom cultures, languages)

Players can then freely choose between standard ancestries and your custom Draachenmar ancestries when creating heroes.

---

## Summary

- **Current defaults**: `core` and `orden`
- **Your sourcebook**: `draachenmar` (available but not default)
- **Location to change**: [src/components/main/main.tsx:252](../src/components/main/main.tsx#L252)
- **Simple fix**: Add `SourcebookData.draachenmar.id` to the array
- **Impact**: New heroes get access to your custom content automatically

The system is well-designed and adding your sourcebook to defaults is straightforward!
