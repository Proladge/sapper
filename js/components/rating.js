class Rating {
    constructor(storage, mode, onRender) {
        this.Storage = storage;
        this.Mode = mode;
        this.Clear = this.clear;
        this.initEl(onRender);
    }
    
    initEl(callback) {
        this.Storage.getTopScores(10, this.Mode.Id)
            .then( ratingList => {
                this.ratingList = ratingList;
                this.el = this._generateDomEl();
                callback();
            });
    }

    clear() {
        const el = this.el;
        el && el.remove();
    }

    _generateDomEl() {
        let table =  document.createElement("table");
        table.innerHTML = this.getTableHeader();
        for(let item in this.ratingList) {
            let row = table.insertRow();
            row.classList.add("rating-item");
            const cells = this.prepareCellsArray(this.ratingList[item]);
            cells.forEach((c, index) => { 
                let cell = row.insertCell();
                cell.innerHTML = c;
            });
        }
        return table;
    }

    getTableHeader() {
        return `
        <tr>
            <th>user</th>
            <th>score</th> 
            <th>date</th>
        </tr>`
    }

    prepareCellsArray(ratingItem) {
        const date = new Date(ratingItem.date);
        return [ratingItem.user, ratingItem.result, date.toDateString() + date.toLocaleTimeString()];
    }
}