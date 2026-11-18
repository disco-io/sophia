(() => {
    const root = document.getElementById("garden");
    if (!root) return;

    const TECH = [
        ["languages", ["Python", "JavaScript", "Java", "C", "C++", "Bash", "R"]],
        ["ai / ml", ["PyTorch", "LangChain", "Hugging Face", "OpenAI API"]],
        ["ai agents", ["Claude", "Cursor", "Lovable"]],
        ["web & mobile", ["React Native", "Node.js", "Express", "Django", "Postgres", "Supabase"]],
        ["tools", ["AWS", "Docker", "Git", "GitLab", "Linux"]]
    ];
    const GLASS = ["#eef1e2", "#cfe0ad", "#a8c77f", "#7ea85c", "#557f3c"];
    const W = 1200, CELL = 20;

    fetch("contributions.json", { cache: "no-store" })
        .then(res => res.json())
        .then(render)
        .catch(() => render(null));

    function render(data) {
        root.innerHTML = (data ? windowSvg(data) : "") + vinesSvg() + list();
    }

    function bin(s) {
        return [...s].map(c => c.charCodeAt(0).toString(2).padStart(8, "0")).join(" ");
    }

    function esc(s) {
        return s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
    }

    function windowSvg(data) {
        const levels = data.levels;
        const cols = Math.ceil(levels.length / 7);
        const gw = cols * CELL, gh = 7 * CELL;
        const GX = Math.round((W - gw) / 2), GY = 64;
        const start = new Date(data.start + "T00:00:00");
        const fmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });
        let panes = "", months = "", last = -1;

        for (let i = 0; i < levels.length; i++) {
            const d = new Date(start);
            d.setDate(start.getDate() + i);
            const col = Math.floor(i / 7), row = i % 7;
            const x = GX + col * CELL, y = GY + row * CELL;
            const lv = Math.max(0, Math.min(4, +levels[i]));
            panes += `<rect class="gd-pane" style="animation-delay:${(col * 0.035).toFixed(2)}s" x="${x + 1.6}" y="${y + 1.6}" width="${CELL - 3.2}" height="${CELL - 3.2}" rx="2" fill="${GLASS[lv]}"><title>${fmt.format(d)}</title></rect>`;
            if (row === 0 && d.getMonth() !== last) {
                if (last !== -1 || d.getDate() <= 7) {
                    months += `<text x="${x + 2}" y="${GY - 8}" font-size="11">${d.toLocaleString("en-US", { month: "short" }).toLowerCase()}</text>`;
                }
                last = d.getMonth();
            }
        }

        const curl = (x, y, sx, sy) =>
            `<path d="M${x} ${y} c ${sx * 26} ${sy * -2}, ${sx * 40} ${sy * 16}, ${sx * 30} ${sy * 30} c ${sx * -6} ${sy * 8}, ${sx * -18} ${sy * 4}, ${sx * -14} ${sy * -4} c ${sx * 2} ${sy * -5}, ${sx * 8} ${sy * -5}, ${sx * 9} 0" fill="none" stroke="#787f17" stroke-width="2.2" stroke-linecap="round"/>`;
        const fx0 = GX - 10, fx1 = GX + gw + 10, fy0 = GY - 6, fy1 = GY + gh + 6;
        const legend = GLASS.map((c, i) =>
            `<rect x="${1040 + i * 16}" y="14" width="12" height="12" rx="2" fill="${c}" stroke="#4a4520" stroke-width="1.2"/>`).join("");

        return `<svg class="gd-window" viewBox="0 0 ${W} ${fy1 + 8}" role="img" aria-label="${data.total} contributions in the last year, shown as a green stained glass window">
<defs><linearGradient id="gd-sweep" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fffbe8" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
<clipPath id="gd-clip"><rect x="${GX}" y="${GY}" width="${gw}" height="${gh}"/></clipPath></defs>
<text x="${GX - 4}" y="24" font-size="13" fill="#787f17">${data.total} contributions in the last year</text>
<text x="1030" y="24" font-size="11" text-anchor="end" fill="#a3a66a">less</text>${legend}<text x="1124" y="24" font-size="11" fill="#a3a66a">more</text>
<g fill="#8a8f4a">${months}</g>
<rect x="${fx0}" y="${fy0}" width="${gw + 20}" height="${gh + 12}" rx="6" fill="#4a4520"/>
<rect x="${GX - 6}" y="${GY - 2}" width="${gw + 12}" height="${gh + 4}" rx="4" fill="none" stroke="#c59a3e" stroke-width="1.5"/>
<rect x="${GX}" y="${GY}" width="${gw}" height="${gh}" fill="#4a4520"/>
${panes}
<g clip-path="url(#gd-clip)"><g transform="skewX(-18)"><rect class="gd-sweep" x="-220" y="${GY - 20}" width="180" height="${gh + 40}" fill="url(#gd-sweep)"/></g></g>
${curl(fx1, fy0 + 10, 1, 1)}${curl(fx0, fy0 + 10, -1, 1)}${curl(fx1, fy1 - 10, 1, -1)}${curl(fx0, fy1 - 10, -1, -1)}
</svg>`;
    }

    function cubic(p0, p1, p2, p3, n) {
        const out = [];
        for (let k = 0; k <= n; k++) {
            const t = k / n, u = 1 - t;
            out.push([0, 1].map(i => u * u * u * p0[i] + 3 * u * u * t * p1[i] + 3 * u * t * t * p2[i] + t * t * t * p3[i]));
        }
        return out;
    }

    function vinesSvg() {
        const xs = [145, 380, 585, 835, 1060];
        const VY = 6;
        let defs = "", bodies = "", texts = "", labels = "", leaves = "";

        TECH.forEach(([name, items], ci) => {
            const x0 = xs[ci], s = ci % 2 === 0 ? 1 : -1;
            const pts = cubic([x0, VY], [x0 - 46 * s, VY + 60], [x0 + 46 * s, VY + 120], [x0, VY + 185], 40)
                .concat(cubic([x0, VY + 185], [x0 - 46 * s, VY + 250], [x0 + 40 * s, VY + 300], [x0 + 10 * s, VY + 335], 40).slice(1));
            const [ex, ey] = pts[pts.length - 1];
            for (let k = 1; k < 40; k++) {
                const th = k / 39 * Math.PI * 1.7;
                const r = 22 * Math.exp(-0.45 * th);
                pts.push([ex + s * 22 - s * r * Math.cos(th), ey + r * Math.sin(th)]);
            }

            const id = "gd-v" + ci;
            defs += `<path id="${id}" d="M${pts.map(p => p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" L")}"/>`;

            const left = [], right = [], N = pts.length;
            for (let k = 0; k < N; k++) {
                const a = pts[Math.max(0, k - 1)], b = pts[Math.min(N - 1, k + 1)];
                const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1;
                const w = 7 * Math.pow(1 - k / N, 1.2) + 1;
                left.push([pts[k][0] - dy / L * w, pts[k][1] + dx / L * w]);
                right.push([pts[k][0] + dy / L * w, pts[k][1] - dx / L * w]);
            }
            const poly = left.concat(right.reverse()).map(p => p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" L");
            bodies += `<path class="gd-grow" style="animation-delay:${(0.6 + ci * 0.12).toFixed(2)}s" d="M${poly} Z" fill="#b9c78a"/>`;

            const bits = bin(name);
            const period = ((bits.length + 1) * 5.1).toFixed(1);
            texts += `<text font-size="8.5" fill="#5e6420" dominant-baseline="middle"><textPath href="#${id}" startOffset="0">${Array(5).fill(bits).join(" ")}<animate attributeName="startOffset" from="0" to="-${period}" dur="9s" repeatCount="indefinite"/></textPath></text>`;
            const ls = [1, -1, -1, -1, 1][ci];
            labels += `<text x="${x0 + 14 * ls}" y="${VY + 22}" text-anchor="${ls > 0 ? "start" : "end"}" class="gd-cat">${esc(name)}</text>`;

            items.forEach((t, i) => {
                let k = Math.floor(10 + (pts.length - 50) * (i + 0.6) / (items.length + 0.2));
                k = Math.min(k, pts.length - 45);
                const [px, py] = pts[k];
                const side = (i + ci) % 2 === 0 ? 1 : -1;
                const w = t.length * 7.6 + 30;
                const ang = side * (i % 2 ? 10 : -8);
                const lx = px + side * (18 + w / 2), ly = py + 6;
                const fill = (i + ci) % 2 === 0 ? "#f6d3d6" : "#dfe8c6";
                leaves += `<path d="M${px.toFixed(1)} ${py.toFixed(1)} Q ${(px + side * 10).toFixed(1)} ${(py + 12).toFixed(1)} ${(lx - side * w / 2).toFixed(1)} ${ly.toFixed(1)}" fill="none" stroke="#6f8a5a" stroke-width="1.6"/>`
                    + `<g transform="translate(${lx.toFixed(1)} ${ly.toFixed(1)}) rotate(${ang})"><g class="gd-leaf" style="animation-delay:-${((i * 0.7 + ci) % 5).toFixed(1)}s; transform-origin:${(-side * w / 2).toFixed(1)}px 0px">`
                    + `<path d="M${-w / 2} 0 C ${-w / 4} -19, ${w / 4} -19, ${w / 2} 0 C ${w / 4} 19, ${-w / 4} 19, ${-w / 2} 0 Z" fill="${fill}" stroke="#787f17" stroke-width="1.5"/>`
                    + `<text text-anchor="middle" dominant-baseline="middle" y="1" font-size="13" fill="#4f541a">${esc(t)}</text></g></g>`;
            });
        });

        return `<svg class="gd-vines" viewBox="0 0 ${W} 370" role="img" aria-label="Tech I work with, growing on binary vines">
<defs>${defs}</defs>${bodies}${texts}${labels}${leaves}</svg>`;
    }

    function list() {
        return `<div class="gd-list">${TECH.map(([name, items]) =>
            `<div class="gd-group"><h3>${esc(name)}</h3><ul>${items.map(t => `<li>${esc(t)}</li>`).join("")}</ul></div>`).join("")}</div>`;
    }
})();