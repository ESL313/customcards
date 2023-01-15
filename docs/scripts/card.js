async function characterCard() {
	const input = {
		image: await getData('character', 'image'),
		health: await getData('character', 'health'),
		energy: await getData('character', 'energy')
	};

	const char = new Image();
	char.src = input.image;
	await char.decode();

	let width = unit(420);
	let height = unit(720);
	let clippedWidth = char.width;
	let clippedHeight = char.height;
	if (char.width * height >= char.height * width) clippedWidth = char.height * width / height;
	else if (char.width * height <= char.height * width) clippedHeight = char.width * height / width;

	ctx.save();
	ctx.roundRect(unit(70), unit(290), unit(420), unit(720), unit(30));
	ctx.clip();
	await ctx.drawImage(char, (char.width - clippedWidth) / 2, (char.height - clippedHeight) / 2, clippedWidth, clippedHeight, unit(70), unit(290), width, height);
	ctx.restore();

	const frame = new Image();
	frame.src = '/customcards/assets/miscellaneous/frame.png';
	await frame.decode();
	await ctx.drawImage(frame, unit(70), unit(290), unit(420), unit(720));

	const health = new Image();
	health.src = '/customcards/assets/miscellaneous/health.png';
	await health.decode();
	await ctx.drawImage(health, unit(10), unit(260), unit(150), unit(150));

	ctx.fillStyle = color.white;
	ctx.font = `${unit(80)}px genshin-font`;
	ctx.textBaseline = 'middle';
	ctx.textAlign = 'center';
	ctx.lineWidth = unit(5);
	ctx.strokeText(input.health, unit(85), unit(335));
	ctx.fillText(input.health, unit(85), unit(335));

	const energy = new Image();
	energy.src = '/customcards/assets/miscellaneous/energy.png';
	await energy.decode();
	for (let i = 0; i < input.energy; i++) {
		ctx.drawImage(energy, unit(430), unit(350 + 90 * i), unit(111), unit(90))
	}
}

async function actionCard() {
	const input = {
		image: await getData('character', 'image'),
		cost: await getData('cost')
	};

	const char = new Image();
	char.src = input.image;
	await char.decode();

	let width = unit(420);
	let height = unit(720);
	let clippedWidth = char.width;
	let clippedHeight = char.height;
	if (char.width * height >= char.height * width) clippedWidth = char.height * width / height;
	else if (char.width * height <= char.height * width) clippedHeight = char.width * height / width;

	ctx.save();
	ctx.roundRect(unit(70), unit(290), unit(420), unit(720), unit(30));
	ctx.clip();
	await ctx.drawImage(char, (char.width - clippedWidth) / 2, (char.height - clippedHeight) / 2, clippedWidth, clippedHeight, unit(70), unit(290), width, height);
	ctx.restore();

	const frame = new Image();
	frame.src = '/customcards/assets/miscellaneous/frame.png';
	await frame.decode();
	await ctx.drawImage(frame, unit(70), unit(290), unit(420), unit(720));

	for (let i = 0; i < input.cost.length; i++) {
		const cost = new Image();
		cost.src = `/customcards/assets/cost/${input.cost[i].type.toLowerCase()}.png`;
		await cost.decode();
		await ctx.drawImage(cost, unit(10), unit(260 + i * 150), unit(150), unit(150));

		ctx.fillStyle = color.white;
		ctx.font = `${unit(80)}px genshin-font`;
		ctx.textBaseline = 'middle';
		ctx.textAlign = 'center';
		ctx.lineWidth = unit(5);
		ctx.strokeText(input.cost[i].value, unit(85), unit(335 + i * 150));
		ctx.fillText(input.cost[i].value, unit(85), unit(335 + i * 150));
	}
}
