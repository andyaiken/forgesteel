# Language System Analysis

## Overview

Complete analysis of how languages work in the Forgesteel system and where characters receive their default languages.

---

## Key Findings

### 1. Default Language Assignment

**Location**: [src/logic/factory-logic.ts:88-92](../src/logic/factory-logic.ts#L88)

```typescript
static createHero = (sourcebookIDs: string[]): Hero => {
	return {
		// ... other hero properties
		features: [
			FactoryLogic.feature.createLanguageChoice({
				id: 'default-language',
				name: 'Default Language',
				selected: [ 'Caelian' ]  // ← Every hero starts with Caelian
			})
		],
		// ... rest of hero setup
	};
};
```

**Result**: Every new hero automatically knows **Caelian** - the common tongue of Orden.

---

## Language Definition

### Where Caelian is Defined

**File**: [src/data/sourcebooks/orden.ts:50-57](../src/data/sourcebooks/orden.ts#L50)

```typescript
languages: [
	// Common languages
	{
		name: 'Caelian',
		description: 'The language of the ancient Caelian Empire; the common tongue of Orden.',
		type: LanguageType.Common,
		related: []
	},
	// ... other languages
]
```

### Language Types

Languages are categorized by type:

1. **`LanguageType.Common`** - Universal/trade languages (e.g., Caelian)
2. **`LanguageType.Regional`** - Regional languages (e.g., Khoursirian, Higaran)
3. **`LanguageType.Cultural`** - Cultural/ethnic languages (e.g., Aurish, Seraphic, Antlerspeech)
4. **`LanguageType.Dead`** - Ancient/historical languages (e.g., Old Bargothic)

---

## Your Draachenmar Languages

Your sourcebook already has custom languages defined in [src/data/sourcebooks/draachenmar.ts:115-178](../src/data/sourcebooks/draachenmar.ts#L115):

### Regional Languages (2)
```typescript
{
	name: 'Gulanbarak',
	description: 'The fortress argot of Gulanbarak and its surrounding marches.',
	type: LanguageType.Regional,
	related: []
},
{
	name: 'Badlands Taal',
	description: 'Caravan-route lingua of the Badlands and desert oases.',
	type: LanguageType.Regional,
	related: [ 'Draachen Trade' ]
}
```

### Cultural Languages (6)
```typescript
{
	name: 'Aurish',
	description: 'Tongue of the Aurians; prides maintain dialects: Aurealgar, Aurven, Aurkin.',
	type: LanguageType.Cultural,
	related: [ 'Aurealgar', 'Aurven', 'Aurkin' ]
},
{
	name: 'Antlerspeech',
	description: 'Hornvar language with stock dialects: Elgari, Cervari, Caprini.',
	type: LanguageType.Cultural,
	related: [ 'Elgari', 'Cervari', 'Caprini' ]
},
{
	name: 'Forged Cant',
	description: 'Warforged code-speech and worksign; rooted in Karth Vol foundry protocols.',
	type: LanguageType.Cultural,
	related: []
},
{
	name: 'Seraphic',
	description: 'The devotional and juridical tongue of the Seraphites.',
	type: LanguageType.Cultural,
	related: [ 'Eneadic' ]
},
{
	name: 'Eneadic',
	description: 'Liturgical speech of the Enead of Eternity; used in vows, judgments, and scripture.',
	type: LanguageType.Cultural,
	related: [ 'Seraphic' ]
},
{
	name: 'Gray Cant',
	description: 'Mnemonic hashes and phrase-keys used by the Gray Order to pass messages.',
	type: LanguageType.Cultural,
	related: []
},
{
	name: 'Wallsign',
	description: 'A semaphoric sign-language of the Wall-watch and sappers.',
	type: LanguageType.Cultural,
	related: [ 'Bargothic' ]
}
```

### Dead Languages (1)
```typescript
{
	name: 'Old Bargothic',
	description: 'Pre-Rockfall inscriptions and oaths; preserved in temple stone and war-marches.',
	type: LanguageType.Dead,
	related: [ 'Bargothic' ]
}
```

---

## How Characters Get Languages

### 1. Default Language (All Heroes)

**Source**: Hero creation
**When**: Character is created
**Language**: Caelian
**Implementation**:
```typescript
FactoryLogic.feature.createLanguageChoice({
	id: 'default-language',
	name: 'Default Language',
	selected: [ 'Caelian' ]
})
```

### 2. Culture Languages

**Source**: Culture selection
**When**: Player selects culture during character creation
**Language**: Determined by culture's native language

**Example** - Your Seraphite culture in [draachenmar.ts:60-68](../src/data/sourcebooks/draachenmar.ts#L60):
```typescript
FactoryLogic.createCulture(
	'Seraphite',
	'Urban, communal, academic — itinerant arbiters and archivists bearing inconvenient light.',
	CultureType.Ancestral,
	EnvironmentData.urban,
	OrganizationData.communal,
	UpbringingData.academic,
	'Seraphic'  // ← Culture grants Seraphic language
)
```

The last parameter (`'Seraphic'`) is the language granted by the culture.

**Your Draachenmar Cultures Grant**:
- **Hakaan** → Khoursirian
- **Khoursiri** → Khoursirian
- **Time Raider** → Voll
- **Seraphite** → Seraphic
- **Aurian** → Aurish
- **Hornvar** → Antlerspeech
- **Warforged** → Forged Cant

### 3. Additional Languages from Features

**Source**: Ancestry, career, class, or other features
**When**: Feature is selected
**Language**: Varies by feature

**Example** - Language choice feature:
```typescript
FactoryLogic.feature.createLanguageChoice({
	id: 'feature-id',
	name: 'Multilingual',
	count: 2,  // Choose 2 languages
	options: []  // Empty = all available languages
})
```

---

## Changing Default Language

### Option 1: Change for All New Heroes

**File**: [src/logic/factory-logic.ts:91](../src/logic/factory-logic.ts#L91)

**Current**:
```typescript
selected: [ 'Caelian' ]
```

**To change to a Draachenmar language**:
```typescript
// Option A: Use a Draachenmar regional language
selected: [ 'Gulanbarak' ]

// Option B: Use a Draachenmar cultural language
selected: [ 'Aurish' ]

// Option C: Keep Caelian as default (recommended for compatibility)
selected: [ 'Caelian' ]
```

**⚠️ Important Consideration**:

Caelian is the **common tongue** across most of the game world. Changing this would mean:
- Heroes can't communicate with standard NPCs/monsters (many speak Caelian)
- Crafting recipes reference "Texts or lore in Caelian"
- Most of the lore assumes Caelian as common language

**Recommendation**: Keep Caelian as the default common language even in Draachenmar campaigns.

### Option 2: Add a Second Default Language

**File**: [src/logic/factory-logic.ts:91](../src/logic/factory-logic.ts#L91)

**Add a Draachenmar common language alongside Caelian**:
```typescript
selected: [ 'Caelian', 'Gulanbarak' ]  // Know both common languages
```

This way heroes can:
- ✅ Communicate in standard Orden (Caelian)
- ✅ Communicate in Draachenmar (Gulanbarak)
- ✅ Access all crafting recipes and lore

---

## Language Choice Feature

### How Language Choices Work

Many features grant language selection. Here's the structure:

```typescript
FactoryLogic.feature.createLanguageChoice({
	id: 'feature-id',
	name: 'Language Selection',
	description: 'Choose languages you know',
	count: 2,  // Number of languages to choose
	options: [
		// Specific options (optional)
		'Aurish',
		'Seraphic',
		'Forged Cant'
	],
	// If options array is empty or omitted, player can choose from ALL languages in their sourcebooks
	selected: []  // Languages already selected
})
```

### Example from Careers

Many careers grant language choices. Example from [src/data/careers/sage.ts](../src/data/careers/sage.ts):
```typescript
FactoryLogic.feature.createLanguageChoice({
	id: 'career-sage-languages',
	name: 'Sage Languages',
	description: 'Choose two languages',
	count: 2,
	options: []  // Empty = choose from all available
})
```

---

## Language Filtering

### Follower Languages

**File**: [src/logic/follower-logic.ts:55](../src/logic/follower-logic.ts#L55)

```typescript
static getLanguageOptions = (sourcebooks: Sourcebook[]) => {
	return SourcebookLogic.getLanguages(sourcebooks).filter(l => l.name !== 'Caelian');
};
```

**Why**: Followers don't get Caelian as an option because they automatically know it (display logic adds it).

**Display Logic** - [src/components/panels/elements/follower-panel/follower-panel.tsx:34](../src/components/panels/elements/follower-panel/follower-panel.tsx#L34):
```typescript
<Field label='Languages' value={[ 'Caelian', ...props.follower.languages ].sort().join(', ') || '(none)'} />
```

Every follower automatically displays Caelian plus their selected languages.

---

## Related Language Feature

Languages can have related dialects or variants:

```typescript
{
	name: 'Aurish',
	description: 'Tongue of the Aurians; prides maintain dialects: Aurealgar, Aurven, Aurkin.',
	type: LanguageType.Cultural,
	related: [ 'Aurealgar', 'Aurven', 'Aurkin' ]  // ← Related dialects
}
```

The `related` array indicates:
- **Language families** - Languages that share common roots
- **Mutual intelligibility** - Speakers may partially understand related languages
- **Lore connections** - Historical or cultural relationships between languages

---

## Complete Language Flow for New Hero

### Hero Creation Process

```
1. User clicks "New Hero"
   ↓
2. FactoryLogic.createHero() called
   ↓
3. Hero created with default language:
   features: [
       createLanguageChoice({
           selected: [ 'Caelian' ]  ← Automatic
       })
   ]
   ↓
4. User selects ancestry (optional language features)
   ↓
5. User selects culture → Grants culture language
   Example: Seraphite culture → Seraphic language
   ↓
6. User selects career (may grant language choices)
   Example: Sage → Choose 2 languages
   ↓
7. User selects class (rare language features)
   ↓
8. User selects complications (may affect languages)
   ↓
9. Final hero knows:
   - Caelian (default)
   - Culture language (e.g., Seraphic)
   - Any additional languages from features
```

### Example: Seraphite Hero

```
Hero: Seraphite Sage
├─ Default: Caelian
├─ Culture (Seraphite): Seraphic
├─ Career (Sage): 2 chosen languages (e.g., Eneadic, Gray Cant)
└─ Total: 4 languages (Caelian, Seraphic, Eneadic, Gray Cant)
```

---

## Adding Custom Common Language

If you want Draachenmar to have its own common tongue separate from Caelian:

### 1. Add to Draachenmar Sourcebook

**File**: [src/data/sourcebooks/draachenmar.ts:115](../src/data/sourcebooks/draachenmar.ts#L115)

**Add at the top of the languages array**:
```typescript
languages: [
	// Common language for Draachenmar
	{
		name: 'Draachen Trade',
		description: 'The common trade language of Draachenmar, blending influences from many cultures.',
		type: LanguageType.Common,
		related: [ 'Badlands Taal' ]
	},
	// ... existing languages
]
```

### 2. Update Default Language (Optional)

**File**: [src/logic/factory-logic.ts:91](../src/logic/factory-logic.ts#L91)

```typescript
// Option A: Replace Caelian
selected: [ 'Draachen Trade' ]

// Option B: Add alongside Caelian (recommended)
selected: [ 'Caelian', 'Draachen Trade' ]
```

### 3. Update Cultures

**File**: [src/data/sourcebooks/draachenmar.ts:29-92](../src/data/sourcebooks/draachenmar.ts#L29)

Some cultures might grant the common language instead:
```typescript
FactoryLogic.createCulture(
	'Hakaan',
	'Rural, communal, labor.',
	CultureType.Ancestral,
	EnvironmentData.rural,
	OrganizationData.communal,
	UpbringingData.labor,
	'Draachen Trade'  // ← Could use common language instead of Khoursirian
)
```

---

## Testing Language System

After making changes, test:

1. **Create New Hero**:
   - Check starting languages in features list
   - Verify Caelian (or your default) appears

2. **Select Culture**:
   - Choose Seraphite culture
   - Verify Seraphic language is added

3. **Select Career with Languages**:
   - Choose Sage or similar
   - Verify language selection UI appears
   - Confirm choices are saved

4. **View Character Sheet**:
   - Check languages section
   - Verify all languages display correctly

5. **Check Followers**:
   - Create a follower
   - Verify Caelian appears automatically
   - Check additional languages work

---

## Summary

### Current System
- **Default**: Every hero knows Caelian (common tongue)
- **Culture**: Grants one cultural language
- **Features**: May grant additional language choices
- **Sourcebook**: Languages available based on hero's sourcebooks

### Your Draachenmar Setup
- ✅ **9 custom languages** defined (regional, cultural, dead)
- ✅ **Cultures properly configured** with language grants
- ✅ **Language relationships** documented with `related` arrays
- ✅ **Integrated with system** - available when Draachenmar sourcebook is loaded

### Recommendations
1. **Keep Caelian** as default for compatibility with existing content
2. **Consider adding** "Draachen Trade" as a common language for your setting
3. **Optionally give** heroes both Caelian and Draachen Trade by default
4. **Language choices** work automatically once Draachenmar is a default sourcebook

### Key Files
- [src/logic/factory-logic.ts:88-92](../src/logic/factory-logic.ts#L88) - Default language assignment
- [src/data/sourcebooks/draachenmar.ts:115-178](../src/data/sourcebooks/draachenmar.ts#L115) - Your custom languages
- [src/data/sourcebooks/orden.ts:50-57](../src/data/sourcebooks/orden.ts#L50) - Caelian definition
- [src/logic/follower-logic.ts:55](../src/logic/follower-logic.ts#L55) - Language filtering

The language system is well-designed and your Draachenmar languages are properly integrated!
