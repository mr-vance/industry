class homePage extends Phaser.Scene {

    constructor() {
      super("bootGame");
    }

    preload() {
        // Load the background image
        this.load.image('home-background', 'assets/images/home-bg.jpg');
        // Load the button image
        this.load.image('emptyButton', 'assets/images/ui-pack/green_button00.png');
    }

    create() {
        // Get the width and height of the scene
        const sceneWidth = this.sys.game.config.width;
        const sceneHeight = this.sys.game.config.height;

        // Add the background image and set its scale to fit the scene
        const background = this.add.image(sceneWidth / 2, sceneHeight / 2, 'home-background');
        background.setScale(sceneWidth / background.width, sceneHeight / background.height);

        // Create a custom "Start" button container
        const customStartButton = this.add.container(300, 450);

        // Add the empty button image to the container
        const emptyButton = this.add.image(0, 0, 'emptyButton');
        customStartButton.add(emptyButton);

        // Add text on top of the button and add it to the container
        const buttonText = this.add.text(0, 0, 'Start', {
            fontSize: '20px',
            fill: '#000000',
            align: 'center',
        });
        // Center the text within the button
        Phaser.Display.Align.In.Center(buttonText, emptyButton);
        customStartButton.add(buttonText); // Add text to the container

        // Make the custom "Start" button interactive
        customStartButton.setSize(200, 50);
        customStartButton.setInteractive();

        // Handle button click event
        customStartButton.on('pointerdown', () => {
            this.scene.start("playGame");
        });

    }

}
