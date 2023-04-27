export class Tutorial extends Phaser.Scene {

    constructor() {
        super({ key: 'Tutorial' });
    }
    async preload() {
        this.load.image('blanco', 'img/blanco.jpg');
    }
    async create() {

        let x1 = screen.width / 3
        let x2 = screen.width / 5
        let x3 = screen.width / 2

        let y1 = screen.height / 5
        let y2 = screen.height / 3
        let y3 = screen.height / 2

        this.add.text(x1, y1 , 'Relacioname las palabras', {
            fill: "#000000",
            fontSize: '4em',
            origin: 0.5,
            align: 'center'
        });



        this.add.text(x2, y2 , 'Relaciona el color de arriba con uno de los colores de abajo', {
            fill: "#000000",
            fontSize: '2em',
            origin: 0.5,
            align: 'center'
        });

        const button5 = this.add.image(x3, y3, 'blanco').setInteractive();
        button5.displayWidth = 150;
        button5.displayHeight = 75;
        button5.on('pointerdown', function () {


            this.scene.start('SceneA');
            // this.scene.start('Tutorial2');

        }, this);
    }

    async update() {
        // config.setWidth = screen.width;
    }
}


export default Tutorial;