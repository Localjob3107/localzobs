function openTab(tabName) {
    let i, tabcontent;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].className = tabcontent[i].className.replace(" active", "");
    }
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.style.display = "block";
        selectedTab.className += " active";
    }
}

const gujaratData = {
  "Ahmedabad": ["Ahmedabad", "Bavla", "Daskroi", "Detroj-Rampura", "Dhandhuka", "Dholera", "Dholka", "Mandal", "Sanand", "Viramgam"],
  "Amreli": ["Amreli", "Babra", "Bagasara", "Dhari", "Jafrabad", "Khambha", "Kunkavav vadia", "Lathi", "Lilia", "Rajula", "Savarkundla"],
  "Anand": ["Anand", "Anklav", "Borsad", "Khambhat", "Petlad", "Sojitra", "Tarapur", "Umreth"],
  "Aravalli": ["Bayad", "Bhiloda", "Dhansura", "Malpur", "Meghraj", "Modasa"],
  "Banaskantha": ["Amirgadh", "Bhabhar", "Danta", "Dantiwada", "Deesa", "Deodar", "Dhanera", "Kankrej", "Lakhani", "Palanpur", "Suigam", "Tharad", "Vadgam", "Vav"],
  "Bharuch": ["Bharuch", "Amod", "Anklesvar", "Hansot", "Jambusar", "Jhagadia", "Netrang", "Vagra", "Valia"],
  "Bhavnagar": ["Bhavnagar", "Gariadhar", "Ghogha", "Jesar", "Mahuva", "Palitana", "Sihor", "Talaja", "Umrala", "Vallabhipur"],
  "Botad": ["Botad", "Barwala", "Gadhada", "Ranpur"],
  "Chhota Udaipur": ["Chhota Udepur", "Bodeli", "Jetpur pavi", "Kavant", "Nasvadi", "Sankheda"],
  "Dahod": ["Dahod", "Devgadh baria", "Dhanpur", "Fatepura", "Garbada", "Limkheda", "Sanjeli", "Zalod"],
  "Dang": ["Ahwa", "Subir", "Waghai"],
  "Devbhoomi Dwarka": ["Bhanvad", "Kalyanpur", "Khambhalia", "Okhamandal"],
  "Gandhinagar": ["Gandhinagar", "Dehgam", "Kalol", "Mansa"],
  "Gir Somnath": ["Geer Gadhda", "Kodinar", "Patan-veraval", "Sutrapada", "Talala", "Una"],
  "Jamnagar": ["Jamnagar", "Dhrol", "Jamjodhpur", "Jodiya", "Kalavad", "Lalpur"],
  "Junagadh": ["Junagadh City", "Bhesana", "Junagadh Rural", "Keshod", "Malia", "Manavadar", "Mangrol", "Mendarda", "Vanthali", "Visavadar"],
  "Kutch": ["Abdasa", "Anjar", "Bhachau", "Bhuj", "Gandhidham", "Lakhpat", "Mandvi", "Mundra", "Nakhatrana", "Rapar"],
  "Kheda": ["Kheda", "Galteshwar", "Kapadvanj", "Kathlal", "Mahudha", "Matar", "Mehmedabad", "Nadiad", "Thasra", "Vaso"],
  "Mahisagar": ["Balasinor", "Kadana", "Khanpur", "Lunawada", "Santrampur", "Virpur"],
  "Mehsana": ["Mehsana", "Becharaji", "Jotana", "Kadi", "Kheralu", "Satlasana", "Unjha", "Vadnagar", "Vijapur", "Visnagar"],
  "Morbi": ["Halvad", "Maliya", "Morbi", "Tankara", "Wankaner"],
  "Narmada": ["Dediapada", "Garudeshwar", "Nandod", "Sagbara", "Tilakwada"],
  "Navsari": ["Navsari", "Bansda", "Chikhli", "Gandevi", "Jalalpore", "Khergam"],
  "Panchmahal": ["Ghoghamba", "Godhra", "Halol", "Jambughoda", "Kalol", "Morva Hadaf", "Shehra"],
  "Patan": ["Patan", "Chanasma", "Harij", "Radhanpur", "Sami", "Sankheswar", "Santalpur", "Saraswati", "Sidhpur"],
  "Porbandar": ["Porbandar", "Kutiyana", "Ranavav"],
  "Rajkot": ["Rajkot", "Dhoraji", "Gondal", "Jamkandorna", "Jasdan", "Jetpur", "Kotada Sangani", "Lodhika", "Paddhari", "Upleta", "Vinchhiya"],
  "Sabarkantha": ["Himatnagar", "Idar", "Khedbrahma", "Poshina", "Prantij", "Talod", "Vadali", "Vijaynagar"],
  "Surat": ["Surat", "Bardoli", "Choryasi", "Kamrej", "Mahuva", "Mandvi", "Mangrol", "Olpad", "Palsana", "Umarpada"],
  "Surendranagar": ["Chotila", "Chuda", "Dasada", "Dhrangadhra", "Lakhtar", "Limbdi", "Muli", "Sayla", "Thangadh", "Wadhwan"],
  "Tapi": ["Nizar", "Songadh", "Uchchhal", "Valod", "Vyara"],
  "Vadodara": ["Vadodara", "Dabhoi", "Desar", "Karjan", "Padra", "Savli", "Sinor", "Waghodia"],
  "Valsad": ["Valsad", "Dharampur", "Kaprada", "Pardi", "Umbergaon", "Vapi"]
};

const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyzcQoNTgH2qATnUA80ETB1L5KfabEQEUOWh13zLlGZXmejxri1crWcc3CS0QMLMi9B/exec';

document.addEventListener('DOMContentLoaded', () => {
    const districtSelect = document.getElementById('district');
    const talukaSelect = document.getElementById('taluka');

    // --- Robust Dropdown Population Logic ---

    // 1. Populate Districts
    districtSelect.innerHTML = '<option value="">Select District</option>'; // Add a placeholder
    for (const district of Object.keys(gujaratData)) {
        const option = document.createElement('option');
        option.value = district;
        option.textContent = district;
        districtSelect.appendChild(option);
    }

    // 2. Set Initial State for Talukas
    talukaSelect.innerHTML = '<option value="">Select Taluka</option>';
    talukaSelect.disabled = true;

    // 3. Add Event Listener for District Change
    districtSelect.addEventListener('change', () => {
        const selectedDistrict = districtSelect.value;
        talukaSelect.innerHTML = '<option value="">Select Taluka</option>'; // Reset talukas

        if (selectedDistrict) {
            talukaSelect.disabled = false;
            const talukas = gujaratData[selectedDistrict];
            for (const taluka of talukas) {
                const option = document.createElement('option');
                option.value = taluka;
                option.textContent = taluka;
                talukaSelect.appendChild(option);
            }
        } else {
            talukaSelect.disabled = true; // Disable if no district is selected
        }
    });

    // --- Form Submission and Tab Logic ---

    document.getElementById('jobSeekerForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        const mobile = this.elements['mobile'].value;
        const email = this.elements['email'].value;
        const whatsappNumber = this.elements['whatsapp'].value.replace(/\D/g, ''); // Remove non-numeric characters

        const TEST_MOBILE = '7778884843';
        const TEST_EMAIL = 'info.mr31@gmail.com';

        // Bypass duplicate check for specific test data
        if (!(mobile === TEST_MOBILE || whatsappNumber === TEST_MOBILE || email === TEST_EMAIL)) {
            const existingUsers = JSON.parse(localStorage.getItem('jobSeekers')) || [];
            if (existingUsers.some(user => user.mobile === mobile || user.email === email)) {
                alert('A user with this mobile number or email already exists.');
                return;
            }
            const newUser = { mobile, email };
            existingUsers.push(newUser);
            localStorage.setItem('jobSeekers', JSON.stringify(existingUsers));
        }

        const registrationNumber = 'JSVT' + String(Date.now()).slice(-10);

        // Collect all form data for Google Apps Script
        const formData = new FormData(this);
        formData.append('registrationNumber', registrationNumber);
        formData.append('formType', 'Job Seeker'); // Identify form type in spreadsheet

        try {
            const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const welcomeMessage = `Welcome to Jan Sahyog Vikas Trust! Your registration is successful. Your Registration Number is: ${registrationNumber}`;
                const whatsappUrl = `https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(welcomeMessage)}`;
                window.location.href = whatsappUrl;
            } else {
                const errorText = await response.text();
                console.error('Server error submitting Job Seeker form:', response.status, errorText);
                alert(`There was an error submitting your registration to the server. Status: ${response.status}. Please try again.`);
            }
        } catch (error) {
            console.error('Network error submitting Job Seeker form:', error);
            alert('There was a network error. Please check your internet connection and try again.');
        }
    });

    const addVacancyBtn = document.getElementById('addVacancyBtn');
    const vacancyContainer = document.getElementById('vacancyContainer');

    addVacancyBtn.addEventListener('click', () => {
        const newVacancyEntry = document.createElement('div');
        newVacancyEntry.classList.add('vacancy-entry');
        newVacancyEntry.innerHTML = `
            <div class="input-group">
                <label for="postName">Post Name / Designation</label>
                <input type="text" name="postName" required>
            </div>
            <div class="input-group">
                <label for="vacancyCount">Number of Vacancies</label>
                <input type="number" name="vacancyCount" min="1" required>
            </div>
            <div class="input-group">
                <label for="minSalary">Minimum Salary</label>
                <input type="number" name="minSalary" required>
            </div>
            <div class="input-group">
                <label for="maxSalary">Maximum Salary</label>
                <input type="number" name="maxSalary" required>
            </div>
            <div class="input-group">
                <label for="incentive">Incentive (if any)</label>
                <input type="text" name="incentive">
            </div>
            <div class="input-group">
                <label for="requiredExperience">Required Experience (in years)</label>
                <input type="number" name="requiredExperience" min="0" required>
            </div>
            <button type="button" class="remove-vacancy-btn">Remove</button>
        `;
        vacancyContainer.appendChild(newVacancyEntry);

        newVacancyEntry.querySelector('.remove-vacancy-btn').addEventListener('click', (e) => {
            e.target.closest('.vacancy-entry').remove();
        });
    });

    document.getElementById('jobProviderForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        const mobile = this.elements['mobile'].value;
        const email = this.elements['email'].value;
        const whatsappNumber = this.elements['whatsapp'].value.replace(/\D/g, ''); // Remove non-numeric characters

        const vacancies = [];
        document.querySelectorAll('#vacancyContainer .vacancy-entry').forEach(entry => {
            vacancies.push({
                postName: entry.querySelector('[name="postName"]').value,
                vacancyCount: entry.querySelector('[name="vacancyCount"]').value,
                minSalary: entry.querySelector('[name="minSalary"]').value,
                maxSalary: entry.querySelector('[name="maxSalary"]').value,
                incentive: entry.querySelector('[name="incentive"]').value,
                requiredExperience: entry.querySelector('[name="requiredExperience"]').value
            });
        });

        const registrationNumber = 'JSVTEMP' + String(Math.floor(100000 + Math.random() * 900000));

        // Collect all form data for Google Apps Script
        const formData = new FormData(this);
        formData.append('registrationNumber', registrationNumber);
        formData.append('formType', 'Job Provider'); // Identify form type in spreadsheet
        formData.append('vacancies', JSON.stringify(vacancies)); // Stringify vacancy array

        try {
            const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const welcomeMessage = `Welcome to Jan Sahyog Vikas Trust! Your registration is successful. Your Registration Number is: ${registrationNumber}`;
                const whatsappUrl = `https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(welcomeMessage)}`;
                window.location.href = whatsappUrl;
            } else {
                const errorText = await response.text();
                console.error('Server error submitting Job Provider form:', response.status, errorText);
                alert(`There was an error submitting your registration to the server. Status: ${response.status}. Please try again.`);
            }
        } catch (error) {
            console.error('Network error submitting Job Provider form:', error);
            alert('There was a network error. Please check your internet connection and try again.');
        }
    });

    const hash = window.location.hash.substring(1);
    if (hash) {
        openTab(hash);
    } else {
        openTab('jobSeeker'); // Default to jobSeeker if no hash
    }
});