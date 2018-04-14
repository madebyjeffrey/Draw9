export interface IRenderable {
    render(ctx: CanvasRenderingContext2D): void;
}

export type Point = [number, number];

export class Line implements IRenderable {    
    constructor(private a: Point, private b: Point) {
    }
    
    get head(): Point {
        return this.a;
    }

    set head(value: Point) { 
        this.a = value;
    }

    get tail(): Point {
        return this.b;
    }

    set tail(value: Point) {
        this.b = value;
    }

    style(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = "red";
        ctx.lineWidth = 3;                
    }

    render(ctx: CanvasRenderingContext2D) {
        //ctx.fillStyle = "black";
        //ctx.fillRect(0, 0, 1280, 720);

        ctx.beginPath();
        this.style(ctx);
        ctx.moveTo.apply(ctx, this.head);        
        ctx.lineTo.apply(ctx, this.tail);        
        ctx.stroke();
    }
}

export class PartialLine extends Line { 
    constructor(a: Point, b: Point) {
        super(a,b);
    }

    style(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = "lightred";
        ctx.lineWidth = 2;        
    }

    toLine(): Line {
        return new Line(this.head, this.tail);
    }
}



