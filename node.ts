export class Node<T> {
  constructor(
    public value: T | null = null,
    public next: Node<T> | null = null,
  ) {}
}
