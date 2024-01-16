// A FAIRE :
// Une fois que j'ai assigné mes dés à ma combinison, sauvegarder la valeur dans le tableau et désactiver 
// le bouton de la combinaison déjà réalisée pour le prochain lancé
// Laisser la fonction de calcul globale pour récupéré la valeur de l'opération choisie avec le boutton
// => lancé de dé  => afficher uniquement les bouttons qui peuvent prendre l'opération => mettre à jour le score
// une fois que j'ai affecté mon résultat à une ligne je désactive le boutton correspondant => relancer les dés jusqu'à
// obtenir toutes les combinaisons

// Faire un boutton lancer les dés et vider la div html des anciens dés et afficher les nouveau dés 
// pour cocher une nouvelles combinaisons

///////////////////// EXERCICE 1 //////////////////////


// Fonction relancer les dés sans actualiser la page
function relancerLesDes() {
    let boutonRelancerLesDes = document.getElementById("relancerLesDes")
    boutonRelancerLesDes.addEventListener("click", function () {
        dice = reRollTheDice(des);
        let diceContainer = document.getElementById("dice-container");
        diceContainer.innerHTML = "";
        for (let i = 0; i < 5; i++) {
            let diceValue = dice[i]; // Parcourir le tableau des dés relancé pour récupérer la valeur
            let imgSource = `img/${diceValue}.png`; // Si valeur dé = 1 alors => 1.png
            let imgElement = document.createElement("img"); // créer l'élément img
            imgElement.src = imgSource; // Assigner la source de l'image à l'élément
            diceContainer.appendChild(imgElement); // Attacher l'élément au container des dés
        }
        console.log(dice)
        displayDice(dice)

        diceConserves = dice;
        return dice
    })
}
relancerLesDes()

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

    // Boucle afficher l'image des dés
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


// Fonction afficher les bouton qui sont affectable avec le résultat des dés, visibility hidden pour les boutons qui ne sont pas affectable
function afficherBoutons() {
    if (total1 === 0) {
        document.getElementById("total1").style.visibility = "hidden";
    }
    if (total2 === 0) {
        document.getElementById("total2").style.visibility = "hidden";
    }
    if (total3 === 0) {
        document.getElementById("total3").style.visibility = "hidden";
    }
    if (total4 === 0) {
        document.getElementById("total4").style.visibility = "hidden";
    }
    if (total5 === 0) {
        document.getElementById("total5").style.visibility = "hidden";
    }
    if (total6 === 0) {
        document.getElementById("total6").style.visibility = "hidden";
    }
    if (brelan === 0) {
        document.getElementById("brelan").style.visibility = "hidden";
    }
    if (carre === 0) {
        document.getElementById("carre").style.visibility = "hidden";
    }
    if (full === 0) {
        document.getElementById("full").style.visibility = "hidden";
    }
    if (petiteSuite === 0) {
        document.getElementById("petite-suite").style.visibility = "hidden";
    }
    if (grandeSuite === 0) {
        document.getElementById("grande-suite").style.visibility = "hidden";
    }
    if (yams === 0) {
        document.getElementById("yams").style.visibility = "hidden";
    }
    if (chance === 0) {
        document.getElementById("chance").style.visibility = "hidden";
    }
}
afficherBoutons();

// Fonction assigner le score d'un bouton cliqué à une ligne du tableau des totaux et fonction updateTotalScore dernière ligne tableau
function assignerScoreBouton() {
    document.getElementById("total1").addEventListener("click", function () {
        if (total1 > 0) {
            document.getElementById("tableau1").innerHTML = total1
            document.getElementById("total1").style.visibility = "hidden"
            updateTotalScore();
        }
    })
    document.getElementById("total2").addEventListener("click", function () {
        if (total2 > 0) {
            document.getElementById("tableau2").innerHTML = total2
            document.getElementById("total2").style.visibility = "hidden"
            updateTotalScore();
        }
    })
    document.getElementById("total3").addEventListener("click", function () {
        if (total3 > 0) {
            document.getElementById("tableau3").innerText = total3
            document.getElementById("total3").style.visibility = "hidden"
            updateTotalScore();
        }
    })
    document.getElementById("total4").addEventListener("click", function () {
        if (total4 > 0) {
            document.getElementById("tableau4").innerText = total4
            document.getElementById("total4").style.visibility = "hidden"
            updateTotalScore();
        }
    })
    document.getElementById("total5").addEventListener("click", function () {
        if (total5 > 0) {
            document.getElementById("tableau5").innerText = total5
            document.getElementById("total5").style.visibility = "hidden"
            updateTotalScore();
        }
    })
    document.getElementById("total6").addEventListener("click", function () {
        if (total6 > 0) {
            document.getElementById("tableau6").innerText = total6
            document.getElementById("total6").style.visibility = "hidden"
            updateTotalScore();
        }
    })
    document.getElementById("brelan").addEventListener("click", function () {
        if (brelan > 0) {
            document.getElementById("tableauBrelan").innerText = brelan
            document.getElementById("brelan").style.visibility = "hidden"

            updateTotalScore();
        }
    })
    document.getElementById("carre").addEventListener("click", function () {
        if (carre > 0) {
            document.getElementById("tableauCarre").innerText = carre
            document.getElementById("carre").style.visibility = "hidden"
            updateTotalScore();
        }
    })
    document.getElementById("full").addEventListener("click", function () {
        if (full > 0) {
            document.getElementById("tableauFull").innerText = full
            document.getElementById("full").style.visibility = "hidden"
            updateTotalScore();
        }
    })
    document.getElementById("petite-suite").addEventListener("click", function () {
        if (petiteSuite > 0) {
            document.getElementById("tableauPetiteSuite").innerText = petiteSuite
            document.getElementById("petite-suite").style.visibility = "hidden"
            updateTotalScore();
        }
    })
    document.getElementById("grande-suite").addEventListener("click", function () {
        if (grandeSuite > 0) {
            document.getElementById("tableauGrandeSuite").innerText = grandeSuite
            document.getElementById("grande-suite").style.visibility = "hidden"
            updateTotalScore();
        }
    })
    document.getElementById("yams").addEventListener("click", function () {
        if (yams > 0) {
            document.getElementById("tableauYams").innerText = yams
            document.getElementById("yams").style.visibility = "hidden"
            updateTotalScore();
        }
    })
    document.getElementById("chance").addEventListener("click", function () {
        if (chance > 0) {
            document.getElementById("tableauChance").innerText = chance
            document.getElementById("chance").style.visibility = "hidden"
            updateTotalScore();
        }
    })

    // Fonction mise à jour de la ligne Score du tableau, rappelée à chaque bouton cliqué pour mettre  à jour le Score
    function updateTotalScore() {
        let totalScore = parseInt((document.getElementById("tableau1").innerHTML))
            + parseInt((document.getElementById("tableau2").innerHTML))
            + parseInt((document.getElementById("tableau3").innerHTML))
            + parseInt((document.getElementById("tableau4").innerHTML))
            + parseInt((document.getElementById("tableau5").innerHTML))
            + parseInt((document.getElementById("tableau6").innerHTML))
            + parseInt((document.getElementById("tableauBonus").innerHTML))
            + parseInt((document.getElementById("tableauBrelan").innerHTML))
            + parseInt((document.getElementById("tableauCarre").innerHTML))
            + parseInt((document.getElementById("tableauFull").innerHTML))
            + parseInt((document.getElementById("tableauPetiteSuite").innerHTML))
            + parseInt((document.getElementById("tableauGrandeSuite").innerHTML))
            + parseInt((document.getElementById("tableauYams").innerHTML))
            + parseInt((document.getElementById("tableauChance").innerHTML))
        document.getElementById("tableauScore").innerText = totalScore;
    }
}
assignerScoreBouton();

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
        resultatsOperations += `${key} : ${value} / `;
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