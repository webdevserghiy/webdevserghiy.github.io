const length = document.getElementById('length'),
			paswdLength = document.querySelector('.password-length'),
			genButton = document.getElementById('generator'),
			digitsBox = document.getElementById('digits'),
			lowercaseBox = document.getElementById('lowercase'),
			uppercaseBox = document.getElementById('uppercase'),
			symbolsBox = document.getElementById('symbols'),
			out = document.querySelector('.out');

let arrDigits = [1,2,3,4,5,6,7,8,9,0], //массив с цифрами
		arrLowercase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'], //массив со строчными буквами
		arrUppercase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'], //массив с прописными буквами
		arrSymbols = ['!', '@', '#', '$', '%', '&', '?', '-', '+', '=', '~'],
		arrBox = [];

// console.log (length.value);
let generator = () => {
	
	if (digitsBox.checked) {
		arrBox = arrBox.concat(arrDigits);
		compareRandom(arrBox);
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

	compareRandom(arrBox);

	console.log(out);
	console.log( Number(length.value));
	let outer = '';

	for (let i = 0; i < Number(length.value); i++) {
		outer += arrBox[i];
		console.log(outer);
	}

	out.innerHTML = '<p class="text-center bg-success">'+outer+'</p>';
};

function compareRandom(array) {
  array.sort(() => Math.random() - 0.5);
}

//Вывод значение позунка в Элемент "Длина пароля ()"
length.addEventListener('input', () => paswdLength.innerHTML = length.value);

genButton.addEventListener('click', generator);