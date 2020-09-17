const sirusi = document.querySelector('.sirusi');
const sirusi2 = document.querySelector('.sirusi2');
const sirusi3 = document.querySelector('.sirusi3');

function rightclick() {
    if (sirusi3.classList.contains('add_style') === false) {
        sirusi3.classList.add('add_style');
        sirusi3.classList.add('layer')
    } else if (sirusi3.classList.contains('add_style') === true && sirusi2.classList.contains('add_style2') === false) {
        sirusi2.classList.add('add_style2');
        sirusi2.classList.add('layer2')
    } else if (sirusi2.classList.contains('add_style2') === true && sirusi.classList.contains('add_style3') === false) {
        sirusi.classList.add('add_style3');
        sirusi.classList.add('layer3')
    }
}

function leftclick() {
    if (sirusi.classList.contains('add_style3') === true) {
        sirusi.classList.remove('add_style3');
    } else if (sirusi.classList.contains('add_style3') === false && sirusi2.classList.contains('add_style2') === true) {
        sirusi2.classList.remove('add_style2');
        sirusi.classList.remove('layer3');
    } else if (sirusi2.classList.contains('add_style2') === false && sirusi3.classList.contains('add_style') === true) {
        sirusi3.classList.remove('add_style');
        sirusi2.classList.remove('layer2');
        sirusi3.classList.remove('layer')
    }
}