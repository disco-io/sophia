fetch("../nav.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("navbar").innerHTML = data;
    });

fetch("recs.md")
    .then(res => res.text())
    .then(md => {
        document.getElementById("recs").innerHTML = marked.parse(md);
    });