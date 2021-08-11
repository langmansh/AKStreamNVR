// https://cn.eslint.org/docs/rules/
// https://cn.eslint.org/docs/rules/
module.exports ={
    'extends': [
        'plugin:react/recommended',
    ],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true,
            "modules": true,
            "legacyDecorators": true
        }
    },
    "rules": {
        "react/display-name": [0],
        "react/prop-types": [0],
    },
	"settings":{
		"react":{
			"version":"999.999.999"
		}
	}
}
