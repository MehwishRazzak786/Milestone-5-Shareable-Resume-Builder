// Grabbing form elements
var form = document.getElementById('resume-form');
var nameInput = document.getElementById('name');
var emailInput = document.getElementById('email');
var contactInput = document.getElementById('contact');
var profilePicInput = document.getElementById('profile-pic');
var graduationInput = document.getElementById('graduation');
var intermediateInput = document.getElementById('intermediate');
var matriculationInput = document.getElementById('matriculation');
var currentJobInput = document.getElementById('current-job');
var previousJobInput = document.getElementById('previous-job');
var skillInput = document.getElementById('skill-input');
var addSkillBtn = document.getElementById('add-skill-btn');
var skillsList = document.getElementById('skills-list');
var skills = [];
// Grabbing display elements
var displayName = document.getElementById('display-name');
var displayEmail = document.getElementById('display-email');
var displayContact = document.getElementById('display-contact');
var displayProfilePic = document.getElementById('display-profile-pic');
var displayGraduation = document.getElementById('display-graduation');
var displayIntermediate = document.getElementById('display-intermediate');
var displayMatriculation = document.getElementById('display-matriculation');
var displayCurrentJob = document.getElementById('display-current-job');
var displayPreviousJob = document.getElementById('display-previous-job');
var displaySkillsList = document.getElementById('display-skills-list');
// Function to dynamically add skills in form
addSkillBtn.addEventListener('click', function () {
    var skill = skillInput.value.trim();
    if (skill !== '') {
        skills.push(skill);
        var li = document.createElement('li');
        li.textContent = skill;
        skillsList.appendChild(li);
        skillInput.value = '';
    }
});
// Function to dynamically update the resume
form.addEventListener('submit', function (e) {
    var _a;
    e.preventDefault();
    // Update personal information
    displayName.textContent = "Name: ".concat(nameInput.value);
    displayEmail.textContent = "Email: ".concat(emailInput.value);
    displayContact.textContent = "Contact: ".concat(contactInput.value);
    //displayProfilePic.src = profilePicInput.value || 'images/pic.jpg';
    displayProfilePic.src = ((_a = profilePicInput.files) === null || _a === void 0 ? void 0 : _a[0]) ? URL.createObjectURL(profilePicInput.files[0]) : 'images/pic.jpg';
    // Update education
    displayGraduation.textContent = "Graduation: ".concat(graduationInput.value);
    displayIntermediate.textContent = "Intermediate: ".concat(intermediateInput.value);
    displayMatriculation.textContent = "Matriculation: ".concat(matriculationInput.value);
    // Update work experience
    displayCurrentJob.textContent = "Current Job: ".concat(currentJobInput.value);
    displayPreviousJob.textContent = "Previous Job: ".concat(previousJobInput.value);
    // Update skills - ONLY after "Generate Resume" is clicked
    displaySkillsList.innerHTML = '';
    skills.forEach(function (skill) {
        var li = document.createElement('li');
        li.textContent = skill;
        displaySkillsList.appendChild(li);
    });
    // Make all sections editable including the skills list
    makeEditable('display-name');
    makeEditable('display-email');
    makeEditable('display-contact');
    makeEditable('display-graduation');
    makeEditable('display-intermediate');
    makeEditable('display-matriculation');
    makeEditable('display-current-job');
    makeEditable('display-previous-job');
    // Make skills editable after the resume is generated
    makeSkillsEditable();
});
// Function to make skills editable
function makeSkillsEditable() {
    var skillItems = document.querySelectorAll('#display-skills-list li');
    skillItems.forEach(function (item) {
        item.addEventListener('click', function () {
            var originalText = item.textContent;
            var input = document.createElement('input');
            input.type = 'text';
            input.value = originalText || '';
            item.innerHTML = ''; // Clear the item content
            item.appendChild(input);
            input.focus();
            // Save the new content when pressing Enter or clicking outside
            input.addEventListener('blur', function () {
                var newText = input.value;
                item.innerHTML = newText;
            });
            input.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    var newText = input.value;
                    item.innerHTML = newText;
                }
            });
        });
    });
}
// Function to make a section editable
function makeEditable(elementId) {
    var element = document.getElementById(elementId);
    if (element) {
        element.addEventListener('click', function () {
            var originalText = element.innerText;
            var input = document.createElement('input');
            input.type = 'text';
            input.value = originalText;
            element.innerHTML = '';
            element.appendChild(input);
            input.focus();
            // Save the new content when pressing Enter or clicking outside
            var saveContent = function () {
                var newText = input.value;
                element.innerHTML = newText;
            };
            input.addEventListener('blur', saveContent);
            input.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    saveContent();
                }
            });
        });
    }
}
// Function to handle file input and preview image
profilePicInput.addEventListener('change', function (event) {
    var input = event.target;
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            displayProfilePic.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
    else {
        // If no file selected, use default image
        displayProfilePic.src = 'images/pic.jpg'; // Replace with the path to your default image
    }
});
// Grabbing the download button
var downloadPdfBtn = document.getElementById('download-pdf-btn');
// Function to download resume as PDF
downloadPdfBtn.addEventListener('click', function () {
    var resumeElement = document.getElementById('dynamic-resume');
    // Options for the PDF    
    var options = {
        margin: 0.5,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    // Convert the resume HTML content into a PDF and trigger the download
    html2pdf().from(resumeElement).set(options).save();
});
// Grabbing the share link button and display elements
var shareLinkBtn = document.getElementById('share-link-btn');
var shareLinkDisplay = document.getElementById('share-link-display');
// Function to generate and display the shareable link
shareLinkBtn.addEventListener('click', function () {
    var userName = nameInput.value.trim();
    if (userName !== '') {
        // Instead of creating a new route, keep it simple and link to the current page
        var currentUrl = window.location.href; // Current page URL
        var shareableUrl = "".concat(currentUrl, "?user=").concat(encodeURIComponent(userName)); // Append username as a query param
        // Display the link
        shareLinkDisplay.textContent = "Shareable Link: ".concat(shareableUrl);
        shareLinkDisplay.style.display = 'block';
        // Copy the link to the clipboard
        navigator.clipboard.writeText(shareableUrl).then(function () {
            alert('Link copied to clipboard!');
        });
    }
    else {
        alert('Please enter your name to generate a shareable link.');
    }
});
