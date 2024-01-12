function checkBonus(points) {
    const sum = points["Total 1"] + points["Total 2"] + points["Total 3"] +
        points["Total 4"] + points["Total 5"] + points["Total 6"];
    if (sum > 63) {
        points["Bonus"] = 35;
    } else {
        points["Bonus"] = 0;
    }

    return points;
}

var examplePoints = {
    "Total 1": 10,
    "Total 2": 10,
    "Total 3": 10,
    "Total 4": 10,
    "Total 5": 10,
    "Total 6": 10
};

console.log(checkBonus(examplePoints));