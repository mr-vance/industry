class gamePage extends Phaser.Scene {
    constructor() {
      super("playGame");
    }

    preload() {
        // Load the background image
        this.load.image('game-background', 'assets/images/game-bg.png');
        // Load the images for the quiz options
        this.load.image('tyre', 'assets/images/palm.png');
        this.load.image('engine', 'assets/images/snow.png');
        this.load.image('fish', 'assets/images/pink.png');
        // Load the button image
        this.load.image('validateButton', 'assets/images/finish-button.png');
        this.load.image('exitButton', 'assets/images/exit-button.png');
    }

    create() {
        // Get the width and height of the scene
        const sceneWidth = this.sys.game.config.width;
        const sceneHeight = this.sys.game.config.height;

        // Add the background image and set its scale to fit the scene
        const background = this.add.image(sceneWidth / 2, sceneHeight / 2, 'game-background');
        background.setScale(sceneWidth / background.width, sceneHeight / background.height);

        // Create the quiz options as images
        const tyre = this.add.image(200, 300, 'tyre').setInteractive();
        const engine = this.add.image(400, 300, 'engine').setInteractive();
        const fish = this.add.image(600, 300, 'fish').setInteractive();

        // Create an array to keep track of selected options
        const selectedOptions = [];

        // Handle option click events
        tyre.on('pointerdown', () => {
            // Toggle selection
            if (selectedOptions.includes('tyre')) {
                selectedOptions.splice(selectedOptions.indexOf('tyre'), 1);
                tyre.clearTint();
            } else {
                selectedOptions.push('tyre');
                tyre.setTint(0x00ff00); // Highlight selected option
            }
        });

        engine.on('pointerdown', () => {
            // Toggle selection
            if (selectedOptions.includes('engine')) {
                selectedOptions.splice(selectedOptions.indexOf('engine'), 1);
                engine.clearTint();
            } else {
                selectedOptions.push('engine');
                engine.setTint(0x00ff00); // Highlight selected option
            }
        });

        fish.on('pointerdown', () => {
            // Toggle selection
            if (selectedOptions.includes('fish')) {
                selectedOptions.splice(selectedOptions.indexOf('fish'), 1);
                fish.clearTint();
            } else {
                selectedOptions.push('fish');
                fish.setTint(0x00ff00); // Highlight selected option
            }
        });

        // Create a "Validate" button and set its callback
        const validateButton = this.add.image(400, 450, 'validateButton').setInteractive();

        // Resize the button
        validateButton.setScale(0.2); // Adjust the scale factor as needed

        // Handle button click event to validate the answer
        validateButton.on('pointerdown', () => {
            // Check if the selected options are correct (tyre and engine)
            const correctOptions = ['tyre', 'engine'];
            const isCorrect = selectedOptions.sort().toString() === correctOptions.sort().toString();

            // Display a message based on the answer
            if (isCorrect) {
                console.log('Correct! You can manufacture a car with a tyre and an engine.');
            } else {
                console.log('Incorrect! Check your selections.');
            }
        });

        // Create an "Exit" button and set its callback
        const exitButton = this.add.image(700, 500, 'exitButton').setInteractive();

        // Resize the button
        exitButton.setScale(0.25); // Adjust the scale factor as needed

        // Handle button click event
        exitButton.on('pointerdown', () => {
            this.scene.start("bootGame");
        });
    }
}
