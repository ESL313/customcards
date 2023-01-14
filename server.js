const http = require('http');
const fs = require('fs');

const projectName = 'customcards';
const projectPath = __dirname.split('\\').join('/');
const port = parseFloat(process.argv[2]) || 3000;

try {
	http.createServer((request, response) => {
		if (!request.url.startsWith(`/${projectName}`)) return return404();
		let path = `${projectPath}/docs${request.url.slice(`/${projectName}`.length)}`;

		if (path.indexOf('..') !== -1) return return404();

		if (fs.existsSync(path)) {
			if (fs.lstatSync(path).isDirectory()) {
				path = `${path}${path.endsWith('/') ? '' : '/'}index.html`;
				if (fs.existsSync(path)) return response.end(fs.readFileSync(path));
			} else return response.end(fs.readFileSync(path));
		}

		return return404();

		function return404() {
			response.statusCode = 404;
			response.end('File not found!');
		}
	}).listen(port);

	console.log(`Server listening to port ${port}. Go to http://localhost:${port}/${projectName} to check it out!`);
} catch (error) {
	console.log(`Server failed to initialize.\nError:\n${error}`);
}
