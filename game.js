var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#ffffff',
    scene: [mainPage, levelOne, levelTwo, levelThree, gameEnd, levelOneOver, levelTwoOver, levelThreeOver, gameCredits],
    pixelArt: true
}
  

window.onload = function(){
    var game = new Phaser.Game(config);
}