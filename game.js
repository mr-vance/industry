var config = {
    width: 600,
    height: 500,
    backgroundColor: 0x000000,
    scene: [homePage, gamePage],
    pixelArt: true
}
  

window.onload = function(){
    var game = new Phaser.Game(config);
}