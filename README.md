# sf4 - webpack

A playground for Symfony + webpack to experiment with:

- load ES5 files with global variables
- load ES modules with global variables
- load React modules

See the [DEMO](https://sleepy-castle-87648.herokuapp.com/default) on Heroku

---

Install locally (using Docker)

```bash
# start the server
make up
```

App available at `http://localhost:8085

```bash
# stop the server
make stop
```

```bash
# command list
make
```

```bash
# start watching modifications with webpack

# enter apache container
make app

# then start watching
yarn watch
```
