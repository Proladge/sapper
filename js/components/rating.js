class Rating {
    constructor(storage) {
        this.Storage = storage;
        this.initEl();
    }
    
    initEl() {
        this.Storage.getTopScores(10)
            .then( ratingList => {
                this.ratingList = ratingList;
                this.el = this._generateDomEl();
            });
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
        return [ratingItem.user, ratingItem.result, new Date(ratingItem.date).toGMTString()];
    }
}