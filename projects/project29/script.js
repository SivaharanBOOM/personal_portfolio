const loveMe = document.querySelector('.loveMe');
const times = document.getElementById('times');

let clickTime = 0;
let timesClicked = 0;

loveMe.addEventListener('click',(e) => {
    if(clickTime === 0){
        clickTime = new Date().getTime();
    }else{
        if((new Date().getTime() - clickTime) < 800){
            createHeart(e);
            clickTime = 0;
        }else{
            clickTime = new Date().getTime();
        }
    }
});

function createHeart(e){
    const heart = document.createElement('i');
    heart.classList.add('fas');
    heart.classList.add('fa-heart');

    // Get bounding rect for precise position
    const rect = loveMe.getBoundingClientRect();
    const xInside = e.clientX - rect.left;
    const yInside = e.clientY - rect.top;
    heart.style.top = yInside + 'px';
    heart.style.left = xInside + 'px';

    loveMe.appendChild(heart);

    times.innerHTML = parseInt(times.innerHTML) + 1;

    setTimeout(() => heart.remove(),1000);
}