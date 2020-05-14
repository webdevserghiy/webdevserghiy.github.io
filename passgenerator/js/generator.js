const length = document.getElementById('length'),
			paswdLength = document.querySelector('.password-length'),
			genButton = document.getElementById('generator'),
			digitsBox = document.getElementById('digits'),
			lowercaseBox = document.getElementById('lowercase'),
			uppercaseBox = document.getElementById('uppercase'),
			symbolsBox = document.getElementById('symbols'),
			copyButton = document.querySelector('.copy-button'),
			out = document.querySelector('.out p.bg-success');

let arrDigits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'], //массив с цифрами
		arrLowercase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'], //массив со строчными буквами
		arrUppercase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'], //массив с прописными буквами
		arrSymbols = ['!', '@', '#', '$', '%', '&', '?', '-', '+', '=', '~', '{', '}', '*', '[', ']', '|', '(', ')', '^', '.', ',', ':', ';', '`'];
// console.log (length.value);

(() => {//Функция изменения цвета блока чекбокса в зависимости от выбора
		if (digitsBox.checked) {
				digitsBox.parentElement.parentElement.classList.toggle('checked');
				digitsBox.addEventListener('change', () => digitsBox.parentElement.parentElement.classList.toggle('checked'));
			} else {
				digitsBox.addEventListener('change', () => digitsBox.parentElement.parentElement.classList.toggle('checked'));
			}

		if (lowercaseBox.checked) {
				lowercaseBox.parentElement.parentElement.classList.toggle('checked');
				lowercaseBox.addEventListener('change', () => lowercaseBox.parentElement.parentElement.classList.toggle('checked'));
			} else {
				lowercaseBox.addEventListener('change', () => lowercaseBox.parentElement.parentElement.classList.toggle('checked'));
			}

		if (uppercaseBox.checked) {
				uppercaseBox.parentElement.parentElement.classList.toggle('checked');
				uppercaseBox.addEventListener('change', () => uppercaseBox.parentElement.parentElement.classList.toggle('checked'));
			} else {
				uppercaseBox.addEventListener('change', () => uppercaseBox.parentElement.parentElement.classList.toggle('checked'));
			}

		if (symbolsBox.checked) {
				symbolsBox.parentElement.parentElement.classList.toggle('checked');
				symbolsBox.addEventListener('change', () => symbolsBox.parentElement.parentElement.classList.toggle('checked'));
			} else {
				symbolsBox.addEventListener('change', () => symbolsBox.parentElement.parentElement.classList.toggle('checked'));
			}

})();


let generator = () => {
	let arrBox = [];

	if (digitsBox.checked) {
		arrBox = arrBox.concat(arrDigits);
		compareRandom(arrBox);
		// digitsBox.parentElement.parentElement.classList.toggle('checked');
	}

	if (lowercaseBox.checked) {
		arrBox = arrBox.concat(arrLowercase);
		compareRandom(arrBox);
	}

	if (uppercaseBox.checked) {
		arrBox = arrBox.concat(arrUppercase);
	}

	if (symbolsBox.checked) {
		arrBox = arrBox.concat(arrSymbols);
	}

	for (let i = 0; i < parseInt(length.value); i++) {
		if (!arrBox[i]) {
			arrBox = arrBox.concat(arrBox);
		}
	}

	compareRandom(arrBox);

	console.log(arrBox);
	console.log( parseInt(length.value));
	let outer = '';

	for (let i = 0; i < parseInt(length.value); i++) {
		outer += arrBox[i];
		console.log(outer[i] + ' = ' + arrBox[i]);
	}

	out.innerHTML = outer;
	console.log(out.style);
};

function compareRandom(array) {
  array.sort(() => Math.random() - 0.5);
}
//---------------------------------------------------
let copyPass = () => { //функция копирования в БУФЕР
//-----------------------------------------------------------------------------
copyButton.setAttribute('data-clipboard-target', '.copy-target'); //добавляем новый атрибут для кнопки с указанием класа таргета для копирования
//-----------------------------------------------------------------------------
if (!(out.classList.contains('copy-target'))) {
out.setAttribute('class', out.getAttribute('class') + ' copy-target'); } //проверка есть ли у строки, с которой будем копировать клосс таргета
console.log( out.getAttribute('class'));
//-----------------------------------------------------------------------------
let clipboardJs  = new ClipboardJS('.copy-button'); //подключеам функцию копирования для кнопки, указав селектор кнопки
//-----------------------------------------------------------------------------

  /* Alert the copied text */
copyButton.innerText = 'Скопировано!';
copyButton.addEventListener('mouseout', () => copyButton.innerHTML = 'КОПИРОВАТЬ В БУФЕР');
}
//Вывод значение позунка в Элемент "Длина пароля ()"
length.addEventListener('input', () => paswdLength.innerHTML = length.value);

genButton.addEventListener('click', generator);

copyButton.addEventListener('click', copyPass);