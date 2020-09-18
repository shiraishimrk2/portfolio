phina.globalize();

var ASSETS = {
  image: {
    'tomapiko': 'https://rawgit.com/phi-jp/phina.js/develop/assets/images/tomapiko.png',
  },
};

phina.define("MytitleScene", {
  superClass: 'DisplayScene',
  init: function () {
    this.superInit();
    var self = this;
    this.onpointstart = function () {
      self.exit();
    };
  },
});

phina.define("MainScene", {
  superClass: 'DisplayScene',
  init: function () {
    this.superInit();
    var background_box = RectangleShape({
      width: this.width * 2,
      height: this.height * 2,
      // fill: 'rgba(255, 255, 255, .4)',
      fill: 'gray',
    }).addChildTo(this);
    // console.log(this);
    // if()で今までのゲージをクリアしたか確認 yesならstart起動
    start();

    // バックグラウンドでパワーの威力を決めるカウンター
    var timerId = 0;
    var power_counter = 0;

    function start() {
      background_box.setInteractive(true);
      background_box.onpointstart = function () {
        power_counter++;
        // 効果音をプラス
        console.log(power_counter);
        // return power_counter;
      };
      timerId = setTimeout(stop, 3000);
    };

    function stop() {
      background_box.setInteractive(false);
      clearTimeout(timerId);
      // console.log(timerId);
      move();
    }

    function move() {
      var power = power_counter;
      // console.log(power);
    }

    var circle = CircleShape({
      x: this.gridX.center(),
      y: this.gridY.center(),
      radius: 100,
      fill: 'blue',
    }).addChildTo(this);

    var self = this;
    circle.setInteractive(true);
    circle.onpointstart = function () {
      self.exit();
    };

    var sprite = Sprite('tomapiko').addChildTo(this);

    sprite.x = this.gridX.span(1);
    sprite.y = this.gridY.span(1);

    this.onpointmove = function (e) {
      sprite.x = e.pointer.x;
      sprite.y = e.pointer.y;
    };
    this.update = function () {
      var c = Circle(sprite.x, sprite.y, sprite.radius);

      if (Collision.testCircleCircle(c, circle)) {
        circle.fill = 'red';
      } else {
        circle.fill = 'blue';
      }
    };
  },
});
phina.main(function () {
  var app = GameApp({
    title: 'demo',
    assets: ASSETS,
  });
  app.run();
})

//phina.jsのほうで、自分なりにclick_counterを作成
//パワーゲージのようなものを三つ作成する予定なので、
//今回はクリックでゲージを溜めるシステムなので、
//まずはif文で他のゲージが完了したら始まるというメモ書き
//そして、クリックする為のオブジェクトを作成するために、
//phina.jsでバックに一枚オブジェクトを入れた。
//問題点
//問題点は上に一枚カウントするためのオブジェクトがあるため
//クリックしたとしても次のページに飛ばすことができないこと
//解決策としてはcssを使うことで順番を入れ替えて尚且つ
//下にあったとしてもクリックカウンターを使うことができるかもしれない