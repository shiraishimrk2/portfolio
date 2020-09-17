phina.globalize();

phina.define("MainScene", {
  superClass: 'DisplayScene',
  init: function () {
    this.superInit();
    var tamesi = document.getElementById('matter');
    var canvas = document.getElementById('matter');
    var context = canvas.getContext('2d');
    console.log(context);

    if (tamesi.classList.contains('add_class') == true) {
      tamesi.classList.remove('add_class');
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
      fill: 'blue',
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


    //バットのオブジェクト作成
    // var bat = Events.on(mouseConstraint, 'mousedown', function () {
    //   var bou = Bodies.rectangle(150, 250, 70, 150, {
    //     isStatic: false,
    //     render: {
    //       fillStyle: 'blue',
    //     },
    //   });
    //   World.add(world, bou);
    // });

    var options = {
      isStatic: false,
      render: {
        fillStyle: 'blue',
      },
    };

    var bat = Bodies.rectangle(150, 250, 70, 150, options);

    var button = document.querySelector('.scale');
    click();
    var count = 0;

    function click() {
      button.addEventListener('click', function () {
        Body.translate(bat, {
          x: 10,
          y: 20
        });
        // Body.setPosition(bat, {
        //   x: 180,
        //   y: 290
        // });
        Body.setVelocity(bat, {
          x: 30,
          y: 0
        });
        count++;
      });
    };
    console.log(count);

    World.add(world, mouseConstraint);

    // var mouse = Mouse.create(render.canvas),
    //   mouseConstraint = MouseConstraint.create(engine, {
    //     mouse: mouse,
    //     constraint: {
    //       render: {
    //         visible: true,
    //       }
    //     }
    //   });
    // render.mouse = mouse;

    // Matter.Events.on(bat, 'mousedown', function () {
    //   Matter.Body.setPosition(bat, {
    //     x: 400,
    //     y: 300
    //   });
    // Matter.Body.setVelocity(bat, {
    //   x: 500,
    //   y: -60
    // });
    // });


    // Matter.Events.on(bat, 'Mousedown', function speed() {
    //   Matter.Body.translate(bat, {
    //     x: 300,
    //     y: 300
    //   })
    // });

    // var options =
    // speed();

    function speed() {
      Matter.Body.setPosition(bat, {
        x: 400,
        y: 300
      });
      Matter.Body.setVelocity(bat, {
        x: 500,
        y: -60
      });
      // Matter.Body.setAngularVelocity(bat, 0);
    };
    // Matter.MouseConstraint.create(engine, options);


    //ボール
    var ball = Bodies.circle(400, 290, 70, {
      restitution: 1,
      isStatic: false,
      render: {
        fillStyle: 'red',
      }
    });


    // 床
    var bottom = Bodies.rectangle(0, 343, 1200, 15, {
      isStatic: true
    });

    World.add(world, [ //作成した図形をステージに追加して描画する
      bat,
      ball,
      bottom,
    ]);

    var runner = Runner.create();
    Runner.run(runner, engine); //物理エンジンを実行

    Render.run(render); //ステージを配置させる記述


    // var counter = 0;
    // Events.on(mouseConstraint, 'mousedown', function () {
    //   // Matter.Body.setPosition(bat, {
    //   //   x: 400,
    //   //   y: 300
    //   // });
    //   // Matter.Body.setVelocity(bat, {
    //   //   x: 500,
    //   //   y: -60
    //   // });
    //   counter++;
    // });
    // console.log(counter)

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
})

//いよいよ今までのmatter.jsとphina.jsの全てを合わせた。
//まだまだ見た目は荒いが機能だけ見ると完成に近づいてきている
//batをつかめるようにして飛ばしたり今回のものは色々な物に挑戦するためのファイル