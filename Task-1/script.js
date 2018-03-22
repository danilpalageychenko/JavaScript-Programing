/*
Основное задание
Дан массив размера N. Отсортируйте его по возрастанию методом "Быстрой сортировки". Отличительной особенностью 
быстрой сортировки является операция разбиения массива на две части относительно опорного элемента. Например, 
если последовательность требуется упорядочить по возрастанию, то в левую часть будут помещены все элементы, 
значения которых меньше значения опорного элемента, а в правую элементы, чьи значения больше или равны 
опорному. Вне зависимости от того, какой элемент выбран в качестве опорного, массив будет отсортирован, 
но все же наиболее удачным считается ситуация, когда по обеим сторонам от опорного элемента оказывается 
примерно равное количество элементов. Если длина какой-то из получившихся в результате разбиения частей 
превышает один элемент, то для нее нужно рекурсивно выполнить упорядочивание, т.е. повторно запустить 
алгоритм на каждом из отрезков.
Таким образом, алгоритм быстрой сортировки включает в себя два основных этапа:
1. Разбиение массива относительно опорного элемента;
2. Рекурсивная сортировка каждой части массива.

Альтернативное задание
Дан массив размера N. Отсортируйте его по возрастанию методом "Сортировки пузырьком". Алгоритм состоит из 
повторяющихся проходов по сортируемому массиву. За каждый проход элементы последовательно сравниваются 
попарно и, если порядок в паре неверный, выполняется обмен элементов. Проходы по массиву повторяются N - 1 
раз или до тех пор, пока на очередном проходе не окажется, что обмены больше не нужны, что означает – массив 
отсортирован. При каждом проходе алгоритма по внутреннему циклу, очередной наибольший элемент массива 
ставится на своё место в конце массива рядом с предыдущим «наибольшим элементом», а наименьший элемент 
перемещается на одну позицию к началу массива («всплывает» до нужной позиции, как пузырёк в воде. Отсюда и 
название алгоритма).
*/





//var n = prompt("Vvedite razmer mas: ", 0);

//Быстрая сортировка
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
