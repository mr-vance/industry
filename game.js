var config = {
    width: 800,
    height: 600,
    backgroundColor: 0x000000,
    scene: [homePage, gamePage]
}
  

window.onload = function(){
    var game = new Phaser.Game(config);
}