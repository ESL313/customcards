async function combatSkill(index, height) {
	const skill = getData('combatSkills', index);

	ctx.font = `${unit(30)}px genshin-font`;
	const title = wrapText(skill.name, unit(350));
	ctx.font = `${unit(25)}px genshin-font`;
	const description = wrapText(skill.description, unit(480));

	ctx.globalAlpha = 0.2;
	ctx.fillStyle = color.black;
	ctx.beginPath();
	ctx.roundRect(unit(560), unit(290) + height, unit(610), unit(Math.max(120, title.length * 40 + description.length * 35 + 40)), unit(20));
	ctx.fill();
	ctx.globalAlpha = 1;

	let currentHeight = unit(0);

	ctx.fillStyle = color.primary;
	ctx.font = `${unit(30)}px genshin-font`;
	ctx.textBaseline = 'top';
	ctx.textAlign = 'left';
	for (const line of title) {
		ctx.fillText(line, unit(680), unit(300) + height + currentHeight);
		currentHeight += unit(40);
	}

	ctx.fillStyle = color.label;
	ctx.font = `${unit(20)}px genshin-font`;
	ctx.fillText(skill.type, unit(680), unit(300) + height + currentHeight);
	currentHeight += unit(30);

	ctx.fillStyle = color.secondary;
	ctx.font = `${unit(25)}px genshin-font`;
	for (const line of description) {
		ctx.fillText(line, unit(680), unit(300) + height + currentHeight);
		currentHeight += unit(35);
	}

	const skillImage = new Image();
	skillImage.src = skill.image;
	await skillImage.decode();
	ctx.drawImage(skillImage, unit(570), unit(300) + height, unit(100), unit(100));

	const costCount = skill.cost.length;
	for (let i = 0; i < costCount; i++) {
		await ctx.drawImage(await getDiceImage(skill.cost[i].type), unit(1160 - 60 * (costCount - i)), unit(300) + height, unit(60), unit(60));

		ctx.fillStyle = color.white;
		ctx.font = `${unit(30)}px genshin-font`;
		ctx.textBaseline = 'middle';
		ctx.textAlign = 'center';
		ctx.lineWidth = unit(3);

		const value = skill.cost[i].value;
		ctx.strokeText(value, unit(1190 - 60 * (costCount - i)), unit(330) + height);
		ctx.fillText(value, unit(1190 - 60 * (costCount - i)), unit(330) + height);
	}

	return currentHeight + unit(40);
}

async function specialSkill(index, height) {
	const skill = getData('specialSkills', index);

	ctx.font = `${unit(30)}px genshin-font`;
	const title = wrapText(skill.name, unit(350));
	ctx.font = `${unit(25)}px genshin-font`;
	const description = wrapText(skill.description, unit(480));
	console.log(description.length)

	ctx.globalAlpha = 0.2;
	ctx.fillStyle = color.black;
	ctx.beginPath();
	ctx.roundRect(unit(1240), unit(290) + height, unit(610), unit(title.length * 40 + description.length * 35 + 40), unit(20));
	ctx.fill();
	ctx.globalAlpha = 1;

	let currentHeight = unit(0);

	ctx.fillStyle = color.primary;
	ctx.font = `${unit(30)}px genshin-font`;
	ctx.textBaseline = 'top';
	ctx.textAlign = 'left';
	for (const line of title) {
		ctx.fillText(line, unit(1250), unit(300) + height + currentHeight);
		currentHeight += unit(40);
	}

	ctx.fillStyle = color.label;
	ctx.font = `${unit(20)}px genshin-font`;
	ctx.fillText(skill.type, unit(1250), unit(300) + height + currentHeight);
	currentHeight += unit(30);

	ctx.fillStyle = color.secondary;
	ctx.font = `${unit(25)}px genshin-font`;
	for (const line of description) {
		ctx.fillText(line, unit(1250), unit(300) + height + currentHeight);
		currentHeight += unit(35);
	}

	return currentHeight + unit(40);
}

let costs = {};
async function getDiceImage(type) {
	if (costs[type]) return costs[type];

	const cost = new Image();
	cost.src = `/customcards/assets/cost/${type.toLowerCase()}.png`;
	await cost.decode();

	costs[type] = cost;
	return cost;
}
