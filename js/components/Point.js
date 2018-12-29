class Point {
    
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.id = this.generateId(this.x, this.y);
        this.el = this._generateDomEl(this.id, "point");
        this.Subscribe();
        this._isOpened = false;
        this._numberOfBombsArroud = 0;
    }

    static isPoint(point) {
        return point && point instanceof Point;
    }

    Equals(point) {
        return Point.isPoint(point) ? point.x === this.x && point.y === this.y : false;
    }

    get NumberOfBombsArroud() { 
        return this._numberOfBombsArroud;
    }

    set NumberOfBombsArroud(value) {
        this._numberOfBombsArroud = value;
        this._updateElValue();
    }

    get IsOpened() {
        return this._isOpened;
    }

    _updateElValue() {
        this.el.innerHTML = "<p>" + this._numberOfBombsArroud + "</p>";
    }

    _generateDomEl(id, className) {
        let el = document.createElement("div");
        el.className = className;
        el.setAttribute("id", id);
        // el.innerHTML = id;
        return el;
    }

    Subscribe() {
        this.el.addEventListener("click", this.Open.bind(this));
        this.el.addEventListener("onmousedown", this.onMouseDown.bind(this));
        this.el.addEventListener("onmouseup", this.onMouseUp.bind(this));
        this.el.addEventListener("contextmenu", this.Flag.bind(this));
    }

    generateId(x, y) {
        return x + "_" + y;
    }

    Open(e) {
        if(this._isOpened || this._isFlaged) {
            return;
        }
        this._isOpened = true;
        this.el.classList.add("opened");
        const event = new  CustomEvent("Open", {"detail": {point: this}});
        document.dispatchEvent(event);
    }

    onMouseDown(e) {
        console.log("onMouseDown", e);
    }

    onMouseUp(e) {
        console.log("onMouseDown", e);
    }


    Flag(e) {
        if(e.which === 3) {
            e.preventDefault();
            if(this._isOpened) {
                return;
            }
            this._isFlaged = !this._isFlaged;
            this._isFlaged ? this.el.classList.add("flag") : this.el.classList.remove("flag");
        }
    }

    isNearByPoint(point) {
        return Point.isPoint(point) && !this.Equals(point) && 
            point.x <= this.x+1 && point.x >= this.x-1 && 
            point.y <= this.y+1 && point.y >= y-1;
    }
}

