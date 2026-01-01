const input = document.getElementById("seqInput");
const btn = document.getElementById("decomposeBtn");
const results = document.getElementById("results");

btn.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) {
    results.textContent = "Please enter a sequence.";
    return;
  }

  const map = new Map();

  text.split(",").forEach((part) => {
    const [nStr, xStr] = part.split(":").map((s) => s.trim());
    const n = parseInt(nStr, 10);
    const x = parseFloat(xStr);
    if (!isNaN(n) && !isNaN(x)) {
      map.set(n, x);
    }
  });

  if (!map.size) {
    results.textContent = "Could not parse input. Use format like: -2:1, -1:0, 0:2, 1:0, 2:1";
    return;
  }

  const indices = new Set();
  map.forEach((_, n) => {
    indices.add(n);
    indices.add(-n);
  });
  const sorted = Array.from(indices).sort((a, b) => a - b);

  let out = " n   |  x[n]   x[-n]   x_e[n]   x_o[n]\n";
  out += "-----+----------------------------------\n";

  sorted.forEach((n) => {
    const xn = map.get(n) ?? 0;
    const x_neg = map.get(-n) ?? 0;
    const xe = 0.5 * (xn + x_neg);
    const xo = 0.5 * (xn - x_neg);
    out += `${n.toString().padStart(3)} | ${xn.toFixed(3).padStart(6)} ${x_neg
      .toFixed(3)
      .padStart(7)} ${xe.toFixed(3).padStart(8)} ${xo
      .toFixed(3)
      .padStart(8)}\n`;
  });

  results.textContent = out;
});
