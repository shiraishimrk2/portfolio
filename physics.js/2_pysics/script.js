const main = () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // -------------- 計算用定数定義 -------------- //
    // 開始時点の時間を取得しておく
    let prev_time = new Date();

    // ボールの半径
    const r = 10;

    // ボールの初期座標
    let x = 50;
    let y = 440;

    // ボールの初速度
    let vx = 30;
    let vy = -80;

    // 重力加速度
    const a = 10;

    //　反発係数
    const e = 0.9;


    // -------------- 描画処理 -------------- //
    const draw = () => {
        ctx.clearRect(0, 0, 640, 480);
        // 現在時刻を取得
        const now = new Date();
        // 開始時点から現在までの経過時間
        const diffSecond = (now.getTime() - prev_time.getTime()) * 0.01;

        // 次の計算に備えて、 prev_time に now を代入
        prev_time = now;
        width = 500;

        // 現在の x 軸方向の位置
        x = x + (vx * diffSecond);

        // 横方向に飛び出していたら、壁にぶつかっていると判定
        if (x < 0) {
            x = -x; // 壁から飛び出した分を戻す
            vx = -vx; // 動きを反転
            width;
        } else if (x > 640) {
            x = 640 - (x - 640); // 壁から飛び出した分を戻す
            vx = -(vx * e); // 動きを反転
            width;
        };

        // 現在の y 軸方向の位置
        y = y + ((vy * diffSecond) + (0.5 * a * diffSecond * diffSecond));

        // 下方向に飛び出していたら、床にぶつかっていると判定
        if (y > 480) {
            y = 480 - (y - 480); // 床から飛び出した分を戻す
            vy = -(vy * e); // 動きを反転
            width;
        } else {
            vy = vy + (a * diffSecond); // 床にぶつかっていない時は通常通りの動きをさせる
            width;
        }

        ctx.beginPath();
        ctx.fillStyle = 'rgb(63, 81, 181)';
        ctx.arc(x, y, r, 0, Math.PI * 2, false)
        ctx.fill();

        // 次回画面更新時に draw を実行するように指定
        requestAnimationFrame(draw);
    };
    // 一回目描画実行
    draw();
};

document.addEventListener('DOMContentLoaded', main);

//今回はしっかりと跳ね返るように設定。
//これを使うことにより、飛ばしたかつらをバウンドさせることができる。
//しかし、まだボールが食い込んで見えてしまう。