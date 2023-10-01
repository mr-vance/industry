class gamePage extends Phaser.Scene {
    constructor() {
      super("playGame");
    }

    preload() {
        // Load the background image
        this.load.image('game-background', 'assets/images/game-bg.png');
        // Load the button image
        this.load.image('exitButton', 'assets/images/exit-button.png');
    }

    create() {
        // Get the width and height of the scene
        const sceneWidth = this.sys.game.config.width;
        const sceneHeight = this.sys.game.config.height;

        // Add the background image and set its scale to fit the scene
        const background = this.add.image(sceneWidth / 2, sceneHeight / 2, 'game-background');
        background.setScale(sceneWidth / background.width, sceneHeight / background.height);

        this.add.text(20, 20, "Playing game...", { fontSize: "25px", fill: "yellow" });

        // Create a "Start" button and set its callback
        const startButton = this.add.image(300, 450, 'exitButton').setInteractive();

        // Resize the button
        startButton.setScale(0.2); // Adjust the scale factor as needed

        // Handle button click event
        startButton.on('pointerdown', () => {
            this.scene.start("bootGame");
        });
    }
}
