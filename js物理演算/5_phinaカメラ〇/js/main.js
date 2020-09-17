/*
motion_config:
ball_config
*/
phina.globalize();

var power_counter = 0;
var game_counter = 0;

phina.define("Start", {
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
            // move();
        }

        function move() {
            // var power = power_counter;
            // console.log(power);
        }

        var circle = RectangleShape({
            x: this.gridX.center(),
            y: this.gridY.center(),
            // radius: 100,
            fill: 'blue',
        }).addChildTo(this);

        var self = this;
        circle.setInteractive(true);
        circle.onpointstart = function () {
            self.exit();
            // var box = RectangleShape({
            //     width: 300,
            //     height: 300,

            //     fill: 'black',
            // }).addChildTo(this);
            // box.setPosition(150, 300)
        };
    }
});

phina.define("Scene02", {
    superClass: 'DisplayScene',
    init: function () {
        this.superInit();

        game_counter = 0;

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
            setInterval(anime, motion_config.interval_s * 50);

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
                    ball_pos.y = motion_config.ball_config.ball_pos0.y + motion_config.v0 * Math.sin(motion_config.deg * Math.PI / 180) * motion_config.t - 0.5 * motion_config.g * Math.pow(motion_config.t, 2) * motion_config.t;

                    // console.log(ball_pos);
                    return ball_pos;
                }
            };
            obliqueProjectionAnime('canvas', {
                    // globalAlpha: 5,透明軌跡
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
                    v0: this.power_counter * 10,
                    g: 9.8, //重力加速度
                    deg: 80, //打ち出し角度
                    interval_s: 0.02, //50 msごとに描画
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
                    if (motion_config.ball_config.ball_pos.x > canvas.width / 2) {
                        var tamesi = canvas.getContext('2d');
                        tamesi.translate(-0.4, 0);
                    }


                    //ボールが着地したらバウンド
                    if (motion_config.ball_config.ball_pos.y < 10) {
                        motion_config.t = 0;
                        motion_config.ball_config.ball_pos0.x = motion_config.ball_config.ball_pos.x;
                        // motion_config.ball_pos0.v0 - 10;
                        motion_config.ball_config.ball_pos.v0 - 10;
                        console.log(motion_config.v0);
                        // tamesi.drawImage(canvas, 30, 0);
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

phina.define("Scene03", {
    superClass: 'DisplayScene',
    init: function () {
        this.superInit();

        game_counter = 0;

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
            setInterval(anime, motion_config.interval_s * 50);

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
                    ball_pos.y = motion_config.ball_config.ball_pos0.y + motion_config.v0 * Math.sin(motion_config.deg * Math.PI / 180) * motion_config.t - 0.5 * motion_config.g * Math.pow(motion_config.t, 2) * motion_config.t;

                    // console.log(ball_pos);
                    return ball_pos;
                }
            };
            obliqueProjectionAnime('canvas', {
                    // globalAlpha: 5,透明軌跡
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
                    v0: this.power_counter * 10,
                    g: 9.8, //重力加速度
                    deg: 80, //打ち出し角度
                    interval_s: 0.02, //50 msごとに描画
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
                    var tamesi = canvas.getContext('2d');

                    //ボールが着地したらバウンド
                    if (motion_config.ball_config.ball_pos.y < 10) {
                        motion_config.t = 0;
                        motion_config.ball_config.ball_pos0.x = motion_config.ball_config.ball_pos.x;
                        // motion_config.ball_pos0.v0 - 10;
                        tamesi.translate(motion_config.ball_config.ball_pos.x, 0);
                        // tamesi.drawImage(canvas, 30, 0);
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
        // Start から開始
        startLabel: 'start',
        // シーンのリストを引数で渡す
        scenes: [{
                className: 'Start',
                label: 'start',
                nextLabel: 'scene02',
            },
            {
                className: 'Scene02',
                label: 'scene02',
                nextLabel: 'scene03',
            },
            {
                className: 'Scene03',
                label: 'scene03',
                nextLabel: 'start',
            },
        ],
        fit: true,
        // fps: 500,
    });

    // 実行
    app.run();
});

//前回に飛ばすことはできるようになったので、今回は
//飛ばしたのちにボールがcanvas領域から出ることのないように
//中心位置を移動させなければいけない。
//if文を使い、ボールが画面の半分を超えるとtranslateでctxのx軸を
//マイナス方面に動かすようにしている。
//そうすることにより、ボールはx軸のプラスに動きctxはマイナスに動くので、
//値をより正確にすることで中心にとどめることが可能だと思われる。