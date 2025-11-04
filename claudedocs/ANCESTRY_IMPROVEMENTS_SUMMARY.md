# Ancestry Improvements - Summary Report

## Overview

I've analyzed all established ancestry files in the codebase and compared them to your 8 new ancestries. Your files work, but they're missing important mechanical implementations that the established ancestries use.

## Files Analyzed

**Your New Ancestries:**
- aurealgar.ts
- aurkin.ts
- aurven.ts
- caprini.ts
- cervari.ts
- elgari.ts
- seraphite.ts
- warforged.ts

**Established Ancestries Reviewed:**
- human.ts, dwarf.ts, elf-high.ts
- devil.ts, dragon-knight.ts
- orc.ts, polder.ts
- (and others)

## Key Findings

### What You're Doing Right ✅

1. **Structure**: Your choice menus and feature grouping are correct
2. **IDs**: Consistent ID naming conventions
3. **Descriptions**: Clear, flavorful descriptions
4. **Value Points**: Proper point costs (1-point vs 2-point features)
5. **Ancestry Points**: Correct point budget tracking

### What Needs Improvement ⚠️

You're using **generic** `FactoryLogic.feature.create()` for everything, when you should be using **specialized factory methods** that provide proper mechanical implementation.

## The Problem in Detail

### Current Pattern (What You're Doing)
```typescript
// Everything is generic text
feature: FactoryLogic.feature.create({
    id: 'feature-id',
    name: 'Thick Hide',
    description: '+3 Stamina per echelon.'
})
```

**Issues:**
- System doesn't know this grants stamina mechanically
- Won't calculate stamina in character stats
- Just displays as text
- No type safety or validation

### Correct Pattern (What You Should Do)
```typescript
// Specialized factory method with mechanical implementation
feature: FactoryLogic.feature.createBonus({
    id: 'feature-id',
    name: 'Thick Hide',
    description: 'Your thick hide provides enhanced protection.',
    field: FeatureField.Stamina,
    valuePerEchelon: 3
})
```

**Benefits:**
- System automatically calculates stamina at each level
- Integrates with character stat system
- Type-safe and validated
- Can be queried and filtered

## Required Changes by Category

### 1. Stat Bonuses → Use `createBonus()`

**Affected Features:**
- **Stamina bonuses** (Thick Hide, Sun-Doze, Heaven's Vitality)
- **Speed bonuses** (Cat's Grace, Sprint Engine, Luminous Stride)
- **Disengage bonuses** (Tail Balance, Tight Turn, Angelic Poise)
- **Stability bonuses** (Sure-Footed, Integrated Stabilizer)
- **Recoveries bonuses** (from Human example)

**Pattern:**
```typescript
FactoryLogic.feature.createBonus({
    id: 'feature-id',
    name: 'Feature Name',
    description: 'Description text',
    field: FeatureField.Stamina,  // or Speed, Disengage, Stability, Recoveries
    value: 1,  // for flat bonuses
    // OR
    valuePerEchelon: 3  // for per-level bonuses
})
```

**Required Import:**
```typescript
import { FeatureField } from '@/enums/feature-field';
```

### 2. Condition Immunities → Use `createConditionImmunity()`

**Affected Features:**
- King of the Dunes (immune to frightened)
- Fearless (immune to frightened)

**Pattern:**
```typescript
FactoryLogic.feature.createConditionImmunity({
    id: 'feature-id',
    name: 'Fearless',
    description: 'You are immune to fear.',
    conditions: [ ConditionType.Frightened ]
})
```

**Required Import:**
```typescript
import { ConditionType } from '@/enums/condition-type';
```

**Available Conditions:**
- `ConditionType.Frightened`
- `ConditionType.Slowed`
- `ConditionType.Weakened`
- `ConditionType.Dazed`

### 3. Speed Setting → Use `createSpeed()`

**Affected Features:**
- Agile Chassis (Speed 6)
- Any feature that sets total speed

**Pattern:**
```typescript
FactoryLogic.feature.createSpeed({
    id: 'feature-id',
    name: 'Agile Chassis',
    description: 'Your chassis was built for speed.',
    speed: 6
})
```

**Note:** Use `createSpeed` for setting speed, `createBonus` for adding to speed.

### 4. Size Features → Use `createSize()`

**Affected Features:**
- Small Stature (1S)
- Big! (1L)

**Pattern:**
```typescript
FactoryLogic.feature.createSize({
    id: 'feature-id',
    name: 'Small Stature',
    description: 'Your diminutive stature provides advantages.',
    sizeValue: 1,
    sizeMod: 'S'  // or 'M', 'L'
})
```

### 5. Saving Throws → Use `createSaveThreshold()`

**Affected Features:**
- Ram's Head (succeed on 5+)

**Pattern:**
```typescript
FactoryLogic.feature.createSaveThreshold({
    id: 'feature-id',
    name: 'Ram's Head',
    description: 'Your stubborn nature improves your resilience.',
    value: 5  // succeed on 5 or higher
})
```

### 6. Action Abilities → Use `createAbility()` with Full Structure

**Affected Features:**
- Lion's Roar
- Mauling Drive
- Blinding Scramble
- Crown-Butt
- Bellow of the Rut
- Sunlit Revelation
- Pride-Guard (triggered)
- Pounce (maneuver)

**Pattern:**
```typescript
FactoryLogic.feature.createAbility({
    ability: FactoryLogic.createAbility({
        id: 'feature-id',
        name: 'Ability Name',
        description: 'Flavor description',
        type: FactoryLogic.type.createMain(),  // or createManeuver(), createTrigger()
        keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
        distance: [ FactoryLogic.distance.create({
            type: AbilityDistanceType.Burst,
            value: 1
        }) ],
        target: 'Each enemy in the area',
        cost: 'signature',  // or omit for free
        sections: [
            FactoryLogic.createAbilitySectionRoll(
                FactoryLogic.createPowerRoll({
                    characteristic: [ Characteristic.Might, Characteristic.Presence ],
                    tier1: '2 damage',
                    tier2: '5 damage; push 1',
                    tier3: '7 damage; push 2'
                })
            )
        ]
    })
})
```

**Required Imports:**
```typescript
import { AbilityKeyword } from '@/enums/ability-keyword';
import { AbilityDistanceType } from '@/enums/abiity-distance-type';
import { Characteristic } from '@/enums/characteristic';
```

## Change Summary by File

| File | Stat Bonuses | Immunities | Abilities | Size | Saves | Speed |
|------|--------------|------------|-----------|------|-------|-------|
| aurealgar | 3 | 1 | 3 | - | - | - |
| aurkin | 4 | - | 1 | 1 | - | - |
| aurven | 3 | - | - | - | - | - |
| caprini | 1 | - | - | 1 | 1 | - |
| cervari | 1 | - | - | - | - | - |
| elgari | 1 | - | 2 | - | - | - |
| seraphite | 3 | 1 | 1 | - | - | - |
| warforged | 1 | - | - | - | - | 1 |
| **Total** | **17** | **2** | **7** | **2** | **1** | **1** |

## Priority Recommendations

### 🔴 High Priority (Critical for Mechanics)

1. **All stat bonuses** → These won't work mechanically without proper implementation
2. **Condition immunities** → Won't actually provide immunity as text
3. **Speed features** → Won't affect character speed without proper method

### 🟡 Medium Priority (Important for Structure)

4. **Size features** → May not apply size modifiers correctly
5. **Saving throw improvements** → May not calculate correctly

### 🟢 Low Priority (Nice to Have)

6. **Action abilities** → Will work as text, but structured format is better for UI/mechanics

## Implementation Approach

I recommend implementing changes in phases:

### Phase 1: Stat Bonuses (Quickest Win)
- Replace all stat bonus text with `createBonus()`
- Add `FeatureField` import
- Test character stat calculations

### Phase 2: Condition Immunities & Special Features
- Replace immunities with `createConditionImmunity()`
- Replace size features with `createSize()`
- Replace saves with `createSaveThreshold()`
- Replace speed with `createSpeed()`

### Phase 3: Action Abilities (Most Complex)
- Convert action abilities to full `createAbility()` structures
- Add remaining imports (AbilityKeyword, Characteristic, etc.)
- Test ability functionality in game

## Testing Strategy

After each phase:

1. **Compile Check**: `npm run build` or `tsc` - should have no errors
2. **Runtime Check**: Load ancestry in character creator
3. **Stat Verification**: Check that bonuses apply to character stats
4. **Ability Check**: Verify abilities appear in action lists
5. **Combat Test**: Test abilities in actual gameplay

## Documentation Reference

I've created two additional documents:

1. **ANCESTRY_ANALYSIS.md** - Detailed analysis of issues
2. **ANCESTRY_IMPROVEMENTS_EXAMPLE.md** - Before/after code examples

## Next Steps

1. ✅ Review this summary and the example document
2. ⏭️ Decide which improvements to implement (I recommend all of them)
3. ⏭️ I can create improved versions of all 8 files for you to review
4. ⏭️ Test the improved files in your development environment
5. ⏭️ Replace the old files once tested

## Questions to Consider

1. **Do you want me to create all 8 improved files?** (I can do this now)
2. **Should I create them in a new directory first?** (e.g., `src/data/ancestries-improved/`)
3. **Do you prefer incremental changes?** (Start with just stat bonuses, then expand)
4. **Are there specific ancestries to prioritize?** (e.g., most commonly used in testing)

Let me know how you'd like to proceed!
