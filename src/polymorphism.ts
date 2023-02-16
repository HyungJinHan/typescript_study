interface MyStorage<T> {
  [key: string]: T
}

class LocalStorage<T> {
  private storage: MyStorage<T> = {}

  set(key: string, value: T) {
    this.storage[key] = value;
  }

  remove(key: string) {
    delete this.storage[key]
  }

  get(key: string): T {
    return this.storage[key]
  }

  clear() {
    this.storage = {}
  }
}

const stringStorage = new LocalStorage<string>();
stringStorage.get('key');
stringStorage.set('hello', 'how are you');

const booleanStorage = new LocalStorage<boolean>();
booleanStorage.get('key');
booleanStorage.set('hello', true);