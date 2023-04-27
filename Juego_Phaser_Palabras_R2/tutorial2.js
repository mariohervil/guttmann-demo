export class Tutorial2 extends Phaser.Scene {

    constructor() {
        super({ key: 'Tutorial2' });
    }
    async preload() {
        this.load.image('blanco', 'img/blanco.jpg');
        this.load.image('rojo', 'img/rojo.jpg');
        this.load.image('verde', 'img/verde.jpg');
        this.load.image('logo', 'img/logo.png');

        //palabra(data);
    }
    async create() {

        const palabras = await fetch("./json.json");
        const data = await palabras.json();

        const array1 = data.palabras.semantica;
        const array2 = data.palabras.empiezan_misma_letra;
        const array3 = data.palabras.misma_fuente;

        const blanco = "blanco";
        const rojo = "rojo";
        const verde = "verde";

        let contadorAciertos = 0;
        let contadorFallos = 0;

        let contadorAMetodo = 0;
        let contadorFMetodo = 0;

        let Metodo = 0;

        let button1Verification = true;
        let button2Verification = true;
        let button3Verification = true;
        let button4Verification = true;

        let texto = palabra(data);

        let color;

        const text = {
            text0: "texto",
            text1: "",
            text2: "",
            text3: "",
            text4: ""
        }

        // const word = "hola";



        // if (contadorFMetodo == 5){
        //     this.scene.pause();
        // }

        // Calculate the button size and spacing based on the screen size 

        //800 = game.config.width
        //600 = game.config.height
        var buttonSize = Math.min(800, 600) * 0.2;
        var buttonSpacing = buttonSize * 0.5;

        // var wordSpace = this.add.image(400, 100, 'blanco').setInteractive();
        // wordSpace.displayWidth = buttonSize;
        // wordSpace.displayHeight = buttonSize;


        // Main text  
        const imgOg = this.add.image(350, 100, 'blanco');
        imgOg.displayWidth = buttonSize;
        imgOg.displayHeight = buttonSize;
        // Create the first button  
        const button1 = this.add.image(buttonSpacing + buttonSize / 2, 600 / 2 + 600 / 3, 'blanco').setInteractive();
        button1.displayWidth = buttonSize;
        button1.displayHeight = buttonSize;
        button1.on('pointerdown', function () {

            if (button1Verification == true) {
                disableButtons();
                // console.log('Button 1 clicked');
                // console.log('Aciertos ' + contadorAciertos);
                // console.log('Fallos ' + contadorFallos);

                //console.log(word);
                // palabra(data);

                if (contadorAMetodo < 8) {
                    color = searchWordSem1(texto, array1, verde, rojo);
                }

                if (contadorAMetodo >= 8 && contadorAMetodo < 16) {
                    color = searchWordMl1(texto, array2, verde, rojo);
                }

                if (contadorAMetodo >= 16 && contadorAMetodo < 24) {
                    color = searchWordMf1(texto, array3, verde, rojo);
                }
                if (contadorAMetodo >= 24 && contadorAMetodo < 32) {
                    color = searchWordSem1(texto, array1, verde, rojo);
                }

                if (contadorAMetodo >= 32 && contadorAMetodo < 40) {
                    color = searchWordMl1(texto, array2, verde, rojo);
                }

                if (contadorAMetodo >= 40 && contadorAMetodo < 48) {
                    color = searchWordMf1(texto, array3, verde, rojo);
                }
                if (contadorAMetodo >= 48) {
                    console.log("---------- FIN DEL JUEGO ----------")
                }

                if (color != rojo) {
                    contadorAciertos++;
                    contadorAMetodo++;
                    contadorFMetodo = 0;
                } else {
                    contadorFallos++;
                    contadorFMetodo++;
                    if (Metodo == 1) {
                        contadorAMetodo = 0;
                    }
                    if (Metodo == 2) {
                        contadorAMetodo = 8;
                    }
                    if (Metodo == 3) {
                        contadorAMetodo = 16;
                    }
                    if (Metodo == 4) {
                        contadorAMetodo = 24;
                    }
                    if (Metodo == 5) {
                        contadorAMetodo = 32;
                    }
                    if (Metodo == 6) {
                        contadorAMetodo = 40;
                    }
                }

                if (contadorAMetodo < 8) {
                    Metodo = 1;
                }
                if (contadorAMetodo >= 8 && contadorAMetodo < 16) {
                    Metodo = 2;
                }
                if (contadorAMetodo >= 16 && contadorAMetodo < 24) {
                    Metodo = 3;
                }
                if (contadorAMetodo >= 24 && contadorAMetodo < 32) {
                    Metodo = 4;
                }
                if (contadorAMetodo >= 32 && contadorAMetodo < 40) {
                    Metodo = 5;
                }
                if (contadorAMetodo >= 40 && contadorAMetodo < 48) {
                    Metodo = 6;
                }


                button1.setTexture(color);
                //searchWord1(texto, array1);

                setTimeout(() => {
                    button1.setTexture(blanco);
                    styles = font(texto, array3);
                    text.text0.setFontFamily(styles);
                    texto = palabra(data);
                    text.text0.setText(texto);
                    enableButtons();

                }, 1000);



                const datos = {
                    metodo: Metodo,
                    contadorA: contadorAMetodo,
                    contadorF: contadorFMetodo
                };

                // if (contadorAMetodo >= 48) {
                //     this.scene.launch('SceneB');
                //     this.scene.start('SceneB', datos);
                // }
                
                
                if (contadorAMetodo < 8) {
                    
                    this.scene.start('SceneA');
                    // this.scene.start('Tutorial1');
                }
                
                

                  
                // console.log('Button 1 clicked');
                console.log('------------------------------');

                console.log('Button 1 clicked');

                console.log('Texto ' + texto);
                console.log('Styles ' + styles);
                console.log('Color ' + color);

                console.log('Metodo de validación ' + Metodo);
                console.log('Contador Aciertos Metodo ' + contadorAMetodo);
                console.log('Contador Fallos Metodo ' + contadorFMetodo);

                console.log('Aciertos Totales ' + contadorAciertos);
                console.log('Fallos Totales ' + contadorFallos);

                console.log('------------------------------');

            }


        }, this);

        // Create the second button  
        const button2 = this.add.image(buttonSpacing * 2 + buttonSize * 1.5, 600 / 2 + 600 / 3, 'blanco').setInteractive();
        button2.displayWidth = buttonSize;
        button2.displayHeight = buttonSize;
        button2.on('pointerdown', function () {
            if (button2Verification == true) {
                disableButtons();
                // console.log('Button 2 clicked');


                if (contadorAMetodo < 8) {
                    color = searchWordSem2(texto, array1, verde, rojo);
                }

                if (contadorAMetodo >= 8 && contadorAMetodo < 16) {
                    color = searchWordMl2(texto, array2, verde, rojo);
                }

                if (contadorAMetodo >= 16 && contadorAMetodo < 24) {
                    color = searchWordMf2(texto, array3, verde, rojo);
                }
                if (contadorAMetodo >= 24 && contadorAMetodo < 32) {
                    color = searchWordSem2(texto, array1, verde, rojo);
                }

                if (contadorAMetodo >= 32 && contadorAMetodo < 40) {
                    color = searchWordMl2(texto, array2, verde, rojo);
                }

                if (contadorAMetodo >= 40 && contadorAMetodo < 48) {
                    color = searchWordMf2(texto, array3, verde, rojo);
                }
                if (contadorAMetodo >= 48) {
                    console.log("---------- FIN DEL JUEGO ----------")
                }

                if (color != rojo) {
                    contadorAciertos++;
                    contadorAMetodo++;
                    contadorFMetodo = 0;
                } else {
                    contadorFallos++;
                    contadorFMetodo++;
                    if (Metodo == 1) {
                        contadorAMetodo = 0;
                    }
                    if (Metodo == 2) {
                        contadorAMetodo = 8;
                    }
                    if (Metodo == 3) {
                        contadorAMetodo = 16;
                    }
                    if (Metodo == 4) {
                        contadorAMetodo = 24;
                    }
                    if (Metodo == 5) {
                        contadorAMetodo = 32;
                    }
                    if (Metodo == 6) {
                        contadorAMetodo = 40;
                    }
                }

                if (contadorAMetodo < 8) {
                    Metodo = 1;
                }
                if (contadorAMetodo >= 8 && contadorAMetodo < 16) {
                    Metodo = 2;
                }
                if (contadorAMetodo >= 16 && contadorAMetodo < 24) {
                    Metodo = 3;
                }
                if (contadorAMetodo >= 24 && contadorAMetodo < 32) {
                    Metodo = 4;
                }
                if (contadorAMetodo >= 32 && contadorAMetodo < 40) {
                    Metodo = 5;
                }
                if (contadorAMetodo >= 40 && contadorAMetodo < 48) {
                    Metodo = 6;
                }



                button2.setTexture(color);
                //searchWord2(texto, array1);

                setTimeout(() => {
                    button2.setTexture(blanco);
                    styles = font(texto, array3);
                    text.text0.setFontFamily(styles);
                    texto = palabra(data);
                    text.text0.setText(texto);
                    enableButtons();

                }, 1000);

                console.log('------------------------------');

                console.log('Button 2 clicked');

                console.log('Texto ' + texto);
                console.log('Styles ' + styles);
                console.log('Color ' + color);

                console.log('Metodo de validación ' + Metodo);
                console.log('Contador Aciertos Metodo ' + contadorAMetodo);
                console.log('Contador Fallos Metodo ' + contadorFMetodo);

                console.log('Aciertos Totales ' + contadorAciertos);
                console.log('Fallos Totales ' + contadorFallos);

                console.log('------------------------------');

            }

        }, this);

        // Create the third button  
        const button3 = this.add.image(buttonSpacing * 3 + buttonSize * 2.5, 600 / 2 + 600 / 3, 'blanco').setInteractive();
        button3.displayWidth = buttonSize;
        button3.displayHeight = buttonSize;
        button3.on('pointerdown', function () {
            if (button3Verification == true) {
                disableButtons();

                if (contadorAMetodo < 8) {
                    color = searchWordSem3(texto, array1, verde, rojo);
                }

                if (contadorAMetodo >= 8 && contadorAMetodo < 16) {
                    color = searchWordMl3(texto, array2, verde, rojo);
                }

                if (contadorAMetodo >= 16 && contadorAMetodo < 24) {
                    color = searchWordMf3(texto, array3, verde, rojo);
                }
                if (contadorAMetodo >= 24 && contadorAMetodo < 32) {
                    color = searchWordSem3(texto, array1, verde, rojo);
                }

                if (contadorAMetodo >= 32 && contadorAMetodo < 40) {
                    color = searchWordMl3(texto, array2, verde, rojo);
                }

                if (contadorAMetodo >= 40 && contadorAMetodo < 48) {
                    color = searchWordMf3(texto, array3, verde, rojo);
                }
                if (contadorAMetodo >= 48) {
                    console.log("---------- FIN DEL JUEGO ----------")
                }

                if (color != rojo) {
                    contadorAciertos++;
                    contadorAMetodo++;
                    contadorFMetodo = 0;
                } else {
                    contadorFallos++;
                    contadorFMetodo++;
                    if (Metodo == 1) {
                        contadorAMetodo = 0;
                    }
                    if (Metodo == 2) {
                        contadorAMetodo = 8;
                    }
                    if (Metodo == 3) {
                        contadorAMetodo = 16;
                    }
                    if (Metodo == 4) {
                        contadorAMetodo = 24;
                    }
                    if (Metodo == 5) {
                        contadorAMetodo = 32;
                    }
                    if (Metodo == 6) {
                        contadorAMetodo = 40;
                    }
                }

                if (contadorAMetodo < 8) {
                    Metodo = 1;
                }
                if (contadorAMetodo >= 8 && contadorAMetodo < 16) {
                    Metodo = 2;
                }
                if (contadorAMetodo >= 16 && contadorAMetodo < 24) {
                    Metodo = 3;
                }
                if (contadorAMetodo >= 24 && contadorAMetodo < 32) {
                    Metodo = 4;
                }
                if (contadorAMetodo >= 32 && contadorAMetodo < 40) {
                    Metodo = 5;
                }
                if (contadorAMetodo >= 40 && contadorAMetodo < 48) {
                    Metodo = 6;
                }


                button3.setTexture(color);
                // searchWord3(texto, array1);

                setTimeout(() => {
                    button3.setTexture(blanco);
                    styles = font(texto, array3);
                    text.text0.setFontFamily(styles);

                    texto = palabra(data);
                    text.text0.setText(texto);
                    enableButtons();

                }, 1000);

                console.log('------------------------------');

                console.log('Button 3 clicked');

                console.log('Texto ' + texto);
                console.log('Styles ' + styles);
                console.log('Color ' + color);

                console.log('Metodo de validación ' + Metodo);
                console.log('Contador Aciertos Metodo ' + contadorAMetodo);
                console.log('Contador Fallos Metodo ' + contadorFMetodo);

                console.log('Aciertos Totales ' + contadorAciertos);
                console.log('Fallos Totales ' + contadorFallos);

                console.log('------------------------------');
            }

        }, this);


        // Create the fourth button  
        const button4 = this.add.image(buttonSpacing * 4 + buttonSize * 3.5, 600 / 2 + 600 / 3, 'blanco').setInteractive();
        button4.displayWidth = buttonSize;
        button4.displayHeight = buttonSize;
        button4.on('pointerdown', function () {
            if (button4Verification == true) {
                disableButtons();
                // console.log('Button 4 clicked');

                if (contadorAMetodo < 8) {
                    color = searchWordSem4(texto, array1, verde, rojo);
                }

                if (contadorAMetodo >= 8 && contadorAMetodo < 16) {
                    color = searchWordMl4(texto, array2, verde, rojo);
                }

                if (contadorAMetodo >= 16 && contadorAMetodo < 24) {
                    color = searchWordMf4(texto, array3, verde, rojo);
                }
                if (contadorAMetodo >= 24 && contadorAMetodo < 32) {
                    color = searchWordSem4(texto, array1, verde, rojo);
                }

                if (contadorAMetodo >= 32 && contadorAMetodo < 40) {
                    color = searchWordMl4(texto, array2, verde, rojo);
                }

                if (contadorAMetodo >= 40 && contadorAMetodo < 48) {
                    color = searchWordMf4(texto, array3, verde, rojo);
                }
                if (contadorAMetodo >= 48) {
                    console.log("---------- FIN DEL JUEGO ----------")
                }

                if (color != rojo) {
                    contadorAciertos++;
                    contadorAMetodo++;
                    contadorFMetodo = 0;
                } else {
                    contadorFallos++;
                    contadorFMetodo++;
                    if (Metodo == 1) {
                        contadorAMetodo = 0;
                    }
                    if (Metodo == 2) {
                        contadorAMetodo = 8;
                    }
                    if (Metodo == 3) {
                        contadorAMetodo = 16;
                    }
                    if (Metodo == 4) {
                        contadorAMetodo = 24;
                    }
                    if (Metodo == 5) {
                        contadorAMetodo = 32;
                    }
                    if (Metodo == 6) {
                        contadorAMetodo = 40;
                    }
                }

                if (contadorAMetodo < 8) {
                    Metodo = 1;
                }
                if (contadorAMetodo >= 8 && contadorAMetodo < 16) {
                    Metodo = 2;
                }
                if (contadorAMetodo >= 16 && contadorAMetodo < 24) {
                    Metodo = 3;
                }
                if (contadorAMetodo >= 24 && contadorAMetodo < 32) {
                    Metodo = 4;
                }
                if (contadorAMetodo >= 32 && contadorAMetodo < 40) {
                    Metodo = 5;
                }
                if (contadorAMetodo >= 40 && contadorAMetodo < 48) {
                    Metodo = 6;
                }

                button4.setTexture(color);

                // searchWord4(texto, array1);


                setTimeout(() => {
                    button4.setTexture(blanco);
                    styles = font(texto, array3);
                    text.text0.setFontFamily(styles);

                    texto = palabra(data);
                    text.text0.setText(texto);
                    enableButtons();

                }, 1000);

                console.log('------------------------------');

                console.log('Button 4 clicked');

                console.log('Texto ' + texto);
                console.log('Styles ' + styles);
                console.log('Color ' + color);

                console.log('Metodo de validación ' + Metodo);
                console.log('Contador Aciertos Metodo ' + contadorAMetodo);
                console.log('Contador Fallos Metodo ' + contadorFMetodo);

                console.log('Aciertos Totales ' + contadorAciertos);
                console.log('Fallos Totales ' + contadorFallos);

                console.log('------------------------------');

            }

        }, this);


        function enableButtons() {
            button1Verification = true;
            button2Verification = true;
            button3Verification = true;
            button4Verification = true;
        }

        function disableButtons() {
            button1Verification = false;
            button2Verification = false;
            button3Verification = false;
            button4Verification = false;
        }
    }
    async update() {

    }

}

function randomBetweenZeroAndThree() {
    const randomarray = Math.floor(Math.random() * 4);
    return randomarray;
}
function randomBetweenOneAndEight() {
    const randomNumber = Math.floor(Math.random() * 8) + 1;
    return randomNumber === 0 ? 1 : randomNumber;
}
function palabra(data) {
    let randomArray = randomBetweenZeroAndThree();
    let randomNumber = randomBetweenOneAndEight();
    let word = data.palabras.semantica[randomArray][randomNumber];
    //console.log(word);

    return word;

}


// -------------------------------------------------- VALIDATION semantica -------------------------------------------------- //

function searchWordSem1(texto, array1, verde, rojo) {

    for (let i = 0; i < array1.length; i++) {
        for (let j = 0; j < array1[i].length; j++) {
            if (texto.includes(array1[i][j])) {
                if (i == 0) {
                    // console.log("0");
                    return verde;

                } else if (i == 1) {
                    // console.log("1");
                    return rojo;

                } else if (i == 2) {
                    // console.log("2");
                    return rojo;

                } else {
                    // console.log("3");
                    return rojo;

                }
            }
        }
    }
}


function searchWordSem2(texto, array1, verde, rojo) {

    for (let i = 0; i < array1.length; i++) {
        for (let j = 0; j < array1[i].length; j++) {
            if (texto.includes(array1[i][j])) {
                if (i == 0) {
                    // console.log("0");
                    return rojo;

                } else if (i == 1) {
                    // console.log("1");
                    return verde;


                } else if (i == 2) {
                    // console.log("2");
                    return rojo;

                } else {
                    // console.log("3");
                    return rojo;

                }
            }
        }
    }
}

function searchWordSem3(texto, array1, verde, rojo) {

    for (let i = 0; i < array1.length; i++) {
        for (let j = 0; j < array1[i].length; j++) {
            if (texto.includes(array1[i][j])) {
                if (i == 0) {
                    // console.log("0");
                    return rojo;

                } else if (i == 1) {
                    // console.log("1");
                    return rojo;

                } else if (i == 2) {
                    // console.log("2");
                    return verde;

                } else {
                    // console.log("3");
                    return rojo;

                }
            }
        }
    }
}


function searchWordSem4(texto, array1, verde, rojo) {

    for (let i = 0; i < array1.length; i++) {
        for (let j = 0; j < array1[i].length; j++) {
            if (texto.includes(array1[i][j])) {
                if (i == 0) {
                    // console.log("0");
                    return rojo;

                } else if (i == 1) {
                    // console.log("1");
                    return rojo;

                } else if (i == 2) {
                    // console.log("2");
                    return rojo;

                } else {
                    // console.log("3");
                    return verde;

                }
            }
        }
    }
}


export default Tutorial2;