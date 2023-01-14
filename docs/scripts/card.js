async function card() {
	const input = {
		image: getData('character', 'image'),
		health: getData('character', 'health'),
		energy: getData('character', 'energy')
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
