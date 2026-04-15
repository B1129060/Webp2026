var container = document.getElementById('container');
var wrong_count = 0;

window.onload = function () {
    container.textContent = add_new_chars(3);
    container.focus();
};

function add_new_chars(x) {
    var n = Math.floor(Math.random() * x) + 1;
    var str = "";

    for (let i = 0; i < n; i++) {
        str += String.fromCharCode(97 + Math.floor(Math.random() * 26));
    }

    return str;
}

function add_exact_chars(n) {
    var str = "";

    for (let i = 0; i < n; i++) {
        str += String.fromCharCode(97 + Math.floor(Math.random() * 26));
    }

    return str;
}

window.addEventListener("keyup", function (e) {
    if (!/^[a-z]$/.test(e.key)) {
        return;
    }

    var firstone = container.textContent.substring(0, 1);

    if (e.key == firstone) {
        container.textContent = container.textContent.substring(1, container.textContent.length);
        wrong_count = 0;
    } else {
        container.textContent += e.key;
        wrong_count++;
    }

    container.textContent += add_new_chars(3);

    if (wrong_count >= 3) {
        for (let i = 0; i < 3; i++) {
            container.textContent += add_new_chars(3);
        }
        wrong_count = 0;
    }
});