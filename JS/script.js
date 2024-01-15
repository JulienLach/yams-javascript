///////////////////// EXERCICE 1 //////////////////////

// Fonction 1 Premier lancé
function rollTheDice() {
    let dice = [];
    for (let i = 0; i < 5; i++) {
        let randomNumber = Math.floor(Math.random() * 6) + 1;
        dice.push(randomNumber);
    }
    return dice;
}
let des = rollTheDice();
console.log("Résultat du lancer de dés :", des);

// Fonction 2 Relance des dés
function reRollTheDice(des) {
    let dice = des.map(() => Math.floor(Math.random() * 6) + 1);
    return dice;
}
let dice = reRollTheDice(des);
console.log("Nouveau jet de des : ", dice);

// Fonction 3 Afficher les dés
function displayDice(dice) {
    document.getElementById("afficherDes").textContent = dice.join(' ')
}
displayDice(dice)


///////////////////// EXERCICE 2 //////////////////////

// Liste des dés conservés
let diceConserves = displayDice(dice)

// Fonction 1 Exercice 2 calculer les points
function calculePoints(operation, diceConserves) {
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
        } g
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

let totalPoints = calculePoints("Total 1", diceConserves);

let sommesDesPoints
console.log("Total des points : " + totalPoints);














// Réussir à chopper tous les totaux et créer un objets points qui contient tous ces totaux


// Fonction 2 Exercice 2

let points = {
    'Total 1': 5,
    'Total 2': 10,
    'Total 3': 2,
    'Total 4': 0,
    'Total 5': 99,
    'Total 6': 12,
    'Brelan': 9,
    'Carré': 2,
    'Full': 0,
    'Petite Suite': 0,
    'Grande Suite': 12,
    'Yams': 0,
    'Chance': 0,
    'Bonus': 0
};


function displayPoints() {
    // Formater l'objet point en chaine de caratères avec l'objet global Object.
    let resultatsOperations = Object.entries(points).map(([key, value]) => `${key} : ${value}`).join(' \n');
    document.getElementById("afficherRepartitionPoints").textContent = resultatsOperations;
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
displayPoints(); // afficher les points à jour


// FONCTION 4 EXERCICE 2
function displayScore(points) {
    let sum = 0;

    for (let operations in points) {
        if (typeof points[operations] === 'number') {
            sum += points[operations];
        }
    }
    console.log("Sommes des points : " + sum)
    document.getElementById("sommePoints").textContent = ("Somme des points : " + sum);

}
displayScore(points);