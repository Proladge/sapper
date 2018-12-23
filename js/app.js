const DEFAULT_MODE = {
    fieldWidth: 8,
    fieldHeight: 8
}

class App {
    constructor() {
        this.Start = this.Start;
        this.Storage = new Storage();
    }

    set Mode(value) {
        this._mode = value;
        this.reloadField();
    }

    get Mode() {
        return this._mode;
    }

    Start() {
        this._loadField();
        this.subscribe();
    }

    _loadField() {
        this._fieldGenrator = this._fieldGenrator || new FieldGenrator();
        this.Field = this._fieldGenrator.generate(this.Mode || DEFAULT_MODE);
        const timerEl = this.Field.Timer && this.Field.Timer.el;
        const saperEl = document.getElementById("saper");
        saperEl.appendChild(timerEl);
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
        alert(`YOU WIN!!! \n Result: ${result ? result.result : ""}`);
        const defNickName = this.CURRENT_USER && this.CURRENT_USER.NickName;
        const nickName = prompt("Enter Your nickName", defNickName || "");
        this.Storage.SaveResult(nickName, result);
    }

    changeMode(mode) {
        this.Mode = mode;
    }

    reloadField() {
        this.Field.Clear();
        delete this.Field;
        this._loadField();
    }

    reload() {
        location.reload();
    }

    saveResult() {

    }
}