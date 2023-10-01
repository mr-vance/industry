var config = {
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x000000,
    scene: [homePage, gamePage],
    pixelArt: true
}
  

window.onload = function(){
    var game = new Phaser.Game(config);
}