class levelTwo extends Phaser.Scene {
    constructor() {
        super("secondLevel");
    }

    preload() {
        this.load.image('game2-background', 'assets/backgrounds/level-two-bg.jpg');
        this.load.image('controller', 'assets/material/secondLevel/controller.png');
        this.load.image('cpu', 'assets/material/secondLevel/cpu.png');
        this.load.image('floppyOne', 'assets/material/secondLevel/floppy-one.png');
        this.load.image('floppyTwo', 'assets/material/secondLevel/floppy-two.png');
        this.load.image('keyboard', 'assets/material/secondLevel/keyboard.png');
        this.load.image('ram', 'assets/material/secondLevel/ram.png');
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
        const background = this.add.image(this.wrapRect.x, this.wrapRect.y, 'game2-background');
        background.setOrigin(0, 0);
        background.displayWidth = this.wrapRect.width;
        background.displayHeight = this.wrapRect.height;

        // Calculate the center of the background
        const centerX = this.wrapRect.x + this.wrapRect.width / 2;
        const centerY = this.wrapRect.y + this.wrapRect.height / 2;

        this.add.image(400, 300, 'monitor-frame');

        // Create the quiz options as images, resizing them to fit the background
        const cpu = this.add.image(centerX - 100, centerY-30, 'cpu').setInteractive();
        cpu.setScale(1); // Resize the icon
        const floppyOne = this.add.image(centerX, centerY-30, 'floppyOne').setInteractive();
        floppyOne.setScale(1); // Resize the icon
        const floppyTwo = this.add.image(centerX + 100, centerY-30, 'floppyTwo').setInteractive();
        floppyTwo.setScale(1); // Resize the icon

        // Create the quiz options as images, resizing them to fit the background
        const keyboard = this.add.image(centerX - 100, centerY+30, 'keyboard').setInteractive();
        keyboard.setScale(1); // Resize the icon
        const controller = this.add.image(centerX, centerY+30, 'controller').setInteractive();
        controller.setScale(1); // Resize the icon
        const ram = this.add.image(centerX + 100, centerY+30, 'ram').setInteractive();
        ram.setScale(1); // Resize the icon

        // Create a countdown timer with an initial time of 30 seconds
        let timeLeft = 12;
        const timerText = this.add.bitmapText(centerX - 20, centerY - 100, 'arcadeFont', `Time: ${timeLeft}`, 20);
        timerText.setOrigin(0.5, 0.5);

        const levelText = this.add.bitmapText(centerX - 20, centerY - 100, 'arcadeFont', `Assembly factory: Storage devices needed.`, 7);
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
                    this.scene.start("homePage"); // You may want to go back to the main menu or a game over scene
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
        cpu.on('pointerdown', () => {
            // Toggle selection
            if (selectedOptions.includes('cpu')) {
                selectedOptions.splice(selectedOptions.indexOf('cpu'), 1);
                cpu.clearTint();
            } else {
                selectedOptions.push('cpu');
                cpu.setTint(0x00ff00); // Highlight selected option
            }
        });

        floppyOne.on('pointerdown', () => {
            // Toggle selection
            if (selectedOptions.includes('floppyOne')) {
                selectedOptions.splice(selectedOptions.indexOf('floppyOne'), 1);
                floppyOne.clearTint();
            } else {
                selectedOptions.push('floppyOne');
                floppyOne.setTint(0x00ff00); // Highlight selected option
            }
        });

        floppyTwo.on('pointerdown', () => {
            // Toggle selection
            if (selectedOptions.includes('floppyTwo')) {
                selectedOptions.splice(selectedOptions.indexOf('floppyTwo'), 1);
                floppyTwo.clearTint();
            } else {
                selectedOptions.push('floppyTwo');
                floppyTwo.setTint(0x00ff00); // Highlight selected option
            }
        });

        keyboard.on('pointerdown', () => {
            // Toggle selection
            if (selectedOptions.includes('keyboard')) {
                selectedOptions.splice(selectedOptions.indexOf('keyboard'), 1);
                keyboard.clearTint();
            } else {
                selectedOptions.push('keyboard');
                keyboard.setTint(0x00ff00); // Highlight selected option
            }
        });

        controller.on('pointerdown', () => {
            // Toggle selection
            if (selectedOptions.includes('controller')) {
                selectedOptions.splice(selectedOptions.indexOf('controller'), 1);
                controller.clearTint();
            } else {
                selectedOptions.push('controller');
                controller.setTint(0x00ff00); // Highlight selected option
            }
        });

        ram.on('pointerdown', () => {
            // Toggle selection
            if (selectedOptions.includes('ram')) {
                selectedOptions.splice(selectedOptions.indexOf('ram'), 1);
                ram.clearTint();
            } else {
                selectedOptions.push('ram');
                ram.setTint(0x00ff00); // Highlight selected option
            }
        });

        // Create a "Validate" button with text and set its callback
        const validateButton = this.add.image(centerX - 140, centerY + 100, 'validateButton').setInteractive();
        validateButton.setScale(0.4); // Resize the button
        const validateButtonText = this.add.bitmapText(centerX - 140, centerY + 100, 'arcadeFont', 'Done', 10);
        validateButtonText.setOrigin(0.5, 0.5);

        // Handle button click event to validate the answer
        validateButton.on('pointerdown', () => {
            // Check if the selected options are correct (cpu and floppyOne)
            const correctOptions = ['ram', 'floppyOne', 'floppyTwo'];
            const isCorrect = selectedOptions.sort().toString() === correctOptions.sort().toString();

            // Display a message based on the answer
            if (isCorrect) {
                console.log('Correct! The client is happy.');
                // Stop the timer when the player gets the correct answer
                correctAnswerGiven = true;

                // Go to the next level ("thirdLevel") on correct answer
                this.scene.start("thirdLevel");
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
                    this.scene.start("homePage"); // You may want to go back to the main menu or a game over scene
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
            this.scene.start("homePage");
        });
    }
}
