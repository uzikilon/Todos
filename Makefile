all: npm less jshint minify

npm: 
	@echo "`date`\tinstalling required npm pakages if needed"
	@npm install
	@npm update

less:
	@echo "`date`\tCompiling LESS and Minifying CSS"
	@node_modules/less/bin/lessc --yui-compress css/todos.less > css/todos.css

jshint:
	@echo "`date`\tRunning JSHint"
	@node_modules/jshint/bin/hint --config test/jshint.json test/* js/*

minify:
	@echo "`date`\tCombining and Minifying Javascript"
	@node_modules/.bin/r.js -o js/build.js

install: all
	@echo "`date`\tCommiting changes to git"
	git commit css/todos.css js/app.min.js -m "Minified packages"
