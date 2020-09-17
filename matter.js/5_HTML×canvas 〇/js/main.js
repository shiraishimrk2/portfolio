phina.globalize();

var ASSETS = {
  image: {
    'tomapiko': 'https://rawgit.com/phi-jp/phina.js/develop/assets/images/tomapiko.png',
  },
};

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


    var canvas = document.getElementById('matter');

    // const canvas_box = document.getElementById('canvas_box');

    // create renderer
    var render = Render.create({ //レンダリングの設定？
      element: canvas_box,
      canvas: canvas,
      engine: engine,
      options: {
        width: 573, //ステージの横幅
        height: 863, //ステージの高さ
        background: 'rgba(255, 255, 255, .4)', //ステージの背景色
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
  },
});

phina.main(function () {
  var app = GameApp({
    query: '#phina',
    startLavel: 'main',
    fit: true,
    assets: ASSETS,
  });
  app.run();
})

//とりえあずはcanvasを重ねることに成功した。サイズなどはまだ未完成
//phinaで作られるcanvasをhtml側で先に指定することで扱いやすくなった。
//まだまだphinaに関してはわかってない部分が多い