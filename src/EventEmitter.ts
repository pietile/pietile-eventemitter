type Handlers<T> = {
  [K in keyof T]: Array<T[K]>;
};

export class EventEmitter<T extends { [K in keyof T]: (...args: any) => any }> {
  private handlers: {
    [K in keyof T]: Array<T[K]>;
  } = {} as Handlers<T>;

  on<K extends keyof T>(event: K, handler: T[K]): T[K] {
    let eventHandlers = this.handlers[event];
    if (!eventHandlers) {
      eventHandlers = [];
      this.handlers[event] = eventHandlers;
    }

    this.handlers[event].push(handler);

    return handler;
  }

  off<K extends keyof T>(event: K, handler: T[K]): void {
    const eventHandlers = this.handlers[event];
    if (!handler) {
      return;
    }

    const index = eventHandlers.indexOf(handler);
    if (index === -1) {
      return;
    }

    this.handlers[event].splice(index, 1);
  }

  offAll(): void {
    this.handlers = {} as Handlers<T>;
  }

  emit<K extends keyof T>(event: K, ...args: Parameters<T[K]>): void {
    const eventHandlers = this.handlers[event];
    if (!eventHandlers) {
      return;
    }

    eventHandlers.forEach((handler: T[K]): void => {
      handler(...args);
    });
  }
}
