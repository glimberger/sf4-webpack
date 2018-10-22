APP_CONTAINER=apache

RUN=docker-compose run --rm $(APP_CONTAINER)
EXEC=docker-compose exec $(APP_CONTAINER)
CONSOLE=php bin/console
# Symfony console command
CMD=

.DEFAULT_GOAL := help
.PHONY: help up stop status app logs build cc composer console yarn

help:
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'




##
## Project setup
##---------------------------------------------------------------------------


up:             ## Start project containers
up:
	docker-compose up -d

stop:           ## Remove project containers
stop:
	docker-compose kill
	docker-compose rm -v --force

status:         ## Container status
status:
	docker-compose ps

app:            ## Bash on webserver container
app:
	$(EXEC) bash

logs:           ## Display container logs
logs:
	docker-compose logs -f

build:
	docker-compose build


##
## Symfony
##---------------------------------------------------------------------------

cc:             ## Clear the cache in dev env
cc:
	$(RUN) $(CONSOLE) cache:clear --no-warmup
	$(RUN) $(CONSOLE) cache:warmup

composer:       ## Composer update
composer:
	@$(RUN) php -d memory_limit=-1 /usr/local/bin/composer update

console:        ## Console command (ex: make console CMD="debug:container")
console:
	$(RUN) $(CONSOLE) $(CMD)


yarn:           ## Run yarn
yarn:
	$(EXEC) /root/.yarn/bin/yarn



