class homePage extends Phaser.Scene {

    constructor() {
      super("bootGame");
    }

    preload() {
        // Load the background image
        this.load.image('home-background', 'assets/images/industry-bg.jpg');
        // Load the button image
        this.load.image('startButton', 'assets/images/play-button.png');
    }

    create() {
        // Get the width and height of the scene
        const sceneWidth = this.sys.game.config.width;
        const sceneHeight = this.sys.game.config.height;

        // Add the background image and set its scale to fit the scene
        const background = this.add.image(sceneWidth / 2, sceneHeight / 2, 'home-background');
        background.setScale(sceneWidth / background.width, sceneHeight / background.height);

        // Create a "Start" button and set its callback
        const startButton = this.add.image(300, 450, 'startButton').setInteractive();

        // Resize the button
        startButton.setScale(0.25); // Adjust the scale factor as needed

        // Handle button click event
        startButton.on('pointerdown', () => {
            this.scene.start("playGame");
        });

    }

}
