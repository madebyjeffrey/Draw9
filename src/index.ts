import { Kernel } from "./kernel";
import { Line, PartialLine } from "./primitives";
import { fromEvent } from "rxjs/observable/fromEvent";
import { BehaviorSubject } from "rxjs/BehaviorSubject";


class App {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    kernel: Kernel;

    currentObject$ = new BehaviorSubject<PartialLine>(null);

    constructor() {
        this.canvas = document.getElementById('cnvs') as HTMLCanvasElement;
        this.context = this.canvas.getContext('2d');

        this.kernel = new Kernel();

        this.kernel.addPrimitive(new Line([20,20], [50,50]));
        this.kernel.addPrimitive(new Line([30,50], [600, 333]));

        this.kernel.watch(this.currentObject$);

        fromEvent<MouseEvent>(this.canvas, 'mousedown')
            .filter(e => e.button === 0)
            .map(e => <[number, number]>[e.offsetX, e.offsetY])
            .map(pos => new PartialLine(pos, pos))
            .subscribe(line => this.currentObject$.next(line));

        fromEvent<MouseEvent>(this.canvas, "mousemove")
            .filter(() => this.currentObject$.value !== null)
            .map(e => <[number, number]>[e.offsetX, e.offsetY])
            .map(pos => new PartialLine(this.currentObject$.value.head, pos))
            .subscribe(line => this.currentObject$.next(line));

        fromEvent<MouseEvent>(this.canvas, "mouseup")
            .filter(() => this.currentObject$.value !== null)
            .map(e => <[number, number]>[e.offsetX, e.offsetY])
            .map(pos => {
                const line = this.currentObject$.value.toLine();
                line.tail = pos;
                return line;
            })
            .subscribe(line => {
                this.currentObject$.next(null);
                this.kernel.addPrimitive(line);
            });
            

        requestAnimationFrame(this.loop);
    }

    loop = () => {
        

        const ctx = this.context;

        this.kernel.render(ctx);
        // ctx.fillStyle = "black";
        // ctx.fillRect(0, 0, 1280, 720);

        // ctx.beginPath();
        // ctx.strokeStyle = "red";
        // ctx.lineWidth = 5;
        // ctx.arc(400, 400, 100, 0, 2 * Math.PI);
        // ctx.stroke();

        requestAnimationFrame(this.loop);
    }



    static main() {
        console.log("Main starting");

        new App();

    }
}


document.addEventListener('DOMContentLoaded', App.main);

