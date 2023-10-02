class gamePage extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    preload() {
        this.load.image('game-background', 'assets/backgrounds/game-bg.png');
        this.load.image('blue', 'assets/material/firstLevel/blue.png');
        this.load.image('green', 'assets/material/firstLevel/green.png');
        this.load.image('red', 'assets/material/firstLevel/red.png');
        this.load.image('orange', 'assets/material/firstLevel/orange.png');
        this.load.image('purple', 'assets/material/firstLevel/purple.png');
        this.load.image('yellow', 'assets/material/firstLevel/yellow.png');
        this.load.image('validateButton', 'assets/buttons/blue_button.png');
        this.load.image('exitButton', 'assets/buttons/red_button.png');
        this.load.image('heart', 'assets/game-items/heart.png');
        this.load.image('monitor-frame', 'assets/backgrounds/monitor.png');
    }

    create() {
        //  This is our 'wrapping rectangle'
        //  When a sprite leaves this, it'll be wrapped around
        this.wrapRect = new Phaser.Geom.Rectangle(214, 132, 367, 239);

        // Create an image using the background texture
        const background = this.add.image(this.wrapRect.x, this.wrapRect.y, 'game-background');
        background.setOrigin(0, 0);
        background.displayWidth = this.wrapRect.width;
        background.displayHeight = this.wrapRect.height;

        // Calculate the center of the background
        const centerX = this.wrapRect.x + this.wrapRect.width / 2;
        const centerY = this.wrapRect.y + this.wrapRect.height / 2;

        this.add.image(400, 300, 'monitor-frame');

        // Create the quiz options as images, resizing them to fit the background
        const red = this.add.image(centerX - 100, centerY-30, 'red').setInteractive();
        red.setScale(0.5); // Resize the icon
        const blue = this.add.image(centerX, centerY-30, 'blue').setInteractive();
        blue.setScale(0.5); // Resize the icon
        const green = this.add.image(centerX + 100, centerY-30, 'green').setInteractive();
        green.setScale(0.5); // Resize the icon

        // Create the quiz options as images, resizing them to fit the background
        const orange = this.add.image(centerX - 100, centerY+30, 'orange').setInteractive();
        orange.setScale(0.5); // Resize the icon
        const purple = this.add.image(centerX, centerY+30, 'purple').setInteractive();
        purple.setScale(0.5); // Resize the icon
        const yellow = this.add.image(centerX + 100, centerY+30, 'yellow').setInteractive();
        yellow.setScale(0.5); // Resize the icon

        // Create a countdown timer with an initial time of 30 seconds
        let timeLeft = 30;
        const timerText = this.add.bitmapText(centerX - 20, centerY - 100, 'arcadeFont', `Time: ${timeLeft}`, 20);
        timerText.setOrigin(0.5, 0.5);

        const levelText = this.add.bitmapText(centerX - 20, centerY - 100, 'arcadeFont', `Candy factory: How do we make purple?`, 7);
        levelText.setOrigin(0.5, -3);

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
        const heartSpacing = 27; // Adjust the spacing between hearts

        // Create and position heart icons
        for (let i = 0; i < 3; i++) {
            const heart = this.add.image(centerX - 30 + i * heartSpacing, centerY + 100, 'heart');
            heart.setScale(0.4); // Resize the heart icon
            hearts.push(heart);
        }

        // Create an array to keep track of selected options
        const selectedOptions = [];

        // Handle option click events
        red.on('pointerdown', () => {
            // Toggle selection
            if (selectedOptions.includes('red')) {
                selectedOptions.splice(selectedOptions.indexOf('red'), 1);
                red.clearTint();
            } else {
                selectedOptions.push('red');
                red.setTint(0x00ff00); // Highlight selected option
            }
        });

        blue.on('pointerdown', () => {
            // Toggle selection
            if (selectedOptions.includes('blue')) {
                selectedOptions.splice(selectedOptions.indexOf('blue'), 1);
                blue.clearTint();
            } else {
                selectedOptions.push('blue');
                blue.setTint(0x00ff00); // Highlight selected option
            }
        });

        green.on('pointerdown', () => {
            // Toggle selection
            if (selectedOptions.includes('green')) {
                selectedOptions.splice(selectedOptions.indexOf('green'), 1);
                green.clearTint();
            } else {
                selectedOptions.push('green');
                green.setTint(0x00ff00); // Highlight selected option
            }
        });

        orange.on('pointerdown', () => {
            // Toggle selection
            if (selectedOptions.includes('orange')) {
                selectedOptions.splice(selectedOptions.indexOf('orange'), 1);
                orange.clearTint();
            } else {
                selectedOptions.push('orange');
                orange.setTint(0x00ff00); // Highlight selected option
            }
        });

        purple.on('pointerdown', () => {
            // Toggle selection
            if (selectedOptions.includes('purple')) {
                selectedOptions.splice(selectedOptions.indexOf('purple'), 1);
                purple.clearTint();
            } else {
                selectedOptions.push('purple');
                purple.setTint(0x00ff00); // Highlight selected option
            }
        });

        yellow.on('pointerdown', () => {
            // Toggle selection
            if (selectedOptions.includes('yellow')) {
                selectedOptions.splice(selectedOptions.indexOf('yellow'), 1);
                yellow.clearTint();
            } else {
                selectedOptions.push('yellow');
                yellow.setTint(0x00ff00); // Highlight selected option
            }
        });

        // Create a "Validate" button with text and set its callback
        const validateButton = this.add.image(centerX - 140, centerY + 100, 'validateButton').setInteractive();
        validateButton.setScale(0.4); // Resize the button
        const validateButtonText = this.add.bitmapText(centerX - 140, centerY + 100, 'arcadeFont', 'Done', 10);
        validateButtonText.setOrigin(0.5, 0.5);

        // Handle button click event to validate the answer
        validateButton.on('pointerdown', () => {
            // Check if the selected options are correct (red and blue)
            const correctOptions = ['red', 'blue'];
            const isCorrect = selectedOptions.sort().toString() === correctOptions.sort().toString();

            // Display a message based on the answer
            if (isCorrect) {
                console.log('Correct! You can make a purple candy with those.');
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

        // Create an "Exit" button with text and set its callback
        const exitButton = this.add.image(centerX + 140, centerY + 100, 'exitButton').setInteractive();
        exitButton.setScale(0.4); // Resize the button
        const exitButtonText = this.add.bitmapText(centerX + 140, centerY + 100, 'arcadeFont', 'Exit', 10);
        exitButtonText.setOrigin(0.5, 0.5);

        // Handle button click event
        exitButton.on('pointerdown', () => {
            this.scene.start("testGame");
        });
    }
}
