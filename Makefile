all: npm less jshint minify

npm:
	@echo "`date`\tInstalling and updating required npm pakages"
	@npm install
	@npm update

less:
	@echo "`date`\tCompiling less into minified css"
	@node_modules/.bin/lessc --yui-compress css/todos.less > css/todos.css

jshint:
	@echo "`date`\tRunning JSHint"
	@node_modules/.bin/jshint --config test/jshint.json ./test/* ./js/*

minify:
	@echo "`date`\tCombining and minifying javascript"
	@node_modules/.bin/r.js -o js/build.js

install: all
	@echo "`date`\tCommiting changes to git"
	git commit css/todos.css js/app.min.js -m "Minified packages"
