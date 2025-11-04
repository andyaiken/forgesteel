# Ancestry Analysis - Proposed Improvements

## Executive Summary

Your ancestry files (aurealgar, aurkin, aurven, caprini, cervari, elgari, seraphite, warforged) use mostly generic `FactoryLogic.feature.create()` with text descriptions. However, the established ancestries in the codebase use **specialized factory methods** that provide proper mechanical implementation and type safety.

## Key Issues Found

### 1. Missing Specialized Factory Methods

You're only using:

- `FactoryLogic.feature.create()` - generic feature creation
- `FactoryLogic.feature.createMultiple()` - grouping features
- `FactoryLogic.feature.createChoice()` - choice menus

**You should also be using:**

- `FactoryLogic.feature.createBonus()` - For stat bonuses (Stamina, Speed, Stability, Disengage, Recoveries)
- `FactoryLogic.feature.createConditionImmunity()` - For condition immunities
- `FactoryLogic.feature.createAbility()` - For abilities with full mechanical structures
- `FactoryLogic.feature.createSpeed()` - For explicit speed setting
- `FactoryLogic.feature.createSaveThreshold()` - For improved saving throws
- `FactoryLogic.feature.createDamageModifier()` - For damage immunities/resistances
- `FactoryLogic.feature.createSize()` - For size features
- `FactoryLogic.feature.createSkillChoice()` - For granting skill selections

### 2. Missing Required Imports

Your files only import:

```typescript
import { Ancestry } from '@/models/ancestry';
import { FactoryLogic } from '@/logic/factory-logic';
```

**You need to import additional enums:**

```typescript
import { ConditionType } from '@/enums/condition-type';
import { FeatureField } from '@/enums/feature-field';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { DamageType } from '@/enums/damage-type';
import { DamageModifierType } from '@/enums/damage-modifier-type';
import { AbilityDistanceType } from '@/enums/abiity-distance-type';
```

### 3. Improper Ability Structures

**Current approach (text-only):**

```typescript
feature: FactoryLogic.feature.create({
    id: 'aurealgar-feature-2-15',
    name: 'Lion's Roar',
    description: 'Action; Area 1 burst; Magic. Roll Might or Presence vs. each enemy in the area. t1: 2 damage; t2: 5 damage and push 1; t3: 7 damage and push 2.'
})
```

**Proper approach (structured ability):**

```typescript
feature: FactoryLogic.feature.createAbility({
    ability: FactoryLogic.createAbility({
        id: 'aurealgar-feature-2-15',
        name: 'Lion's Roar',
        description: 'You let loose a mighty roar to shake your foes' spirits.',
        type: FactoryLogic.type.createMain(),
        keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
        distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
        target: 'Each enemy in the area',
        cost: 'signature',
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

## Specific Improvements by File

### Aurealgar (src/data/ancestries/aurealgar.ts)

**Issues:**

1. "Thick Hide" (+3 Stamina) → Use `createBonus` with `FeatureField.Stamina` and `valuePerEchelon: 3`
2. "Cat's Grace" (+1 speed) → Use `createSpeed` with `speed: 6` or `createBonus` with `FeatureField.Speed`
3. "Tail Balance" (+1 disengage) → Use `createBonus` with `FeatureField.Disengage`
4. "King of the Dunes" (immune to frightened) → Use `createConditionImmunity` with `ConditionType.Frightened`
5. "Lion's Roar" (Action ability) → Use `createAbility` with full power roll structure
6. "Mauling Drive" (Action ability) → Use `createAbility` with full power roll structure

### Aurkin (src/data/ancestries/aurkin.ts)

**Issues:**

1. "Small Stature" size feature → Use `createSize` for proper size implementation
2. "Tail Balance", "Tightrope Tail" (+1 disengage) → Use `createBonus` with `FeatureField.Disengage`
3. "Cat's Grace" (+1 speed) → Use `createSpeed` or `createBonus`
4. "Sun-Doze" (+3 Stamina) → Use `createBonus` with `FeatureField.Stamina` and `valuePerEchelon`
5. "Blinding Scramble" (Action ability) → Use `createAbility` with full structure

### Aurven (src/data/ancestries/aurven.ts)

**Issues:**

1. "Tail Balance" (+1 disengage) → Use `createBonus` with `FeatureField.Disengage`
2. "Cat's Grace" (+1 speed) → Use `createSpeed` or `createBonus`
3. "Sun-Doze" (+3 Stamina) → Use `createBonus` with `FeatureField.Stamina` and `valuePerEchelon`
4. "Sure-Footed" (+1 stability) → Use `createBonus` with `FeatureField.Stability`

### Caprini (src/data/ancestries/caprini.ts)

**Issues:**

1. "Small Stature" size feature → Use `createSize`
2. "Tight Turn" (+1 disengage) → Use `createBonus` with `FeatureField.Disengage`
3. "Ram's Head" (saving throws 5+) → Use `createSaveThreshold` with `value: 5`

### Cervari (src/data/ancestries/cervari.ts)

**Issues:**

1. "Sure-Footed" (+1 stability) → Use `createBonus` with `FeatureField.Stability`

### Elgari (src/data/ancestries/elgari.ts)

**Issues:**

1. "Thick Hide" (+3 Stamina) → Use `createBonus` with `FeatureField.Stamina` and `valuePerEchelon: 3`
2. "Crown-Butt" (Action ability) → Use `createAbility` with full power roll structure
3. "Bellow of the Rut" (Action ability) → Use `createAbility` with full power roll structure

### Seraphite (src/data/ancestries/seraphite.ts)

**Issues:**

1. "Fearless" (immune to Frightened) → Use `createConditionImmunity` with `ConditionType.Frightened`
2. "Heaven's Vitality" (+3 Stamina) → Use `createBonus` with `FeatureField.Stamina` and `valuePerEchelon: 3`
3. "Angelic Poise" (+1 disengage) → Use `createBonus` with `FeatureField.Disengage`
4. "Luminous Stride" (+1 speed) → Use `createSpeed` with `speed: 6` or `createBonus`
5. "Sunlit Revelation" (Action ability) → Use `createAbility` with full power roll structure

### Warforged (src/data/ancestries/warforged.ts)

**Issues:**

1. "Agile Chassis" (Speed 6) → Use `createSpeed` with `speed: 6`
2. "Integrated Stabilizer" (+1 Stability) → Use `createBonus` with `FeatureField.Stability`

## Why These Changes Matter

### 1. **Type Safety**

Using specialized methods ensures the system knows what type of bonus/feature it is, preventing runtime errors.

### 2. **Proper UI Rendering**

The UI likely has special handling for different feature types (showing stamina increases in stat blocks, condition immunities in condition lists, etc.)

### 3. **Mechanical Implementation**

Generic text descriptions don't provide mechanical implementation. The specialized methods hook into the game's mechanical systems.

### 4. **Consistency**

All other ancestries use these patterns. Consistency makes the codebase maintainable.

### 5. **Query and Filter Support**

The system can properly query "show me all features that grant speed bonuses" if they use the proper factory methods.

## Implementation Priority

**High Priority (Breaks mechanical functionality):**

1. Stat bonuses (Stamina, Speed, Stability, Disengage) → `createBonus` or `createSpeed`
2. Condition immunities → `createConditionImmunity`
3. Size features → `createSize`
4. Saving throw improvements → `createSaveThreshold`

**Medium Priority (Improves structure):**
5. Action abilities with power rolls → `createAbility` with full structure

**Low Priority (Nice to have):**
6. Damage modifiers → `createDamageModifier`
7. Skill choices → `createSkillChoice`

## Next Steps

I will create improved versions of each ancestry file in a separate directory (`src/data/ancestries-improved/`) so you can:

1. Review the changes
2. Compare side-by-side
3. Decide which improvements to apply
4. Test the mechanical functionality

Each improved file will have comments explaining why each change was made.
