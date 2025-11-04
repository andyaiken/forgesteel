# Ancestry Improvements - Detailed Example

This document shows detailed before/after comparisons for each type of improvement needed.

## Example 1: Stamina Bonuses

### ❌ Current Approach (Text Only) — Stamina Bonuses

```typescript
{
    feature: FactoryLogic.feature.create({
        id: 'aurealgar-feature-2-6',
        name: 'Sun-Doze',
        description: '+3 Stamina per echelon.'
    }),
    value: 1
}
```

**Problem:** The system doesn't know this grants stamina mechanically. It's just text.

### ✅ Improved Approach (Proper Bonus — Stamina)

```typescript
{
    feature: FactoryLogic.feature.createBonus({
        id: 'aurealgar-feature-2-6',
        name: 'Sun-Doze',
        description: 'Your ability to rest in sunlight increases your resilience.',
        field: FeatureField.Stamina,
        valuePerEchelon: 3
    }),
    value: 1
}
```

**Benefits:**

- System automatically calculates stamina at each level
- Shows up in character stat calculations
- Properly typed and queryable
- Requires import: `import { FeatureField } from '@/enums/feature-field';`

---

## Example 2: Speed Bonuses

### ❌ Current Approach (Text Only) — Speed Bonuses

```typescript
{
    feature: FactoryLogic.feature.create({
        id: 'aurealgar-feature-2-4',
        name: 'Cat's Grace',
        description: '+1 speed.'
    }),
    value: 1
}
```

### ✅ Improved Approach Option A (Speed Bonus)

```typescript
{
    feature: FactoryLogic.feature.createBonus({
        id: 'aurealgar-feature-2-4',
        name: 'Cat's Grace',
        description: 'Your feline agility grants you enhanced movement.',
        field: FeatureField.Speed,
        value: 1
    }),
    value: 1
}
```

### ✅ Improved Approach Option B (Set Speed)

```typescript
{
    feature: FactoryLogic.feature.createSpeed({
        id: 'aurealgar-feature-2-4',
        name: 'Cat's Grace',
        description: 'Your feline agility grants you enhanced movement.',
        speed: 6  // Assuming base is 5
    }),
    value: 1
}
```

**Use `createSpeed` when:** Setting total speed value
**Use `createBonus` when:** Adding to existing speed

---

## Example 3: Disengage Bonuses

### ❌ Current Approach (Text Only) — Disengage Bonuses

```typescript
{
    feature: FactoryLogic.feature.create({
        id: 'aurealgar-feature-2-3',
        name: 'Tail Balance',
        description: '+1 disengage.'
    }),
    value: 1
}
```

### ✅ Improved Approach (Proper Bonus — Disengage)

```typescript
{
    feature: FactoryLogic.feature.createBonus({
        id: 'aurealgar-feature-2-3',
        name: 'Tail Balance',
        description: 'Your tail provides enhanced balance and agility.',
        field: FeatureField.Disengage,
        value: 1
    }),
    value: 1
}
```

---

## Example 4: Stability Bonuses

### ❌ Current Approach (Text Only) — Stability Bonuses

```typescript
{
    feature: FactoryLogic.feature.create({
        id: 'aurven-feature-2-10',
        name: 'Sure-Footed',
        description: '+1 stability.'
    }),
    value: 1
}
```

### ✅ Improved Approach (Proper Bonus)

```typescript
{
    feature: FactoryLogic.feature.createBonus({
        id: 'aurven-feature-2-10',
        name: 'Sure-Footed',
        description: 'Your mountain heritage makes you difficult to move.',
        field: FeatureField.Stability,
        value: 1
    }),
    value: 1
}
```

---

## Example 5: Condition Immunities

### ❌ Current Approach (Text Only) — Condition Immunities

```typescript
{
    feature: FactoryLogic.feature.create({
        id: 'aurealgar-feature-2-12',
        name: 'King of the Dunes',
        description: 'You are immune to the frightened condition.'
    }),
    value: 2
}
```

### ✅ Improved Approach (Proper Immunity)

```typescript
{
    feature: FactoryLogic.feature.createConditionImmunity({
        id: 'aurealgar-feature-2-12',
        name: 'King of the Dunes',
        description: 'Your proud nature makes you immune to fear.',
        conditions: [ ConditionType.Frightened ]
    }),
    value: 2
}
```

**Requires import:** `import { ConditionType } from '@/enums/condition-type';`

**Available ConditionTypes:**

- `ConditionType.Frightened`
- `ConditionType.Slowed`
- `ConditionType.Weakened`
- `ConditionType.Dazed`
- etc.

---

## Example 6: Size Features

### ❌ Current Approach (Text Only) — Size Features

```typescript
FactoryLogic.feature.create({
    id: 'aurkin-feature-1b',
    name: 'Small Stature',
    description: 'You are size 1S. You gain +1 disengage and may move through the spaces of creatures larger than you (you can't end your movement in an occupied space).'
})
```

### ✅ Improved Approach (Proper Size Feature)

```typescript
FactoryLogic.feature.createSize({
    id: 'aurkin-feature-1b',
    name: 'Small Stature',
    description: 'Your diminutive stature lets you easily get out of trouble and move through larger creatures\' spaces.',
    sizeValue: 1,
    sizeMod: 'S'
})
```

**Note:** You may still need a separate disengage bonus if that's not automatic with size.

---

## Example 7: Saving Throw Improvements

### ❌ Current Approach (Text Only) — Saving Throw Improvements

```typescript
{
    feature: FactoryLogic.feature.create({
        id: 'caprini-option-7',
        name: 'Ram's Head',
        description: 'You succeed on saving throws on a 5+. Your first shove or Grab each scene gains an edge.'
    }),
    value: 2
}
```

### ✅ Improved Approach (Proper Save Threshold)

```typescript
{
    feature: FactoryLogic.feature.createSaveThreshold({
        id: 'caprini-option-7',
        name: 'Ram's Head',
        description: 'Your hardened skull and stubborn nature improve your resilience. Your first shove or Grab each scene gains an edge.',
        value: 5
    }),
    value: 2
}
```

**Note:** This sets the saving throw success threshold. The shove/grab text stays as flavor description.

---

## Example 8: Full Ability Structures

### ❌ Current Approach (Text Only) — Full Ability Structures

```typescript
{
    feature: FactoryLogic.feature.create({
        id: 'aurealgar-feature-2-15',
        name: 'Lion's Roar',
        description: 'Action; Area 1 burst; Magic. Roll Might or Presence vs. each enemy in the area. t1: 2 damage; t2: 5 damage and push 1; t3: 7 damage and push 2.'
    }),
    value: 2
}
```

### ✅ Improved Approach (Structured Ability)

```typescript
{
    feature: FactoryLogic.feature.createAbility({
        ability: FactoryLogic.createAbility({
            id: 'aurealgar-feature-2-15',
            name: 'Lion's Roar',
            description: 'You let loose a mighty roar to shake your foes\' spirits.',
            type: FactoryLogic.type.createMain(),
            keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
            distance: [ FactoryLogic.distance.create({
                type: AbilityDistanceType.Burst,
                value: 1
            }) ],
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
    }),
    value: 2
}
```

**Requires imports:**

```typescript
import { AbilityKeyword } from '@/enums/ability-keyword';
import { AbilityDistanceType } from '@/enums/abiity-distance-type';
import { Characteristic } from '@/enums/characteristic';
```

**Available AbilityKeywords:**

- `AbilityKeyword.Area`
- `AbilityKeyword.Magic`
- `AbilityKeyword.Weapon`
- `AbilityKeyword.Attack`
- etc.

**Available Characteristics:**

- `Characteristic.Might`
- `Characteristic.Agility`
- `Characteristic.Reason`
- `Characteristic.Intuition`
- `Characteristic.Presence`

---

## Example 9: Triggered Abilities

### ❌ Current Approach (Text Only) — Triggered Abilities

```typescript
{
    feature: FactoryLogic.feature.create({
        id: 'aurealgar-feature-2-8',
        name: 'Pride-Guard',
        description: 'Triggered. When you or an adjacent ally take damage from a strike, reduce that damage by your level.'
    }),
    value: 1
}
```

### ✅ Improved Approach (Structured Trigger)

```typescript
{
    feature: FactoryLogic.feature.createAbility({
        ability: FactoryLogic.createAbility({
            id: 'aurealgar-feature-2-8',
            name: 'Pride-Guard',
            description: 'You protect your allies with fierce dedication.',
            type: FactoryLogic.type.createTrigger('You or an adjacent ally takes damage from a strike'),
            distance: [ FactoryLogic.distance.createSelf() ],
            target: 'The triggering creature',
            sections: [
                FactoryLogic.createAbilitySectionText('You reduce the damage from the strike by an amount equal to your level.')
            ]
        })
    }),
    value: 1
}
```

---

## Example 10: Maneuver Abilities

### ❌ Current Approach (Text Only) — Maneuver Abilities

```typescript
{
    feature: FactoryLogic.feature.create({
        id: 'aurealgar-feature-2-10',
        name: 'Pounce',
        description: 'Maneuver. Stride up to your speed toward a creature you can see, then make a melee strike. On a tier 2+ outcome, push the target 1.'
    }),
    value: 2
}
```

### ✅ Improved Approach (Structured Maneuver)

```typescript
{
    feature: FactoryLogic.feature.createAbility({
        ability: FactoryLogic.createAbility({
            id: 'aurealgar-feature-2-10',
            name: 'Pounce',
            description: 'You leap toward your prey with feline grace.',
            type: FactoryLogic.type.createManeuver(),
            distance: [ FactoryLogic.distance.createSelf() ],
            target: 'Self',
            sections: [
                FactoryLogic.createAbilitySectionText('Stride up to your speed toward a creature you can see, then make a melee strike. On a tier 2+ outcome, push the target 1.')
            ]
        })
    }),
    value: 2
}
```

---

## Complete Import List Needed

For fully improved ancestry files, you'll need:

```typescript
import { Ancestry } from '@/models/ancestry';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureField } from '@/enums/feature-field';
import { ConditionType } from '@/enums/condition-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { AbilityDistanceType } from '@/enums/abiity-distance-type';
import { Characteristic } from '@/enums/characteristic';
import { DamageType } from '@/enums/damage-type';
import { DamageModifierType } from '@/enums/damage-modifier-type';
```

**Note:** Only import what you actually use in each file.

---

## Summary of Changes by Ancestry

### Aurealgar

- 3 stat bonuses (Stamina, Speed, Disengage) → `createBonus`
- 1 condition immunity (Frightened) → `createConditionImmunity`
- 3 action abilities → `createAbility` with full structure

### Aurkin

- 1 size feature → `createSize`
- 4 stat bonuses → `createBonus`
- 1 action ability → `createAbility`

### Aurven

- 3 stat bonuses → `createBonus`

### Caprini

- 1 size feature → `createSize`
- 1 stat bonus → `createBonus`
- 1 save threshold → `createSaveThreshold`

### Cervari

- 1 stat bonus → `createBonus`

### Elgari

- 1 stat bonus → `createBonus`
- 2 action abilities → `createAbility`

### Seraphite

- 1 condition immunity → `createConditionImmunity`
- 3 stat bonuses → `createBonus`
- 1 action ability → `createAbility`

### Warforged

- 1 speed feature → `createSpeed`
- 1 stat bonus → `createBonus`

---

## Testing Checklist

After implementing these changes:

1. ✅ Character sheet shows correct stamina calculations
2. ✅ Speed bonuses apply correctly in movement
3. ✅ Condition immunities work in combat
4. ✅ Abilities appear in action lists with proper structure
5. ✅ Saving throw thresholds calculate correctly
6. ✅ Size modifiers apply to game mechanics
7. ✅ No TypeScript compilation errors
8. ✅ All imports resolve correctly
