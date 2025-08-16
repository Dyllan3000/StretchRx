const cardsEl = document.getElementById("cards");
const favEl = document.getElementById("favorites");
const searchEl = document.getElementById("search");
const chipEls = document.querySelectorAll(".chip");
const tpl = document.getElementById("card-tpl");
const LS_KEY = "stretchrx.favs";

let ALL = [];
let favs = new Set(JSON.parse(localStorage.getItem(LS_KEY) || "[]"));
let activeFilter = "all";
let query = "";

// Load data
fetch("data/stretches.json")
  .then(r => r.json())
  .then(data => { ALL = data; render(); renderFavs(); });

function render(){
  const items = ALL.filter(byFilter).filter(byQuery);
  cardsEl.innerHTML = "";
  items.forEach(s => cardsEl.appendChild(cardFor(s)));
}
function byFilter(s){
  if (activeFilter === "all") return true;
  return s.group === activeFilter || s.type === activeFilter;
}
function byQuery(s){
  if (!query) return true;
  const q = query.toLowerCase();
  return s.name.toLowerCase().includes(q) ||
         (s.muscles||[]).join(" ").toLowerCase().includes(q);
}
function cardFor(s){
  const node = tpl.content.cloneNode(true);

  // 1) show image if provided in JSON
  const img = node.querySelector(".thumb");        // <img class="thumb" ...>
  if (img && s.image) {
    img.src = s.image;                             // e.g. "Pictures/wall-hamstring.png"
    img.alt = s.name;
    img.style.display = "block";                   // override CSS "display: none"
  }

  // 2) title + meta
  node.querySelector(".name").textContent = s.name;
  node.querySelector(".meta").textContent =
    `${label(s.group)} • ${(s.muscles || []).join(", ") || "—"} • ${s.duration || "—"}`;

  // 3) steps
  const stepsOl = node.querySelector(".steps");
  (s.steps || []).forEach(step => {
    const li = document.createElement("li");
    li.textContent = step;
    stepsOl.appendChild(li);
  });

  // 4) favorites
  const favBtn = node.querySelector(".fav");
  favBtn.classList.toggle("on", favs.has(s.id));
  favBtn.addEventListener("click", () => toggleFav(s.id, favBtn));

  return node;
}


function toggleFav(id, btn){
  if (favs.has(id)) favs.delete(id); else favs.add(id);
  localStorage.setItem(LS_KEY, JSON.stringify([...favs]));
  btn?.classList.toggle("on");
  renderFavs();
}
function renderFavs(){
  favEl.innerHTML = "";
  ALL.filter(s => favs.has(s.id)).forEach(s => favEl.appendChild(cardFor(s)));
}
function label(k){ return ({upper:"Upper Body", lower:"Lower Body", full:"Full Body"}[k]) || k; }

searchEl.addEventListener("input", e => { query = e.target.value; render(); });
chipEls.forEach(chip => chip.addEventListener("click", () => {
  chipEls.forEach(c => c.classList.remove("active"));
  chip.classList.add("active");
  activeFilter = chip.dataset.filter;
  render();
}));
