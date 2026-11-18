window.addEventListener("DOMContentLoaded", () => {
    const navbarEl = document.getElementById("navbar");

    fetch("nav.html")
        .then(res => res.text())
        .then(html => {
            navbarEl.innerHTML = html;
            navbarEl.classList.remove("hidden");
        });
});