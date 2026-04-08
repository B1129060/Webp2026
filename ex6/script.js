var container = document.getElementById("container");

function random_char() {
    var code = Math.floor(Math.random() * 26) + 97; // a=97, z=122
    return String.fromCharCode(code);
}

function add_new_chars() {
    var n = Math.floor(Math.random() * 3) + 1; // 1~3
    for (var i = 0; i < n; i++) {
        container.innerText += random_char();
    }
}

window.onload = function () {
    var n = Math.floor(Math.random() * 3); // 0~2
    container.innerText = "";

    for (var i = 0; i < n; i++) {
        container.innerText += random_char();
    }

    container.focus();
};

window.addEventListener("keyup", function (e) {
    console.log(e.key);

    if (
        e.key.length === 1 &&
        e.key >= "a" &&
        e.key <= "z"
    ) {
        if (container.innerText.length > 0 && container.innerText[0] === e.key) {
            container.innerText = container.innerText.substring(1);
        }

        add_new_chars();
    }
});