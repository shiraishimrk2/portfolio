const mezirusi = document.querySelector('.mezirusi');
const mezirusi2 = document.querySelector('.mezirusi2');
const mezirusi3 = document.querySelector('.mezirusi3');

function nextclick() {
    if (mezirusi3.classList.contains('add_style') === false) {
        mezirusi3.classList.add('add_style');
        mezirusi3.classList.add('layer')
    } else if (mezirusi3.classList.contains('add_style') === true && mezirusi2.classList.contains('add_style2') === false) {
        mezirusi2.classList.add('add_style2');
        mezirusi2.classList.add('layer2')
    } else if (mezirusi2.classList.contains('add_style2') === true && mezirusi.classList.contains('add_style3') === false) {
        mezirusi.classList.add('add_style3');
        mezirusi.classList.add('layer3')
    }
}

function backclick() {
    if (mezirusi.classList.contains('add_style3') === true) {
        mezirusi.classList.remove('add_style3');
    } else if (mezirusi.classList.contains('add_style3') === false && mezirusi2.classList.contains('add_style2') === true) {
        mezirusi2.classList.remove('add_style2');
        mezirusi.classList.remove('layer3');
    } else if (mezirusi2.classList.contains('add_style2') === false && mezirusi3.classList.contains('add_style') === true) {
        mezirusi3.classList.remove('add_style');
        mezirusi2.classList.remove('layer2');
        mezirusi3.classList.remove('layer')
    }
}