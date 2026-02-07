window.addEventListener("DOMContentLoaded", () => {
    const navbarEl = document.getElementById("navbar");
    const mainEl = document.getElementById("main");
    const exitScreen = document.getElementById("exit-screen");
    const currentPath = window.location.pathname
        .replace(/\/index\.html$/, "")
        .replace(/\/$/, "");

    fetch("nav.html")
        .then(res => res.text())
        .then(html => {
            navbarEl.innerHTML = html;
            navbarEl.classList.remove("hidden");
        });
    navbarEl.addEventListener("click", e => {
        const link = e.target.closest("a");
        if (!link) return;

        const targetPath = new URL(link.href).pathname
            .replace(/\/index\.html$/, "")
            .replace(/\/$/, "");

        if (targetPath === currentPath) return;
        if (currentPath === "/code") {
            e.preventDefault();

            mainEl.classList.add("hidden");
            navbarEl.classList.add("hidden");
            exitScreen.classList.remove("hidden");

            setTimeout(() => {
                window.location.href = link.href;
            }, 3000);
        }
    });
    setTimeout(() => {
        document.getElementById("loading-screen").classList.add("hidden");
        mainEl.classList.remove("hidden");
    }, 3200);
});