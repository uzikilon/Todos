all: npm less minify commit

npm: 
	@echo "`date`\tinstalling required npm pakages if needed"
	@npm install

less:
	@echo "`date`\tCompiling LESS"
	@node node_modules/less/bin/lessc css/todos.less > css/todos.css

minify:
	@echo "`date`\tCompiling JS"
	@node node_modules/.bin/r.js -o js/build.js

commit:
	@echo "`date`\tCommiting changes to git"
	git commit css/todos.css js/app.min.js -m "Minified packages"
