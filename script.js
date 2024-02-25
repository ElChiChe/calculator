//Botones de números y especiales (+, -, *, /)
const numeros = document.querySelectorAll("button");
const botones_especiales = document.querySelectorAll(".especiales");
const botones_superior = document.querySelectorAll(".btn-superior");
const punto = document.querySelector(".punto");

const add = (n1, n2) => {
	return n1 + n2;
}

const subtract = (n1, n2) => {
	return n1 - n2;
}

const multiply = (n1, n2) => {
	return n1 * n2;
}

const divide = (n1, n2) => {
	return n1 / n2;

}

//Variables para almacenar los valores y el operador
let first_number = "";
let operator = "";
let second_number = "";
let resultado = "";

//Display e input
const resultado_input = document.querySelector(".resultado");
const btn_igual = document.querySelector(".igual");

//Obtener los valores numéricos para realizar la operación
const getNumber = () => {
	numeros.forEach(btn => {
		btn.addEventListener("click", e => {
			//Evitar que se pueda hacer click en los botones especiales
			if(!isNaN(btn.textContent) && btn.textContent !== "") {
				let value_btn = e.target.textContent;
				//Si el operador no tiene un valor, agregar valor al primer número

				//Si aparece el error, borrarlo de la pantalla
				//y comenzar las operaciones nuevamente
				if(resultado_input.value === "Error" || resultado_input.value === "NaN" || resultado_input.value === "infinity") {
					resultado_input.value = "";
					first_number = "";
					second_number = "";
					operator = "";
					resultado = "";
				}

				if(!operator) {
					resultado_input.value += value_btn;
					first_number = resultado_input.value;
					console.log(resultado_input.value);
				}
				if(operator) {
					resultado_input.value +=  value_btn;
					second_number = value_btn;
					console.log(resultado_input.value);
				}
				

			}
			
		})
	})
}


// Función para almacenar el operador seleccionado.
const getOperator = () => {
	botones_especiales.forEach(btn => {
		btn.addEventListener("click", e => {
			if(e.target.textContent !== "=") {
			let value_btn = e.target.textContent;

			if(!operator.includes(value_btn)) {
				operator = value_btn;
				resultado_input.value += operator;
			}
		}
	})
})
}


const addDecimal = () => {
	if(!first_number.includes(".") && first_number !== "") {
		resultado_input.value += ".";
		first_number += ".";
	}

	else if(operator && !second_number.includes(".")) {
		resultado_input.value += ".";
		second_number += ".";
	}
}

punto.addEventListener("click", addDecimal);

//Función para limpiar todos los valores
const clear = () => {
	botones_superior.forEach(btn => {
		btn.addEventListener("click", e => {
			let value_btn = e.target;

			if(value_btn.textContent === "AC") {
				resultado_input.value = "";
				first_number = "";
				second_number = "";
				operator = "";
				resultado = "";
			}

		})
	})
}

clear();

//Función  para calcular según el operador seleccionado.
const calculate = (n1, op, n2) => {
	switch(op) {
	case "+":
		return add(n1, n2);

	case "-":
		return subtract(n1, n2);
	
	case "x":
		return multiply(n1, n2);

	case "/":
		if(n1 <= 0) {
			return resultado_input.value = "Error";
		}

		else if(n2 <= 0) {
			return "infinity";
		}

		return roundDecimal(divide(n1, n2));
	}
}

//Función para mostrar el resultado final
const result = operate => {

	operate.addEventListener("click", () => {

		//Si se hace click en el "=" pero el primer valor
		//y segundo valor está vacío, retornar error
		if(operate && first_number === "" || second_number === "") {
			resultado_input.value = "Error";
		}

		else {
		//Muestra el resultado en pantalla
		resultado_input.value = calculate(parseFloat(first_number), operator, parseFloat(second_number));

		console.log(first_number, operator, second_number);
		//Guardamos el número en pantalla en la variable "resultado".
		resultado = resultado_input.value;

		//Igualamos el primer valor con el resultado para poder seguir haciendo operaciones
		//Además redondeamos para los números decimales y no haya desborde en el input
		first_number = roundDecimal(resultado);
		}
	})
}

const roundDecimal = num => {
	return Math.round(num * 100000) / 100000;
}

result(btn_igual);
getNumber();
getOperator();