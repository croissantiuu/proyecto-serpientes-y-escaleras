let rnd;
let x, y;

document.querySelector("#spin").addEventListener("click", function(e) {
    e.preventDefault();
    rnd = Math.floor(Math.random() * 6 + 1);
    switch (rnd) {
        case 1:
            x = 720;
            y = 810;
            break;
        case 6:
            x = 720;
            y = 990;
            break;
        default:
            x = 720 + (6 - rnd) * 90;
            y = 900;
            break;
    }
    document.querySelector(".dice").style.transform = "translateZ(-100px) rotateY(" + x + "deg) rotateX(" + y + "deg)";
});