// FONCTION 1 EXERCICE 1
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


// FONCTION 2 EXERCICE 1
function reRollTheDice(des) {
    let dice = des.map(() => Math.floor(Math.random() * 6) + 1);
    return dice;
}
let dice = reRollTheDice(des);
console.log("Nouveau jet de des : ", dice);


// // FONCTION 3 EXERCICE 1

function displayDice(dice) {
    document.getElementById("afficherDes").textContent = dice.join(' ')
}
displayDice(dice)


// FONCTION 1 EXERCICE 2





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




// FONCTION 2 EXERCICE 2

function displayPoints() {
    // Formater l'objet point en chaine de caratères avec l'objet global Object.
    let resultatsOperations = Object.entries(points).map(([key, value]) => `${key} : ${value}`).join(' \n');
    document.getElementById("afficherPoints").textContent = resultatsOperations;
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