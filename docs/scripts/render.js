const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const image = document.getElementById('image');

const color = {
	black: '#000000',
	white: '#ffffff',
	background: '#2b333d',
	primary: '#ffffffd9',
	secondary: '#ffffffa6',
	label: '#ffd780',
	anemo: '#80ffd7',
	cryo: '#99ffff',
	dendro: '#99ff88',
	electro: '#ffacff',
	geo: '#ffe699',
	hydro: '#80c0ff',
	pyro: '#ff9999',
};

async function render() {
	const size = await getData('info', 'size');
	canvas.width = 1920 * size;
	canvas.height = 1080 * size;

	const genshinFont = new FontFace('genshin-font', 'url(/customcards/assets/miscellaneous/font.ttf)');
	await genshinFont.load();
	await document.fonts.add(genshinFont);

	if (await getData('info', 'type') === 'Character') {
		await background();
		await characterTitle();
		await characterCard();
		const combatSkillCount = (await getData('combatSkills')).length;
		let i = 0;
		let usedHeight = unit(0);
		while (i < combatSkillCount) {
			usedHeight += await combatSkill(i, usedHeight);
			i++;
		}
		const specialSkillCount = (await getData('specialSkills')).length;
		i = 0;
		usedHeight = unit(0);
		while (i < specialSkillCount) {
			usedHeight += await specialSkill(i, usedHeight);
			i++;
		}
	}
	else {
		await background();
		await actionTitle();
		await actionCard();
		await actionDescription();
	}

	image.src = canvas.toDataURL('image/png');
}

function wrapText(text, width) {
	let lines = [];

	const words = text.split(' ');

	let start = 0;
	while (start <= words.length) {
		let lineWidth = 0;
		let wordCount = 0;
		while (lineWidth <= width && start + wordCount <= words.length) {
			lineWidth = ctx.measureText(words.slice(start, start + wordCount + 1).join(' ')).width;
			if (lineWidth <= width) wordCount++;
		}
		lines.push(words.slice(start, start + wordCount).join(' '));
		start += wordCount;
	}

	return lines;
}

function unit(length) {
	return length * canvas.width / 1920;
}
