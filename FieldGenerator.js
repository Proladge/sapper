class FieldGenrator {

    _generate() {
        const bombsAmount = this._getBombsAmmount();
        let bombedPoints = this._generateBombedPointsArray(bombsAmount);
        const points = this._generatePoints(FIELD_WIDTH, FIELD_HEIGHT, bombedPoints);
        this._visualizePoints(points);
        return new Field(points, bombsAmount, FIELD_HEIGHT, FIELD_WIDTH, 50000);
    }

    constructor() {
        this.generate = this._generate;
    }

    _generatePoints(width, height, bombedPoints) {
        let points = [];
        for(let h = 1; h <= height; h++){
            for(let w = 1; w <= width; w++) {
                let p;
                if(bombedPoints.some(p => p.x === w && p.y === h)) {
                    p = new Bomb(w, h);
                } else {
                    p = new Point(w, h);
                }
                if(!points[h]) {
                    points[h] = [];
                }
                points[h][w] = p;
            }
        }
        this._fillNumberOfBombs(points);
        return points;
    }
    

    //TODO : rewrite optimized
   _fillNumberOfBombs(points) {
        if(!points || !Array.isArray(points)) {
            return;
        }
        points.forEach((pointsRow, index) => {
            if(!pointsRow || !Array.isArray(pointsRow)) {
                throw new Exception(`${index} elemnt in points Array is not valid`);
            }
            pointsRow.forEach(p => {
                for(let y = p.y - 1; y <= p.y + 1; y++ ) {
                    let pointR = points[y];
                    if(!pointR || !Array.isArray(pointR)) {
                        continue;
                    }
                    for(let x = p.x - 1; x <= p.x + 1; x++ ) {
                        let point = pointR[x];
                        if(p.Equals(point)) {
                            continue;
                        }
                        if(point instanceof Bomb){
                            p.NumberOfBombsArroud += 1;
                        }
                    }
                }
            });
        });
    }

   _visualizePoints(points) {
        if(!points || !Array.isArray(points)) {
            return;
        }
        const fieldEl = document.getElementById("field");
        points.forEach(pointsRow => {
            if(!pointsRow || !Array.isArray(pointsRow)) {
                return;
            }
            pointsRow.forEach(p => fieldEl.appendChild(p.el));
        });
    }

  _generateBombedPointsArray(bombsAmount) {
        // return [{"x":1,"y":0},{"x":2,"y":5},{"x":2,"y":1},{"x":2,"y":2},{"x":5,"y":3},{"x":4,"y":2},{"x":1,"y":4},{"x":7,"y":5},{"x":5,"y":6},{"x":0,"y":8},{"x":1,"y":6},{"x":6,"y":2},{"x":7,"y":4},{"x":7,"y":1},{"x":7,"y":6}];
        // return [{"x":6,"y":8},{"x":8,"y":2},{"x":3,"y":0},{"x":1,"y":8},{"x":0,"y":2},{"x":3,"y":3},{"x":3,"y":6},{"x":0,"y":8},{"x":3,"y":3},{"x":3,"y":6},{"x":7,"y":4},{"x":7,"y":6},{"x":7,"y":4},{"x":7,"y":7},{"x":1,"y":0}];
        let bombedPoints = [];
        for (let i=0; i < bombsAmount; i++){ 
            do {
                var x = getRandomInt(1, FIELD_WIDTH);
                var y = getRandomInt(1, FIELD_HEIGHT);
                if(!bombedPoints.some(p => p.x === x && p.y === y)) {
                    bombedPoints.push({x, y});
                }
            } while (!bombedPoints.some(p => p.x === x && p.y === y));

        }
        return bombedPoints;
    }

    _getBombsAmmount() {
        return 5;
    }
}