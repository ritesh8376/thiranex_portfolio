const navLinks = document.getElementById('navLinks');
document.getElementById('menuBtn').onclick = () => navLinks.classList.toggle('show');

// Local fallback projects (used when backend isn't reachable)
const defaultProjects = [
  {
    title: 'GetJet Flight Booking System',
    category: 'Full Stack',
    description: 'A flight booking web app with login, flight search, booking flow, payment screen, and ticket generation.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'MySQL'],
    link: '#'
  },
  {
    title: 'Bus Management System',
    category: 'Database Project',
    description: 'A system to manage buses, routes, passengers, booking records, and schedules efficiently.',
    tech: ['Java', 'JDBC', 'SQL'],
    link: '#'
  },
  {
    title: 'Holographic Fan Display',
    category: 'IoT Project',
    description: 'An ESP32 based POV display concept using addressable LEDs for hologram-like visuals.',
    tech: ['ESP32', 'FastLED', 'Arduino', 'WS2812B'],
    link: '#'
  }
];

async function loadProjects() {
  const projectList = document.getElementById('projectList');
  projectList.innerHTML = '<p>Loading projects...</p>';

  const endpoints = ['/api/projects', 'http://localhost:5000/api/projects'];
  let projects = null;

  for (const ep of endpoints) {
    try {
      const res = await fetch(ep, { mode: 'cors' });
      if (!res.ok) throw new Error('Network response not ok');
      projects = await res.json();
      if (projects && projects.length) break;
    } catch (err) {
      // try next endpoint
    }
  }

  if (!projects || !projects.length) projects = defaultProjects;

  projectList.innerHTML = projects.map(project => `
    <article class="projectCard">
      <h3>${project.title}</h3>
      <p><b>${project.category}</b></p>
      <p>${project.description}</p>
      <div class="tech">${(project.tech || []).map(t => `<span>${t}</span>`).join('')}</div>
    </article>
  `).join('');
}

const form = document.getElementById('contactForm');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const status = document.getElementById('formStatus');
  const data = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value
  };
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    status.textContent = result.message;
    if (result.success) form.reset();
  } catch (error) {
    status.textContent = 'Server error. Please try again.';
  }
});

loadProjects();
