export interface ChoiceSlot {
	id: string;
	// -1 means unlimited
	capacity: number;
	selected: string[];
	// Lower rank = more restricted, so it is filled first
	rank: number;
	accepts: (name: string) => boolean;
}

export class ChoiceAssignmentLogic {
	static hasSpace = (slot: ChoiceSlot, selected: string[]) => {
		return slot.capacity === -1 || selected.length < slot.capacity;
	};

	// Returns the new selections (by slot ID) after adding `name`, or null if it can't be placed anywhere.
	// Prefers the most restricted slot which has space; if every suitable slot is full,
	// it tries to move existing selections to other slots to make room.
	static select = (slots: ChoiceSlot[], name: string): Record<string, string[]> | null => {
		const ordered = [ ...slots ].sort((a, b) => a.rank - b.rank);
		const current: Record<string, string[]> = {};
		ordered.forEach(s => current[s.id] = [ ...s.selected ]);

		if (ordered.some(s => current[s.id].includes(name))) {
			return null;
		}

		const place = (skill: string, visited: Set<string>): boolean => {
			const candidates = ordered.filter(s => s.accepts(skill) && !visited.has(s.id));

			const free = candidates.find(s => ChoiceAssignmentLogic.hasSpace(s, current[s.id]));
			if (free) {
				current[free.id].push(skill);
				return true;
			}

			for (const slot of candidates) {
				visited.add(slot.id);
				for (const other of [ ...current[slot.id] ]) {
					if (!slot.accepts(other)) {
						continue;
					}
					current[slot.id] = current[slot.id].filter(o => o !== other);
					if (place(other, visited)) {
						current[slot.id].push(skill);
						return true;
					}
					current[slot.id].push(other);
				}
			}

			return false;
		};

		return place(name, new Set<string>()) ? current : null;
	};

	// Removes `name`, then reassigns every remaining selection from scratch so that
	// restricted slots are used first and the flexible slots stay as free as possible.
	static deselect = (slots: ChoiceSlot[], name: string): Record<string, string[]> => {
		const remaining = slots.flatMap(s => s.selected).filter(n => n !== name);
		const acceptCount = (n: string) => slots.filter(s => s.accepts(n)).length;
		// Most constrained selections are placed first
		const ordered = [ ...remaining ].sort((a, b) => acceptCount(a) - acceptCount(b));

		let current: Record<string, string[]> = {};
		slots.forEach(s => current[s.id] = []);

		ordered.forEach(n => {
			const placed = ChoiceAssignmentLogic.select(slots.map(s => ({ ...s, selected: current[s.id] })), n);
			if (placed) {
				current = placed;
			} else {
				// Can't be re-placed (e.g. a custom entry), so keep it where it was
				const original = slots.find(s => s.selected.includes(n));
				if (original) {
					current[original.id].push(n);
				}
			}
		});

		return current;
	};
}
