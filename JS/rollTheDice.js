function rollTheDice() {
    let dice = [];
    for (let i = 0; i < 5; i++) {
        // Génère un nombre aléatoire entre 1 et 6
        let randomNumber = Math.floor(Math.random() * 6) + 1;
        // Ajoute le nombre à la tableau dice
        dice.push(randomNumber);
    }
    return dice;
}

// Exemple d'utilisation
let result = rollTheDice();
console.log("Résultat du lancer de dés :", result);