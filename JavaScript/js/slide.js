
const img = document.querySelectorAll('.img_local-box');
// console.log(img);
var imgLength = img.length;
// console.log(imgList)

const yazirusi = document.querySelectorAll('.move');
// console.log(yazirusi)

var yazirusiLength = yazirusi.length;
// console.log(yazirusiList)

for (let i = 0; i < yazirusiLength; i++){  　/**矢印のノードリスト */
    yazirusi[1].addEventListener('click', imgmove);
    yazirusi[0].addEventListener('click', imgremove);
}

// var tamesi = yazirusi.item(1);
// console.log(tamesi)

function imgmove() {
    if (img[2].classList.contains('add_style') == false) {
        img[2].classList.add('add_style');
    } else if (img[1].classList.contains('add_style') == false) {
        img[1].classList.add('add_style','layer');
    } else if (img[0].classList.contains('add_style') == false) {
        img[0].classList.add('add_style','layer2');
    }
}
function imgremove() {
        if (img[0].classList.contains('add_style') == true) {
            img[0].classList.remove('add_style');
        } else if (img[1].classList.contains('add_style') == true) {
            img[1].classList.remove('add_style');
            img[0].classList.remove('layer2')
        } else if (img[2].classList.contains('add_style') == true) {
            img[2].classList.remove('add_style')
            img[1].classList.remove('layer');
        }
    }
