(() => {
    const box = document.getElementById("welcome");
    if (!box) return;

    let seen = false;
    try {
        seen = sessionStorage.getItem("welcomed") === "1";
    } catch (e) { }
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || calm) {
        box.remove();
        return;
    }
    try {
        sessionStorage.setItem("welcomed", "1");
    } catch (e) { }

    document.documentElement.classList.add("nv-lock");

    const cv = box.querySelector("canvas");
    const ctx = cv.getContext("2d");
    const W = cv.width, H = cv.height;
    const count = box.querySelector(".wl-count");
    const name = box.querySelector(".wl-name");
    const eq = box.querySelector(".wl-eq");

    const kinds = ["hyperboloid", "hyperbolic paraboloid", "helicoid"];
    const kind = kinds[Math.floor(Math.random() * kinds.length)];
    const eqs = {
        "hyperboloid": ["hyperboloid of one sheet", "x²/a² + y²/a² − z²/c² = 1"],
        "hyperbolic paraboloid": ["hyperbolic paraboloid", "z = xy / c"],
        "helicoid": ["helicoid", "r(u,v) = (u cos v, u sin v, cv)"]
    };
    name.textContent = eqs[kind][0];
    eq.textContent = eqs[kind][1];

    const lines = rulings(kind);
    const spiral = golden();
    const lash = whip(spiral);
    const off = document.createElement("canvas");
    off.width = W;
    off.height = H;

    const DUR = 4200;
    const t0 = performance.now();
    let raf = 0;
    let done = false;

    function finish() {
        if (done) return;
        done = true;
        cancelAnimationFrame(raf);
        box.classList.add("out");
        document.documentElement.classList.remove("nv-lock");
        setTimeout(() => box.remove(), 700);
    }

    box.addEventListener("click", finish);
    window.addEventListener("keydown", finish, { once: true });

    function frame(now) {
        const el = now - t0;
        const p = Math.min(1, el / DUR);
        draw(p, el);
        if (p >= 1) finish();
        else raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    function rulings(k) {
        const out = [];
        const n = 24;
        if (k === "hyperboloid") {
            for (let f = 0; f < 2; f++) {
                for (let i = 0; i < n; i++) {
                    const a = i / n * Math.PI * 2;
                    const b = a + (f ? -1.9 : 1.9);
                    out.push({ f, a: [Math.cos(a), Math.sin(a), 1.15], b: [Math.cos(b), Math.sin(b), -1.15] });
                }
            }
        } else if (k === "hyperbolic paraboloid") {
            for (let f = 0; f < 2; f++) {
                for (let i = 0; i < n; i++) {
                    const u = -1 + 2 * i / (n - 1);
                    const pt = s => (f ? [u, s, u * s * 0.9] : [s, u, s * u * 0.9]);
                    out.push({ f, a: pt(-1), b: pt(1) });
                }
            }
        } else {
            for (let i = 0; i < 2 * n; i++) {
                const th = -2 * Math.PI + 4 * Math.PI * i / (2 * n - 1);
                const z = th / (2 * Math.PI) * 0.95;
                const c = Math.cos(th) * 1.05, s = Math.sin(th) * 1.05;
                out.push({ f: i % 2, a: [-c, -s, z], b: [c, s, z] });
            }
        }
        return out;
    }

    function golden() {
        const arcs = [[233, 233, 0, 233, 233, 0], [233, 144, 233, 0, 377, 144], [288, 144, 377, 144, 288, 233],
        [288, 178, 288, 233, 233, 178], [267, 178, 233, 178, 267, 144], [267, 165, 267, 144, 288, 165],
        [275, 165, 288, 165, 275, 178]];
        const pts = [];
        for (const [cx, cy, sx, sy, ex, ey] of arcs) {
            const a0 = Math.atan2(sy - cy, sx - cx);
            let d = Math.atan2(ey - cy, ex - cx) - a0;
            while (d > Math.PI) d -= 2 * Math.PI;
            while (d < -Math.PI) d += 2 * Math.PI;
            const r = Math.hypot(sx - cx, sy - cy);
            for (let k = 0; k < 24; k++) {
                const t = a0 + d * k / 23;
                pts.push([cx + r * Math.cos(t), cy + r * Math.sin(t)]);
            }
        }
        return pts;
    }

    function whip(sp) {
        const pts = [];
        const segs = [[[0, 233], [120, 250], [110, 30], [220, 36]], [[220, 36], [320, 40], [382, 92], [377, 144]]];
        for (const b of segs) {
            for (let k = 0; k <= 40; k++) {
                const t = k / 40, u = 1 - t;
                pts.push([0, 1].map(i => u * u * u * b[0][i] + 3 * u * u * t * b[1][i] + 3 * u * t * t * b[2][i] + t * t * t * b[3][i]));
            }
        }
        return pts.concat(sp.slice(48));
    }

    function draw(p, el) {
        const S = 2.3, OX = (W - 377 * S) / 2, OY = (H - 233 * S) / 2;
        const ease = v => Math.min(1, Math.max(0, v));
        const P = (x, y) => [OX + x * S, OY + y * S];

        const shown = Math.min(lines.length, Math.floor(ease(p / 0.55) * lines.length));
        count.textContent = Math.round(ease(p / 0.55) * 11) + "/11";

        ctx.clearRect(0, 0, W, H);
        ctx.lineCap = "round";

        const g = ease(p / 0.12);
        ctx.save();
        ctx.translate(OX, OY);
        ctx.scale(S, S);
        ctx.globalAlpha = 0.35 * g;
        ctx.fillStyle = "#f2b8c0";
        ctx.fill(new Path2D("M233 144 H267 V178 H233 Z M275 165 H288 V178 H275 Z"));
        ctx.globalAlpha = 0.5 * g;
        ctx.strokeStyle = "#787f17";
        ctx.lineWidth = 2.4 / S;
        ctx.stroke(new Path2D("M0 0 H377 V233 H0 Z M233 0 V233 M233 144 H377 M288 144 V233 M233 178 H288 M267 144 V178 M267 165 H288 M275 165 V178"));
        ctx.restore();

        const rot = el / 4200;
        const tilt = -0.38;
        const proj = q => {
            const [x0, y0, z0] = q;
            const x1 = x0 * Math.cos(rot) - y0 * Math.sin(rot);
            const y1 = x0 * Math.sin(rot) + y0 * Math.cos(rot);
            const y2 = y1 * Math.cos(tilt) - z0 * Math.sin(tilt);
            const z2 = y1 * Math.sin(tilt) + z0 * Math.cos(tilt);
            const d = 4.2 / (4.2 + y2);
            return { x: OX + 116.5 * S + x1 * 160 * d, y: OY + 116.5 * S - z2 * 160 * d, depth: y2 };
        };

        const segs = [];
        for (let i = 0; i < shown; i++) {
            const a = proj(lines[i].a), b = proj(lines[i].b);
            segs.push({ a, b, f: lines[i].f, d: (a.depth + b.depth) / 2, fresh: i >= shown - 2 && shown < lines.length });
        }
        segs.sort((m, n) => n.d - m.d);
        for (const s of segs) {
            const near = 0.45 + 0.55 * (1 - (s.d + 1.3) / 2.6);
            ctx.globalAlpha = Math.max(0.18, Math.min(1, near));
            ctx.strokeStyle = s.f ? "#e6a3a3" : "#787f17";
            ctx.lineWidth = s.fresh ? 4 : 2.2;
            ctx.beginPath();
            ctx.moveTo(s.a.x, s.a.y);
            ctx.lineTo(s.b.x, s.b.y);
            ctx.stroke();
        }
        ctx.globalAlpha = 1;

        const v = ease((p - 0.5) / 0.14);
        const gone = ease((p - 0.72) / 0.14);
        if (v > 0 && gone < 1) {
            const n = Math.max(2, Math.floor(lash.length * v));
            const tail = Math.floor(lash.length * gone);
            const oc = off.getContext("2d");
            oc.clearRect(0, 0, W, H);
            oc.lineCap = "round";
            oc.lineJoin = "round";
            oc.strokeStyle = "#9fb27a";
            for (let k = Math.max(1, tail); k < n; k++) {
                const t = k / lash.length;
                const [x0, y0] = P(lash[k - 1][0], lash[k - 1][1]);
                const [x1, y1] = P(lash[k][0], lash[k][1]);
                oc.lineWidth = 8 * Math.pow(1 - t, 1.4) + 1.2;
                oc.beginPath();
                oc.moveTo(x0, y0);
                oc.lineTo(x1, y1);
                oc.stroke();
            }
            ctx.save();
            ctx.globalAlpha = 0.6 * (1 - gone);
            ctx.drawImage(off, 0, 0);
            ctx.restore();
        }
    }
})();