var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000042',
    scene: [mainPage, gamePage],
    pixelArt: true
}
  

window.onload = function(){
    var game = new Phaser.Game(config);
}