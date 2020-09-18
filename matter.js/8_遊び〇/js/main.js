phina.globalize();

phina.define("MainScene", {
  superClass: 'DisplayScene',
  init: function () {
    this.superInit();
    var canvas = document.getElementById('matter');
    var context = canvas.getContext('2d');
    console.log(context);

    if (canvas.classList.contains('add_class') == true) {
      canvas.classList.remove('add_class');
    }

    var background_box = RectangleShape({
      width: this.width * 2,
      height: this.height * 2,
      fill: 'transparent',
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
      fill: 'black',
    }).addChildTo(this);

    var self = this;
    circle.setInteractive(true);
    circle.onpointstart = function () {
      self.exit();
      matter_canvas.classList.add('add_class');
    };



    // --------------------------matter.js開始--------------------------

    var Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      World = Matter.World,
      Bodies = Matter.Bodies,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse,
      Body = Matter.Body,
      Events = Matter.Events;

    var mouseConstraint = MouseConstraint;


    // create engine
    var engine = Engine.create(), //物理演算エンジンを生成
      world = engine.world; //重力の存在する仮想世界の生成

    // create runner

    var matter_canvas = document.getElementById('matter');
    // const canvas_box = document.getElementById('canvas_box');
    // create renderer
    var render = Render.create({ //レンダリングの設定
      element: canvas_box,
      canvas: matter_canvas,
      engine: engine,
      options: {
        width: 573, //ステージの横幅
        height: 863, //ステージの高さ
        background: 'transparent', //ステージの背景色
        wireframes: false, //ワイヤーフレームモードをオフ
        hasBounds: true,
        // showVelocity:true,
      }
    });


    var bat_options = {
      isStatic: false,
      restitution: 0.8,
      render: {
        fillStyle: 'blue',
      },
    };

    var bat = Bodies.rectangle(150, 500, 70, 150, bat_options);

    var left_button = document.querySelector('.left');
    var jump_button = document.querySelector('.jump');
    var right_button = document.querySelector('.right');

    left_click();
    jump_click();
    right_click();

    function left_click() {
      left_button.addEventListener('click', function () {
        Body.translate(bat, {
          x: -15,
          y: 0
        });
        Body.setVelocity(bat, {
          x: -15,
          y: 0
        });
      });
    };

    function jump_click() {
      jump_button.addEventListener('click', function () {
        Body.translate(bat, {
          x: 0,
          y: -15
        });
        Body.setVelocity(bat, {
          x: 0,
          y: -15
        });
      });
    };

    function right_click() {
      right_button.addEventListener('click', function () {
        Body.translate(bat, {
          x: 15,
          y: 0
        });
        Body.setVelocity(bat, {
          x: 15,
          y: 0
        });
      });
    };


    World.add(world, mouseConstraint);

    //ボール
    var ball = Bodies.circle(400, 500, 70, {
      restitution: 1,
      isStatic: false,
      render: {
        fillStyle: 'red',
      }
    });

    // 床
    var bottom = Bodies.rectangle(0, 750, 1200, 10, {
      isStatic: true
    });

    var left_wall = Bodies.rectangle(0, 0, 15, 1500, {
      isStatic: true
    });

    var right_wall = Bodies.rectangle(573, 0, 15, 1500, {
      isStatic: true
    });

    World.add(world, [ //作成した図形をステージに追加して描画する
      bat,
      ball,
      bottom,
      right_wall,
      left_wall
    ]);

    var runner = Runner.create();
    Runner.run(runner, engine); //物理エンジンを実行

    Render.run(render); //ステージを配置させる記述

    var tukareta = document.querySelectorAll('canvas');
    console.log(tukareta);
  },
});

phina.main(function () {
  var app = GameApp({
    query: '#phina',
    startLavel: 'main',
    fit: true,
  });
  app.run();
});

//今回は遊びとして、batを上下左右に動かす物を簡単に作った。
//for文などを使っていないため少々無駄に長くなってしまっているが
//どこまでができて、どこまでが出来ていないのかを把握することができた。
//現状batを振る際に回転させなければいけないがそれが実装出来ていない。
//batは今はただの四角形だが、のちに人の画像に変更する予定。