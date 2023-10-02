class mainPage extends Phaser.Scene {
    constructor() {
        super("homePage");

        this.wrapRect;
        this.aliens = [];
    }

    preload() {
        this.load.image('monitor', 'assets/backgrounds/monitor.png');
        this.load.image('background', 'assets/backgrounds/home-bg.jpg');
        this.load.image('emptyButton', 'assets/buttons/green_button.png');
        this.load.bitmapFont('arcadeFont', 'assets/fonts/arcade.png', 'assets/fonts/arcade.xml');
    }

    create() {
        //  This is our 'wrapping rectangle'
        //  When a sprite leaves this, it'll be wrapped around
        this.wrapRect = new Phaser.Geom.Rectangle(214, 132, 367, 239);

        // Create an image using the background texture
        const background = this.add.image(this.wrapRect.x, this.wrapRect.y, 'background');
        background.setOrigin(0, 0);
        background.displayWidth = this.wrapRect.width;
        background.displayHeight = this.wrapRect.height;

        // Calculate the center of the background
        const centerX = this.wrapRect.x + this.wrapRect.width / 2;
        const centerY = this.wrapRect.y + this.wrapRect.height / 2;

        this.add.image(400, 300, 'monitor');

        // Create a custom "Start" button container centered on the background
        const customStartButton = this.add.container(centerX, centerY);

        // Add the empty button image to the container
        const emptyButton = this.add.image(0, 0, 'emptyButton');
        customStartButton.add(emptyButton);
        
        // Adjust the button size (half the size of the image)
        emptyButton.displayWidth = 100;
        emptyButton.displayHeight = 25;

        // Create text using the Arcade font
        const buttonText = this.add.bitmapText(0, 0, 'arcadeFont', 'Start', 15);

        // Center the text within the button
        Phaser.Display.Align.In.Center(buttonText, emptyButton);
        customStartButton.add(buttonText); // Add text to the container

        // Make the custom "Start" button interactive
        customStartButton.setSize(100, 25);
        customStartButton.setInteractive();

        // Handle button click event
        customStartButton.on('pointerdown', () => {
            this.scene.start("firstLevel");
        });
    }

    update() {

    }
}
