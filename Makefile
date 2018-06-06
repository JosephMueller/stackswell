install:
	brew install npm
	npm install -g skpm
	sudo npm install

run-watch:
	npm run watch --run

logs:
	skpm log -f 

