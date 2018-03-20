
//var n = prompt("Vvedite razmer mas: ", 0);

//быстрая сортировка
function fastSort (mas, left, right ) {
    var firstElement;
    var lastElement;

    if (left !== undefined) {
        firstElement = left;
    }
    else firstElement = 0;

    if (right !== undefined) {
        lastElement = right
    }
    else lastElement = mas.length - 1;

    var average = mas[parseInt((firstElement + lastElement) / 2)];

    while (firstElement <= lastElement) {
        while (mas[firstElement] < average) {
            firstElement ++;
        }
        while (mas[lastElement] > average) {
            lastElement --;
        }
        if (firstElement <= lastElement) {
            temp = mas[firstElement];
            mas[firstElement] = mas[lastElement];
            mas[lastElement] = temp;
            firstElement ++;
            lastElement --;
        }
    }

    if ( left < lastElement  ) {
        fastSort(mas, left, lastElement);
    }
    if ( firstElement < right ) {
        fastSort(mas, firstElement, right);
    }
    return mas;
}

//Сортировка пузырьком
function bubbleSort (mas) {
    for (var i = mas.length - 1; i > 0; i--) {
        for (var j = 0; j < i; j++) {
            if (mas[j] > mas[j + 1]) {
                var t = mas[j];
                mas[j] = mas[j + 1];
                mas[j + 1] = t;
            }
        }
    }
    return mas;
}



var n = 10;
var mas = new Array(n);
for (var i = 0; i < mas.length; i++) {
    mas[i] = Math.floor(Math.random() * 101);
}

console.log("Do sortirovki:");
console.log(mas);
console.log("\nFastSort: ");
console.log(fastSort(mas, 0, mas.length - 1));
console.log("\nBubbleSort: ");
console.log(bubbleSort(mas));
