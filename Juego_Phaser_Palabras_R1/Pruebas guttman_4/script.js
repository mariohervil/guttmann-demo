import { Game } from './game.js';   // Importado de la clase Game


// Configuración del canvas del juego creando un contrctor nativo de Phaser
const config = {
    type: Phaser.AUTO,              
    width: 800,                     // Le da el valor para la anchura del canvas
    height: 600,                    // Le da el valor para la altura del canvas
    backgroundColor: "FFFFFF",      // Le da el color de fondo al canvas
    scene: [Game]                   // Le da el valor de la escena seteando la clase Game
    
}

new Phaser.Game(config);        // Exporta la configuración de la clase Phaser

