import { Node } from "./node.js";

class HashMap {
  constructor(loadFactor = 0.75, capacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.length = 0;
    this.array = Array(capacity).fill(null);
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
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);

    // Implémenter le cas où key est déjà dans la HM

    if (this.array[index] === null) {
      const node = new Node({ key, value });
      this.array[index] = node;
    } else {
      let current = this.array[index];
      while (current.next) {
        current = current.next;
      }
      current.next = new Node({ key, value });
    }

    this.length++;

    if (this.length > this.capacity * this.loadFactor) {
      const updatedCapatity = this.capacity * 2;
      const tmpArray = Array(updatedCapatity).fill(null);

      // Reste à implémenter la logique pour transférer les valeurs stockés dans l'actuelle array dans la nouvelle array

      this.capacity = updatedCapatity;
      this.array = tmpArray;
    }
  }
}
