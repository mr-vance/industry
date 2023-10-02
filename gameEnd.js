class gameEnd extends Phaser.Scene {
    constructor() {
        super("winnerPage");
        this.wrapRect;
    }

    preload() {
        this.load.image('monitor-frame', 'assets/backgrounds/monitor.png');
        this.load.bitmapFont('arcadeFont', 'assets/fonts/arcade.png', 'assets/fonts/arcade.xml');
    }

    create() {
        //  This is our 'wrapping rectangle'
        //  When a sprite leaves this, it'll be wrapped around
        this.wrapRect = new Phaser.Geom.Rectangle(214, 132, 367, 239);

        this.add.rectangle(this.wrapRect.x, this.wrapRect.y, this.wrapRect.width, this.wrapRect.height, 0x0094bf).setOrigin(0, 0);

        this.add.image(400, 300, 'monitor-frame');

        // Calculate the center of the background
        const centerX = this.wrapRect.x + this.wrapRect.width / 2;
        const centerY = this.wrapRect.y + this.wrapRect.height / 2;

        const timerText = this.add.bitmapText(centerX, centerY, 'arcadeFont', `You Win!`, 25);
        timerText.setOrigin(0.5, 0.5);

        const levelText = this.add.bitmapText(centerX - 20, centerY + 50, 'arcadeFont', `Press any key`, 7);
        levelText.setOrigin(0.5, -3);

        // Add a fade-in/fade-out animation to the text
        this.tweens.add({
            targets: timerText,
            alpha: { from: 0, to: 1 }, // Fade in from 0 to 1
            duration: 1000, // Duration of the fade-in animation (adjust as needed)
            yoyo: true, // Fade back out after fading in
            repeat: -1, // Repeat indefinitely
        });

        // Make the text green
        timerText.setTint(0x00ff00); // Green tint

        // Add a keyboard input listener
        this.input.keyboard.once('keydown', () => {
            this.scene.start("homePage"); // Return to the "homePage" scene when any key is pressed
        });
    }

    update() {

    }
}
