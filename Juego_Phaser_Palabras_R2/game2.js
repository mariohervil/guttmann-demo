
export class SceneB extends Phaser.Scene {

    constructor() {
        super({ key: 'SceneB' });
    }
    async preload() {
        this.load.image('blanco', 'img/blanco.jpg');

    }
    async create(datos) {
        const blanco = "blanco";
        const rojo = "rojo";


        this.add.text(350, 100, 'Metodo:'+ datos.metodo, { fill: "#000000", fontSize: '20px' });
        this.add.text(350, 150, 'Contador Aciertos:'+ datos.contadorA, { fill: "#000000", fontSize: '20px' });
        this.add.text(350, 200, 'Contador Fallos:'+ datos.contadorF, { fill: "#000000", fontSize: '20px' });
        this.add.text(350, 250, 'Contador Aciertos Totales:'+ datos.contadorAT, { fill: "#000000", fontSize: '20px' });
        this.add.text(350, 300, 'Contador Fallos Totales :'+ datos.contadorFT, { fill: "#000000", fontSize: '20px' });

            // Acceder a los datos pasados desde la escena de origen
            console.log(datos.metodo);
            console.log(datos.contadorA);
            console.log(datos.contadorF);
            console.log(datos.contadorAT);
            console.log(datos.contadorFT);


        const button5 = this.add.image(400, 500, 'blanco').setInteractive();
        button5.displayWidth = 100;
        button5.displayHeight = 50;
        button5.on('pointerdown', function () {


            location.reload();

            // this.scene.launch('SceneA');

            // this.scene.start('SceneA');
            // juego2();

        }, this);


        // this.add.text(100, 100, 'Haz clic para cargar la escena B', { fontSize: '32px', fill: '#000' });
        // this.input.on('pointerdown', function () {
        //     this.scene.launch('SceneA');
        //     this.scene.start('SceneA');
        // }, this);

        // this.scene.get('SceneA').events.once('create', this.onSceneACreate, this);


    }
    async update() {
        
    }
}


export default SceneB;
