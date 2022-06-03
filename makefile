base := cd ./site && npm install && cd .. && npx @11ty/eleventy --config=./site/.eleventy.js --formats=md,html,njk,css

build:
	${base}

build-prod:
	${base} --pathprefix 'github-pages-demo'

serve:
	${base} --serve