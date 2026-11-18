fetch("../nav.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("navbar").innerHTML = data;
    });

const FERN = `<svg viewBox="0 0 300 26" aria-hidden="true"><path d="M10 13 H290"/>${Array.from({ length: 17 }, (_, i) => 30 + i * 14)
    .map(x => `<path d="M${x} 13 q 6 -8 14 -9 M${x} 13 q 6 8 14 9"/>`).join("")}<circle cx="150" cy="13" r="4"/></svg>`;

const TILE = `<svg class="tg-tile" viewBox="-12 -12 257 401" aria-hidden="true"><path class="tg-cell" d="M0 288 H89 V377 H0 Z"/><path class="tg-cell" d="M55 233 H89 V267 H55 Z"/><path class="tg-grid" pathLength="1" d="M0 0 H233 V377 H0 Z M0 233 H233 M89 233 V377 M0 288 H89 M55 233 V288 M55 267 H89 M68 267 V288 M55 275 H68"/><g class="tg-leaves"><path d="M233 233 C 215 262, 190 290, 150 302 C 186 282, 210 258, 233 233 Z"/><path d="M233 233 C 242 270, 238 304, 214 334 C 227 298, 229 266, 233 233 Z"/><path d="M68 280 C 50 262, 40 246, 44 226 C 52 246, 60 262, 68 280 Z"/></g><path class="tg-vine" pathLength="1" d="M0.0 0.0 L22.8 1.1 L45.5 4.5 L67.6 10.0 L89.2 17.7 L109.8 27.5 L129.4 39.3 L147.8 52.9 L164.8 68.2 L180.1 85.2 L193.7 103.6 L205.5 123.2 L215.3 143.8 L223.0 165.4 L228.5 187.5 L231.9 210.2 L233.0 233.0 L232.3 247.1 L230.2 261.1 L226.8 274.8 L222.0 288.1 L216.0 300.9 L208.7 313.0 L200.3 324.4 L190.8 334.8 L180.4 344.3 L169.0 352.7 L156.9 360.0 L144.1 366.0 L130.8 370.8 L117.1 374.2 L103.1 376.3 L89.0 377.0 L80.3 376.6 L71.6 375.3 L63.2 373.2 L54.9 370.2 L47.0 366.5 L39.6 362.0 L32.5 356.8 L26.1 350.9 L20.2 344.5 L15.0 337.4 L10.5 330.0 L6.8 322.1 L3.8 313.8 L1.7 305.4 L0.4 296.7 L0.0 288.0 L0.3 282.6 L1.1 277.3 L2.4 272.0 L4.2 267.0 L6.5 262.1 L9.3 257.4 L12.5 253.1 L16.1 249.1 L20.1 245.5 L24.4 242.3 L29.1 239.5 L34.0 237.2 L39.0 235.4 L44.3 234.1 L49.6 233.3 L55.0 233.0 L58.3 233.2 L61.6 233.7 L64.9 234.5 L68.0 235.6 L71.0 237.0 L73.9 238.7 L76.6 240.7 L79.0 243.0 L81.3 245.4 L83.3 248.1 L85.0 251.0 L86.4 254.0 L87.5 257.1 L88.3 260.4 L88.8 263.7 L89.0 267.0 L88.9 269.1 L88.6 271.1 L88.1 273.1 L87.4 275.0 L86.5 276.9 L85.5 278.7 L84.2 280.3 L82.8 281.8 L81.3 283.2 L79.7 284.5 L77.9 285.5 L76.0 286.4 L74.1 287.1 L72.1 287.6 L70.1 287.9 L68.0 288.0 L66.7 287.9 L65.5 287.8 L64.2 287.4 L63.0 287.0 L61.9 286.5 L60.8 285.8 L59.8 285.0 L58.8 284.2 L58.0 283.2 L57.2 282.2 L56.5 281.1 L56.0 280.0 L55.6 278.8 L55.2 277.5 L55.1 276.3 L55.0 275.0"/><g class="tg-bell" style="transition-delay:1.60s"><path class="tg-stem" d="M72.0 11.4 Q67.7 18.7 67.7 42.7"/><path class="tg-cup" d="M54.7 58.7 C 52.7 39.7, 82.7 39.7, 80.7 58.7 Q 76.7 55.7 73.7 62.7 Q 70.7 56.7 67.7 60.7 Q 64.7 56.7 61.7 62.7 Q 58.7 55.7 54.7 58.7 Z"/><path class="tg-rib" d="M67.7 44.7 V57.7"/><circle class="tg-shine" cx="62.7" cy="48.7" r="2"/></g><g class="tg-bell" style="transition-delay:1.85s"><path class="tg-stem" d="M131.0 40.3 Q123.1 45.9 123.1 69.9"/><path class="tg-cup" d="M110.1 85.9 C 108.1 66.9, 138.1 66.9, 136.1 85.9 Q 132.1 82.9 129.1 89.9 Q 126.1 83.9 123.1 87.9 Q 120.1 83.9 117.1 89.9 Q 114.1 82.9 110.1 85.9 Z"/><path class="tg-rib" d="M123.1 71.9 V84.9"/><circle class="tg-shine" cx="118.1" cy="75.9" r="2"/></g><g class="tg-bell" style="transition-delay:2.10s"><path class="tg-stem" d="M179.5 84.5 Q168.7 87.4 168.7 111.4"/><path class="tg-cup" d="M155.7 127.4 C 153.7 108.4, 183.7 108.4, 181.7 127.4 Q 177.7 124.4 174.7 131.4 Q 171.7 125.4 168.7 129.4 Q 165.7 125.4 162.7 131.4 Q 159.7 124.4 155.7 127.4 Z"/><path class="tg-rib" d="M168.7 113.4 V126.4"/><circle class="tg-shine" cx="163.7" cy="117.4" r="2"/></g><g class="tg-bell" style="transition-delay:2.35s"><path class="tg-stem" d="M213.8 140.5 Q201.0 140.0 201.0 164.0"/><path class="tg-cup" d="M188.0 180.0 C 186.0 161.0, 216.0 161.0, 214.0 180.0 Q 210.0 177.0 207.0 184.0 Q 204.0 178.0 201.0 182.0 Q 198.0 178.0 195.0 184.0 Q 192.0 177.0 188.0 180.0 Z"/><path class="tg-rib" d="M201.0 166.0 V179.0"/><circle class="tg-shine" cx="196.0" cy="170.0" r="2"/></g></svg>`;

fetch("list100.txt")
    .then(res => res.text())
    .then(data => {
        const list = document.getElementById("list100");
        const lines = data.split("\n").map(l => l.trim()).filter(Boolean);
        let n = 0;

        lines.forEach(line => {
            const li = document.createElement("li");

            if (line.startsWith("...")) {
                li.className = "pl-more";
                li.textContent = line;
                list.appendChild(li);
                return;
            }

            n++;
            const done = line.startsWith("✓");
            let text = line.replace(/^✓\s*/, "");
            let note = "";
            const m = done && text.match(/^(.*?)\s*\(([^()]*)\)\s*$/);
            if (m) {
                text = m[1];
                note = m[2];
            }

            li.className = "pl-item" + (done ? " done" : "");
            li.innerHTML = `<span class="pl-num">${n}</span><span class="pl-text"></span>`;
            if (done) li.setAttribute("aria-label", "Done: " + text);
            const span = li.querySelector(".pl-text");
            span.textContent = text;
            if (note) {
                const em = document.createElement("em");
                em.textContent = ` (${note})`;
                span.appendChild(em);
            }
            list.appendChild(li);

            if (n % 5 === 0 && lines.length - 1 > n) {
                const sep = document.createElement("li");
                sep.className = "pl-fern";
                sep.setAttribute("aria-hidden", "true");
                sep.innerHTML = FERN;
                list.appendChild(sep);
            }
        });

        sides();
    });

function sides() {
    const main = document.querySelector(".pl-main");
    const cols = [...document.querySelectorAll(".pl-side")];

    const watch = new IntersectionObserver(items => {
        items.forEach(it => {
            if (it.isIntersecting) {
                it.target.classList.add("in");
                watch.unobserve(it.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll(".pl-mini").forEach(el => {
        el.innerHTML = TILE;
        watch.observe(el.firstElementChild);
    });

    const fill = () => {
        cols.forEach(col => col.innerHTML = "");
        const w = cols[0].offsetWidth;
        if (!w) return;
        const h = w * 401 / 257;
        const count = Math.max(1, Math.floor(main.offsetHeight / (h + 40)));
        for (let i = 0; i < count; i++) {
            cols.forEach(col => {
                col.insertAdjacentHTML("beforeend", TILE);
                const t = col.lastElementChild;
                if (i % 2) t.classList.add("flip");
                watch.observe(t);
            });
        }
    };

    fill();
    let last = window.innerWidth;
    window.addEventListener("resize", () => {
        if (Math.abs(window.innerWidth - last) > 40) {
            last = window.innerWidth;
            fill();
        }
    });
}