var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#ffffff',
    scene: [mainPage, levelOne, levelTwo, levelThree, gameEnd, levelOneOver, levelTwoOver, levelThreeOver, gameCredits],
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY, // Center horizontally
    }
};

window.onload = function(){
    var game = new Phaser.Game(config);
};
