# Draachenmar Cultures Update

## Summary

✅ All Draachenmar ancestries now have associated cultures

## Changes Made

### 1. Added All Orden Core Cultures (11 total)

Added the complete list of ancestral cultures from orden.ts to draachenmar.ts:

- Devil (Urban, bureaucratic, academic - Anjali)
- Draconem (Secluded, bureaucratic, martial - Vastariax)
- Dwarf (Secluded, bureaucratic, creative - Zaliac)
- Wode Elf (Wilderness, bureaucratic, martial - Yllyric)
- High Elf (Secluded, bureaucratic, martial - Hyrallic)
- Hakaan (Rural, communal, labor - Vhoric)
- Human (Urban, communal, labor - Vaslorian)
- Memonek (Nomadic, communal, academic - Axiomatic)
- Orc (Wilderness, communal, creative - Kalliac)
- Polder (Urban, communal, creative - Khoursirian)
- Time Raider (Nomadic, communal, martial - Voll)

### 2. Added Missing Angulotl Culture

Created new ancestral culture for the Angulotl ancestry:

```typescript
FactoryLogic.createCulture(
    'Angulotl',
    'Wilderness, communal, creative — amphibious river-delvers and tide-pool artisans skilled in current-craft and aquatic lore.',
    CultureType.Ancestral,
    EnvironmentData.wilderness,
    OrganizationData.communal,
    UpbringingData.creative,
    'Filliaric'
)
```

**Design Rationale**:

- **Environment: Wilderness** - Matches their amphibious, river/tide-pool nature
- **Organization: Communal** - Consistent with other aquatic/small ancestries
- **Upbringing: Creative** - Reflects their "current-craft" and artisan nature from the ancestry description
- **Language: Filliaric** - Uses existing Angulotl language already defined in draachenmar.ts

## Complete Draachenmar Ancestral Cultures (5 total)

1. **Angulotl** - Wilderness, communal, creative (Filliaric) ✨ NEW
2. **Seraphite** - Urban, communal, academic (Seraphic)
3. **Aurian** - Nomadic, communal, creative (Aurish)
   - Covers: aurealgar, aurkin, aurven
4. **Hornvar** - Rural, communal, martial (Hartic)
   - Covers: elgari, cervari, caprini
5. **Warforged** - Urban, bureaucratic, labor (Forged Cant)

## Ancestry-to-Culture Mapping

| Ancestry | Culture | Language |
|----------|---------|----------|
| angulotl | Angulotl | Filliaric |
| aurealgar | Aurian | Aurish |
| aurkin | Aurian | Aurish |
| aurven | Aurian | Aurish |
| caprini | Hornvar | Hartic |
| elgari | Hornvar | Hartic |
| cervari | Hornvar | Hartic |
| warforged | Warforged | Forged Cant |
| seraphite | Seraphite | Seraphic |

## Total Cultures Available in Draachenmar

**16 cultures total:**

- 11 from Orden (Devil, Draconem, Dwarf, Elves, Hakaan, Human, Memonek, Orc, Polder, Time Raider)
- 5 Draachenmar-specific (Angulotl, Seraphite, Aurian, Hornvar, Warforged)

## ESLint Status

✅ **CLEAN** - No errors or warnings

## Language Reference

The Filliaric language was already defined in draachenmar.ts:

```typescript
{
    name: 'Filliaric',
    description: 'Angulotl language; fluid consonant clusters and tidal cadence; spoken by Angulotls anywhere in the world.',
    type: LanguageType.Cultural,
    related: []
}
```

Perfect thematic match for the amphibious, water-focused Angulotl ancestry!

## Notes

- All ancestries now have complete cultural options
- Players creating Angulotl characters can select the Angulotl culture to speak Filliaric
- The culture description emphasizes their aquatic artisan nature (river-delvers, tide-pool artisans, current-craft)
- Wilderness/communal/creative matches well with their slippery, escape-focused abilities
