requirejs.config({
	baseUrl: "/another/path",
	paths: {
		"some": "some/v1.0"
	},
	//Pass an API key for use in the pixie package's
	//main module.
	config: {
		'pixie/index': {
			apiKey: 'XJKDLNS'
		}
	},
	//Set up config for the "pixie" package, whose main
	//module is the index.js file in the pixie folder.
	packages: [
		{
			name: 'pixie',
			main: 'index'
		}
	],
	waitSeconds: 15
});
