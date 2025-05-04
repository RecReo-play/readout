function add(e,t) {
    let el = document.createElement(e);
    el.innerText = t;
    document.body.appendChild(el);
}

function scrollToCenter(element) {
    const elementRect = element.getBoundingClientRect();
    const elementTop = elementRect.top + window.scrollY; // Get the element's top position relative to the document
    const elementHeight = elementRect.height;
    const viewportHeight = window.innerHeight;

    // Calculate the scroll position to center the element
    const scrollPosition = elementTop - (viewportHeight / 2) + (elementHeight / 2);

    // Scroll to the calculated position
    window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth' // Optional: for smooth scrolling
    });
}

function parse(text) {
    text.split("#!").forEach(d => {
        let day = d.split("$\n", 2);
        add('h1',day[0]);

        day[1].split("\n---\n").forEach(n => {
            let theme = n.split("::\n", 2);
            add('h2',theme[0]);
            theme[1].split(". ")
            .map(s => s + ".")
            .forEach(s => {
                let el = document.createElement('p');
                el.innerText = s;
                document.body.appendChild(el);
                lines.push(el);
            });
        });

    });
}

let line = 0;
let lines = [];

fetch("/readout/text.txt")
.then(r=>r.text())
.then(r=>parse(r));

function update() {
    lines.forEach(l => l.className = "");
    lines[line].className = "red";
}

document.addEventListener("click", function (click) {
    click.preventDefault();
    line += (click.clientX > window.innerWidth/2) ? 1 : -1;
    line = (line < 0) ? lines.length-1 : line;
    line = (line >= lines.length) ? 0 : line;
    update();
    scrollToCenter(lines[line]);
});

setInterval(update, 3000);