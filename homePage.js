class homePage extends Phaser.Scene {

    constructor() {
      super("bootGame");
    }

    preload() {
        // Load the background image
        this.load.image('background', 'assets/images/industry-bg.jpg');
        // Load the button image
        this.load.image('startButton', 'assets/images/play-button.png');
    }

    create() {
      // Add the background image
      this.add.image(400, 300, 'background');

      // Create a "Start" button and set its callback
      const startButton = this.add.image(400, 450, 'startButton').setInteractive();

      // Resize the button
      startButton.setScale(0.25); // Adjust the scale factor as needed

      // Handle button click event
      startButton.on('pointerdown', () => {
        this.scene.start("playGame");
      });


      // Make the scene fullscreen
      this.scale.startFullscreen();
    }

}
