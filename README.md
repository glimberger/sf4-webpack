# sf4 - webpack

A playground for Symfony + webpack to experiment with:

- load ES5 files with global variables
- load ES modules with global variables
- load React modules

See the [DEMO](https://sleepy-castle-87648.herokuapp.com/default) on Heroku

Start the server:

```bash
make up
```

Open : `http://localhost:8085/public`

Stop the server:

```bash
make stop
```

Command list:

```bash
make
```

Start watching with webpack:

```bash
# enter apache container
make app
# then start webpack
yarn watch
```
