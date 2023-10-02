class gamePage extends Phaser.Scene {
    constructor() {
      super("playGame");
    }

    preload() {
        this.load.image('game-background', 'assets/images/game-bg.png');
        this.load.image('tyre', 'assets/images/palm.png');
        this.load.image('engine', 'assets/images/snow.png');
        this.load.image('fish', 'assets/images/pink.png');
        this.load.image('validateButton', 'assets/images/finish-button.png');
        this.load.image('exitButton', 'assets/images/exit-button.png');
        this.load.image('heart', 'assets/images/heart.png');
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

        // Create a countdown timer with an initial time of 30 seconds
        let timeLeft = 30;
        const timerText = this.add.bitmapText(20, 20, 'arcadeFont', `Time: ${timeLeft}`, 32);

        // Flag to track if the correct answer has been given
        let correctAnswerGiven = false;

        // Create an update function to decrement the timer
        this.update = function () {
            if (!correctAnswerGiven && timeLeft > 0) {
                // Decrement the timer
                timeLeft -= this.game.loop.delta / 1000; // Adjust for frame rate
                // Update the timer text
                timerText.text = `Time: ${Math.ceil(timeLeft)}`;
                if (timeLeft <= 0) {
                    // Time's up, player loses the game
                    console.log('Time\'s up! You lose.');
                    this.scene.start("testGame"); // You may want to go back to the main menu or a game over scene
                }
            }
        };

        // Create an array to store heart icons
        const hearts = [];
        const heartSpacing = 40; // Adjust the spacing between hearts

        // Create and position heart icons
        for (let i = 0; i < 3; i++) {
            const heart = this.add.image(20 + i * heartSpacing, 70, 'heart');
            hearts.push(heart);
        }

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
                // Stop the timer when the player gets the correct answer
                correctAnswerGiven = true;
            } else {
                console.log('Incorrect! Check your selections.');

                // Remove a heart icon when the answer is incorrect
                if (hearts.length > 0) {
                    const removedHeart = hearts.pop();
                    removedHeart.destroy();
                }

                // Check if the player has lost all lives
                if (hearts.length === 0) {
                    console.log('Game over! You ran out of lives.');
                    this.scene.start("testGame"); // You may want to go back to the main menu or a game over scene
                }
            }
        });

        // Create an "Exit" button and set its callback
        const exitButton = this.add.image(700, 500, 'exitButton').setInteractive();

        // Resize the button
        exitButton.setScale(0.25); // Adjust the scale factor as needed

        // Handle button click event
        exitButton.on('pointerdown', () => {
            this.scene.start("testGame");
        });
    }
}
