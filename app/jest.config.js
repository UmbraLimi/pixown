module.exports = {
	"transform": {
		"^.+\\.jsx?$": "babel-jest"
	},
	"moduleFileExtensions": [
		"js",
		"jsx"
	],
	"modulePaths": [
		"<rootDir>/node_modules/"
	],
	"moduleNameMapper": {
		"meteor/(.*):(.*)$": "<rootDir>/tests/mocks/$1__$2.js",
		"meteor/(.*)": "<rootDir>/tests/mocks/$1.js"
	},
	"unmockedModulePathPatterns": [
		"/^imports\\/.*\\.jsx?$/",
		"/^node_modules/"
	]
}