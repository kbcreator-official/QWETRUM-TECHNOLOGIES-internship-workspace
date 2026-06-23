// ========== 1. CENTRAL CONTROLLER FLOW ARCHITECTURE STATE ==========
let currentActiveStep = 1;

// Document Form Inputs Cache Mapping Elements References
const formElement = document.getElementById('multiStepForm');
const passInput = document.getElementById('userPassword');
const strengthMeterFill = document.getElementById('strengthMeterFill');
const strengthLabel = document.getElementById('strengthLabel');

// ========== 2. STEP SECTIONS WIZARD NAVIGATION SYSTEM ==========
function navigateStep(fromStep, toStep) {
  if (toStep > fromStep) {
    // If attempting forward progress sequence operation pipeline, execute strict validation check loops first
    if (!validateStepSequence(fromStep)) return;
  }

  // Manage visibility states
  document.getElementById(`step${fromStep}`).classList.add('hidden');
  document.getElementById(`step${toStep}`).classList.remove('hidden');

  // Sync update UI flow node elements
  updateWizardNodesProgressBarIndicator(toStep);
  currentActiveStep = toStep;

  // Render variables values inside data preview compilation summary window
  if (toStep === 3) compileSummaryPreviewRecordsData();
}

function updateWizardNodesProgressBarIndicator(step) {
  // Setup node status references loops
  for (let idx = 1; idx <= 3; idx++) {
    const node = document.getElementById(`node${idx}`);
    const conn = document.getElementById(`conn${idx}`);

    if (idx < step) {
      node.className = "step-node complete";
      if (conn) conn.className = "step-connector filled";
    } else if (idx === step) {
      node.className = "step-node active";
      if (conn) conn.className = "step-connector";
    } else {
      node.className = "step-node";
      if (conn) conn.className = "step-connector";
    }
  }
}

// ========== 3. ENGINE VALIDATION REGEX RULES LOGIC ==========
function validateStepSequence(step) {
  let isCurrentSectionPassed = true;

  if (step === 1) {
    const name = document.getElementById('fullName').value.trim();
    const age = document.getElementById('userAge').value.trim();
    const phone = document.getElementById('phoneNum').value.trim();

    // Full Name check evaluation parameters
    if (name.length < 3) {
      document.getElementById('nameError').innerText = "Identity name must contain minimum 3 algorithmic characters.";
      isCurrentSectionPassed = false;
    } else {
      document.getElementById('nameError').innerText = "";
    }

    // Age bounds checking validation
    const numericalAge = parseInt(age);
    if (!age || isNaN(numericalAge) || numericalAge < 18 || numericalAge > 100) {
      document.getElementById('ageError').innerText = "Age parameters require values between limits 18 and 100.";
      isCurrentSectionPassed = false;
    } else {
      document.getElementById('ageError').innerText = "";
    }

    // Phone format regex standard analysis evaluator baseline pattern mapping execution logic
    const phoneRegex = /^03\d{9}$/;
    if (!phoneRegex.test(phone)) {
      document.getElementById('phoneError').innerText = "Invalid pattern assignment tracking configuration structure setup. Target match: 03XXXXXXXXX";
      isCurrentSectionPassed = false;
    } else {
      document.getElementById('phoneError').innerText = "";
    }
  }

  if (step === 2) {
    const email = document.getElementById('userEmail').value.trim();
    const pass = passInput.value;
    const confirmPass = document.getElementById('confirmPassword').value;

    // Email matching execution parameters evaluation filter pipeline structure parsing mapping
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      document.getElementById('emailError').innerText = "Invalid structural sequence deployment config matching context logic address system mapping.";
      isCurrentSectionPassed = false;
    } else {
      document.getElementById('emailError').innerText = "";
    }

    // Password baseline character constraints processing parameters configuration metrics mapping verification operations
    if (pass.length < 6) {
      document.getElementById('passError').innerText = "System account access parameters require structural limits minimum 6 characters.";
      isCurrentSectionPassed = false;
    } else {
      document.getElementById('passError').innerText = "";
    }

    // Strict value identity equivalence check matching procedures
    if (pass !== confirmPass) {
      document.getElementById('confirmPassError').innerText = "Mismatch event discovered tracking dynamic parameter assignments comparison configuration states.";
      isCurrentSectionPassed = false;
    } else {
      document.getElementById('confirmPassError').innerText = "";
    }
  }

  return isCurrentSectionPassed;
}

// ========== 4. LIVE INTERACTIVE COMPLEX PASSWORD EVALUATOR ==========
passInput.addEventListener('input', () => {
  const value = passInput.value;
  let scorePointsTracker = 0;

  if (value.length >= 6) scorePointsTracker++;
  if (/[A-Z]/.test(value)) scorePointsTracker++;
  if (/[0-9]/.test(value)) scorePointsTracker++;
  if (/[^A-Za-z0-9]/.test(value)) scorePointsTracker++;

  // Configuration display mappings based on points parameters variables
  switch(scorePointsTracker) {
    case 0:
    case 1:
      strengthMeterFill.style.width = "25%";
      strengthMeterFill.style.background = "#e74c3c";
      strengthLabel.innerText = "Strength Evaluator: Weak Security Level Risk Profile";
      break;
    case 2:
      strengthMeterFill.style.width = "50%";
      strengthMeterFill.style.background = "#f1c40f";
      strengthLabel.innerText = "Strength Evaluator: Moderate Standard Structural Setup";
      break;
    case 3:
      strengthMeterFill.style.width = "75%";
      strengthMeterFill.style.background = "#3498db";
      strengthLabel.innerText = "Strength Evaluator: Advanced Security Protection Configuration Base";
      break;
    case 4:
      strengthMeterFill.style.width = "100%";
      strengthMeterFill.style.background = "#2ecc71";
      strengthLabel.innerText = "Strength Evaluator: Absolute Encryption Parameter Level Locked";
      break;
  }
});

// ========== 5. SUMMARY PREVIEW POPULATION COMPILER MODULE ==========
function compileSummaryPreviewRecordsData() {
  const summaryContainer = document.getElementById('summaryViewContent');
  
  const fields = [
    { label: "Profile Name Context Identifier", value: document.getElementById('fullName').value },
    { label: "Validated Registration Age Bounds", value: document.getElementById('userAge').value },
    { label: "Communication Routing Phone Identity", value: document.getElementById('phoneNum').value },
    { label: "Access Token Verification Email System", value: document.getElementById('userEmail').value }
  ];

  summaryContainer.innerHTML = fields.map(item => `
    <div class="summary-item">
      <label>${item.label}</label>
      <p>${item.value}</p>
    </div>
  `).join('');
}

// ========== 6. LOCAL STORAGE DATA PERSISTENCE LAYER CONTROLLERS ==========
formElement.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!validateStepSequence(3)) return;

  // Object mapping variables metrics structure payload configuration baseline
  const registrationRecordPayload = {
    id: Date.now(), // Unique structural identity timeline seed key indicator reference value
    name: document.getElementById('fullName').value.trim(),
    age: document.getElementById('userAge').value.trim(),
    phone: document.getElementById('phoneNum').value.trim(),
    email: document.getElementById('userEmail').value.trim()
  };

  // Pull existing stack records array sequence structures out of local standard system space mapping targets
  const structuralCurrentStack = JSON.parse(localStorage.getItem('sas_registry_records')) || [];
  structuralCurrentStack.push(registrationRecordPayload);
  
  localStorage.setItem('sas_registry_records', JSON.stringify(structuralCurrentStack));

  // Reset parameters configuration mappings loops values transitions states
  formElement.reset();
  strengthMeterFill.style.width = "0%";
  strengthLabel.innerText = "Strength Evaluator: Null";
  
  navigateStep(3, 1);
  renderRegistryStorageArchiveTable();
});

function renderRegistryStorageArchiveTable() {
  const tableBody = document.getElementById('tableBodyContent');
  const targetStack = JSON.parse(localStorage.getItem('sas_registry_records')) || [];

  tableBody.innerHTML = '';

  if (targetStack.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #555; padding: 2rem;">No active configuration registry profiles discovered inside current system storage state.</td></tr>`;
    return;
  }

  targetStack.forEach(record => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${record.name}</td>
      <td>${record.age}</td>
      <td>${record.phone}</td>
      <td>${record.email}</td>
      <td>
        <button class="btn-delete-record" onclick="purgeRegistryIdentityRecord(${record.id})">Purge Record</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function purgeRegistryIdentityRecord(targetId) {
  let targetStack = JSON.parse(localStorage.getItem('sas_registry_records')) || [];
  targetStack = targetStack.filter(item => item.id !== targetId);
  localStorage.setItem('sas_registry_records', JSON.stringify(targetStack));
  renderRegistryStorageArchiveTable();
}

// Boot operations startup tracking initialization configuration metrics setup flow triggers
window.addEventListener('DOMContentLoaded', renderRegistryStorageArchiveTable);