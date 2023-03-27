import Phaser from "phaser";
import button from "./button.png";
import json from "./json.json";
export class Game extends Phaser.Scene {
  constructor() {
    super({ key: "game" });
  }
  // Load the necessary assets
  async preload() {
    const buttonURL = button.src;
    this.load.image("button", buttonURL);
    const palabras = await fetch("./json.json");
    const data = await palabras.json();
    // palabra(data);
  }

  async create() {
    const palabras = await fetch("./json.json");
    const data = await palabras.json();

    // const array = fetch('json.json')
    //     .then(response => response.json())
    //     .then(data => {

    //
    //         // Here, 'data' contains the parsed JSON object
    //         console.log(data.palabras.semantica[0][3]);
    //         const array1 = data.palabras.semantica;
    //         const json = data;

    //     }
    let texto = palabra(data);

    const text: any = {
      text0: "texto",
      text1: "",
      text2: "",
      text3: "",
      text4: "",
    };
    const gameState = {};

    var BV = 0;
    // const word = "hola";

    const array1 = data.palabras.semantica;

    // Calculate the button size and spacing based on the screen size

    //800 = game.config.width
    //600 = game.config.height
    var buttonSize = Math.min(800, 600) * 0.2;
    var buttonSpacing = buttonSize * 0.5;

    var wordSpace = this.add.image(400, 100, "button").setInteractive();
    wordSpace.displayWidth = buttonSize;
    wordSpace.displayHeight = buttonSize;

    // Main text
    text.text0 = this.add.text(350, 100, texto, { color: "#000000" });

    // Create the first button
    var button1 = this.add
      .image(buttonSpacing + buttonSize / 2, 600 / 2 + 600 / 3, "button")
      .setInteractive();
    button1.displayWidth = buttonSize;
    button1.displayHeight = buttonSize;
    button1.on("pointerdown", function () {
      console.log("Button 1 clicked");
      BV = 0;
      //console.log(word);

      searchWord(texto, array1);
      // palabra(data);
      texto = palabra(data);
      text.text0.setText(texto);

      // validateQuestions(BV);
    });

    // Create first word
    text.text1 = this.add.text(buttonSize / 1.2, 600 / 2 + 600 / 3, "GEL", {
      color: "#000000",
    });

    // Create the second button
    var button2 = this.add
      .image(buttonSpacing * 2 + buttonSize * 1.5, 600 / 2 + 600 / 3, "button")
      .setInteractive();
    button2.displayWidth = buttonSize;
    button2.displayHeight = buttonSize;
    button2.on("pointerdown", function () {
      console.log("Button 2 clicked");
      BV = 1;
    });

    // Create second word
    text.text2 = this.add.text(buttonSize * 2.35, 600 / 2 + 600 / 3, "RANA", {
      color: "#000000",
    });

    // Create the third button
    var button3 = this.add
      .image(buttonSpacing * 3 + buttonSize * 2.5, 600 / 2 + 600 / 3, "button")
      .setInteractive();
    button3.displayWidth = buttonSize;
    button3.displayHeight = buttonSize;
    button3.on("pointerdown", function () {
      console.log("Button 3 clicked");
      BV = 2;
    });

    // Create thirt word
    text.text3 = this.add.text(buttonSize * 3.76, 600 / 2 + 600 / 3, "CEREZA", {
      color: "#000000",
    });

    // Create the fourth button
    var button4 = this.add
      .image(buttonSpacing * 4 + buttonSize * 3.5, 600 / 2 + 600 / 3, "button")
      .setInteractive();
    button4.displayWidth = buttonSize;
    button4.displayHeight = buttonSize;
    button4.on("pointerdown", function () {
      console.log("Button 4 clicked");
      BV = 3;
    });

    // Create fourth word
    text.text4 = this.add.text(
      buttonSize * 5.1,
      600 / 2 + 600 / 3,
      "EQUITACÍON",
      { color: "#000000" }
    );
  }
  async update() {}
}

function randomBetweenZeroAndThree() {
  const randomarray = Math.floor(Math.random() * 4);
  return randomarray;
}
function randomBetweenOneAndEight() {
  const randomNumber = Math.floor(Math.random() * 8) + 1;
  return randomNumber === 0 ? 1 : randomNumber;
}
function palabra(data: any) {
  let randomArray = randomBetweenZeroAndThree();
  let randomNumber = randomBetweenOneAndEight();
  let word = data.palabras.semantica[randomArray][randomNumber];
  console.log(word);
  return word;
}

function searchWord(word: any, array1: any) {
  //console.log(word);
  //console.log(array1);

  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array1[i].length; j++) {
      if (word.includes(array1[i][j])) {
        //console.log(i, j);
      }
    }
  }
}

// let countC = 0;
// let countI = 0;

// var palabras = new palabras(3);
// palabras [0] = semanticas(3);
// palabras [1] = empiezan_misma_letra(3);
// palabras [2] = misma_fuente(3);

// var semanticas = new semanticas(3);
// semanticas [0] = Roca
// semanticas [1] = Gorro
// semanticas [2] = Cama

// function validateQuestions(BV,word){
//     if (BV = word) {
//         questionCorrect();
//     }else {
//         questionIncorrect();
//     }
// }

// function questionCorrect(countC){
//     countC++;
//     console.log(countC);
// }

// function questionIncorrect(countI){
//     countI++;
//     console.log(countI);
// }
