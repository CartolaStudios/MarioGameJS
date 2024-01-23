const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');

var vivo = true;
var score = 0;
var recorde = 0;
var time = 0;
function atualizarPontuacao() {
    document.getElementById('score').textContent = 'Score= ' + score;
    if (score > recorde) {
        recorde = score;
        document.getElementById('recorde').textContent = 'Recorde= ' + recorde;
        localStorage.setItem('Recorde', recorde);
    }
}

function incrementarPontuacao() {
    score += 1;
    atualizarPontuacao();
}







const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}


const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    valorSalvo = localStorage.getItem('Recorde', recorde);
    recorde = valorSalvo;
    document.getElementById('recorde').textContent = 'Recorde= ' + recorde;
    if (pipePosition < 120 && pipePosition > 0 && marioPosition < 80) {
        vivo = false;

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;


        mario.src = "./img/mario-jump-images/game-over.png";
        mario.style.width = "75px"
        mario.style.marginLeft = "50px"
        clearInterval(loop);
    } else {
        if (time > 150) {

            incrementarPontuacao();
            time = 0;
        } else {
            time++;
        }
    }
    

}, 10);
document.addEventListener('keydown', function (event) {
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    if (event.code == 'Space' && marioPosition <= 1) {
        if (vivo) {
            jump();
            //document.addEventListener("keydown", jump);
        }
        else {
            vivo = true;

            location.reload();
            score = 0;
            atualizarPontuacao();
        }
    }
});
