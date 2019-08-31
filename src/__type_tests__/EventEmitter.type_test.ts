import { EventEmitter } from '..';

interface Events {
  foo: () => void;
  bar: (a: number) => void;
}

const emitter = new EventEmitter<Events>();

// @dts-jest:fail:snap wrong emit argument
emitter.emit('foo', 1);

// @dts-jest:fail:snap wrong emit argument type
emitter.emit('bar', '1');

// @dts-jest:fail:snap wrong emit arguments count
emitter.emit('bar', 1, 2);

// @dts-jest:fail:snap wrong handler argument
emitter.on('foo', (a: number) => {});

// @dts-jest:fail:snap wrong handler argument type
emitter.on('bar', (a: string) => {});

// @dts-jest:fail:snap wrong handler arguments count
emitter.on('bar', (a: number, b: string) => {});
