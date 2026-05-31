var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _HashMap_loadFactor, _HashMap_capacity, _HashMap_length, _HashMap_array;
import { Node } from "./node.js";
export class HashMap {
    constructor(loadFactor = 0.75, capacity = 16) {
        _HashMap_loadFactor.set(this, void 0);
        _HashMap_capacity.set(this, void 0);
        _HashMap_length.set(this, void 0);
        _HashMap_array.set(this, void 0);
        __classPrivateFieldSet(this, _HashMap_loadFactor, loadFactor, "f");
        __classPrivateFieldSet(this, _HashMap_capacity, capacity, "f");
        __classPrivateFieldSet(this, _HashMap_length, 0, "f");
        __classPrivateFieldSet(this, _HashMap_array, Array(capacity).fill(null), "f");
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
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % __classPrivateFieldGet(this, _HashMap_capacity, "f");
        }
        return hashCode;
    }
    set(key, value) {
        var _a;
        const index = this.hash(key);
        let setValue = false;
        if (__classPrivateFieldGet(this, _HashMap_array, "f")[index] === null) {
            const node = new Node({ key, value });
            __classPrivateFieldGet(this, _HashMap_array, "f")[index] = node;
            setValue = true;
        }
        else {
            let current = __classPrivateFieldGet(this, _HashMap_array, "f")[index];
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
        __classPrivateFieldSet(this, _HashMap_length, (_a = __classPrivateFieldGet(this, _HashMap_length, "f"), _a++, _a), "f");
        if (__classPrivateFieldGet(this, _HashMap_length, "f") > __classPrivateFieldGet(this, _HashMap_capacity, "f") * __classPrivateFieldGet(this, _HashMap_loadFactor, "f")) {
            const updatedCapatity = __classPrivateFieldGet(this, _HashMap_capacity, "f") * 2;
            const tmpArray = Array(updatedCapatity).fill(null);
            for (const bucket of __classPrivateFieldGet(this, _HashMap_array, "f")) {
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
                    }
                    else {
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
            __classPrivateFieldSet(this, _HashMap_capacity, updatedCapatity, "f");
            __classPrivateFieldSet(this, _HashMap_array, tmpArray, "f");
        }
    }
    get(key) {
        const index = this.hash(key);
        if (index < 0 || index >= __classPrivateFieldGet(this, _HashMap_capacity, "f")) {
            throw new Error("Trying to access index out of bounds");
        }
        if (__classPrivateFieldGet(this, _HashMap_array, "f")[index] === null) {
            return null;
        }
        let current = __classPrivateFieldGet(this, _HashMap_array, "f")[index];
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
        if (index < 0 || index >= __classPrivateFieldGet(this, _HashMap_capacity, "f")) {
            throw new Error("Trying to access index out of bounds");
        }
        if (__classPrivateFieldGet(this, _HashMap_array, "f")[index] === null) {
            return false;
        }
        let current = __classPrivateFieldGet(this, _HashMap_array, "f")[index];
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
        return __classPrivateFieldGet(this, _HashMap_length, "f");
    }
    clear() {
        __classPrivateFieldSet(this, _HashMap_array, Array(__classPrivateFieldGet(this, _HashMap_capacity, "f")).fill(null), "f");
        __classPrivateFieldSet(this, _HashMap_length, 0, "f");
    }
    keys() {
        const keys = [];
        for (const bucket of __classPrivateFieldGet(this, _HashMap_array, "f")) {
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
        for (const bucket of __classPrivateFieldGet(this, _HashMap_array, "f")) {
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
        const entries = [];
        for (const bucket of __classPrivateFieldGet(this, _HashMap_array, "f")) {
            if (bucket === null) {
                continue;
            }
            let current = bucket;
            while (current) {
                entries.push([current.value.key, current.value.value]);
                current = current.next;
            }
        }
        return entries;
    }
}
_HashMap_loadFactor = new WeakMap(), _HashMap_capacity = new WeakMap(), _HashMap_length = new WeakMap(), _HashMap_array = new WeakMap();
// reste à implémenter remove et corriger lors du changement de capacité
