import { Node } from "./node.js";

export class HashMap {
  #loadFactor;
  #capacity;
  #length;
  #array;

  constructor(loadFactor = 0.75, capacity = 16) {
    this.#loadFactor = loadFactor;
    this.#capacity = capacity;
    this.#length = 0;
    this.#array = Array(capacity).fill(null);
  }

  /**
   *
   * @param {String} key
   * @returns {Number}
   */
  hash(key) {
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

  set(key, value) {
    const index = this.hash(key);

    let setValue = false;
    if (this.#array[index] === null) {
      const node = new Node({ key, value });
      this.#array[index] = node;
      setValue = true;
    } else {
      let current = this.#array[index];
      if (current.value.key === key) {
        current.value.value = value;
        setValue = true;
      }
      while (current.next && !setValue) {
        if (current.value.key === key) {
          current.value.value = value;
          setValue = true;
        }
        current = current.next;
      }
      if (!setValue) {
        current.next = new Node({ key, value });
        setValue = true;
      }
    }

    this.#length++;

    if (this.#length > this.#capacity * this.#loadFactor) {
      const updatedCapatity = this.#capacity * 2;
      const tmpArray = Array(updatedCapatity).fill(null);

      for (const bucket of this.#array) {
        if (bucket === null) {
          continue;
        }
        let current = bucket;

        while (current) {
          const currentKey = current.value.key;
          const currentValue = current.value.key;
          const index = this.hash(currentKey);

          if (tmpArray[index] === null) {
            const node = new Node({ key: currentKey, value: currentValue });
            tmpArray[index] = node;
          } else {
            let currentTmp = tmpArray[index];
            while (currentTmp.next) {
              currentTmp = currentTmp.next;
            }
            currentTmp.next = new Node({
              key: currentKey,
              value: currentValue,
            });
          }
        }
      }

      this.#capacity = updatedCapatity;
      this.#array = tmpArray;
    }
  }

  get(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.#capacity) {
      throw new Error("Trying to access index out of bounds");
    }

    if (this.#array[index] === null) {
      return null;
    }
    let current = this.#array[index];
    while (current) {
      if (current.value.key === key) {
        return current.value.value;
      }
      current = current.next;
    }

    return null;
  }

  has(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.#capacity) {
      throw new Error("Trying to access index out of bounds");
    }

    if (this.#array[index] === null) {
      return false;
    }
    let current = this.#array[index];
    while (current) {
      if (current.value.key === key) {
        return true;
      }
      current = current.next;
    }

    return false;
  }

  remove(key) {
    // à implémenter
    // takes a key as an argument. If the given key is in the hash map, it should remove the entry with that key and return true. If the key isn’t in the hash map, it should return false.
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
      let current = bucket;
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
      let current = bucket;
      while (current) {
        values.push(current.value.value);
        current = current.next;
      }
    }

    return values;
  }

  entries() {
    // à implémenter
    // returns an array that contains each key, value pair. Example: [[firstKey, firstValue], [secondKey, secondValue]]
  }
}
