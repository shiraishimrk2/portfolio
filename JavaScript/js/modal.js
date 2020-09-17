// ------------- modal-window ↓ --------------
const background = document.createElement('div'); /*モーダルのバック画面を作成 */
const modal_box = document.createElement('div'); /*モーダルの下地を作成 */
const modal_pic = document.createElement('img'); /**下地の上に載せる画像の要素を作成 */
const mypic = new Array("./img/img2.jpg", "./img/img3.jpg", "./img/img1.jpg"); /**画像の配列を指定 */
const boxList = document.querySelectorAll('.img-box'); /*img-boxのnodelistを取得 */
// console.log(boxList);

background.classList.add('modal-background'); /**backgroundにクラスを付与 */
modal_box.classList.add('modal-box'); /**modal_boxにクラスを付与 */
modal_pic.classList.add('modal-pic'); /**modal_picにクラスを付与 */

var listLength = boxList.length;
// console.log(listLength);

for (let index = 0; index < listLength; index++) {
    /* for文でnodelistの一つ一つにイベント*/
    // console.log(boxList[index]);
    boxList[index].addEventListener('click', () => {
        modal_pic.src = mypic[index];
        modalwindow();
    });
};

function modalwindow() {
    const unit = document.querySelector('.unit');
    unit.appendChild(background); /**backgroundを親ノードのunitに追加 */
    background.animate([{
        /**backgroundが追加された時のアニメーションを作成 */
        opacity: 0,
    }, {
        opacity: 1,
    }], 300);
    background.appendChild(modal_box); /**modal_boxをunitに追加 */
    modal_box.appendChild(modal_pic); /**modal_picをmodal_boxに追加 */
    background.addEventListener('click', remove_modalwindow);
}

function remove_modalwindow() {
    const unit = document.querySelector('.unit');
    unit.removeChild(background);
}