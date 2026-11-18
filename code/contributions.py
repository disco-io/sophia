import json
import re
import urllib.request

USER = "disco-io"
OUT = "code/contributions.json"

req = urllib.request.Request(
    f"https://github.com/users/{USER}/contributions",
    headers={"User-Agent": "Mozilla/5.0"},
)
html = urllib.request.urlopen(req, timeout=30).read().decode("utf-8")

days = []
for tag in re.findall(r"<td[^>]*ContributionCalendar-day[^>]*>", html):
    date = re.search(r'data-date="([0-9-]+)"', tag)
    level = re.search(r'data-level="([0-4])"', tag)
    if date and level:
        days.append((date.group(1), level.group(1)))
days.sort()

text = re.sub(r"<[^>]+>", " ", html)
total = re.search(r"([\d,]+)\s+contributions?\s+in\s+the\s+last\s+year", text)

if not days:
    raise SystemExit("No contribution data found")

with open(OUT, "w") as f:
    json.dump(
        {
            "total": int(total.group(1).replace(",", "")) if total else None,
            "start": days[0][0],
            "levels": "".join(level for _, level in days),
        },
        f,
    )
