let des = [1, 2, 3, 4, 5, 6];

// FONCTION 1 EXERCICE 1
function rollTheDice() {
    let dice = [];
    for (let i = 0; i < 5; i++) {
        let randomNumber = Math.floor(Math.random() * 6) + 1;
        dice.push(randomNumber);
    }
    return dice;
}
let dice = rollTheDice();
console.log("Résultat du lancer de dés :", dice);


// FONCTION 2 EXERCICE 1
function reRollTheDice(des) {
    let dice = des.map(() => Math.floor(Math.random() * 6) + 1).slice(1);
    return dice;
}
console.log("Nouveau jet de des : ", reRollTheDice(des));


// // FONCTION 3 EXERCICE 1

function displayDice(dice) {
    document.getElementById("afficherDes").textContent = dice.join(', ')
}
displayDice(dice)


// FONCTION 1 EXERCICE 2

function calculePoints(operation, dice) {
    let total = 0;

    if (operation.startsWith("Total ")) {
        const targetValue = parseInt(operation.split(" ")[1]);
        total = dice.filter(value => value === targetValue).reduce((acc, value) => acc + value, 0);
    }

    if (operation === "Brelan") {
        function hasBrelan(dice) {
            const uniqueValues = new Set(dice);
            for (const value of uniqueValues) {
                const occurrences = dice.filter(element => element === value);
                if (occurrences.length >= 3) {
                    return true;
                }
            }
            return false;
        }

        if (hasBrelan(dice)) {
            total = dice.reduce((acc, value) => acc + value, 0);
        }
    }

    if (operation === "Carré") {
        function hasCarré(dice) {
            const uniqueValues = new Set(dice);
            for (const value of uniqueValues) {
                const occurrences = dice.filter(element => element === value);
                if (occurrences.length >= 4) {
                    return true;
                }
            }
            return false;
        }

        if (hasCarré(dice)) {
            total = dice.reduce((acc, value) => acc + value, 0);
        }
    }

    if (operation === "Full") {
        const uniqueValues = new Set(dice);
        if (uniqueValues.size === 2) {
            total = 25;
        }
    }

    if (operation === "Petite Suite") {
        const uniqueValues = new Set(dice);
        if (uniqueValues.size === 5 && (uniqueValues.has(1) || uniqueValues.has(2))) {
            total = 30;
        }
    }

    if (operation === "Grande Suite") {
        const uniqueValues = new Set(dice);
        if (uniqueValues.size === 5 && (uniqueValues.has(2) || uniqueValues.has(3))) {
            total = 40;
        }
    }

    if (operation === "Yams") {
        function hasYams(dice) {
            const uniqueValues = new Set(dice);
            for (const value of uniqueValues) {
                const occurrences = dice.filter(element => element === value);
                if (occurrences.length >= 5) {
                    return true;
                }
            }
            return false;
        }

        if (hasYams(dice)) {
            total = 50;
        }
    }

    if (operation === "Chance") {
        total = dice.reduce((acc, value) => acc + value, 0);
    }

    return total;
}

let totalPoints = calculePoints("Yams", [6, 6, 6, 6, 6]);
console.log("Total des points : " + totalPoints);




let points = {
    'Total 1': 25,
    'Total 2': 60,
    'Total 3': 12,
    'Total 4': 12,
    'Total 5': 10,
    'Total 6': 12,
    'Brelan': 9,
    'Carré': 12,
    'Full': 60,
    'Petite Suite': 0,
    'Grande Suite': 12,
    'Yams': 0,
    'Chance': 0,
    'Bonus': 0
};




// FONCTION 2 EXERCICE 2

function displayPoints() {
    console.log(points)
    // Formater l'objet point en chaine de caratères avec l'objet global Object.
    let resultString = Object.entries(points).map(([key, value]) => `${key}: ${value}`).join(' \n');
    document.getElementById("afficherPoints").textContent = resultString;
}
displayPoints();


// FONCTION 3 EXERCICE 2
function checkBonus(points) {
    const sum = points['Total 1'] + points['Total 2'] + points['Total 3'] +
        points['Total 4'] + points['Total 5'] + points['Total 6'] + points['Brelan'] + points['Carré'] + points['Full'] + points['Petite Suite'] + points['Grande Suite'] + points['Yams'] + points['Chance'] + points['Bonus'];
    if (sum > 63) {
        points['Bonus'] = 35;
    } else {
        points['Bonus'] = 0;
    }
    return points;
}
checkBonus(points);
console.log(points)


// FONCTION 4 EXERCICE 2
function displayScore(points) {
    let sum = 0;

    for (let operations in points) {
        if (typeof points[operations] === 'number') {
            sum += points[operations];
        }
    }
    console.log("Sommes des points : " + sum)
}
displayScore(points);