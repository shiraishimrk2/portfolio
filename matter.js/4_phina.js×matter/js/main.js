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

    var Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      World = Matter.World,
      Bodies = Matter.Bodies;

    // create engine
    var engine = Engine.create(), //物理演算エンジンを生成？
      world = engine.world; //重力の存在する仮想世界の生成…？

    // create renderer
    var render = Render.create({ //レンダリングの設定？
      element: document.body,
      engine: engine,
      options: {
        width: this.width, //ステージの横幅
        height: this.height, //ステージの高さ
        background: '#FFFFFF', //ステージの背景色
        wireframes: false, //ワイヤーフレームモードをオフ
      }
    });

    Render.run(render); //ステージを配置させる記述

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine); //物理エンジンを実行

    //バットのオブジェクト作成
    var bat = Bodies.rectangle(150, 250, 20, 50, {
      render: {
        fillStyle: 'blue',
      },
      isStatic: true
    });

    // 床
    var bottom = Bodies.rectangle(0, 343, 1200, 15, {
      isStatic: true
    });

    World.add(world, [ //作成した図形をステージに追加して描画する？
      bat,
      bottom
    ]);


    var background_box = RectangleShape({
      width: this.width * 2,
      height: this.height * 2,
      fill: 'rgba(255, 255, 255, .4)',
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
    };

    function move() {
      var power = power_counter;
      // console.log(power);
    };

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

//canvasがmatter.js内で作られていることがわかった
//そのためphinaと二つのcanvasが作られてしまったことがわかった。
//もう少しすればcanvasを二つに重ねることが可能になるかもしれない
//canvasを合成して一枚の画像にするという手段もあるようだ
//しかし、画像にしてしまってはレンダリングができず、アニメーションには
//ならないのかもしれない。ならやはりpositionをかけて重ねるほうが適していると思われる。