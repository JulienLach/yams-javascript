function reRollTheDice(des) {
    let dice = des.map(() => Math.floor(Math.random() * 6) + 1);
    return dice;
}
let des = [1, 5, 4, 6, 2];
console.log(reRollTheDice(des));
