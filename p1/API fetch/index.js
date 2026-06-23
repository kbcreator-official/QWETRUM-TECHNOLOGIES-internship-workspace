// ========== 1. GLOBAL VARIABLES & DOM ELEMENTS ==========
let allCountriesData = [];

const countriesGrid = document.getElementById('countriesGrid');
const searchBar = document.getElementById('searchBar');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');
const retryBtn = document.getElementById('retryBtn');

// Modal Elements
const modal = document.getElementById('countryModal');
const modalDetails = document.getElementById('modalDetails');
const closeModal = document.getElementById('closeModal');

// ========== 2. API SE DYNAMIC DATA FETCH KARNA ==========
async function fetchCountries() {
  // UI States ko reset karna reset state
  loadingSpinner.classList.remove('hidden');
  countriesGrid.classList.add('hidden');
  errorMessage.classList.add('hidden');

  try {
    // API Call
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region,languages,currencies');
    
    if (!response.ok) {
      throw new Error('Network response structure failure');
    }

    const data = await response.json();
    
    // Pure global dataset  array 
    allCountriesData = data;

    // Page load for 10 countries 
    displayCountries(allCountriesData.slice(0, 10));

  } catch (error) {
    console.error('Error details:', error);
    errorMessage.classList.remove('hidden');
  } finally {
    loadingSpinner.classList.add('hidden');
  }
}

// ========== 3. DATA  UI CARDS RENDER  ==========
function displayCountries(countriesList) {
  countriesGrid.innerHTML = '';
  
  // Agar search result khaali ho
  if (countriesList.length === 0) {
    countriesGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #666; margin-top: 2rem;">No matching countries found.</p>`;
    countriesGrid.classList.remove('hidden');
    return;
  }

  countriesList.forEach(country => {
    const standardPopulation = Number(country.population).toLocaleString();
    
    const card = document.createElement('div');
    card.className = 'country-card';
    card.style.cursor = 'pointer'; 
    
    card.innerHTML = `
      <div class="flag-box">
        <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" loading="lazy">
      </div>
      <div class="country-info">
        <h3 class="country-name" title="${country.name.common}">${country.name.common}</h3>
        <p class="country-pop">Population: <span>${standardPopulation}</span></p>
        <p style="font-size: 0.75rem; color: #555; margin-top: 6px; font-weight: 500;"> View Details </p>
      </div>
    `;
    
    // CLICK EVENT TRIGGER
    card.onclick = () => showCountryDetail(country);
    
    countriesGrid.appendChild(card);
  });

  countriesGrid.classList.remove('hidden');
}

// ========== 4. CLICK EVENT & MODAL DETAILS LOGIC ==========
function showCountryDetail(country) {
  // Safe string parsing for languages and currencies
  const langs = country.languages ? Object.values(country.languages).join(', ') : 'N/A';
  const currs = country.currencies ? Object.values(country.currencies).map(c => c.name).join(', ') : 'N/A';

  modalDetails.innerHTML = `
    <img src="${country.flags.svg}" class="modal-flag" alt="Flag of ${country.name.common}">
    <div class="modal-info">
      <h2>${country.name.common}</h2>
      <p><strong>Capital:</strong> ${country.capital && country.capital.length > 0 ? country.capital[0] : 'N/A'}</p>
      <p><strong>Region:</strong> ${country.region}</p>
      <p><strong>Population:</strong> ${Number(country.population).toLocaleString()}</p>
      <p><strong>Languages:</strong> ${langs}</p>
      <p><strong>Currency:</strong> ${currs}</p>
    </div>
  `;
  
  modal.classList.remove('hidden');
}

// ========== 5. REAL-TIME FILTER/SEARCH LOGIC ==========
searchBar.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase().trim();

  if (query === '') {
    displayCountries(allCountriesData.slice(0, 10));
  } else {
    // Global filter search logic matching input
    const filtered = allCountriesData.filter(country => 
      country.name.common.toLowerCase().includes(query)
    );
    displayCountries(filtered);
  }
});

// ========== 6. EVENTS LISTENERS CONTROLLERS ==========

// Modal Close button control
closeModal.onclick = () => modal.classList.add('hidden');

// Backdrop container click control to close modal
window.onclick = (event) => {
  if (event.target == modal) {
    modal.classList.add('hidden');
  }
};

// Retry button behavior
retryBtn.addEventListener('click', fetchCountries);

// Initial Application initialization
window.addEventListener('DOMContentLoaded', fetchCountries);