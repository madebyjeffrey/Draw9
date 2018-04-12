

class App {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    constructor() {
        this.canvas = document.getElementById('cnvs') as HTMLCanvasElement;
        this.context = this.canvas.getContext('2d');

        requestAnimationFrame(this.loop);
    }

    loop = () => {
        

        const ctx = this.context;

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 1280, 720);

        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.lineWidth = 5;
        ctx.arc(400, 400, 100, 0, 2 * Math.PI);
        ctx.stroke();

        requestAnimationFrame(this.loop);
    }

    static main() {
        console.log("Main starting");

        new App();

    }
}


document.addEventListener('DOMContentLoaded', App.main);

