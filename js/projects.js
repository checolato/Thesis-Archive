// js/projects.js

const PROJECTS = [
  {
    id: "pond-mapping",
    title: "Pond Network Mapping",
    season: "Spring 2025",
    filedUnder: "Filed under: Thesis",
    description: "A mapping study of Taoyuan's remaining ponds, tracing their former irrigation logic, present-day erasures, and sensory atmospheres as a basis for the human-centered digital twin.",
    image: "images/pond-mapping.jpg",
    credit: "Pond Network Mapping – Reflective City",
    group: "Projects"
  },
  {
    id: "red-ribbon",
    title: "Qinhuangdao Red Ribbon Park",
    season: "Reference",
    filedUnder: "Filed under: Spatial practice",
    description: "A river-edge park where a continuous red band and wetland ecologies guide movement and environmental learning along the water.",
    image: "images/red-ribbon.jpg",
    credit: "Turenscape, Qinhuangdao Red Ribbon Park",
    group: "Projects"
  },
  {
    id: "houtan-park",
    title: "Houtan Park",
    season: "Reference",
    filedUnder: "Filed under: Spatial practice",
    description: "A constructed wetland that filters river water and shapes pedestrian routes through humidity, scent, and biodiversity.",
    image: "images/houtan-park.jpg",
    credit: "Turenscape, Houtan Park",
    group: "Projects"
  },
  {
    id: "familiarity",
    title: "Familiarity",
    season: "Concept",
    filedUnder: "Filed under: Glossary",
    description: "The slow accumulation of sensory cues—humidity, reflection, sound—that forms an internal map of Taoyuan.",
    image: "images/placeholder.jpg",
    credit: "Concept diagram – Familiarity",
    group: "Concepts"
  }
  // add more objects here as you go
];

// -------- helper to read ?id= from URL --------
function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function renderProjectPage() {
  const id = getQueryParam("id") || "pond-mapping";
  const project = PROJECTS.find(p => p.id === id) || PROJECTS[0];

  // fill main content
  document.title = project.title + " – Reflective City";

  const imgEl = document.getElementById("project-image");
  const creditEl = document.getElementById("project-credit");
  const titleEl = document.getElementById("project-title");
  const seasonEl = document.getElementById("project-season");
  const filedEl = document.getElementById("project-filed");
  const descEl = document.getElementById("project-description");

  if (imgEl && project.image) imgEl.src = project.image;
  if (imgEl) imgEl.alt = project.title;
  if (creditEl) creditEl.textContent = project.credit || "";
  if (titleEl) titleEl.textContent = project.title;
  if (seasonEl) seasonEl.textContent = project.season || "";
  if (filedEl) filedEl.textContent = project.filedUnder || "";
  if (descEl) descEl.textContent = project.description || "";

  // fill sidebar list
  const listEl = document.getElementById("project-list");
  if (!listEl) return;

  listEl.innerHTML = "";

  PROJECTS.forEach(p => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.textContent = p.title;
    a.href = "project.html?id=" + p.id;
    if (p.id === project.id) {
      a.classList.add("is-active");
    }
    li.appendChild(a);
    listEl.appendChild(li);
  });

  // change heading depending on current group (optional)
  const headingEl = document.getElementById("project-list-heading");
  if (headingEl && project.group) {
    headingEl.textContent = project.group;
  }
}

document.addEventListener("DOMContentLoaded", renderProjectPage);
