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

async function sendDefault(...pathArgs) {
	const paths = [...pathArgs];
	let isCharacter = true;
	try { if (data.info.type === 'Action') isCharacter = false }
	catch { }

	let characterCard = await fetch('/customcards/assets/default/traveler.json');
	characterCard = await characterCard.json();
	let actionCard = await fetch('/customcards/assets/default/paimon.json');
	actionCard = await actionCard.json();

	let item = characterCard;

	if (!isCharacter) item = actionCard;

	for (const path of paths) item = item[path];
	return item;
}
