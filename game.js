var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#ffffff',
    scene: [gameEnd, mainPage, levelOne, levelTwo, levelThree],
    pixelArt: true
}
  

window.onload = function(){
    var game = new Phaser.Game(config);
}