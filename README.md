# Pietile EventEmitter

[![npm version](https://badgen.net/npm/v/pietile-eventemitter?color=56C838)](https://www.npmjs.com/package/pietile-eventemitter)

Tiny typed EventEmitter for TypeScript.

## Installation

Using yarn

```sh
yarn add pietile-eventemitter
```

or using npm

```sh
npm install -S pietile-eventemitter
```

## Usage

Subclass or incapsulate `EventEmitter` specified with your events interface. Use `on` and `off`
methods to setup event handlers and `emit` to emit events.

## Example

```ts
import { EventEmitter } from 'pietile-eventemitter';

interface Events {
  foo: () => void;
  bar: (a: number) => void;
}

const emitter = new EventEmitter<Events>();

function onFoo() {
  console.log('Foo');
}

emitter.on('foo', onFoo);
const handler = emitter.on('bar', (a: number) => {
  console.log('Bar: ', a);
});

emitter.emit('foo');
emitter.emit('bar', 42);

emitter.off('foo', onFoo);
emitter.off('bar', handler);
```

## API

### `new EventEmitter<T>()`

Create new instance of EventEmitter. `T` must be interface describing events - names and signatures.

### `on<K>(event: K, handler: T[K]): T[K]`

Add `handler` for `event`.

Return `handler` function. Useful for anonymous handler functions.

### `off<K>(event: K, handler: T[K]): void`

Remove `handler` for `event`

### `offAll(): void`

Remove all handlers for all events

### `emit<K>(event: K, ...args: Parameters<T[K]>): void`

Emit `even` with its arguments

## License

Pietile EventEmitter is MIT License.
