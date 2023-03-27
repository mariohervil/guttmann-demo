//exportado de la clase Phaser.Scene y extensión de esta creando una nueva llamada Game donde se creara la escena del juego
export class Game extends Phaser.Scene {

    // Creación del contructor llamando al contructor de la clase Phaser.Scene
    constructor() {
        super({ key: 'game' });
    }

    // Carga los assets que se usaran durante el juego usando una función nativa de Phaser
    async preload() {
        this.load.image('blanco', 'img/blanco.jpg');        // Carga de la imagen que dara el color blanco a los botones
        this.load.image('rojo', 'img/rojo.jpg');            // Carga de la imagen que dara el rojo a los botones
        this.load.image('verde', 'img/verde.jpg');          // Carga de la imagen que dara el verde a los botones

    }

    // Crea el entorno del juego usando una función nativa de Phaser
    async create() {

        // Declaración de las variables que se van a usar en las funciones 

        const palabras = await fetch("./json.json");            // Creación de la constante que llama al archivo del JSON llamado json.json
        const data = await palabras.json();                     // Creación de la constante que guarda el objeto del JSON

        const array1 = data.palabras.semantica;                 // Cración de la constante que guarda el array del JSON que le toca
        const array2 = data.palabras.empiezan_misma_letra;      // Cración de la constante que guarda el array del JSON que le toca
        const array3 = data.palabras.misma_fuente;              // Cración de la constante que guarda el array del JSON que le toca

        const blanco = "blanco";    // Constante que recoge el valor del preload del asset del color
        const rojo = "rojo";        // Constante que recoge el valor del preload del asset del color
        const verde = "verde";      // Constante que recoge el valor del preload del asset del color

        let contadorAciertos = 0;           // Contador de aciertos totales durante la partida
        let contadorFallos = 0;             // Contador de fallos totales durante la partida

        let contadorAMetodo = 0;            // Contador de los Aciertos seguidos en el metodo
        let contadorFMetodo = 0;            // Contador de los Fallos seguidos en el metodo

        let Metodo = 0;                     // Variable para almacenar el metodo en el que se encuentra el usuario

        let button1Verification = true;     // Seteo del booleano para poder habilitar o deshabilitar los botones
        let button2Verification = true;     // Seteo del booleano para poder habilitar o deshabilitar los botones
        let button3Verification = true;     // Seteo del booleano para poder habilitar o deshabilitar los botones
        let button4Verification = true;     // Seteo del booleano para poder habilitar o deshabilitar los botones

        let texto = palabra(data);          // Creación de la variable que recoje la palabra aletatoria
        let styles = font(texto, array3);   // Creación de la variable que le da el font-family a la palabra aletatoria

        let color;                          // Creación de la variable que da el color a los botones

        const text = {                      // Creación de la variables que generan un texto 
            text0: "",
            text1: "",
            text2: "",
            text3: "",
            text4: ""
        }



        
        // Calcula el espacio del botón en funcion del tamaño del canvas
        var buttonSize = Math.min(800, 600) * 0.2;      // MEJORAS: Cunado se haga responsive el canvas darle las variables de responsividad donde estan ahora el (800, 600)
        var buttonSpacing = buttonSize * 0.5;           // Genera valor que separa los botones



        // Creación de la palabra que va cambiando
        text.text0 = this.add.text(323, 100, texto, { fill: "#000000", fontFamily: styles, fontSize: '50px' });                   // MEJORAS: añadir las características de la palabra por variables para que ser puedan modificar facilmente en este caso COLOR y TAMAÑO de la palabra 

        // Creación del primer botón
        const button1 = this.add.image(buttonSpacing + buttonSize / 2, 600 / 2 + 600 / 3, 'blanco').setInteractive();             // Habilita que el botón sea pulsable haciendo uso de una función nativa de Phaser llamada setInteractive
        button1.displayWidth = buttonSize;          // Le da el valor para de tamaño recogiendo el valor de la variable declarada arriba
        button1.displayHeight = buttonSize;         // Le da el valor para de tamaño recogiendo el valor de la variable declarada arriba

        // Función de deteción de que el botón ha sido pulsado
        button1.on('pointerdown', function () {
            if (button1Verification == true) {

                // Llamada a la función para deshabilitar los botones temporalmente
                disableButtons();

                // Llamada a la función de búsqueda de la palabra en el array que toca mirando en que metodo de validadción se encuentra con el ContadorAMetodo
                if (contadorAMetodo < 8) {                                     // Validación de en que punto se encuentra el contador de aciertos del metodo para llamar a la función de validación de acierto pertinente
                    color = searchWordSem1(texto, array1, verde, rojo);
                }

                if (contadorAMetodo >= 8 && contadorAMetodo < 16) {             // Validación de en que punto se encuentra el contador de aciertos del metodo para llamar a la función de validación de acierto pertinente
                    color = searchWordMl1(texto, array2, verde, rojo);
                }

                if (contadorAMetodo >= 16 && contadorAMetodo < 24) {            // Validación de en que punto se encuentra el contador de aciertos del metodo para llamar a la función de validación de acierto pertinente
                    color = searchWordMf1(texto, array3, verde, rojo);
                }
                if (contadorAMetodo >= 24 && contadorAMetodo < 32) {            // Validación de en que punto se encuentra el contador de aciertos del metodo para llamar a la función de validación de acierto pertinente
                    color = searchWordSem1(texto, array1, verde, rojo);
                }

                if (contadorAMetodo >= 32 && contadorAMetodo < 40) {            // Validación de en que punto se encuentra el contador de aciertos del metodo para llamar a la función de validación de acierto pertinente
                    color = searchWordMl1(texto, array2, verde, rojo);
                }

                if (contadorAMetodo >= 40 && contadorAMetodo < 48) {            // Validación de en que punto se encuentra el contador de aciertos del metodo para llamar a la función de validación de acierto pertinente
                    color = searchWordMf1(texto, array3, verde, rojo);
                }
                if (contadorAMetodo >= 48) {
                    // MEJORAS: mostrar esto en una pantalla nueva junto con los resultados de la prueba
                    console.log("---------- FIN DEL JUEGO ----------")
                }

                // Comprobación de si el color de botón es distinto de ROJO para setear el contador de fallos a 0 y sumar 1 acierto a las funciones pertinentes
                if (color != rojo) {
                    contadorAciertos++;
                    contadorAMetodo++;
                    contadorFMetodo = 0;
                }

                // Reseteo del contador de Aciertos del metodo de validadción en el que esta y aumento del contador de errores del metodo de validadción en el que se encuentra
                else {
                    contadorFallos++;
                    contadorFMetodo++;
                    if (Metodo == 1) {
                        contadorAMetodo = 0;         // Creación de un checkpoint y resetea los aciertos del metodo a el momento en el que se ha empezado
                    }
                    if (Metodo == 2) {
                        contadorAMetodo = 8;        // Creación de un checkpoint y resetea los aciertos del metodo a el momento en el que se ha empezado
                    }
                    if (Metodo == 3) {
                        contadorAMetodo = 16;        // Creación de un checkpoint y resetea los aciertos del metodo a el momento en el que se ha empezado
                    }
                    if (Metodo == 4) {
                        contadorAMetodo = 24;        // Creación de un checkpoint y resetea los aciertos del metodo a el momento en el que se ha empezado
                    }
                    if (Metodo == 5) {
                        contadorAMetodo = 32;        // Creación de un checkpoint y resetea los aciertos del metodo a el momento en el que se ha empezado
                    }
                    if (Metodo == 6) {
                        contadorAMetodo = 40;        // Creación de un checkpoint y resetea los aciertos del metodo a el momento en el que se ha empezado
                    }
                }

                // Comprobaciones de los aciertos seguidos para cambiar en el metodo de validación automaticamente
                if (contadorAMetodo < 8) {                                  // Validadción de que los aciertos del metodo esten entre los valores para ese metodo para poder cambiar al siguiente metodo automaticamente
                    Metodo = 1;
                }
                if (contadorAMetodo >= 8 && contadorAMetodo < 16) {         // Validadción de que los aciertos del metodo esten entre los valores para ese metodo para poder cambiar al siguiente metodo automaticamente
                    Metodo = 2;
                }
                if (contadorAMetodo >= 16 && contadorAMetodo < 24) {        // Validadción de que los aciertos del metodo esten entre los valores para ese metodo para poder cambiar al siguiente metodo automaticamente
                    Metodo = 3;
                }
                if (contadorAMetodo >= 24 && contadorAMetodo < 32) {        // Validadción de que los aciertos del metodo esten entre los valores para ese metodo para poder cambiar al siguiente metodo automaticamente
                    Metodo = 4;
                }
                if (contadorAMetodo >= 32 && contadorAMetodo < 40) {        // Validadción de que los aciertos del metodo esten entre los valores para ese metodo para poder cambiar al siguiente metodo automaticamente
                    Metodo = 5;
                }
                if (contadorAMetodo >= 40 && contadorAMetodo < 48) {        // Validadción de que los aciertos del metodo esten entre los valores para ese metodo para poder cambiar al siguiente metodo automaticamente
                    Metodo = 6;
                }


                button1.setTexture(color);                  // Setea el color del botón usando una función nativa de Phaser llamada setTexture()

                // Contador para deshabilitar los botones durante un tiempo y mostrar el cambio de color en el boton, mientras se genera la nueva palabra
                setTimeout(() => {
                    button1.setTexture(blanco);             // Cambio de color del botón a color blanco
                    texto = palabra(data);                  // Llamada a la función palabra() para crear una nueva palabra aleatoria y la seta en la variable
                    styles = font(texto, array3);           // Llamada a la función font() para saber la font-family que le toca a la palabra randomizada
                    text.text0.setFontFamily(styles);       // Seteo de la fontFamily() que le toca a la palabra randomizada usando una llamada a la función fontFamily()                    
                    text.text0.setText(texto);              // Seteo de la nueva palabra usando una funcion nativa de Phaser
                    enableButtons();                        // Llamada a la funcion que habilita los botones

                }, 1000);

                // Consoles log para ver que se esten realizando validaciones y contando las acciones realizadas
                // MEJORAS: En un fututo mostrar-las en la pantalla final
                console.log('------------------------------');
                console.log('Metodo de validación ' + Metodo);
                console.log('Contador Aciertos Metodo ' + contadorAMetodo);
                console.log('Contador Fallos Metodo ' + contadorFMetodo);
                console.log('Aciertos Totales ' + contadorAciertos);
                console.log('Fallos Totales ' + contadorFallos);
                console.log('------------------------------');

            }


        });

        // Crea la palabra que va dentro del primer botón
        text.text1 = this.add.text(buttonSize / 1.2, 600 / 2 + 600 / 3, 'GEL', { fill: "#000000", fontFamily: "Matt McInerey" });      // MEJORAS: añadir las características de la palabra por variables para que ser puedan modificar facilmente

        // Crea el segundo botón
        const button2 = this.add.image(buttonSpacing * 2 + buttonSize * 1.5, 600 / 2 + 600 / 3, 'blanco').setInteractive();            // Habilita que el botón sea pulsable haciendo uso de una función nativa de Phaser llamada setInteractive
        button2.displayWidth = buttonSize;          // Le da el valor para de tamaño recogiendo el valor de la variable declarada arriba
        button2.displayHeight = buttonSize;         // Le da el valor para de tamaño recogiendo el valor de la variable declarada arriba

        // Función de deteción de que el botón ha sido pulsado
        button2.on('pointerdown', function () {
            if (button2Verification == true) {

                // Llamada a la función para deshabilitar los botones temporalmente
                disableButtons();

                // Llamada a la función de búsqueda de la palabra en el array que toca mirando en que metodo de validadción se encuentra con el ContadorAMetodo
                if (contadorAMetodo < 8) {                                     // Validación de en que punto se encuentra el contador de aciertos del metodo para llamar a la función de validación de acierto pertinente
                    color = searchWordSem2(texto, array1, verde, rojo);
                }

                if (contadorAMetodo >= 8 && contadorAMetodo < 16) {             // Validación de en que punto se encuentra el contador de aciertos del metodo para llamar a la función de validación de acierto pertinente
                    color = searchWordMl2(texto, array2, verde, rojo);
                }

                if (contadorAMetodo >= 16 && contadorAMetodo < 24) {            // Validación de en que punto se encuentra el contador de aciertos del metodo para llamar a la función de validación de acierto pertinente
                    color = searchWordMf2(texto, array3, verde, rojo);
                }
                if (contadorAMetodo >= 24 && contadorAMetodo < 32) {            // Validación de en que punto se encuentra el contador de aciertos del metodo para llamar a la función de validación de acierto pertinente
                    color = searchWordSem2(texto, array1, verde, rojo);
                }

                if (contadorAMetodo >= 32 && contadorAMetodo < 40) {            // Validación de en que punto se encuentra el contador de aciertos del metodo para llamar a la función de validación de acierto pertinente
                    color = searchWordMl2(texto, array2, verde, rojo);
                }

                if (contadorAMetodo >= 40 && contadorAMetodo < 48) {            // Validación de en que punto se encuentra el contador de aciertos del metodo para llamar a la función de validación de acierto pertinente
                    color = searchWordMf2(texto, array3, verde, rojo);
                }
                if (contadorAMetodo >= 48) {
                    // MEJORAS: mostrar esto en una pantalla nueva junto con los resultados de la prueba
                    console.log("---------- FIN DEL JUEGO ----------")
                }

                // Comprobación de si el color de botón es distinto de ROJO para setear el contador de fallos a 0 y sumar 1 acierto a las funciones pertinentes
                if (color != rojo) {
                    contadorAciertos++;
                    contadorAMetodo++;
                    contadorFMetodo = 0;
                } 
                
                // Reseteo del contador de Aciertos del metodo de validadción en el que esta y aumento del contador de errores del metodo de validadción en el que se encuentra
                else {
                    contadorFallos++;
                    contadorFMetodo++;
                    if (Metodo == 1) {
                        contadorAMetodo = 0;         // Creación de un checkpoint y resetea los aciertos del metodo a el momento en el que se ha empezado
                    }
                    if (Metodo == 2) {
                        contadorAMetodo = 8;         // Creación de un checkpoint y resetea los aciertos del metodo a el momento en el que se ha empezado
                    }
                    if (Metodo == 3) {
                        contadorAMetodo = 16;        // Creación de un checkpoint y resetea los aciertos del metodo a el momento en el que se ha empezado
                    }
                    if (Metodo == 4) {
                        contadorAMetodo = 24;        // Creación de un checkpoint y resetea los aciertos del metodo a el momento en el que se ha empezado
                    }
                    if (Metodo == 5) {
                        contadorAMetodo = 32;        // Creación de un checkpoint y resetea los aciertos del metodo a el momento en el que se ha empezado
                    }
                    if (Metodo == 6) {
                        contadorAMetodo = 40;        // Creación de un checkpoint y resetea los aciertos del metodo a el momento en el que se ha empezado
                    }
                }

                // Comprobaciones de los aciertos seguidos para cambiar en el metodo de validación automaticamente
                if (contadorAMetodo < 8) {                                  // Validadción de que los aciertos del metodo esten entre los valores para ese metodo para poder cambiar al siguiente metodo automaticamente
                    Metodo = 1;
                }
                if (contadorAMetodo >= 8 && contadorAMetodo < 16) {         // Validadción de que los aciertos del metodo esten entre los valores para ese metodo para poder cambiar al siguiente metodo automaticamente
                    Metodo = 2;
                }
                if (contadorAMetodo >= 16 && contadorAMetodo < 24) {        // Validadción de que los aciertos del metodo esten entre los valores para ese metodo para poder cambiar al siguiente metodo automaticamente
                    Metodo = 3;
                }
                if (contadorAMetodo >= 24 && contadorAMetodo < 32) {        // Validadción de que los aciertos del metodo esten entre los valores para ese metodo para poder cambiar al siguiente metodo automaticamente
                    Metodo = 4;
                }
                if (contadorAMetodo >= 32 && contadorAMetodo < 40) {        // Validadción de que los aciertos del metodo esten entre los valores para ese metodo para poder cambiar al siguiente metodo automaticamente
                    Metodo = 5;
                }
                if (contadorAMetodo >= 40 && contadorAMetodo < 48) {        // Validadción de que los aciertos del metodo esten entre los valores para ese metodo para poder cambiar al siguiente metodo automaticamente
                    Metodo = 6;
                }



                button2.setTexture(color);                  // Setea el color del botón usando una función nativa de Phaser llamada setTexture()

                // Contador para deshabilitar los botones durante un tiempo y mostrar el cambio de color en el boton, mientras se genera la nueva palabra
                setTimeout(() => {
                    button2.setTexture(blanco);             // Cambio de color del botón a color blanco
                    texto = palabra(data);                  // Llamada a la función palabra() para crear una nueva palabra aleatoria y la seta en la variable
                    styles = font(texto, array3);           // Llamada a la función font() para saber la font-family que le toca a la palabra randomizada
                    text.text0.setFontFamily(styles);       // Seteo de la fontFamily() que le toca a la palabra randomizada usando una llamada a la función fontFamily()                    
                    text.text0.setText(texto);              // Seteo de la nueva palabra usando una funcion nativa de Phaser
                    enableButtons();                        // Llamada a la funcion que habilita los botones

                }, 1000);

                // Consoles log para ver que se esten realizando validaciones y contando las acciones realizadas
                // MEJORAS: En un fututo mostrar-las en la pantalla final
                console.log('------------------------------');
                console.log('Metodo de validación ' + Metodo);
                console.log('Contador Aciertos Metodo ' + contadorAMetodo);
                console.log('Contador Fallos Metodo ' + contadorFMetodo);
                console.log('Aciertos Totales ' + contadorAciertos);
                console.log('Fallos Totales ' + contadorFallos);
                console.log('------------------------------');

            }

        });

        // Crea la palabra que va dentro del segundo botón
        text.text2 = this.add.text(buttonSize * 2.35, 600 / 2 + 600 / 3, 'RANA', { fill: "#000000", fontFamily: "Fresco" });      // MEJORAS: añadir las características de la palabra por variables para que ser puedan modificar facilmente

        // Crea el tercer botón
        const button3 = this.add.image(buttonSpacing * 3 + buttonSize * 2.5, 600 / 2 + 600 / 3, 'blanco').setInteractive();       // Habilita que el botón sea pulsable haciendo uso de una función nativa de Phaser llamada setInteractive
        button3.displayWidth = buttonSize;          // Le da el valor para de tamaño recogiendo el valor de la variable declarada arriba
        button3.displayHeight = buttonSize;         // Le da el valor para de tamaño recogiendo el valor de la variable declarada arriba

        // Función de deteción de que el botón ha sido pulsado
        button3.on('pointerdown', function () {
            if (button3Verification == true) {

                // Llamada a la función para deshabilitar los botones temporalmente
                disableButtons();

                // Llamada a la función de búsqueda de la palabra en el array que toca mirando en que metodo de validadción se encuentra con el ContadorAMetodo
                if (contadorAMetodo < 8) {                                     // Validación de en que punto se encuentra el contador de aciertos del metodo para llamar a la función de validación de acierto pertinente
                    color = searchWordSem3(texto, array1, verde, rojo);
                }

                if (contadorAMetodo >= 8 && contadorAMetodo < 16) {             // Validación de en que punto se encuentra el contador de aciertos del metodo para llamar a la función de validación de acierto pertinente
                    color = searchWordMl3(texto, array2, verde, rojo);
                }

                if (contadorAMetodo >= 16 && contadorAMetodo < 24) {            // Validación de en que punto se encuentra el contador de aciertos del metodo para llamar a la función de validación de acierto pertinente
                    color = searchWordMf3(texto, array3, verde, rojo);
                }
                if (contadorAMetodo >= 24 && contadorAMetodo < 32) {            // Validación de en que punto se encuentra el contador de aciertos del metodo para llamar a la función de validación de acierto pertinente
                    color = searchWordSem3(texto, array1, verde, rojo);
                }

                if (contadorAMetodo >= 32 && contadorAMetodo < 40) {            // Validación de en que punto se encuentra el contador de aciertos del metodo para llamar a la función de validación de acierto pertinente
                    color = searchWordMl3(texto, array2, verde, rojo);
                }

                if (contadorAMetodo >= 40 && contadorAMetodo < 48) {            // Validación de en que punto se encuentra el contador de aciertos del metodo para llamar a la función de validación de acierto pertinente
                    color = searchWordMf3(texto, array3, verde, rojo);
                }
                if (contadorAMetodo >= 48) {
                    // MEJORAS: mostrar esto en una pantalla nueva junto con los resultados de la prueba
                    console.log("---------- FIN DEL JUEGO ----------")
                }

                // Comprobación de si el color de botón es distinto de ROJO para setear el contador de fallos a 0 y sumar 1 acierto a las funciones pertinentes
                if (color != rojo) {
                    contadorAciertos++;
                    contadorAMetodo++;
                    contadorFMetodo = 0;
                } 
                
                // Reseteo del contador de Aciertos del metodo de validadción en el que esta y aumento del contador de errores del metodo de validadción en el que se encuentra
                else {
                    contadorFallos++;
                    contadorFMetodo++;
                    if (Metodo == 1) {
                        contadorAMetodo = 0;         // Creación de un checkpoint y resetea los aciertos del metodo a el momento en el que se ha empezado
                    }
                    if (Metodo == 2) {
                        contadorAMetodo = 8;         // Creación de un checkpoint y resetea los aciertos del metodo a el momento en el que se ha empezado
                    }
                    if (Metodo == 3) {
                        contadorAMetodo = 16;        // Creación de un checkpoint y resetea los aciertos del metodo a el momento en el que se ha empezado
                    }
                    if (Metodo == 4) {
                        contadorAMetodo = 24;        // Creación de un checkpoint y resetea los aciertos del metodo a el momento en el que se ha empezado
                    }
                    if (Metodo == 5) {
                        contadorAMetodo = 32;        // Creación de un checkpoint y resetea los aciertos del metodo a el momento en el que se ha empezado
                    }
                    if (Metodo == 6) {
                        contadorAMetodo = 40;        // Creación de un checkpoint y resetea los aciertos del metodo a el momento en el que se ha empezado
                    }
                }

                // Comprobaciones de los aciertos seguidos para cambiar en el metodo de validación automaticamente
                if (contadorAMetodo < 8) {                                  // Validadción de que los aciertos del metodo esten entre los valores para ese metodo para poder cambiar al siguiente metodo automaticamente
                    Metodo = 1;
                }
                if (contadorAMetodo >= 8 && contadorAMetodo < 16) {         // Validadción de que los aciertos del metodo esten entre los valores para ese metodo para poder cambiar al siguiente metodo automaticamente
                    Metodo = 2;
                }
                if (contadorAMetodo >= 16 && contadorAMetodo < 24) {        // Validadción de que los aciertos del metodo esten entre los valores para ese metodo para poder cambiar al siguiente metodo automaticamente
                    Metodo = 3;
                }
                if (contadorAMetodo >= 24 && contadorAMetodo < 32) {        // Validadción de que los aciertos del metodo esten entre los valores para ese metodo para poder cambiar al siguiente metodo automaticamente
                    Metodo = 4;
                }
                if (contadorAMetodo >= 32 && contadorAMetodo < 40) {        // Validadción de que los aciertos del metodo esten entre los valores para ese metodo para poder cambiar al siguiente metodo automaticamente
                    Metodo = 5;
                }
                if (contadorAMetodo >= 40 && contadorAMetodo < 48) {        // Validadción de que los aciertos del metodo esten entre los valores para ese metodo para poder cambiar al siguiente metodo automaticamente
                    Metodo = 6;
                }


                button3.setTexture(color);                  // Setea el color del botón usando una función nativa de Phaser llamada setTexture()

                // Contador para deshabilitar los botones durante un tiempo y mostrar el cambio de color en el boton, mientras se genera la nueva palabra
                setTimeout(() => {
                    button3.setTexture(blanco);             // Cambio de color del botón a color blanco           
                    texto = palabra(data);                  // Llamada a la función palabra() para crear una nueva palabra aleatoria y la seta en la variable
                    styles = font(texto, array3);           // Llamada a la función font() para saber la font-family que le toca a la palabra randomizada           
                    text.text0.setFontFamily(styles);       // Seteo de la fontFamily() que le toca a la palabra randomizada usando una llamada a la función fontFamily()
                    text.text0.setText(texto);              // Seteo de la nueva palabra usando una funcion nativa de Phaser
                    enableButtons();                        // Llamada a la funcion que habilita los botones

                }, 1000);

                // Consoles log para ver que se esten realizando validaciones y contando las acciones realizadas
                // MEJORAS: En un fututo mostrar-las en la pantalla final
                console.log('------------------------------');
                console.log('Metodo de validación ' + Metodo);
                console.log('Contador Aciertos Metodo ' + contadorAMetodo);
                console.log('Contador Fallos Metodo ' + contadorFMetodo);
                console.log('Aciertos Totales ' + contadorAciertos);
                console.log('Fallos Totales ' + contadorFallos);
                console.log('------------------------------');
            }

        });

        // Crea la palabra que va dentro del tercer botón
        text.text3 = this.add.text((buttonSize * 3.76), 600 / 2 + 600 / 3, 'CEREZA', { fill: "#000000", fontFamily: "Flamenco" });      // MEJORAS: añadir las características de la palabra por variables para que ser puedan modificar facilmente

        // Crea el quarto botón
        const button4 = this.add.image(buttonSpacing * 4 + buttonSize * 3.5, 600 / 2 + 600 / 3, 'blanco').setInteractive();             // hHabilita que el botón sea pulsable haciendo uso de una función nativa de Phaser llamada setInteractive
        button4.displayWidth = buttonSize;          // Le da el valor para de tamaño recogiendo el valor de la variable declarada arriba
        button4.displayHeight = buttonSize;         // Le da el valor para de tamaño recogiendo el valor de la variable declarada arriba

        // Función de deteción de que el botón ha sido pulsado
        button4.on('pointerdown', function () {
            if (button4Verification == true) {

            // Llamada a la función para deshabilitar los botones temporalmente
                disableButtons();

            // Llamada a la función de búsqueda de la palabra en el array que toca mirando en que metodo de validadción se encuentra con el ContadorAMetodo
                if (contadorAMetodo < 8) {                                     // Validación de en que punto se encuentra el contador de aciertos del metodo para llamar a la función de validación de acierto pertinente
                    color = searchWordSem4(texto, array1, verde, rojo);
                }

                if (contadorAMetodo >= 8 && contadorAMetodo < 16) {            // Validación de en que punto se encuentra el contador de aciertos del metodo para llamar a la función de validación de acierto pertinente
                    color = searchWordMl4(texto, array2, verde, rojo);
                }

                if (contadorAMetodo >= 16 && contadorAMetodo < 24) {            // Validación de en que punto se encuentra el contador de aciertos del metodo para llamar a la función de validación de acierto pertinente
                    color = searchWordMf4(texto, array3, verde, rojo);
                }
                if (contadorAMetodo >= 24 && contadorAMetodo < 32) {            // Validación de en que punto se encuentra el contador de aciertos del metodo para llamar a la función de validación de acierto pertinente
                    color = searchWordSem4(texto, array1, verde, rojo);
                }

                if (contadorAMetodo >= 32 && contadorAMetodo < 40) {            // Validación de en que punto se encuentra el contador de aciertos del metodo para llamar a la función de validación de acierto pertinente
                    color = searchWordMl4(texto, array2, verde, rojo);
                }

                if (contadorAMetodo >= 40 && contadorAMetodo < 48) {            // Validación de en que punto se encuentra el contador de aciertos del metodo para llamar a la función de validación de acierto pertinente
                    color = searchWordMf4(texto, array3, verde, rojo);
                }
                if (contadorAMetodo >= 48) {

                // MEJORAS: mostrar esto en una pantalla nueva junto con los resultados de la prueba
                    console.log("---------- FIN DEL JUEGO ----------")
                }

                // Comprobación de si el color de botón es distinto de ROJO para setear el contador de fallos a 0 y sumar 1 acierto a las funciones pertinentes
                if (color != rojo) {
                    contadorAciertos++;
                    contadorAMetodo++;
                    contadorFMetodo = 0;
                } 

                // Reseteo del contador de Aciertos del metodo de validadción en el que esta y aumento del contador de errores del metodo de validadción en el que se encuentra
                else {
                    contadorFallos++;
                    contadorFMetodo++;
                    if (Metodo == 1) {
                        contadorAMetodo = 0;
                    }
                    if (Metodo == 2) {
                        contadorAMetodo = 8;         // Creación de un checkpoint y resetea los aciertos del metodo a el momento en el que se ha empezado 
                    }
                    if (Metodo == 3) {
                        contadorAMetodo = 16;        // Creación de un checkpoint y resetea los aciertos del metodo a el momento en el que se ha empezado
                    }
                    if (Metodo == 4) {
                        contadorAMetodo = 24;        // Creación de un checkpoint y resetea los aciertos del metodo a el momento en el que se ha empezado
                    }
                    if (Metodo == 5) {
                        contadorAMetodo = 32;        // Creación de un checkpoint y resetea los aciertos del metodo a el momento en el que se ha empezado
                    }
                    if (Metodo == 6) {
                        contadorAMetodo = 40;        // Creación de un checkpoint y resetea los aciertos del metodo a el momento en el que se ha empezado
                    }
                }

                // Comprobaciones de los aciertos seguidos para cambiar en el metodo de validación automaticamente
                if (contadorAMetodo < 8) {                                  // Validadción de que los aciertos del metodo esten entre los valores para ese metodo para poder cambiar al siguiente metodo automaticamente
                    Metodo = 1;
                }
                if (contadorAMetodo >= 8 && contadorAMetodo < 16) {         // Validadción de que los aciertos del metodo esten entre los valores para ese metodo para poder cambiar al siguiente metodo automaticamente
                    Metodo = 2;
                }
                if (contadorAMetodo >= 16 && contadorAMetodo < 24) {        // Validadción de que los aciertos del metodo esten entre los valores para ese metodo para poder cambiar al siguiente metodo automaticamente
                    Metodo = 3;
                }
                if (contadorAMetodo >= 24 && contadorAMetodo < 32) {        // Validadción de que los aciertos del metodo esten entre los valores para ese metodo para poder cambiar al siguiente metodo automaticamente
                    Metodo = 4;
                }
                if (contadorAMetodo >= 32 && contadorAMetodo < 40) {        // Validadción de que los aciertos del metodo esten entre los valores para ese metodo para poder cambiar al siguiente metodo automaticamente
                    Metodo = 5;
                }
                if (contadorAMetodo >= 40 && contadorAMetodo < 48) {        // Validadción de que los aciertos del metodo esten entre los valores para ese metodo para poder cambiar al siguiente metodo automaticamente
                    Metodo = 6;
                }

                button4.setTexture(color);                  // Setea el color del botón usando una función nativa de Phaser llamada setTexture()

                // Contador para deshabilitar los botones durante un tiempo y mostrar el cambio de color en el boton, mientras se genera la nueva palabra
                setTimeout(() => {
                    button4.setTexture(blanco);             // Cambio de color del botón a color blanco
                    texto = palabra(data);                  // Llamada a la función palabra() para crear una nueva palabra aleatoria y la seta en la variable
                    styles = font(texto, array3);           // Llamada a la función font() para saber la font-family que le toca a la palabra randomizada
                    text.text0.setFontFamily(styles);       // Seteo de la fontFamily() que le toca a la palabra randomizada usando una llamada a la función fontFamily()
                    text.text0.setText(texto);              // Seteo de la nueva palabra usando una funcion nativa de Phaser
                    enableButtons();                        // Llamada a la funcion que habilita los botones

                }, 1000);

                // Consoles log para ver que se esten realizando validaciones y contando las acciones realizadas
                // MEJORAS: En un fututo mostrar-las en la pantalla final
                console.log('------------------------------');
                console.log('Metodo de validación ' + Metodo);
                console.log('Contador Aciertos Metodo ' + contadorAMetodo);
                console.log('Contador Fallos Metodo ' + contadorFMetodo);
                console.log('Aciertos Totales ' + contadorAciertos);
                console.log('Fallos Totales ' + contadorFallos);
                console.log('------------------------------');

            }

        });

        // Crea la palabra que va dentro del quarto botón
        text.text4 = this.add.text((buttonSize * 5.1), 600 / 2 + 600 / 3, 'EQUITACÍON', { fill: "#000000", fontFamily: "Patrick Hand" });



        // Funcion para habilitar los botones
        function enableButtons() {
            button1Verification = true;
            button2Verification = true;
            button3Verification = true;
            button4Verification = true;
        }

        // Funcion para deshabilitar los botones
        function disableButtons() {
            button1Verification = false;
            button2Verification = false;
            button3Verification = false;
            button4Verification = false;
        }
    }
}

// Funcion para generar un numero aleatorio entre el 0 y el 3
function randomBetweenZeroAndThree() {
    const randomarray = Math.floor(Math.random() * 4);
    return randomarray;
}

// Funcion para generar un numero aleatorio entre el 1 y el 8
function randomBetweenOneAndEight() {
    const randomNumber = Math.floor(Math.random() * 8) + 1;
    return randomNumber === 0 ? 1 : randomNumber;
}

// Funcion que recoje los numeros aleatorios y extrae la palabra del JSON usando la palabra
function palabra(data) {
    let randomArray = randomBetweenZeroAndThree();
    let randomNumber = randomBetweenOneAndEight();
    let word = data.palabras.semantica[randomArray][randomNumber];
    return word;

}


// -------------------------------------------------- VALIDATION semantica -------------------------------------------------- //

// Función para validar si la palabra aleatoria y la del botón1 que se ha pulsado estan en el mismo Array para validar si es correcta la respuesta
function searchWordSem1(texto, array1, verde, rojo) {
    for (let i = 0; i < array1.length; i++) {
        for (let j = 0; j < array1[i].length; j++) {
            if (texto.includes(array1[i][j])) {     // comprueba que la palabra se encuentre dentro del array
                if (i == 0) {
                    return verde;       // cambio de color del botón
                } else if (i == 1) {
                    return rojo;        // cambio de color del botón
                } else if (i == 2) {
                    return rojo;        // cambio de color del botón
                } else {
                    return rojo;        // cambio de color del botón
                }
            }
        }
    }
}

// Función para validar si la palabra aleatoria y la del botón2 que se ha pulsado estan en el mismo Array para validar si es correcta la respuesta
function searchWordSem2(texto, array1, verde, rojo) {
    for (let i = 0; i < array1.length; i++) {
        for (let j = 0; j < array1[i].length; j++) {
            if (texto.includes(array1[i][j])) {     // comprueba que la palabra se encuentre dentro del array
                if (i == 0) {
                    return rojo;        // cambio de color del botón
                } else if (i == 1) {
                    return verde;       // cambio de color del botón
                } else if (i == 2) {
                    return rojo;        // cambio de color del botón
                } else {
                    return rojo;        // cambio de color del botón
                }
            }
        }
    }
}

// Función para validar si la palabra aleatoria y la del botón3 que se ha pulsado estan en el mismo Array para validar si es correcta la respuesta
function searchWordSem3(texto, array1, verde, rojo) {
    for (let i = 0; i < array1.length; i++) {
        for (let j = 0; j < array1[i].length; j++) {
            if (texto.includes(array1[i][j])) {     // comprueba que la palabra se encuentre dentro del array
                if (i == 0) {
                    return rojo;        // cambio de color del botón
                } else if (i == 1) {
                    return rojo;        // cambio de color del botón
                } else if (i == 2) {
                    return verde;       // cambio de color del botón
                } else {
                    return rojo;        // cambio de color del botón
                }
            }
        }
    }
}

// Función para validar si la palabra aleatoria y la del botón4 que se ha pulsado estan en el mismo Array para validar si es correcta la respuesta
function searchWordSem4(texto, array1, verde, rojo) {
    for (let i = 0; i < array1.length; i++) {
        for (let j = 0; j < array1[i].length; j++) {
            if (texto.includes(array1[i][j])) {     // comprueba que la palabra se encuentre dentro del array
                if (i == 0) {
                    return rojo;         // cambio de color del botón
                } else if (i == 1) {
                    return rojo;         // cambio de color del botón
                } else if (i == 2) {
                    return rojo;         // cambio de color del botón
                } else {
                    return verde;        // cambio de color del botón
                }
            }
        }
    }
}


// -------------------------------------------------- VALIDATION empiezan_misma_letra -------------------------------------------------- // 

// Función para validar si la palabra aleatoria y la del botón1 que se ha pulsado estan en el mismo Array para validar si es correcta la respuesta
function searchWordMl1(texto, array2, verde, rojo) {
    for (let i = 0; i < array2.length; i++) {
        for (let j = 0; j < array2[i].length; j++) {
            if (texto.includes(array2[i][j])) {     // comprueba que la palabra se encuentre dentro del array
                if (i == 0) {
                    return verde;       // cambio de color del botón
                } else if (i == 1) {
                    return rojo;        // cambio de color del botón
                } else if (i == 2) {
                    return rojo;        // cambio de color del botón
                } else {
                    return rojo;        // cambio de color del botón
                }
            }
        }
    }
}

// Función para validar si la palabra aleatoria y la del botón2 que se ha pulsado estan en el mismo Array para validar si es correcta la respuesta
function searchWordMl2(texto, array2, verde, rojo) {
    for (let i = 0; i < array2.length; i++) {
        for (let j = 0; j < array2[i].length; j++) {
            if (texto.includes(array2[i][j])) {     // comprueba que la palabra se encuentre dentro del array
                if (i == 0) {
                    return rojo;        // cambio de color del botón
                } else if (i == 1) {
                    return verde;       // cambio de color del botón
                } else if (i == 2) {
                    return rojo;        // cambio de color del botón
                } else {
                    return rojo;        // cambio de color del botón
                }
            }
        }
    }
}

// Función para validar si la palabra aleatoria y la del botón3 que se ha pulsado estan en el mismo Array para validar si es correcta la respuesta
function searchWordMl3(texto, array2, verde, rojo) {
    for (let i = 0; i < array2.length; i++) {
        for (let j = 0; j < array2[i].length; j++) {
            if (texto.includes(array2[i][j])) {     // comprueba que la palabra se encuentre dentro del array
                if (i == 0) {
                    return rojo;        // cambio de color del botón
                } else if (i == 1) {
                    return rojo;        // cambio de color del botón
                } else if (i == 2) {
                    return verde;       // cambio de color del botón
                } else {
                    return rojo;        // cambio de color del botón
                }
            }
        }
    }
}

// Función para validar si la palabra aleatoria y la del botón4 que se ha pulsado estan en el mismo Array para validar si es correcta la respuesta
function searchWordMl4(texto, array2, verde, rojo) {
    for (let i = 0; i < array2.length; i++) {
        for (let j = 0; j < array2[i].length; j++) {
            if (texto.includes(array2[i][j])) {     // comprueba que la palabra se encuentre dentro del array
                if (i == 0) {
                    return rojo;        // cambio de color del botón
                } else if (i == 1) {
                    return rojo;        // cambio de color del botón
                } else if (i == 2) {
                    return rojo;        // cambio de color del botón
                } else {
                    return verde;       // cambio de color del botón
                }
            }
        }
    }
}

// -------------------------------------------------- VALIDATION misma_fuente -------------------------------------------------- // 

// Función para validar si la palabra aleatoria y la del botón1 que se ha pulsado estan en el mismo Array para validar si es correcta la respuesta
function searchWordMf1(texto, array3, verde, rojo) {
    for (let i = 0; i < array3.length; i++) {
        for (let j = 0; j < array3[i].length; j++) {
            if (texto.includes(array3[i][j])) {     // comprueba que la palabra se encuentre dentro del array
                if (i == 0) {
                    return verde;        // cambio de color del botón
                } else if (i == 1) {
                    return rojo;        // cambio de color del botón
                } else if (i == 2) {
                    return rojo;        // cambio de color del botón
                } else {
                    return rojo;        // cambio de color del botón
                }
            }
        }
    }
}

// Función para validar si la palabra aleatoria y la del botón2 que se ha pulsado estan en el mismo Array para validar si es correcta la respuesta
function searchWordMf2(texto, array3, verde, rojo) {
    for (let i = 0; i < array3.length; i++) {
        for (let j = 0; j < array3[i].length; j++) {
            if (texto.includes(array3[i][j])) {     // comprueba que la palabra se encuentre dentro del array
                if (i == 0) {
                    return rojo;        // cambio de color del botón
                } else if (i == 1) {
                    return verde;       // cambio de color del botón
                } else if (i == 2) {
                    return rojo;        // cambio de color del botón
                } else {
                    return rojo;        // cambio de color del botón
                }
            }
        }
    }
}

// Función para validar si la palabra aleatoria y la del botón3 que se ha pulsado estan en el mismo Array para validar si es correcta la respuesta
function searchWordMf3(texto, array3, verde, rojo) {
    for (let i = 0; i < array3.length; i++) {
        for (let j = 0; j < array3[i].length; j++) {
            if (texto.includes(array3[i][j])) {     // comprueba que la palabra se encuentre dentro del array
                if (i == 0) {
                    return rojo;        // cambio de color del botón
                } else if (i == 1) {
                    return rojo;        // cambio de color del botón
                } else if (i == 2) {
                    return verde;       // cambio de color del botón
                } else {
                    return rojo;        // cambio de color del botón
                }
            }
        }
    }
}

// Función para validar si la palabra aleatoria y la del botón4 que se ha pulsado estan en el mismo Array para validar si es correcta la respuesta
function searchWordMf4(texto, array3, verde, rojo) {
    for (let i = 0; i < array3.length; i++) {
        for (let j = 0; j < array3[i].length; j++) {
            if (texto.includes(array3[i][j])) {     // comprueba que la palabra se encuentre dentro del array
                if (i == 0) {
                    return rojo;        // cambio de color del botón
                } else if (i == 1) {
                    return rojo;        // cambio de color del botón
                } else if (i == 2) {
                    return rojo;        // cambio de color del botón
                } else {
                    return verde;       // cambio de color del botón
                }
            }
        }
    }
}



// -------------------------------------------------- cambiar fuente -------------------------------------------------- // 

// Función que se encarga de darle la font-family que le pertenece a cada palabra
function font(texto, array3) {
    let style;
    for (let i = 0; i < array3.length; i++) {
        for (let j = 0; j < array3[i].length; j++) {
            if (texto.includes(array3[i][j])) {     // Comprueba que la palabra se encuentre dentro del array
                if (i == 0) {
                    style = "Matt McInerey";        // Nombre de la font-family que se importa de la archivo fontLoader.js
                    return style;
                } else if (i == 1) {
                    style = "Fresco";               // Nombre de la font-family que se importa de la archivo fontLoader.js
                    return style;
                } else if (i == 2) {
                    style = "Flamenco";             // Nombre de la font-family que se importa de la archivo fontLoader.js
                    return style;
                } else {
                    style = "Patrick Hand";         // Nombre de la font-family que se importa de la archivo fontLoader.js
                    return style;
                }
            }
        }
    }
}
