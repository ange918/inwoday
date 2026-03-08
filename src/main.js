import './style.css';
import bgImage from '@assets/IMG-20260308-WA0050_1772960053150.jpg';

// Quotes in French about women
const quotes = [
  "Les femmes portent le monde.",
  "Une femme forte construit des générations.",
  "Quand une femme avance, la société avance.",
  "Les femmes sont les piliers du changement.",
  "La force d'une femme transcende les limites.",
  "Chaque femme est une histoire inspirante.",
  "Les rêves des femmes transforment le monde.",
  "Une femme qui ose est une femme qui inspire.",
  "Les femmes créent, innovent, inspirent.",
  "La détermination d'une femme n'a pas de limites.",
  "Les femmes sont des guerrières du cœur.",
  "Chaque femme mérite de briller.",
  "Les femmes unies sont invincibles.",
  "Le pouvoir des femmes change le futur.",
  "Les femmes sont l'avenir."
];

let userPhotoData = null;

// Initialize the app
function initApp() {
  const app = document.getElementById('app');
  
  // Set background image
  app.style.backgroundImage = `url('${bgImage}')`;
  
  app.innerHTML = `
    <div class="container">
      <header class="header">
        <h1 class="title">Women Inspire Generator</h1>
        <p class="subtitle">Créez une carte inspirante pour une femme spéciale</p>
      </header>

      <main class="main-content">
        <div class="form-wrapper">
          <form id="inspireForm" class="form">
            <div class="form-group">
              <label for="womanName" class="label">Nom de la femme</label>
              <input 
                type="text" 
                id="womanName" 
                class="input" 
                placeholder="Entrez le nom..."
                required
              />
            </div>

            <div class="form-group">
              <label for="message" class="label">Message personnel</label>
              <textarea 
                id="message" 
                class="textarea" 
                placeholder="Écrivez un message inspirant..."
                rows="4"
                required
              ></textarea>
            </div>

            <div class="form-group">
              <label for="photoUpload" class="label">Photo de la personne</label>
              <div class="photo-upload-wrapper">
                <input 
                  type="file" 
                  id="photoUpload" 
                  class="photo-input" 
                  accept="image/*"
                />
                <label for="photoUpload" class="photo-upload-label">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                  <span>Cliquez pour ajouter une photo</span>
                </label>
                <div id="photoPreview" class="photo-preview hidden"></div>
              </div>
            </div>

            <button type="submit" class="btn-generate">
              <span>Générer</span>
              <svg class="icon-btn" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 5v14M5 12h14"/>
              </svg>
            </button>
          </form>
        </div>

        <div id="cardContainer" class="card-container hidden">
          <div id="card" class="card">
            <div id="cardPhotoContainer" class="card-photo-container hidden">
              <img id="cardPhoto" class="card-photo" src="" alt="Photo"/>
            </div>
            <div class="card-header">
              <svg class="card-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </div>
            <h2 class="card-title" id="cardTitle">Pour [Nom]</h2>
            <p class="card-message" id="cardMessage"></p>
            <div class="card-divider"></div>
            <p class="card-quote" id="cardQuote"></p>
          </div>

          <div class="card-actions">
            <button id="downloadBtn" class="btn-action btn-download">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Télécharger
            </button>
            <button id="shareBtn" class="btn-action btn-share">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="18" cy="5" r="3"/>
                <circle cx="6" cy="12" r="3"/>
                <circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
              Partager
            </button>
          </div>
        </div>
      </main>

      <footer class="footer">
        <p>Célébrez les femmes inspirantes 💜</p>
      </footer>
    </div>
  `;

  // Re-attach background after innerHTML
  app.style.backgroundImage = `url('${bgImage}')`;

  // Event listeners
  const form = document.getElementById('inspireForm');
  const cardContainer = document.getElementById('cardContainer');
  const downloadBtn = document.getElementById('downloadBtn');
  const shareBtn = document.getElementById('shareBtn');
  const photoInput = document.getElementById('photoUpload');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    generateCard();
  });

  downloadBtn.addEventListener('click', downloadCard);
  shareBtn.addEventListener('click', shareCard);
  
  photoInput.addEventListener('change', (e) => {
    handlePhotoUpload(e);
  });
}

// Handle photo upload
function handlePhotoUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    userPhotoData = e.target.result;
    const preview = document.getElementById('photoPreview');
    preview.innerHTML = `<img src="${userPhotoData}" alt="Preview"/>`;
    preview.classList.remove('hidden');
  };
  reader.readAsDataURL(file);
}

// Generate inspirational card
function generateCard() {
  const womanName = document.getElementById('womanName').value.trim();
  const message = document.getElementById('message').value.trim();
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  if (!womanName || !message) {
    alert('Veuillez remplir tous les champs');
    return;
  }

  // Update card content
  document.getElementById('cardTitle').textContent = `Pour ${womanName}`;
  document.getElementById('cardMessage').textContent = message;
  document.getElementById('cardQuote').textContent = `✨ "${randomQuote}"`;

  // Update photo if provided
  if (userPhotoData) {
    const photoContainer = document.getElementById('cardPhotoContainer');
    document.getElementById('cardPhoto').src = userPhotoData;
    photoContainer.classList.remove('hidden');
  } else {
    document.getElementById('cardPhotoContainer').classList.add('hidden');
  }

  // Show card with animation
  const cardContainer = document.getElementById('cardContainer');
  cardContainer.classList.remove('hidden');
  cardContainer.classList.add('fade-in');

  // Scroll to card
  setTimeout(() => {
    cardContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 100);
}

// Download card as image
async function downloadCard() {
  const card = document.getElementById('card');
  const womanName = document.getElementById('womanName').value.trim() || 'inspire';

  try {
    const canvas = await html2canvas(card, {
      backgroundColor: '#ffffff',
      scale: 2,
      useCORS: true,
    });

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `women-inspire-${womanName.toLowerCase().replace(/\s+/g, '-')}.png`;
    link.click();
  } catch (error) {
    console.error('Erreur lors du téléchargement:', error);
    alert('Erreur lors du téléchargement de la carte');
  }
}

// Share on WhatsApp
function shareCard() {
  const womanName = document.getElementById('womanName').value.trim();
  const message = document.getElementById('message').value.trim();
  const quote = document.getElementById('cardQuote').textContent;

  const whatsappMessage = encodeURIComponent(
    `Pour ${womanName}:\n\n${message}\n\n${quote}\n\n💜 Women Inspire Generator`
  );

  window.open(`https://wa.me/?text=${whatsappMessage}`, '_blank');
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);
