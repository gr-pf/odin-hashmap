import { Node } from "./node.js";

type Record = {
  key: string;
  value: any;
};

export class HashMap {
  #loadFactor: number;
  #capacity: number;
  #length: number;
  #array: Array<Node | null>;

  constructor(loadFactor = 0.75, capacity = 16) {
    this.#loadFactor = loadFactor;
    this.#capacity = capacity;
    this.#length = 0;
    this.#array = Array(capacity).fill(null);
  }

  hash(key: string) {
    if (typeof key !== "string") {
      throw new TypeError(`key must be a string: ${key} is a ${typeof key}`);
    }

    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.#capacity;
    }

    return hashCode;
  }

  #setKeyValue(key: string, value: any, arr: Array<Node | null>) {
    const index = this.hash(key);

    if (arr[index] === null) {
      const node = new Node({ key, value });
      arr[index] = node;
    } else {
      let current = arr[index];

      if (current.value.key === key) {
        current.value.value = value;
        return;
      }

      while (current.next) {
        if (current.value.key === key) {
          current.value.value = value;
          return;
        }
        current = current.next;
      }

      current.next = new Node({ key, value });
    }
  }

  set(key: string, value: any) {
    this.#setKeyValue(key, value, this.#array);

    this.#length++;

    if (this.#length > this.#capacity * this.#loadFactor) {
      const updatedCapatity = this.#capacity * 2;
      const tmpArray = Array(updatedCapatity).fill(null);

      for (const bucket of this.#array) {
        let current = bucket;

        while (current) {
          const currentKey = current.value.key;
          const currentValue = current.value.value;

          this.#setKeyValue(currentKey, currentValue, tmpArray);

          current = current.next;
        }
      }

      this.#capacity = updatedCapatity;
      this.#array = tmpArray;
    }
  }

  get(key: string) {
    const index = this.hash(key);
    if (index < 0 || index >= this.#capacity) {
      throw new Error("Trying to access index out of bounds");
    }

    if (this.#array[index] === null) {
      return null;
    }
    let current: Node | null = this.#array[index];
    while (current) {
      if (current.value.key === key) {
        return current.value.value;
      }
      current = current.next;
    }

    return null;
  }

  has(key: string) {
    const index = this.hash(key);
    if (index < 0 || index >= this.#capacity) {
      throw new Error("Trying to access index out of bounds");
    }

    if (this.#array[index] === null) {
      return false;
    }
    let current: Node | null = this.#array[index];
    while (current) {
      if (current.value.key === key) {
        return true;
      }
      current = current.next;
    }

    return false;
  }

  remove(key: string) {
    const index = this.hash(key);
    if (index < 0 || index >= this.#capacity) {
      throw new Error("Trying to access index out of bounds");
    }

    if (this.#array[index] === null) {
      return false;
    }

    let current: Node | null = this.#array[index];

    if (current.value.key === key) {
      this.#array[index] = current.next;
      current.next = null;
      return true;
    }

    let prev = current;
    current = current.next;

    while (current) {
      if (current.value.key === key) {
        prev.next = current.next;
        current.next = null;
        return true;
      }
      prev = current;
      current = current.next;
    }

    return false;
  }

  length() {
    return this.#length;
  }

  clear() {
    this.#array = Array(this.#capacity).fill(null);
    this.#length = 0;
  }

  keys() {
    const keys = [];

    for (const bucket of this.#array) {
      if (bucket === null) {
        continue;
      }
      let current: Node | null = bucket;
      while (current) {
        keys.push(current.value.key);
        current = current.next;
      }
    }

    return keys;
  }

  values() {
    const values = [];

    for (const bucket of this.#array) {
      if (bucket === null) {
        continue;
      }
      let current: Node | null = bucket;
      while (current) {
        values.push(current.value.value);
        current = current.next;
      }
    }

    return values;
  }

  entries() {
    const entries = [];

    for (const bucket of this.#array) {
      if (bucket === null) {
        continue;
      }
      let current: Node | null = bucket;
      while (current) {
        entries.push([current.value.key, current.value.value]);
        current = current.next;
      }
    }

    return entries;
  }
}

// reste à implémenter remove et corriger lors du changement de capacité
