function displayPoints() {
    let point = {
        'Total 1': 2,
        'Total 2': 0,
        'Total 3': 0,
        'Total 4': 0,
        'Total 5': 0,
        'Total 6': 12,
        'Brelan': 9,
        'Carré': 12,
        'Full': 0,
        'Petite Suite': 0,
        'Grande Suite': 0,
        'Yams': 0,
        'Chance': 0
    };
    console.log(point)

    // Formater l'objet point en chaine de caratères avec l'objet global Object.
    let resultString = Object.entries(point).map(([key, value]) => `${key}: ${value}`).join(' \n');
    document.getElementById("afficherPoints").textContent = resultString;

}
displayPoints();

