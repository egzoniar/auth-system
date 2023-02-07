import { EventEmitter } from 'events';

export class AppEvents {
  private static instance: AppEvents;
  private eventEmitter: EventEmitter;

  private constructor() {
    this.eventEmitter = new EventEmitter();
  }

  static getInstance() {
    if (!AppEvents.instance) {
      AppEvents.instance = new AppEvents();
    }

    return AppEvents.instance;
  }

  emit = (event: string, ...args: any[]) => {
    this.eventEmitter.emit(event, ...args);
  };

  on = (event: string, listener: (...args: any[]) => void) => {
    this.eventEmitter.on(event, listener);
  };

  off = (event: string, listener: (...args: any[]) => void) => {
    this.eventEmitter.off(event, listener);
  };
}