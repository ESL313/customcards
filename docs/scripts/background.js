async function background() {
	ctx.fillStyle = color.background;
	ctx.fillRect(unit(0), unit(0), unit(1920), unit(1080));

	const logo = new Image();
	logo.src = '/customcards/assets/miscellaneous/logo.png';
	await logo.decode();
	ctx.globalAlpha = 0.2;
	ctx.drawImage(logo, unit(845), unit(290), unit(720), unit(720));

	ctx.fillStyle = color.black;
	ctx.roundRect(unit(70), unit(70), unit(1780), unit(150), unit(20));
	ctx.fill();
	ctx.globalAlpha = 1;
}
