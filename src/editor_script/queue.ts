export class Queue {
	public length: number;
	private arr: any[];

	constructor() {
		this.arr = Array();
		this.length = 0;
	}
	public enqueue(item): any {
		this.arr.push(item);
		this.length++;
	}
	public dequeue(): any {
		this.length--;
		return this.arr.shift();
	}
}
