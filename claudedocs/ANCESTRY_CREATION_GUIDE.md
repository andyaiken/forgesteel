# Ancestry Creation Guide

Complete guide for creating properly structured ancestry files in the Forgesteel system.

## Table of Contents

1. [File Structure](#file-structure)
2. [Required Imports](#required-imports)
3. [Factory Methods Reference](#factory-methods-reference)
4. Feature Types Explained
5. [Complete Examples](#complete-examples)
6. [Best Practices](#best-practices)
7. [Common Patterns](#common-patterns)

---

## File Structure

Every ancestry file follows this basic structure:

```typescript
import { Ancestry } from '@/models/ancestry';
import { FactoryLogic } from '@/logic/factory-logic';
// Additional imports as needed

export const ancestryName: Ancestry = {
 id: 'ancestry-name',
 name: 'Ancestry Name',
 description: 'Brief description of the ancestry',
 features: [
  // Signature features (always-on, 0 points)
  // Purchasable options (spend ancestry points)
 ],
 ancestryPoints: 3 // Total points players can spend
};
```

---

## Required Imports

Import only what you need based on the features you're creating:

```typescript
// Always required
import { Ancestry } from '@/models/ancestry';
import { FactoryLogic } from '@/logic/factory-logic';

// Import when using stat bonuses
import { FeatureField } from '@/enums/feature-field';

// Import when using condition immunities
import { ConditionType } from '@/enums/condition-type';

// Import when using abilities with keywords
import { AbilityKeyword } from '@/enums/ability-keyword';

// Import when using power rolls
import { Characteristic } from '@/enums/characteristic';

// Import when using area/ranged abilities
import { AbilityDistanceType } from '@/enums/abiity-distance-type';

// Import when using damage modifiers
import { DamageModifierType } from '@/enums/damage-modifier-type';
import { DamageType } from '@/enums/damage-type';

// Import when using skill choices
import { SkillList } from '@/enums/skill-list';
```

---

## Factory Methods Reference

### 1. `FactoryLogic.feature.create()`

**Purpose**: Basic text feature with no mechanical effects

**When to use**:

- Ribbon abilities (flavor, non-combat utility)
- Signature traits that don't need mechanical implementation
- Description-only features

**Structure**:

```typescript
FactoryLogic.feature.create({
 id: 'ancestry-feature-id',
 name: 'Feature Name',
 description: 'What this feature does'
})
```

**Example**:

```typescript
FactoryLogic.feature.create({
 id: 'warforged-living-construct',
 name: 'Living Construct',
 description: 'You are a living creature with a soul, built of wood, leather, and metal. You do not need to eat, drink, or breathe.'
})
```

---

### 2. `FactoryLogic.feature.createBonus()`

**Purpose**: Stat bonuses and numeric improvements

**When to use**:

- Stamina bonuses (extra HP per echelon)
- Speed bonuses (+1 speed)
- Disengage bonuses (easier to escape engagement)
- Stability bonuses (harder to push/pull)
- Recoveries bonuses (extra recovery uses)

**Structure**:

```typescript
FactoryLogic.feature.createBonus({
 id: 'feature-id',
 name: 'Feature Name',
 description: 'What bonus is granted',
 field: FeatureField.FieldName,
 value: 1,              // Fixed value (optional)
 valuePerEchelon: 3     // Scaling value (optional)
})
```

**Available Fields**:

- `FeatureField.Stamina` - HP bonus (use `valuePerEchelon: 3` for +3 per echelon)
- `FeatureField.Speed` - Movement speed bonus (use `value: 1` for +1 speed)
- `FeatureField.Disengage` - Disengage bonus (use `value: 1`)
- `FeatureField.Stability` - Stability bonus (use `value: 1`)
- `FeatureField.Recoveries` - Recovery uses (use `value: 1`)

**Examples**:

```typescript
// Stamina bonus that scales with level
FactoryLogic.feature.createBonus({
 id: 'aurealgar-sun-doze',
 name: 'Sun-Doze',
 description: 'Your ability to rest in sunlight increases your resilience.',
 field: FeatureField.Stamina,
 valuePerEchelon: 3  // +3 stamina per echelon (3/6/9/12)
})

// Fixed speed bonus
FactoryLogic.feature.createBonus({
 id: 'aurealgar-cats-grace',
 name: 'Cat\'s Grace',
 description: 'Your feline agility grants you enhanced movement speed.',
 field: FeatureField.Speed,
 value: 1  // +1 speed (flat bonus)
})

// Disengage bonus
FactoryLogic.feature.createBonus({
 id: 'aurealgar-tail-balance',
 name: 'Tail Balance',
 description: 'Your tail helps you maintain balance and evade attacks.',
 field: FeatureField.Disengage,
 value: 1  // +1 to disengage
})

// Stability bonus
FactoryLogic.feature.createBonus({
 id: 'cervari-sure-footed',
 name: 'Sure-Footed',
 description: 'Your sturdy build makes you harder to move.',
 field: FeatureField.Stability,
 value: 1  // +1 to stability
})
```

---

### 3. `FactoryLogic.feature.createConditionImmunity()`

**Purpose**: Immunity to specific conditions

**When to use**:

- Immunity to frightened, slowed, grabbed, etc.
- Racial resistances to status effects

**Structure**:

```typescript
FactoryLogic.feature.createConditionImmunity({
 id: 'feature-id',
 name: 'Feature Name',
 description: 'Why immune to this condition',
 conditions: [ ConditionType.ConditionName ]
})
```

**Available Conditions**:

- `ConditionType.Frightened`
- `ConditionType.Slowed`
- `ConditionType.Grabbed`
- `ConditionType.Restrained`
- `ConditionType.Dazed`
- (See enum for complete list)

**Example**:

```typescript
FactoryLogic.feature.createConditionImmunity({
 id: 'aurealgar-king-of-dunes',
 name: 'King of the Dunes',
 description: 'Your regal presence makes you immune to fear.',
 conditions: [ ConditionType.Frightened ]
})

// Multiple conditions
FactoryLogic.feature.createConditionImmunity({
 id: 'example-multiple',
 name: 'Unshakable',
 description: 'You cannot be frightened or slowed.',
 conditions: [ ConditionType.Frightened, ConditionType.Slowed ]
})
```

---

### 4. `FactoryLogic.feature.createAbility()`

**Purpose**: Active abilities with mechanical effects

**When to use**:

- Attacks with damage rolls
- Triggered abilities (reactions)
- Maneuvers (movement abilities)
- Main actions with effects

**Structure**:

```typescript
FactoryLogic.feature.createAbility({
 ability: FactoryLogic.createAbility({
  id: 'ability-id',
  name: 'Ability Name',
  description: 'What the ability does',
  type: FactoryLogic.type.createType(),
  keywords: [ AbilityKeyword.Keyword ],  // Optional
  distance: [ FactoryLogic.distance.createDistance() ],
  target: 'Who/what is targeted',
  cost: 'signature',  // or 'heroic' or omit
  sections: [
   // Ability sections here
  ]
 })
})
```

**Ability Types**:

#### a) **Main Action** - `FactoryLogic.type.createMain()`

Standard action that uses your main action.

```typescript
type: FactoryLogic.type.createMain()
```

#### b) **Maneuver** - `FactoryLogic.type.createManeuver()`

Movement or positioning ability.

```typescript
type: FactoryLogic.type.createManeuver()
```

#### c) **Triggered** - `FactoryLogic.type.createTrigger('trigger condition')`

Reaction ability with specific trigger.

```typescript
type: FactoryLogic.type.createTrigger('You or an adjacent ally takes damage from a strike')
```

**Keywords** (optional):

- `AbilityKeyword.Attack` - Attack roll required
- `AbilityKeyword.Magic` - Magical ability
- `AbilityKeyword.Weapon` - Weapon-based
- `AbilityKeyword.Area` - Affects an area
- `AbilityKeyword.Melee` - Melee range
- `AbilityKeyword.Ranged` - Ranged attack

**Distance Types**:

```typescript
// Self only
distance: [ FactoryLogic.distance.createSelf() ]

// Melee range
distance: [ FactoryLogic.distance.createMelee() ]

// Ranged (specify squares)
distance: [ FactoryLogic.distance.createRanged(5) ]

// Burst (area around self)
distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ]

// Cube (area at range)
distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, width: 3 }) ]
```

**Ability Sections**:

#### Text Section

Simple text description of effects:

```typescript
sections: [
 FactoryLogic.createAbilitySectionText('Move up to 3 squares. This movement ignores engagement.')
]
```

#### Power Roll Section

Ability with tiered damage/effects:

```typescript
sections: [
 FactoryLogic.createAbilitySectionRoll(
  FactoryLogic.createPowerRoll({
   characteristic: [ Characteristic.Might ],
   tier1: '2 damage',
   tier2: '5 damage; push 1',
   tier3: '8 damage; push 2; target is dazed'
  })
 )
]
```

**Available Characteristics**:

- `Characteristic.Might` - Strength-based
- `Characteristic.Agility` - Dexterity-based
- `Characteristic.Reason` - Intelligence-based
- `Characteristic.Intuition` - Wisdom-based
- `Characteristic.Presence` - Charisma-based

You can allow multiple characteristics:

```typescript
characteristic: [ Characteristic.Might, Characteristic.Presence ]
```

**Cost Types**:

- `cost: 'signature'` - Signature ability cost
- `cost: 'heroic'` - Heroic resource cost
- Omit for free abilities

**Complete Ability Examples**:

```typescript
// Main action with power roll
FactoryLogic.feature.createAbility({
 ability: FactoryLogic.createAbility({
  id: 'elgari-crown-butt',
  name: 'Crown-Butt',
  description: 'You drive your palmate crown into your foe with overwhelming force.',
  type: FactoryLogic.type.createMain(),
  keywords: [ AbilityKeyword.Weapon ],
  distance: [ FactoryLogic.distance.createMelee() ],
  target: 'One creature',
  cost: 'signature',
  sections: [
   FactoryLogic.createAbilitySectionRoll(
    FactoryLogic.createPowerRoll({
     characteristic: [ Characteristic.Might ],
     tier1: '+2 damage',
     tier2: '+4 damage; knock prone',
     tier3: '+6 damage; knock prone, target cannot stand until end of its next turn unless it succeeds a save'
    })
   )
  ]
 })
})

// Maneuver with text effect
FactoryLogic.feature.createAbility({
 ability: FactoryLogic.createAbility({
  id: 'aurven-pounce',
  name: 'Pounce',
  description: 'You leap onto your prey with feline grace.',
  type: FactoryLogic.type.createManeuver(),
  distance: [ FactoryLogic.distance.createSelf() ],
  target: 'Self',
  sections: [
   FactoryLogic.createAbilitySectionText('Move up to 3; your next strike this turn gains +1 boon and deals +3 damage on tier 2+.')
  ]
 })
})

// Triggered ability
FactoryLogic.feature.createAbility({
 ability: FactoryLogic.createAbility({
  id: 'elgari-herd-guard',
  name: 'Herd-Guard',
  description: 'You protect your herd with fierce dedication.',
  type: FactoryLogic.type.createTrigger('You or an adjacent ally takes damage from a strike'),
  distance: [ FactoryLogic.distance.createSelf() ],
  target: 'The triggering creature',
  sections: [
   FactoryLogic.createAbilitySectionText('You reduce the damage from the strike by an amount equal to your level.')
  ]
 })
})

// Area ability with multiple effects
FactoryLogic.feature.createAbility({
 ability: FactoryLogic.createAbility({
  id: 'aurealgar-lions-roar',
  name: 'Lion\'s Roar',
  description: 'You let loose a mighty roar to shake your foes\' spirits.',
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
     tier2: '5 damage; frightened (save ends)',
     tier3: '8 damage; frightened and weakened (both save end)'
    })
   ),
   FactoryLogic.createAbilitySectionText('If the target is already frightened, they have a bane on the resistance roll.')
  ]
 })
})
```

---

### 5. `FactoryLogic.feature.createSize()`

**Purpose**: Non-standard size features

**When to use**:

- Small creatures (size 1S)
- Large creatures (size 1L)
- Includes mechanical effects of size

**Structure**:

```typescript
FactoryLogic.feature.createSize({
 id: 'feature-id',
 name: 'Feature Name',
 description: 'Size description and effects',
 sizeValue: 1,      // Size number
 sizeMod: 'S'       // 'S' for small, 'M' for medium, 'L' for large
})
```

**Example**:

```typescript
// Small creature
FactoryLogic.feature.createSize({
 id: 'aurkin-small-stature',
 name: 'Small Stature',
 description: 'Your diminutive stature lets you easily get out of trouble. You are size 1S. You gain +1 to disengage.',
 sizeValue: 1,
 sizeMod: 'S'
})

// Large creature
FactoryLogic.feature.createSize({
 id: 'giant-huge-frame',
 name: 'Huge Frame',
 description: 'Your massive size grants you power but reduces mobility. You are size 1L.',
 sizeValue: 1,
 sizeMod: 'L'
})
```

---

### 6. `FactoryLogic.feature.createSpeed()`

**Purpose**: Set explicit base speed (not a bonus)

**When to use**:

- Non-standard base speed (not 5)
- Ancestry has inherently different movement

**Structure**:

```typescript
FactoryLogic.feature.createSpeed({
 id: 'feature-id',
 name: 'Feature Name',
 description: 'Why speed is different',
 speed: 6  // Base speed value
})
```

**Example**:

```typescript
FactoryLogic.feature.createSpeed({
 id: 'warforged-agile-chassis',
 name: 'Agile Chassis',
 description: 'Your chassis was built for speed.',
 speed: 6  // Base speed of 6 instead of 5
})
```

**Note**: For speed *bonuses* (+1 speed), use `createBonus()` with `FeatureField.Speed` instead.

---

### 7. `FactoryLogic.feature.createSaveThreshold()`

**Purpose**: Improve saving throw difficulty

**When to use**:

- Easier saving throws (lower target number)

**Structure**:

```typescript
FactoryLogic.feature.createSaveThreshold({
 id: 'feature-id',
 name: 'Feature Name',
 description: 'Why saves are easier',
 value: 5  // New target number (normally 6)
})
```

**Example**:

```typescript
FactoryLogic.feature.createSaveThreshold({
 id: 'caprini-rams-head',
 name: 'Ram\'s Head',
 description: 'Your hardened skull and stubborn nature improve your resilience. You succeed on saving throws on a roll of 5 or higher.',
 value: 5  // Save on 5+ instead of 6+
})
```

---

### 8. `FactoryLogic.feature.createDamageModifier()`

**Purpose**: Damage resistances, immunities, or vulnerabilities

**When to use**:

- Resistance to specific damage types
- Immunity to damage types
- Vulnerability to damage types

**Structure**:

```typescript
FactoryLogic.feature.createDamageModifier({
 id: 'feature-id',
 name: 'Feature Name',
 description: 'Why damage is modified',
 modifiers: [
  {
   type: DamageModifierType.Immunity,  // or Resistance, Vulnerability
   damageType: DamageType.Fire,
   value: 0  // Usually 0 for immunity
  }
 ]
})
```

**Modifier Types**:

- `DamageModifierType.Immunity` - No damage taken
- `DamageModifierType.Resistance` - Half damage (specify value)
- `DamageModifierType.Vulnerability` - Extra damage (specify value)

**Damage Types**:

- `DamageType.Fire`, `DamageType.Cold`, `DamageType.Lightning`
- `DamageType.Acid`, `DamageType.Poison`, `DamageType.Corruption`
- `DamageType.Holy`, `DamageType.Psychic`
- And more...

**Examples**:

```typescript
// Fire immunity
FactoryLogic.feature.createDamageModifier({
 id: 'tiefling-fire-immunity',
 name: 'Hellborn Resistance',
 description: 'Your infernal heritage makes you immune to fire.',
 modifiers: [
  {
   type: DamageModifierType.Immunity,
   damageType: DamageType.Fire,
   value: 0
  }
 ]
})

// Cold resistance
FactoryLogic.feature.createDamageModifier({
 id: 'frost-giant-cold-resistance',
 name: 'Frost Blood',
 description: 'You have resistance 5 to cold damage.',
 modifiers: [
  {
   type: DamageModifierType.Resistance,
   damageType: DamageType.Cold,
   value: 5
  }
 ]
})
```

---

### 9. `FactoryLogic.feature.createSkillChoice()`

**Purpose**: Choose from a list of skills

**When to use**:

- Ancestry grants skill proficiency
- Choice between multiple skill options

**Structure**:

```typescript
FactoryLogic.feature.createSkillChoice({
 id: 'feature-id',
 name: 'Feature Name',
 description: 'Skill selection description',
 listOptions: [ SkillList.Lore, SkillList.Crafting ],  // Skill lists to choose from
 count: 1  // Number of skills to select
})
```

**Available Skill Lists**:

- `SkillList.Lore` - Knowledge skills
- `SkillList.Crafting` - Creation skills
- `SkillList.Exploration` - Investigation skills
- `SkillList.Interpersonal` - Social skills
- `SkillList.Intrigue` - Deception/stealth skills

**Example**:

```typescript
FactoryLogic.feature.createSkillChoice({
 id: 'human-versatile',
 name: 'Versatile Training',
 description: 'Choose one skill from the Lore or Crafting list.',
 listOptions: [ SkillList.Lore, SkillList.Crafting ],
 count: 1
})
```

---

### 10. `FactoryLogic.feature.createChoice()`

**Purpose**: Allow player to choose from multiple feature options

**When to use**:

- Purchasable ancestry options
- Customize character with point buy

**Structure**:

```typescript
FactoryLogic.feature.createChoice({
 id: 'ancestry-options',
 name: 'Ancestry Options',
 options: [
  {
   feature: FactoryLogic.feature.createXXX({ ... }),
   value: 1  // Point cost
  },
  {
   feature: FactoryLogic.feature.createXXX({ ... }),
   value: 2  // More expensive option
  }
 ],
 count: 'ancestry'  // Use ancestry points
})
```

**Example**:

```typescript
FactoryLogic.feature.createChoice({
 id: 'aurealgar-options',
 name: 'Aurealgar Options',
 options: [
  {
   feature: FactoryLogic.feature.createBonus({
    id: 'aurealgar-tail-balance',
    name: 'Tail Balance',
    description: 'Your tail helps you maintain balance.',
    field: FeatureField.Disengage,
    value: 1
   }),
   value: 1  // Costs 1 ancestry point
  },
  {
   feature: FactoryLogic.feature.createAbility({
    ability: FactoryLogic.createAbility({
     id: 'aurealgar-pounce',
     name: 'Pounce',
     description: 'Leap onto your prey.',
     type: FactoryLogic.type.createManeuver(),
     distance: [ FactoryLogic.distance.createSelf() ],
     target: 'Self',
     sections: [
      FactoryLogic.createAbilitySectionText('Move up to 3; your next strike gains +1 boon.')
     ]
    })
   }),
   value: 2  // Costs 2 ancestry points
  }
 ],
 count: 'ancestry'
})
```

---

### 11. `FactoryLogic.feature.createMultiple()`

**Purpose**: Group multiple always-on features together

**When to use**:

- Signature abilities (racial traits that cost 0 points)
- Multiple features that always work together

**Structure**:

```typescript
FactoryLogic.feature.createMultiple({
 id: 'signature-id',
 name: 'Signature Group Name',
 features: [
  FactoryLogic.feature.create({ ... }),
  FactoryLogic.feature.create({ ... })
 ]
})
```

**Example**:

```typescript
FactoryLogic.feature.createMultiple({
 id: 'aurealgar-signature',
 name: 'Aurian Lineage',
 features: [
  FactoryLogic.feature.create({
   id: 'aurealgar-claws',
   name: 'Natural Claws – Predator\'s Rend',
   description: 'Triggered, 1/round. When you hit with a melee strike, deal extra damage equal to your highest characteristic.'
  }),
  FactoryLogic.feature.create({
   id: 'aurealgar-big',
   name: 'Big',
   description: 'Your size is 1L (large).'
  })
 ]
})
```

---

## Complete Examples

### Example 1: Simple Ancestry with Basic Features

```typescript
import { Ancestry } from '@/models/ancestry';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureField } from '@/enums/feature-field';

export const simpleAncestry: Ancestry = {
 id: 'ancestry-simple',
 name: 'Simple Ancestry',
 description: 'A straightforward ancestry example.',
 features: [
  // Signature (always-on, 0 points)
  FactoryLogic.feature.create({
   id: 'simple-signature',
   name: 'Natural Trait',
   description: 'You have advantage on perception checks related to smell.'
  }),

  // Purchasable options
  FactoryLogic.feature.createChoice({
   id: 'simple-options',
   name: 'Simple Options',
   options: [
    {
     feature: FactoryLogic.feature.createBonus({
      id: 'simple-hardy',
      name: 'Hardy',
      description: 'You gain extra stamina per echelon.',
      field: FeatureField.Stamina,
      valuePerEchelon: 3
     }),
     value: 1
    },
    {
     feature: FactoryLogic.feature.createBonus({
      id: 'simple-fleet',
      name: 'Fleet',
      description: 'You move faster than others.',
      field: FeatureField.Speed,
      value: 1
     }),
     value: 1
    }
   ],
   count: 'ancestry'
  })
 ],
 ancestryPoints: 2
};
```

---

### Example 2: Combat-Focused Ancestry with Abilities

```typescript
import { Ancestry } from '@/models/ancestry';
import { FactoryLogic } from '@/logic/factory-logic';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { ConditionType } from '@/enums/condition-type';
import { FeatureField } from '@/enums/feature-field';

export const warriorAncestry: Ancestry = {
 id: 'ancestry-warrior',
 name: 'Warrior Ancestry',
 description: 'Born for battle.',
 features: [
  // Signature
  FactoryLogic.feature.createMultiple({
   id: 'warrior-signature',
   name: 'Warrior Heritage',
   features: [
    FactoryLogic.feature.create({
     id: 'warrior-training',
     name: 'Martial Training',
     description: 'You gain proficiency with all weapons.'
    })
   ]
  }),

  // Options
  FactoryLogic.feature.createChoice({
   id: 'warrior-options',
   name: 'Warrior Options',
   options: [
    {
     feature: FactoryLogic.feature.createConditionImmunity({
      id: 'warrior-fearless',
      name: 'Fearless',
      description: 'Your warrior spirit makes you immune to fear.',
      conditions: [ ConditionType.Frightened ]
     }),
     value: 2
    },
    {
     feature: FactoryLogic.feature.createAbility({
      ability: FactoryLogic.createAbility({
       id: 'warrior-charge',
       name: 'Battle Charge',
       description: 'Charge into combat with fury.',
       type: FactoryLogic.type.createManeuver(),
       distance: [ FactoryLogic.distance.createSelf() ],
       target: 'Self',
       sections: [
        FactoryLogic.createAbilitySectionText('Move up to 3; your next strike this turn deals +5 damage.')
       ]
      })
     }),
     value: 2
    },
    {
     feature: FactoryLogic.feature.createAbility({
      ability: FactoryLogic.createAbility({
       id: 'warrior-cleave',
       name: 'Cleaving Strike',
       description: 'Strike through multiple foes.',
       type: FactoryLogic.type.createMain(),
       keywords: [ AbilityKeyword.Weapon ],
       distance: [ FactoryLogic.distance.createMelee() ],
       target: 'Two adjacent creatures',
       cost: 'signature',
       sections: [
        FactoryLogic.createAbilitySectionRoll(
         FactoryLogic.createPowerRoll({
          characteristic: [ Characteristic.Might ],
          tier1: '+1 damage to each',
          tier2: '+3 damage to each',
          tier3: '+6 damage to each; push both 1'
         })
        )
       ]
      })
     }),
     value: 2
    }
   ],
   count: 'ancestry'
  })
 ],
 ancestryPoints: 4
};
```

---

## Best Practices

### 1. **ID Naming Convention**

```typescript
// Ancestry ID
id: 'ancestry-name'

// Feature IDs
id: 'ancestryname-feature-1'
id: 'ancestryname-option-2'
id: 'ancestryname-ability-name'
```

### 2. **Escape Special Characters**

Always escape apostrophes in strings:

```typescript
name: 'Cat\'s Grace'  // Correct
name: 'Cat's Grace'   // WRONG - will cause errors
```

### 3. **Signature vs Purchasable**

```typescript
features: [
 // First: Signature features (0 points, always-on)
 FactoryLogic.feature.createMultiple({ ... }),

 // Second: Purchasable options (spend ancestry points)
 FactoryLogic.feature.createChoice({ ... })
]
```

### 4. **Point Costs**

Common point costs:

- **1 point**: Simple bonuses (+1 speed, +1 disengage, ribbon abilities)
- **2 points**: Powerful abilities (signature cost attacks, major bonuses, immunities)
- **3 points**: Very powerful features (rarely used)

### 5. **Stamina Scaling**

Always use `valuePerEchelon: 3` for stamina bonuses:

```typescript
field: FeatureField.Stamina,
valuePerEchelon: 3  // Standard HP scaling
```

### 6. **Power Roll Damage Scaling**

Standard damage progression:

- **Tier 1**: 2-3 damage
- **Tier 2**: 5-6 damage + minor effect
- **Tier 3**: 7-9 damage + major effect

### 7. **Ability Costs**

- `cost: 'signature'` for powerful abilities (limited uses)
- `cost: 'heroic'` for ultimate abilities (very limited)
- Omit cost for free abilities

---

## Common Patterns

### Pattern 1: Mobile Skirmisher

```typescript
// Speed bonus
FactoryLogic.feature.createBonus({
 field: FeatureField.Speed,
 value: 1
})

// Disengage bonus
FactoryLogic.feature.createBonus({
 field: FeatureField.Disengage,
 value: 1
})

// Mobility maneuver
FactoryLogic.feature.createAbility({
 ability: FactoryLogic.createAbility({
  type: FactoryLogic.type.createManeuver(),
  sections: [
   FactoryLogic.createAbilitySectionText('Move up to 3; ignore engagement and difficult terrain.')
  ]
 })
})
```

### Pattern 2: Tough Tank

```typescript
// Extra HP
FactoryLogic.feature.createBonus({
 field: FeatureField.Stamina,
 valuePerEchelon: 3
})

// Stability
FactoryLogic.feature.createBonus({
 field: FeatureField.Stability,
 value: 1
})

// Damage reduction trigger
FactoryLogic.feature.createAbility({
 ability: FactoryLogic.createAbility({
  type: FactoryLogic.type.createTrigger('You take damage'),
  sections: [
   FactoryLogic.createAbilitySectionText('Reduce the damage by your level.')
  ]
 })
})
```

### Pattern 3: Area Controller

```typescript
// Area attack
FactoryLogic.feature.createAbility({
 ability: FactoryLogic.createAbility({
  type: FactoryLogic.type.createMain(),
  keywords: [ AbilityKeyword.Area ],
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
     tier2: '5 damage; slowed (save ends)',
     tier3: '7 damage; slowed and weakened (both save end)'
    })
   )
  ]
 })
})
```

---

## Testing Your Ancestry

After creating your ancestry file:

1. **Compile Check**: Run `npm run build` to check for TypeScript errors
2. **ESLint Check**: Run `npx eslint src/data/ancestries/your-file.ts`
3. **Load Test**: Open character creator and select your ancestry
4. **Mechanics Test**: Verify bonuses calculate correctly
5. **Ability Test**: Check abilities appear in action lists

---

## Common Errors

### Error: "String not found in file"

**Cause**: Special characters not escaped
**Fix**: Escape apostrophes with backslash: `\'`

### Error: "Expected indentation of N tabs"

**Cause**: Mixed tabs and spaces
**Fix**: Use tabs only for indentation

### Error: "Type X is not assignable"

**Cause**: Wrong enum or missing import
**Fix**: Import required enums at top of file

### Error: "Property 'X' does not exist"

**Cause**: Typo in property name or wrong factory method
**Fix**: Check spelling and factory method documentation

---

## Quick Reference Card

```typescript
// Stat bonus
createBonus({ field: FeatureField.Speed, value: 1 })

// Condition immunity
createConditionImmunity({ conditions: [ ConditionType.Frightened ] })

// Simple ability
createAbility({
 type: createManeuver(),
 sections: [ createAbilitySectionText('Effect description') ]
})

// Attack ability
createAbility({
 type: createMain(),
 cost: 'signature',
 sections: [
  createAbilitySectionRoll(
   createPowerRoll({
    characteristic: [ Characteristic.Might ],
    tier1: '2 damage',
    tier2: '5 damage',
    tier3: '8 damage'
   })
  )
 ]
})

// Size
createSize({ sizeValue: 1, sizeMod: 'S' })

// Speed
createSpeed({ speed: 6 })

// Save threshold
createSaveThreshold({ value: 5 })
```

---

## Summary

This guide covers all the factory methods available for creating ancestries. Use:

- `create()` for basic features
- `createBonus()` for stat improvements
- `createConditionImmunity()` for status protections
- `createAbility()` for active powers
- `createSize()` for non-standard sizes
- `createSpeed()` for base speed changes
- `createSaveThreshold()` for easier saves
- `createDamageModifier()` for resistances/immunities
- `createSkillChoice()` for skill proficiencies
- `createChoice()` for purchasable options
- `createMultiple()` for signature grouping

Follow the examples, escape special characters, use proper imports, and test thoroughly!
