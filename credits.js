class gameCredits extends Phaser.Scene {
    constructor() {
        super("gameCredits");
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

        this.add.rectangle(this.wrapRect.x, this.wrapRect.y, this.wrapRect.width, this.wrapRect.height, '#000000').setOrigin(0, 0);

        this.add.image(400, 300, 'monitor-frame');

        // Calculate the center of the background
        const centerX = this.wrapRect.x + this.wrapRect.width / 2;
        const centerY = this.wrapRect.y + this.wrapRect.height / 2;

        const timerText = this.add.bitmapText(centerX, centerY, 'arcadeFont', `Developer: '\n\n' https://vance-muchongo.web.app '\n\n' with an extra push from '\n\n' LazyDevs from Discord. '\n\n' first release: 10 October 2023 `, 9);
        timerText.setOrigin(0.5, 0.5);

        const levelText = this.add.bitmapText(centerX - 20, centerY + 50, 'arcadeFont', `Press any key`, 7);
        levelText.setOrigin(0.5, -3);


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
