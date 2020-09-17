phina.globalize();

// var ASSETS = {
//     image: {
//         'tomapiko': 'https://rawgit.com/phi-jp/phina.js/develop/assets/images/tomapiko.png',
//     },
// };

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
            Bodies = Matter.Bodies,
            MouseConstraint = Matter.MouseConstraint,
            Mouse = Matter.Mouse;

        // create engine
        var engine = Engine.create(), //物理演算エンジンを生成？
            world = engine.world; //重力の存在する仮想世界の生成…？

        // create renderer
        var render = Render.create({ //レンダリングの設定？
            element: document.body,
            engine: engine,
            options: {
                width: 600, //ステージの横幅
                height: 350, //ステージの高さ
                background: '#FFFFFF', //ステージの背景色
                wireframes: false, //ワイヤーフレームモードをオフ
            }
        });

        var mouse = Mouse.create(render.canvas),
            mouseConstraint = MouseConstraint.create(engine, {
                mouse: mouse,
                constraint: {
                    stiffness: 0.2,
                    render: {
                        visible: false,
                    }
                }
            });
        World.add(world, mouseConstraint);
        render.mouse = mouse;

        Render.run(render); //ステージを配置させる記述？

        // create runner
        var runner = Runner.create();
        Runner.run(runner, engine); //物理エンジンを実行？

        //円のオブジェクト作成
        var maru = Bodies.circle(220, 290, 50, {
            restitution: 1,
            render: {
                // sprite: {
                //     texture: 'img/fuck.png'
                // }
                // fillStyle: '#F08E8F', //中身の色
                // strokeStyle: '#007FFF', //線の色
            },
        });

        //バットのオブジェクト作成
        var bat = Bodies.rectangle(150, 250, 20, 50, {
            render: {
                fillStyle: 'blue',
            },
            isStatic: true
        });

        // xywh
        var tenjo = Bodies.rectangle(0, 10, 1200, 15, {
            isStatic: true
        });

        var left = Bodies.rectangle(10, 0, 15, 700, {
            isStatic: true
        });

        var right = Bodies.rectangle(587, 300, 15, 700, {
            isStatic: true
        });

        var bottom = Bodies.rectangle(0, 343, 1200, 15, {
            isStatic: true
        });

        World.add(world, [ //作成した図形をステージに追加して描画する？
            maru,
            bat,
            tenjo,
            left,
            right,
            bottom
        ]);
    },
});
phina.main(function () {
    var app = GameApp({
        title: 'デモデモデモ',
        fps: 60,
        // assets: ASSETS,
    });
    app.run();
})

//前回の4と違いcssを追加し、canvas要素をいじる
//結果は前回とあまり変わらず、、、
//なぜcssをいじったのかというと、matterとphinaのcanvas
//を一つにする為にいじった。