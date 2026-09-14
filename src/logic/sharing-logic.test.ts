import { describe, expect, test } from 'vitest';

import { MAX_CHAT_CODE_LENGTH, SharingLogic } from '@/logic/sharing-logic';
import { ImbuedItemData } from '@/data/items/imbued-item-data';
import { ImbuedWeaponData } from '@/data/imbuements/imbued-weapon-data';
import { Item } from '@/models/item';
import { MonsterOrganizationType } from '@/enums/monster-organization-type';
import { SharingDictionary } from '@/logic/sharing-dictionary';
import { Title } from '@/models/title';
import { TitleData } from '@/data/title-data';
import { TrinketData } from '@/data/items/trinket-data';
import { Utils } from '@/utils/utils';
import { deflateSync } from 'fflate';
import { retainer } from '@/data/monsters/retainer';

const getRetainer = () => Utils.copy(retainer.monsters.find(m => m.role.organization === MonsterOrganizationType.Retainer)!);

const getImbuedWeapon = () => {
	const item = Utils.copy(ImbuedItemData.imbuedWeapon);
	item.imbuements = [ Utils.copy(Object.values(ImbuedWeaponData).find(i => i.level === 1)!) ];
	return item;
};

describe('encode / decode', () => {
	test('round-trips an item', async () => {
		const original = Utils.copy(TrinketData.colorCloakBlue);

		const code = await SharingLogic.encode('item', original);
		const result = await SharingLogic.decode(code);
		const item = result.item!;

		expect(result.kind).toBe('item');
		expect(item.name).toBe(original.name);
		expect(item.type).toBe(original.type);
		expect(item.effect).toBe(original.effect);
		expect(item.featuresByLevel.length).toBe(original.featuresByLevel.length);
	});

	test('round-trips an item with an imbuement', async () => {
		const original = getImbuedWeapon();

		const result = await SharingLogic.decode(await SharingLogic.encode('item', original));
		const item = result.item!;

		expect(item.imbuements.length).toBe(1);
		expect(item.imbuements[0].name).toBe(original.imbuements[0].name);
		expect(item.imbuements[0].feature.name).toBe(original.imbuements[0].feature.name);
	});

	test('round-trips a title', async () => {
		const original = Utils.copy(Object.values(TitleData).find(t => (t as Title).features?.length > 1) as Title);

		const result = await SharingLogic.decode(await SharingLogic.encode('title', original));
		const title = result.title!;

		expect(result.kind).toBe('title');
		expect(title.name).toBe(original.name);
		expect(title.echelon).toBe(original.echelon);
		expect(title.prerequisites).toBe(original.prerequisites);
		expect(title.features.length).toBe(original.features.length);
		expect(title.features.map(f => f.name)).toEqual(original.features.map(f => f.name));
	});

	test('leaves IDs alone, for whoever adds the item to a hero to deal with', async () => {
		const original = getImbuedWeapon();

		const item = (await SharingLogic.decode(await SharingLogic.encode('item', original))).item!;

		expect(item.id).toBe(original.id);
		expect(item.imbuements[0].feature.id).toBe(original.imbuements[0].feature.id);
	});

	test('leaves the feature choice to the recipient of a title', async () => {
		const original = Utils.copy(Object.values(TitleData).find(t => (t as Title).features?.length > 1) as Title);
		original.selectedFeatureID = original.features[0].id;

		const title = (await SharingLogic.decode(await SharingLogic.encode('title', original))).title!;

		expect(title.selectedFeatureID).toBe('');
	});

	test('survives being wrapped across lines', async () => {
		const original = Utils.copy(TrinketData.colorCloakBlue);
		const code = await SharingLogic.encode('item', original);

		const wrapped = (code.match(/.{1,40}/g) ?? []).join('\n');
		const item = (await SharingLogic.decode(wrapped)).item!;

		expect(item.name).toBe(original.name);
	});

	test('produces a code short enough to paste into a chat message', async () => {
		const code = await SharingLogic.encode('item', getImbuedWeapon());

		expect(code.length).toBeLessThan(MAX_CHAT_CODE_LENGTH);
	});

	test('leans on the dictionary to keep codes short', async () => {
		// Without the dictionary this item encodes to a little under 800 characters; the point
		// of shipping one is that it does appreciably better than that.
		const code = await SharingLogic.encode('item', getImbuedWeapon());

		expect(code.length).toBeLessThan(600);
	});

	test('round-trips a retainer', async () => {
		const original = getRetainer();

		const result = await SharingLogic.decode(await SharingLogic.encode('monster', original));
		const monster = result.monster!;

		expect(result.kind).toBe('monster');
		expect(monster.name).toBe(original.name);
		expect(monster.level).toBe(original.level);
		expect(monster.role.organization).toBe(original.role.organization);
		expect(monster.retainer).not.toBeNull();
		expect(monster.retainer!.level).toBe(original.retainer!.level);
		expect(monster.features.length).toBe(original.features.length);
		expect(monster.features.map(f => f.name)).toEqual(original.features.map(f => f.name));
		expect(monster.characteristics).toEqual(original.characteristics);
	});

	test('keeps a retainer code inside a chat message', async () => {
		// Retainers are the biggest thing a code is expected to carry, and the reason the
		// dictionary is 16kB - every one of them has to survive a single chat message.
		const codes = await Promise.all(
			retainer.monsters
				.filter(m => m.role.organization === MonsterOrganizationType.Retainer)
				.map(m => SharingLogic.encode('monster', m))
		);

		expect(codes.length).toBeGreaterThan(0);
		expect(Math.max(...codes.map(c => c.length))).toBeLessThan(MAX_CHAT_CODE_LENGTH);
	});

	test('reports what kind of thing a code holds', async () => {
		expect(SharingLogic.getKind(await SharingLogic.encode('item', TrinketData.colorCloakBlue))).toBe('item');
		expect(SharingLogic.getKind(await SharingLogic.encode('monster', getRetainer()))).toBe('monster');
		expect(SharingLogic.getKind('nonsense')).toBeNull();
	});
});

describe('decoding bad codes', () => {
	test('rejects text which is not a code', async () => {
		await expect(SharingLogic.decode('hello there')).rejects.toThrow('does not look like');
	});

	test('rejects a code whose tail was cut off', async () => {
		const code = await SharingLogic.encode('item', TrinketData.colorCloakBlue);

		await expect(SharingLogic.decode(code.slice(0, code.length - 20))).rejects.toThrow('incomplete or garbled');
	});

	test('rejects a truncated code', async () => {
		const code = await SharingLogic.encode('item', TrinketData.colorCloakBlue);

		const parts = code.split('.');
		const truncated = [ parts[0], parts[1], parts[2].slice(0, parts[2].length - 20), parts[3] ].join('.');

		await expect(SharingLogic.decode(truncated)).rejects.toThrow('incomplete or garbled');
	});

	test('rejects a code from a newer version', async () => {
		const code = await SharingLogic.encode('item', TrinketData.colorCloakBlue);

		await expect(SharingLogic.decode(`FS2${code.slice(3)}`)).rejects.toThrow('newer version');
	});

	test('rejects a kind it cannot import', async () => {
		const code = await SharingLogic.encode('item', TrinketData.colorCloakBlue);
		const parts = code.split('.');

		await expect(SharingLogic.decode([ parts[0], 'ancestry', parts[2], parts[3] ].join('.'))).rejects.toThrow('cannot import');
	});

	test('rejects a payload which is not the promised kind', async () => {
		const title = Utils.copy(Object.values(TitleData)[0] as Title);
		const code = await SharingLogic.encode('title', title);
		const parts = code.split('.');

		await expect(SharingLogic.decode([ parts[0], 'item', parts[2], parts[3] ].join('.'))).rejects.toThrow('does not contain an item');
	});
});

describe('decoded items', () => {
	test('arrive intact', async () => {
		const original = Utils.copy(TrinketData.colorCloakBlue) as Item;

		const item = (await SharingLogic.decode(await SharingLogic.encode('item', original))).item!;

		expect(item.featuresByLevel.flatMap(lvl => lvl.features).every(f => !!f.id)).toBe(true);
		expect(item.count).toBe(original.count);
		expect(item.crafting?.goal).toBe(original.crafting?.goal);
	});
});

describe('the dictionary', () => {
	test('is frozen', () => {
		// Both ends of a code have to feed deflate the same dictionary, so these bytes are part
		// of the code format. If this test fails, the dictionary has been edited or rebuilt, and
		// every code anyone has already shared has become unreadable. Restore it rather than
		// updating these numbers; see the note at the top of sharing-dictionary.ts.
		expect(SharingDictionary.length).toBe(16295);
		expect(Utils.hashCode(new TextDecoder().decode(SharingDictionary))).toBe(673253734893566);
	});

	test('does not let a code smuggle in more data than we will decompress', async () => {
		const code = await SharingLogic.encode('item', TrinketData.colorCloakBlue);
		const parts = code.split('.');

		// Something which inflates to far more than the item it claims to be
		const bomb = SharingLogic['toBase64Url'](
			deflateSync(new TextEncoder().encode('x'.repeat(4 * 1024 * 1024)), { level: 9, dictionary: SharingDictionary })
		);
		const checksum = Utils.hashCode(bomb).toString(36);

		await expect(SharingLogic.decode([ parts[0], parts[1], bomb, checksum ].join('.'))).rejects.toThrow('far too much data');
	});
});
