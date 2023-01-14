let data = {};
const input = document.getElementById('data');
input.addEventListener('change', async () => {
	const text = await input.files[0].text();
	data = JSON.parse(text);
	render();
});

render();

function getData(...pathArgs) {
	const paths = [...pathArgs];
	let item = data;
	for (const path of paths) {
		if (!item[path]) return sendDefault(...pathArgs);
		item = item[path];
	}
	return item;
}

function sendDefault(...pathArgs) {
	const paths = [...pathArgs];
	let isCharacter = true;
	try { if (data.info.type === 'Action') isCharacter = false }
	catch { }
	let item = {
		info: {
			size: 1,
			type: 'Character'
		},
		character: {
			name: 'Traveler',
			image: '/customcards/assets/default/traveler.png',
			element: 'Anemo',
			weapon: 'Sword',
			faction: 'Mondstadt',
			health: 10,
			energy: 3
		},
		combatSkills: [
			{
				name: 'Foreign Ironwind',
				image: '/customcards/assets/default/normal_attack.png',
				type: 'Normal Attack',
				description: 'Deals 2 Physical DMG.',
				cost: [
					{
						type: 'Anemo',
						value: 1
					},
					{
						type: 'Unaligned',
						value: 2
					}
				]
			},
			{
				name: 'Palm Vortex',
				image: '/customcards/assets/default/elemental_skill.png',
				type: 'Elemental Skill',
				description: 'Deals 3 Anemo DMG.',
				cost: [
					{
						type: 'Anemo',
						value: 3
					}
				]
			},
			{
				name: 'Gust Surge',
				image: '/customcards/assets/default/elemental_burst.png',
				type: 'Elemental Burst',
				description: 'Deals 3 Anemo DMG.',
				cost: [
					{
						type: 'Anemo',
						value: 3
					},
					{
						type: 'Energy',
						value: 3
					}
				]
			}
		],
		specialSkills: [
			{
				name: 'Tornado',
				type: 'Summon',
				description: 'End Phase: Deals 2 Anemo DMG. Usages: 2'
			}
		]
	};

	if (!isCharacter) item = {
		info: {
			size: 1,
			type: 'Action'
		},
		character: {
			name: 'Paimon',
			image: '/customcards/assets/default/paimon.png',
			type: 'Support Card',
			subtype: 'Companion',
			description: 'When Action Phase begins: Create Omni Element x2. Usage(s): 2'
		},
		cost: [
			{
				type: 'Matching',
				value: 3
			}
		]
	}

	for (const path of paths) item = item[path];
	return item;
}
