import Point2D from "./doNotTouch/point2D";
import RectHV from "./doNotTouch/rectHV";

class Node {
	public point: Point2D;
	public rect: RectHV;
	public left: Node | null;
	public right: Node | null;
	public level: number; // added level property to keep track of the level of the node

	constructor(point: Point2D, rect: RectHV, level: number) {
		this.point = point;
		this.rect = rect;
		this.left = null;
		this.right = null;
		this.level = level;
	}
}

class KDTree {
	private root: Node | null;

	constructor() {
		this.root = null;
	}

	public isEmpty(): boolean {
		return this.root === null;
	}

	public size(): number {
		return this.sizeRecursive(this.root);
	}

	private sizeRecursive(node: Node | null): number {
		if (node === null) {
			return 0;
		} else {
			return 1 + this.sizeRecursive(node.left) + this.sizeRecursive(node.right);
		}
	}

	public insert(p: Point2D): void {
		this.root = this.insertRecursive(this.root, p, true, 0);
	}

	private insertRecursive(
		node: Node | null,
		p: Point2D,
		isX: boolean,
		level: number,
	): Node {
		if (node === null) {
			return new Node(p, new RectHV(p.x, p.y, p.x, p.y), level);
		}

		const cmp = isX ? p.x - node.point.x : p.y - node.point.y;

		if (cmp < 0) {
			if (!node.left) {
				node.left = new Node(p, new RectHV(p.x, p.y, p.x, p.y), level + 1);
			} else {
				node.left = this.insertRecursive(node.left, p, !isX, level + 1);
			}
		} else {
			if (!node.right) {
				node.right = new Node(p, new RectHV(p.x, p.y, p.x, p.y), level + 1);
			} else {
				node.right = this.insertRecursive(node.right, p, !isX, level + 1);
			}
		}

		return node;
	}

	public contains(p: Point2D): boolean {
		return this.containsRecursive(this.root, p);
	}

	private containsRecursive(node: Node | null, p: Point2D): boolean {
		if (node === null) {
			return false;
		}

		if (node.point.equals(p)) {
			return true;
		}

		const cmp = node.level % 2 === 0 ? p.x - node.point.x : p.y - node.point.y;

		if (cmp < 0) {
			return this.containsRecursive(node.left, p);
		} else {
			return this.containsRecursive(node.right, p);
		}
	}

	public range(rect: RectHV): Point2D[] {
		const result: Point2D[] = [];
		this.rangeRecursive(this.root, rect, result);
		return result;
	}

	private rangeRecursive(
		node: Node | null,
		rect: RectHV,
		result: Point2D[],
	): void {
		if (node === null) {
			return;
		}

		if (rect.contains(node.point)) {
			result.push(node.point);
		}

		if (rect.intersects(node.rect)) {
			this.rangeRecursive(node.left, rect, result);
			this.rangeRecursive(node.right, rect, result);
		}
	}
}

export default KDTree;
