// A FAIRE, assigner le résultat du lancé de dé à une opération et assigner le score de cette opération au total
// Laisser la fonction de calcul globale pour récupéré la valeur de l'opération choisie avec le boutton
// => lancé de dé  => afficher uniquement les bouttons qui peuvent prendre l'opération => mettre à jour le score
// une fois que j'ai affecté mon résultat à une ligne je désactive le boutton correspondant

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

    let diceContainer = document.getElementById("dice-container"); // Attraper le container images dés
    for (let i = 0; i < 5; i++) {
        let diceValue = dice[i]; // Parcourir le tableau des dés relancé pour récupérer la valeur
        let imgSource = `img/${diceValue}.png`; // Si valeur dé = 1 alors => 1.png

        let imgElement = document.createElement("img"); // créer l'élément img
        imgElement.src = imgSource; // Assigner la source de l'image à l'élément
        diceContainer.appendChild(imgElement); // Attacher l'élément au container des dés
    }
    return dice;
}
let dice = reRollTheDice(des);
console.log("Nouveau jet de des : ", dice);

// Fonction 3 Afficher les dés
function displayDice(dice) {
    document.getElementById("afficherDes").textContent = dice.join(' ')
}


///////////////////// EXERCICE 2 //////////////////////

// Liste des dés conservés
let diceConserves = displayDice(dice)

// Trouver comment passer l'opération en paramètre dans la fonction

// Fonction 1 Exercice 2 calculer les points --- à réécrire
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

let total1 = calculePoints("Total 1", diceConserves);
let total2 = calculePoints("Total 2", diceConserves)
let total3 = calculePoints("Total 3", diceConserves)
let total4 = calculePoints("Total 4", diceConserves)
let total5 = calculePoints("Total 5", diceConserves)
let total6 = calculePoints("Total 6", diceConserves)
let brelan = calculePoints("Brelan", diceConserves)
let carre = calculePoints("Carré", diceConserves)
let full = calculePoints("Full", diceConserves)
let petiteSuite = calculePoints("Petite Suite", diceConserves)
let grandeSuite = calculePoints("Grande Suite", diceConserves)
let yams = calculePoints("Yams", diceConserves)
let chance = calculePoints("Chance", diceConserves)


// Fonction afficher les bouton qui sont affectable avec le résultat des dés, visibility hidden pour les bouton


// Créer l'objet points avec en clés les opérations et en valeur les valeurs des totaux de chaque opération
let points = {
    'Total 1': total1,
    'Total 2': total2,
    'Total 3': total3,
    'Total 4': total4,
    'Total 5': total5,
    'Total 6': total6,
    'Brelan': brelan,
    'Carré': carre,
    'Full': full,
    'Petite Suite': petiteSuite,
    'Grande Suite': grandeSuite,
    'Yams': yams,
    'Chance': chance,
    'Bonus': 0
};

// Fonction 2 Exercice 2 Afficher les points sur la page HTML
function displayPoints() {
    // La méthode Object.entries() renvoie un tableau des propriétés propres énumérables d'un objet dont la clé est une chaîne de caractères, sous la forme de paires [clé, valeur],
    let resultatsOperations = "";
    for (let [key, value] of Object.entries(points)) {
        resultatsOperations += `${key} : ${value}<br>`;
    }
    document.getElementById("afficherRepartitionPoints").innerHTML = resultatsOperations;
}
displayPoints();


// Fonction 3 Exercice 2 Calcul du bonus et si bonus ajout au total des points
function checkBonus(points) { //
    let sum = points["Total 1"] + points["Total 2"] + points["Total 3"] + points["Total 4"] + points["Total 5"] + points["Total 6"];
    if (sum > 63) {
        points['Bonus'] = 35;
    } else {
        points['Bonus'] = 0;
    }
    return points;
}
checkBonus(points);
displayPoints(); // Afficher les points à jour si un bonus se rajoute après le calcul en rappelant la fonction


// Fonction 4 Exercice 2 Afficher la somme du total des points
function displayScore(points) {
    let sum = Object.values(points).reduce((acc, val) => acc + val, 0); // La méthode Object.entries() renvoie un tableau des propriétés propres énumérables d'un objet dont la clé est une chaîne de caractères, sous la forme de paires [clé, valeur],
    console.log("Sommes des points : " + sum)
    document.getElementById("sommePoints").textContent = ("Somme des points : " + sum);
}
displayScore(points);