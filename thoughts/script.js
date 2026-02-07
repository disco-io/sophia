fetch("../nav.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("navbar").innerHTML = data;
    });

fetch("thoughts.md")
    .then(res => res.text())
    .then(md => {
        document.getElementById("blog").innerHTML = marked.parse(md);
    });