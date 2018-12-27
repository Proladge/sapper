const DEFAULT_MODE = {
    fieldWidth: 8,
    fieldHeight: 8,
    Id: 8
}

class App {
    constructor(storage) {
        this.Start = this.Start;
        this.Storage = storage;
        this._mode = this._mode || DEFAULT_MODE;
    }

    set Mode(value) {
        this._mode = value;
        this.reloadField();
        this.reloadRating();
    }

    get Mode() {
        return this._mode;
    }

    Start() {
        this._loadField();
        this.subscribe();
    }

    OpenRating() {
        this.initRating();
    }

    initRating() {
        this.Rating = new Rating(this.Storage, this.Mode, this.renderRating.bind(this));
    }

    renderRating() {
        const ratingEl = this.Rating && this.Rating.el;
        const rating = document.getElementById("rating");
        rating.appendChild(ratingEl);
    }

    _loadField() {
        this._fieldGenrator = this._fieldGenrator || new FieldGenrator();
        this.Field = this._fieldGenrator.generate(this.Mode);
        const timerEl = this.Field.Timer && this.Field.Timer.el;
        const sapperEl = document.getElementById("sapper");
        sapperEl.appendChild(timerEl);
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
        result.mode = this.Mode && this.Mode.Id;
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

    reloadRating() {
        this.Rating.Clear();
        delete this.Rating;
        this.initRating();
    }

    reload() {
        location.reload();
    }

    saveResult() {

    }
}