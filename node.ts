export class Node {
  constructor(
    public value: any | null = null,
    public next: Node | null = null,
  ) {
    this.value = value;
    this.next = next;
  }
}
