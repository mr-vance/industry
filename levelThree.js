class levelThree extends Phaser.Scene {
    constructor() {
        super("thirdLevel");
    }

    preload() {
        this.load.image('game3-background', 'assets/backgrounds/level-three-bg.png');
        this.load.image('book', 'assets/material/thirdLevel/book.png');
        this.load.image('envelope', 'assets/material/thirdLevel/envelope.png');
        this.load.image('hammer', 'assets/material/thirdLevel/hammer.png');
        this.load.image('helmet', 'assets/material/thirdLevel/helmet.png');
        this.load.image('map', 'assets/material/thirdLevel/map.png');
        this.load.image('shield', 'assets/material/thirdLevel/shield.png');
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
        const background = this.add.image(this.wrapRect.x, this.wrapRect.y, 'game3-background');
        background.setOrigin(0, 0);
        background.displayWidth = this.wrapRect.width;
        background.displayHeight = this.wrapRect.height;

        // Calculate the center of the background
        const centerX = this.wrapRect.x + this.wrapRect.width / 2;
        const centerY = this.wrapRect.y + this.wrapRect.height / 2;

        this.add.image(400, 300, 'monitor-frame');

        // Create the quiz options as images, resizing them to fit the background
        const hammer = this.add.image(centerX - 100, centerY-30, 'hammer').setInteractive();
        hammer.setScale(0.17); // Resize the icon
        const book = this.add.image(centerX, centerY-30, 'book').setInteractive();
        book.setScale(0.17); // Resize the icon
        const envelope = this.add.image(centerX + 100, centerY-30, 'envelope').setInteractive();
        envelope.setScale(0.17); // Resize the icon

        // Create the quiz options as images, resizing them to fit the background
        const helmet = this.add.image(centerX - 100, centerY+30, 'helmet').setInteractive();
        helmet.setScale(0.17); // Resize the icon
        const map = this.add.image(centerX, centerY+30, 'map').setInteractive();
        map.setScale(0.17); // Resize the icon
        const shield = this.add.image(centerX + 100, centerY+30, 'shield').setInteractive();
        shield.setScale(0.17); // Resize the icon

        // Create a see-saw animation for all quiz options
        const quizOptions = [hammer, book, envelope, helmet, map, shield];
        quizOptions.forEach((option) => {
            this.addQuizOptionAnimation(option);
        });

        // Create a countdown timer with an initial time of 30 seconds
        let timeLeft = 7;
        const timerText = this.add.bitmapText(centerX - 20, centerY - 100, 'arcadeFont', `Time: ${timeLeft}`, 20);
        timerText.setOrigin(0.5, 0.5);

        const levelText = this.add.bitmapText(centerX - 20, centerY - 100, 'arcadeFont', `Military industry: A message has to be sent.`, 7);
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
                    this.scene.start("levelThreeOver"); // You may want to go back to the main menu or a game over scene
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
        hammer.on('pointerdown', () => {
            // Toggle selection
            if (selectedOptions.includes('hammer')) {
                selectedOptions.splice(selectedOptions.indexOf('hammer'), 1);
                hammer.clearTint();
            } else {
                selectedOptions.push('hammer');
                hammer.setTint(0x00ff00); // Highlight selected option
            }
        });

        book.on('pointerdown', () => {
            // Toggle selection
            if (selectedOptions.includes('book')) {
                selectedOptions.splice(selectedOptions.indexOf('book'), 1);
                book.clearTint();
            } else {
                selectedOptions.push('book');
                book.setTint(0x00ff00); // Highlight selected option
            }
        });

        envelope.on('pointerdown', () => {
            // Toggle selection
            if (selectedOptions.includes('envelope')) {
                selectedOptions.splice(selectedOptions.indexOf('envelope'), 1);
                envelope.clearTint();
            } else {
                selectedOptions.push('envelope');
                envelope.setTint(0x00ff00); // Highlight selected option
            }
        });

        helmet.on('pointerdown', () => {
            // Toggle selection
            if (selectedOptions.includes('helmet')) {
                selectedOptions.splice(selectedOptions.indexOf('helmet'), 1);
                helmet.clearTint();
            } else {
                selectedOptions.push('helmet');
                helmet.setTint(0x00ff00); // Highlight selected option
            }
        });

        map.on('pointerdown', () => {
            // Toggle selection
            if (selectedOptions.includes('map')) {
                selectedOptions.splice(selectedOptions.indexOf('map'), 1);
                map.clearTint();
            } else {
                selectedOptions.push('map');
                map.setTint(0x00ff00); // Highlight selected option
            }
        });

        shield.on('pointerdown', () => {
            // Toggle selection
            if (selectedOptions.includes('shield')) {
                selectedOptions.splice(selectedOptions.indexOf('shield'), 1);
                shield.clearTint();
            } else {
                selectedOptions.push('shield');
                shield.setTint(0x00ff00); // Highlight selected option
            }
        });

        // Create a "Validate" button with text and set its callback
        const validateButton = this.add.image(centerX - 140, centerY + 100, 'validateButton').setInteractive();
        validateButton.setScale(0.4); // Resize the button
        const validateButtonText = this.add.bitmapText(centerX - 140, centerY + 100, 'arcadeFont', 'Done', 10);
        validateButtonText.setOrigin(0.5, 0.5);

        // Handle button click event to validate the answer
        validateButton.on('pointerdown', () => {
            // Check if the selected options are correct (hammer and book)
            const correctOptions = ['map', 'book', 'envelope'];
            const isCorrect = selectedOptions.sort().toString() === correctOptions.sort().toString();

            // Display a message based on the answer
            if (isCorrect) {
                console.log('Correct! A fighter can send a message with those.');
                // Stop the timer when the player gets the correct answer
                correctAnswerGiven = true;

                // Go to the next level ("gameEnd") on correct answer
                this.scene.start("winnerPage");
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
                    this.scene.start("levelThreeOver"); // You may want to go back to the main menu or a game over scene
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

    addQuizOptionAnimation(option) {
        // Define the fade-in/fade-out animation
        this.tweens.add({
            targets: option,
            alpha: { from: 0, to: 1 }, // Start with 0 opacity and fade in to 1
            duration: 1000, // Duration of the fade-in animation (adjust as needed)
            yoyo: true, // Fade back out after fading in
            repeat: -1, // Repeat indefinitely
        });
    }
    
}
