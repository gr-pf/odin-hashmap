import { Node } from "./node.js";

export class HashSet {
  #loadFactor: number;
  #capacity: number;
  #length: number;
  #array: Array<Node<string> | null>;

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

  #setKey(key: string, arr: Array<Node<string> | null>) {
    const index = this.hash(key);

    if (arr[index] === null) {
      const node = new Node<string>(key);
      arr[index] = node;
    } else {
      let current = arr[index];

      if (current.value === key) {
        return 0;
      }

      while (current.next) {
        if (current.next.value === key) {
          return 0;
        }
        current = current.next;
      }

      current.next = new Node<string>(key);
    }
    return 1;
  }

  add(key: string) {
    this.#length += this.#setKey(key, this.#array);

    if (this.#length > this.#capacity * this.#loadFactor) {
      const updatedCapatity = this.#capacity * 2;
      const tmpArray = Array(updatedCapatity).fill(null);

      for (const bucket of this.#array) {
        let current = bucket;

        while (current) {
          const currentKey = current.value;

          this.#setKey(currentKey, tmpArray);

          current = current.next;
        }
      }

      this.#capacity = updatedCapatity;
      this.#array = tmpArray;
    }
  }

  has(key: string) {
    const index = this.hash(key);
    if (index < 0 || index >= this.#capacity) {
      throw new Error("Trying to access index out of bounds");
    }

    if (this.#array[index] === null) {
      return false;
    }
    let current: Node<string> | null = this.#array[index];
    while (current) {
      if (current.value === key) {
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

    let current: Node<string> | null = this.#array[index];

    if (current.value === key) {
      this.#array[index] = current.next;
      current.next = null;
      this.#length--;
      return true;
    }

    let prev = current;
    current = current.next;

    while (current) {
      if (current.value === key) {
        prev.next = current.next;
        current.next = null;
        this.#length--;
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
      let current: Node<string> | null = bucket;
      while (current) {
        keys.push(current.value);
        current = current.next;
      }
    }

    return keys;
  }
}
