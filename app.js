class App {
    constructor() {
        this.Start = this.Start;
    }

    Start() {
        const fieldGenrator = new FieldGenrator();
        const Field = fieldGenrator.generate();
        const timerEl = Field.Timer && Field.Timer.el;
        const saperEl = document.getElementById("saper");
        saperEl.appendChild(timerEl);
        this.subscribe();
    }

    subscribe() {
        document.addEventListener("Boom", this.onBoom.bind(this));
        document.addEventListener("TimeIsOver", this.onTimeIsOver.bind(this));
        document.addEventListener("Win", this.onWin.bind(this));
    }

    onTimeIsOver(e) {
        alert("Time is Over");
        this.reload();
    }

    onBoom(e) {
        alert("Boom");
        this.reload();
    }

    onWin(e){
        const result = e.detail && e.detail.result;
        alert(`YOU WIN!!! \n Result: ${result ? result : ""}` );
    }

    reload() {
        location.reload();
    }

    saveResult() {

    }
}