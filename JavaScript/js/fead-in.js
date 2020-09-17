window.addEventListener('scroll', () => {
    feadin();
});

var box = document.querySelectorAll('.box');
// console.log(box);
var boxLength = box.length
// console.log(clientRect);

function feadin() {
    for (let i = 0; i < boxLength; i++) {
        // console.log(box[i]);
        var height = box[i].getBoundingClientRect().top;
        var clientRect = window.innerHeight / 2
        console.log(clientRect)
        if (clientRect >= height) {
            box[i].classList.add('show')
        } else if (clientRect <= height) {
            box[i].classList.remove('show')
        }
    }
}
