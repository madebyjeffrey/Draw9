
import { Observable } from "rxjs";

import { IRenderable } from "./primitives";

/**
 * Represents a drawing kernel
 */
export class Kernel {
    primitives: IRenderable[];


    constructor() {
        this.primitives = [];
    }

    addPrimitive(p: IRenderable) {
        this.primitives.push(p);
    }

    clear(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 1280, 720);
    }

    render(ctx: CanvasRenderingContext2D) {
        this.clear(ctx);

        this.primitives.forEach(p => p.render(ctx));

        if (this.progress !== null) {
            this.progress.render(ctx);
        }
    }

    progress: IRenderable = null;

    watch(primitive$: Observable<IRenderable>) {
        primitive$.subscribe({
            next: (p: IRenderable) => {
            this.progress = p;
        }, error: (_err: unknown) => {
            // error?
        }, complete: () => {
            this.progress = null;
        }});
    }

}