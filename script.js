function updateTime() {
    const now = new Date();
    const options = {
        timeStyle: "short",
        timeZone: "America/Toronto"
    };
    document.getElementById("timezone").textContent =
        `${new Intl.DateTimeFormat("en-US", options).format(now)}`;
}

updateTime();
setInterval(updateTime, 60000);

fetch("nav.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("navbar").innerHTML = data;
    });