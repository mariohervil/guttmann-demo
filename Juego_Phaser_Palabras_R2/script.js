import { SceneA } from './game.js';   // Importado de la clase Game
import { SceneB } from './game2.js';
import { Tutorial } from './tutorial.js';
import { Tutorial2 } from './tutorial2.js';


// Configuración del canvas del juego creando un contrctor nativo de Phaser
const config = {
    type: Phaser.AUTO,
    // width: 800,
    // height: 600,
    width: screen.width , // Le da el valor para la anchura del canvas
    height: screen.height , // Le da el valor para la altura del canvas
    backgroundColor: "FFFFFF", // Le da el color de fondo al canvas
    scene: [Tutorial,Tutorial2,SceneA,SceneB] // Le da el valor de la escena seteando la clase Game
    
}

new Phaser.Game(config);        // Exporta la configuración de la clase Phaser

