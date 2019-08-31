import { EventEmitter } from '..';

test('single handler', () => {
  interface Events {
    foo: (a: number) => void;
  }

  const emitter = new EventEmitter<Events>();
  const fn = jest.fn();

  emitter.on('foo', fn);

  emitter.emit('foo', 1);
  expect(fn).toHaveBeenCalledTimes(1);

  emitter.off('foo', fn);

  emitter.emit('foo', 2);
  expect(fn).toHaveBeenCalledTimes(1);

  expect(fn.mock.calls).toEqual([[1]]);
});

test('multiple handlers', () => {
  interface Events {
    foo: (a: number) => void;
  }

  const emitter = new EventEmitter<Events>();
  const fn1 = jest.fn();
  const fn2 = jest.fn();

  emitter.on('foo', fn1);
  emitter.on('foo', fn2);

  emitter.emit('foo', 1);
  expect(fn1).toHaveBeenCalledTimes(1);
  expect(fn2).toHaveBeenCalledTimes(1);

  emitter.off('foo', fn1);

  emitter.emit('foo', 2);
  expect(fn1).toHaveBeenCalledTimes(1);
  expect(fn2).toHaveBeenCalledTimes(2);

  emitter.on('foo', fn1);
  emitter.offAll();

  emitter.emit('foo', 2);
  expect(fn1).toHaveBeenCalledTimes(1);
  expect(fn2).toHaveBeenCalledTimes(2);

  expect(fn1.mock.calls).toEqual([[1]]);
  expect(fn2.mock.calls).toEqual([[1], [2]]);
});

test('off while emitting', () => {
  interface Events {
    foo: () => void;
  }

  const emitter = new EventEmitter<Events>();
  const fn1 = jest.fn();
  const fn2 = jest.fn();

  emitter.on('foo', fn1);
  const listener = emitter.on('foo', () => {
    emitter.off('foo', listener);
    fn2();
  });

  emitter.emit('foo');

  expect(fn1).toHaveBeenCalledTimes(1);
  expect(fn2).toHaveBeenCalledTimes(1);

  const fn3 = emitter.on('foo', jest.fn());

  emitter.emit('foo');

  expect(fn1).toHaveBeenCalledTimes(2);
  expect(fn2).toHaveBeenCalledTimes(1);
  expect(fn3).toHaveBeenCalledTimes(1);
});
