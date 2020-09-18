/*
motion_config:
ball_config
*/
phina.globalize();

var power_counter = 0;

phina.define("Scene01", {
    superClass: 'DisplayScene',
    init: function () {
        this.superInit();
        this.backgroundColor = 'lightblue';

        Label({
            text: 'titleScene',
            fontSize: 40,
            fill: 'black'
        }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());


        var background_box = RectangleShape({
            width: this.width * 2,
            height: this.height * 2,
            // fill: 'rgba(255, 255, 255, .4)',
            fill: 'transparent',
        }).addChildTo(this);
        // console.log(this);
        // if()で今までのゲージをクリアしたか確認 yesならstart起動
        start();

        // バックグラウンドでパワーの威力を決めるカウンター
        var timerId = 0;
        // var power_counter = 0;

        function start() {
            background_box.setInteractive(true);
            background_box.onpointstart = function () {
                power_counter++;
                // 効果音をプラス
                console.log(power_counter);
                return this.power_counter;
            };
            timerId = setTimeout(stop, 5000);
        };

        function stop() {
            background_box.setInteractive(false);
            clearTimeout(timerId);
            // console.log(timerId);
            move();
        }

        function move() {
            // var power = power_counter;
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
    }
});

phina.define("Scene02", {
    superClass: 'DisplayScene',
    init: function () {
        this.superInit();

        var circle = CircleShape({
            x: this.gridX.center(),
            y: this.gridY.center(),
            radius: 100,
            fill: 'black',
        }).addChildTo(this);


        function motionAnime(canvas_id, canvas_config, motionFunc, motion_config, outside_process) {
            var canvas = document.getElementById(canvas_id);
            if (!canvas) {
                console.log('wrong canvas_id');
                return false;
            }

            if (!motion_config.ball_config) {
                console.log('Not ball_config in motion_config.');
                return false;
            }

            // 1 canvasの座標の原点を左上から左下へ移動、およびy軸反転
            canvasInitialize(canvas);

            function canvasInitialize(canvas) {
                var c = canvas.getContext('2d');
                c.translate(0, canvas.height);
                c.scale(1, -1);
            }

            var c = canvas.getContext('2d');

            // ball位置初期化
            motion_config.ball_config.ball_pos = {
                x: motion_config.ball_config.ball_pos0.x,
                y: motion_config.ball_config.ball_pos0.y
            }

            //時間
            motion_config.t = motion_config.t0;

            // アニメ~ション
            setInterval(anime, motion_config.interval_s * 100);

            function anime() {
                //消去
                canvasReset(canvas, canvas_config);

                // 3白のボールを描画
                drawBall(c, motion_config);

                // 4 計算
                motion_config.ball_config.ball_pos = motionFunc(motion_config);
                motion_config.t += motion_config.interval_s;

                // はみ出しの時の処理
                if (outside_process) {
                    outside_process(canvas, motion_config);
                }

                function canvasReset(canvas, canvas_config) {
                    var ctx = canvas.getContext('2d');
                    ctx.globalAlpha = canvas_config.globalAlpha;
                    ctx.fillStyle = canvas_config.fillStyle;
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                }

                function drawBall(ctx, motion_config) {
                    c.globalAlpha = motion_config.ball_config.globalAlpha;
                    c.beginPath();
                    c.arc(motion_config.ball_config.ball_pos.x, motion_config.ball_config.ball_pos.y, motion_config.ball_config.r, 0, 2 * Math.PI);
                    c.closePath();
                    c.fillStyle = motion_config.ball_config.fillStyle;
                    c.fill();
                }
            }
        }
        (function () {
            var obliqueProjectionAnime = function (canvas_id, canvas_config, motion_config, outside_process) {
                motionAnime(canvas_id, canvas_config, obliqueProjection, motion_config, outside_process);

                function obliqueProjection(motion_config) {
                    var ball_pos = { //初期化
                        x: 0,
                        y: 0
                    };
                    ball_pos.x = motion_config.ball_config.ball_pos0.x + motion_config.v0 * Math.cos(motion_config.deg * Math.PI / 180) * motion_config.t;
                    ball_pos.y = motion_config.ball_config.ball_pos0.y + motion_config.v0 * Math.sin(motion_config.deg * Math.PI / 180) * motion_config.t - 0.5 * motion_config.g * motion_config.t * motion_config.t;

                    // console.log(ball_pos);
                    return ball_pos;
                }
            };
            obliqueProjectionAnime('canvas', {
                    // globalAlpha: 0.1,
                    fillStyle: 'transparent'
                }, {
                    ball_config: {
                        fillStyle: 'black',
                        // globalAlpha: 1,
                        r: 5,
                        ball_pos0: // 初期位置
                        {
                            x: 10,
                            y: 10,
                        },
                    },
                    v0: this.power_counter * 5,
                    g: 9.8, //重力加速度
                    deg: 90, //打ち出し角度
                    interval_s: 0.03, //50 msごとに描画
                    t0: 0, //初期時間
                    t: 0
                },
                // console.log(canvas.v0),
                function (canvas, motion_config) {
                    //ボールが右にはみ出したら左からでてくる
                    // if (canvas.width < motion_config.ball_config.ball_pos.x) {
                    //     motion_config.ball_config.ball_pos.x %= canvas.width;
                    // }
                    // if (canvas.width < motion_config.ball_config.ball_pos0.x)
                    // {
                    //   motion_config.ball_config.ball_pos0.x -= canvas.width;
                    // }

                    //ボールが着地したらバウンド
                    if (motion_config.ball_config.ball_pos.y < 10) {
                        motion_config.t = 0;
                        motion_config.ball_config.ball_pos0.x = motion_config.ball_config.ball_pos.x;
                        // motion_config.ball_pos0.v0 - 10;
                    }
                });
        })();
        var self = this;
        circle.setInteractive(true);
        circle.onpointstart = function () {
            self.exit();
        };
    }
});

phina.main(function () {
    var app = GameApp({
        query: '#canvas',
        // Scene01 から開始
        startLabel: 'scene01',
        // シーンのリストを引数で渡す
        scenes: [{
                className: 'Scene01',
                label: 'scene01',
                nextLabel: 'scene02',
            },
            {
                className: 'Scene02',
                label: 'scene02',
                nextLabel: 'scene01',
            },
        ],
        fit: true,
        fps: 30,
    });

    // 実行
    app.run();
});

//今回はクリックした数をパワーに変えてボールを放つというものを作成しました。
//角度はまだ固定で初速度の値にパワーを代入しています。
//そうすることでクリック数に応じ力が変わり飛距離が変わる仕様にできた。

//残っている課題
//角度を変更したときに、canvas領域内の外にボールが出て行ってしまう。
//角度のゲージをどうするか