import Point2D from "./doNotTouch/point2D";
import RectHV from "./doNotTouch/rectHV";

class PointSET {
	private points: Point2D[] = [];

	// biome-ignore lint/complexity/noUselessConstructor: <explanation>
	constructor() {}

	public isEmpty(): boolean {
		return this.points.length === 0;
	}

	public size(): number {
		return this.points.length;
	}

	public insert(p: Point2D): void {
		if (!this.contains(p)) {
			this.points.push(p);
		}
	}

	public contains(p: Point2D): boolean {
		return this.points.includes(p);
	}

	public draw(p): void {
		for (const point of this.points) {
			point.draw(p);
		}
	}

	public range(rect: RectHV): Point2D[] {
		const result: Point2D[] = [];
		for (const point of this.points) {
			if (rect.contains(point)) {
				result.push(point);
			}
		}
		return result;
	}
}

export default PointSET;
