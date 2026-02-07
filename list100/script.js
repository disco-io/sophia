fetch("../nav.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("navbar").innerHTML = data;
    });

fetch("list100.txt")
    .then(res => res.text())
    .then(data => {
        const tasks = data.split("\n").filter(line => line.trim() !== "");
        const container = document.getElementById("list100");

        let count = 1;

        tasks.forEach(task => {
            const item = document.createElement("div");
            item.classList.add("icon-item");
            item.innerHTML = `<span>${count}. ${task}</span>`;
            item.style.marginBottom = "1em";
            container.appendChild(item);
            count++;
        });
    });