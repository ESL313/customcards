async function characterTitle() {
	const input = {
		name: getData('character', 'name'),
		element: getData('character', 'element'),
		weapon: getData('character', 'weapon'),
		faction: getData('character', 'faction')
	};

	const element = new Image();
	element.src = `/customcards/assets/element/${input.element.toLowerCase()}.png`;
	await element.decode();
	ctx.drawImage(element, unit(80), unit(80), unit(130), unit(130));

	ctx.fillStyle = color.primary;
	ctx.font = `${unit(100)}px genshin-font`;
	ctx.textBaseline = 'middle';
	if (ctx.measureText(input.name).width <= unit(1200)) ctx.fillText(input.name, unit(220), unit(145));
	else {
		ctx.font = `${unit(75)}px genshin-font`;
		if (ctx.measureText(input.name).width <= unit(1200)) ctx.fillText(input.name, unit(220), unit(145));
		else {
			ctx.font = `${unit(50)}px genshin-font`;
			if (ctx.measureText(input.name).width <= unit(1200)) ctx.fillText(input.name, unit(220), unit(145));
			else {
				const lines = wrapText(input.name, unit(1200));
				ctx.fillText(lines[0], unit(220), unit(110));
				ctx.fillText(lines[1], unit(220), unit(180));
			}
		}
	}

	ctx.font = `${unit(40)}px genshin-font`;
	ctx.textAlign = 'right';
	ctx.fillText(input.weapon, unit(1820), unit(120));
	ctx.fillText(input.faction, unit(1820), unit(170));
}

async function actionTitle() {
	const input = {
		name: getData('character', 'name'),
		type: getData('character', 'type'),
		subtype: getData('character', 'subtype')
	};

	ctx.fillStyle = color.primary;
	ctx.font = `${unit(100)}px genshin-font`;
	ctx.textBaseline = 'middle';
	if (ctx.measureText(input.name).width <= unit(1300)) ctx.fillText(input.name, unit(100), unit(145));
	else {
		ctx.font = `${unit(75)}px genshin-font`;
		if (ctx.measureText(input.name).width <= unit(1300)) ctx.fillText(input.name, unit(100), unit(145));
		else {
			ctx.font = `${unit(50)}px genshin-font`;
			if (ctx.measureText(input.name).width <= unit(1300)) ctx.fillText(input.name, unit(100), unit(145));
			else {
				const lines = wrapText(input.name, unit(1300));
				ctx.fillText(lines[0], unit(100), unit(110));
				ctx.fillText(lines[1], unit(100), unit(180));
			}
		}
	}

	ctx.font = `${unit(40)}px genshin-font`;
	ctx.textAlign = 'right';
	ctx.fillText(input.type, unit(1820), unit(120));
	ctx.fillText(input.subtype, unit(1820), unit(170));
}
