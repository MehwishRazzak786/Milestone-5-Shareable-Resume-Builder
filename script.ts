
// Grabbing form elements
const form = document.getElementById('resume-form') as HTMLFormElement;
const nameInput = document.getElementById('name') as HTMLInputElement;
const emailInput = document.getElementById('email') as HTMLInputElement;
const contactInput = document.getElementById('contact') as HTMLInputElement;
const profilePicInput = document.getElementById('profile-pic') as HTMLInputElement;
const graduationInput = document.getElementById('graduation') as HTMLInputElement;
const intermediateInput = document.getElementById('intermediate') as HTMLInputElement;
const matriculationInput = document.getElementById('matriculation') as HTMLInputElement;
const currentJobInput = document.getElementById('current-job') as HTMLInputElement;
const previousJobInput = document.getElementById('previous-job') as HTMLInputElement;
const skillInput = document.getElementById('skill-input') as HTMLInputElement;
const addSkillBtn = document.getElementById('add-skill-btn') as HTMLButtonElement;
const skillsList = document.getElementById('skills-list') as HTMLUListElement;
let skills: string[] = [];

// Grabbing display elements
const displayName = document.getElementById('display-name') as HTMLParagraphElement;
const displayEmail = document.getElementById('display-email') as HTMLParagraphElement;
const displayContact = document.getElementById('display-contact') as HTMLParagraphElement;
const displayProfilePic = document.getElementById('display-profile-pic') as HTMLImageElement;
const displayGraduation = document.getElementById('display-graduation') as HTMLParagraphElement;
const displayIntermediate = document.getElementById('display-intermediate') as HTMLParagraphElement;
const displayMatriculation = document.getElementById('display-matriculation') as HTMLParagraphElement;
const displayCurrentJob = document.getElementById('display-current-job') as HTMLParagraphElement;
const displayPreviousJob = document.getElementById('display-previous-job') as HTMLParagraphElement;
const displaySkillsList = document.getElementById('display-skills-list') as HTMLUListElement;

// Function to dynamically add skills in form
addSkillBtn.addEventListener('click', () => {
    const skill = skillInput.value.trim();
    if (skill !== '') {
        skills.push(skill);
        const li = document.createElement('li');
        li.textContent = skill;
        skillsList.appendChild(li);
        skillInput.value = '';
    }
});

// Function to dynamically update the resume
form.addEventListener('submit', (e: Event) => {
    e.preventDefault();

    // Update personal information
    displayName.textContent = `Name: ${nameInput.value}`;
    displayEmail.textContent = `Email: ${emailInput.value}`;
    displayContact.textContent = `Contact: ${contactInput.value}`;
    //displayProfilePic.src = profilePicInput.value || 'images/pic.jpg';
    displayProfilePic.src = profilePicInput.files?.[0] ? URL.createObjectURL(profilePicInput.files[0]) : 'images/pic.jpg';


    // Update education
    displayGraduation.textContent = `Graduation: ${graduationInput.value}`;
    displayIntermediate.textContent = `Intermediate: ${intermediateInput.value}`;
    displayMatriculation.textContent = `Matriculation: ${matriculationInput.value}`;

    // Update work experience
    displayCurrentJob.textContent = `Current Job: ${currentJobInput.value}`;
    displayPreviousJob.textContent = `Previous Job: ${previousJobInput.value}`;

    // Update skills - ONLY after "Generate Resume" is clicked
    displaySkillsList.innerHTML = '';
    skills.forEach(skill => {
        const li = document.createElement('li');
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
    const skillItems = document.querySelectorAll('#display-skills-list li');
    skillItems.forEach((item) => {
        item.addEventListener('click', () => {
            const originalText = item.textContent;
            const input = document.createElement('input');
            input.type = 'text';
            input.value = originalText || '';
            item.innerHTML = '';  // Clear the item content
            item.appendChild(input);

            input.focus();

            // Save the new content when pressing Enter or clicking outside
            input.addEventListener('blur', () => {
                const newText = input.value;
                item.innerHTML = newText;
            });
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const newText = input.value;
                    item.innerHTML = newText;
                }
            });
        });
    });
}

// Function to make a section editable
function makeEditable(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
        element.addEventListener('click', () => {
            const originalText = element.innerText;
            const input = document.createElement('input');
            input.type = 'text';
            input.value = originalText;
            element.innerHTML = '';
            element.appendChild(input);

            input.focus();

            // Save the new content when pressing Enter or clicking outside
            const saveContent = () => {
                const newText = input.value;
                element.innerHTML = newText;
            };

            input.addEventListener('blur', saveContent);
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    saveContent();
                }
            });
        });
    }
}



// Function to handle file input and preview image

profilePicInput.addEventListener('change', (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            displayProfilePic.src = e.target?.result as string;
        };
        reader.readAsDataURL(input.files[0]);
    } else {
        // If no file selected, use default image
        displayProfilePic.src = 'images/pic.jpg'; // Replace with the path to your default image
    }
});


/*// Function to handle profile picture upload
profilePicInput.addEventListener('change', () => {
    const file = profilePicInput.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            displayProfilePic.src = reader.result as string;
        };
        reader.readAsDataURL(file);
    } else {
        displayProfilePic.src = 'images/pic.jpg';
    }
});*/




//sharable link & generate pdf 


// Declare html2pdf so TypeScript knows it's available
declare var html2pdf: any;

// Grabbing the download button
const downloadPdfBtn = document.getElementById('download-pdf-btn') as HTMLButtonElement;

// Function to download resume as PDF
downloadPdfBtn.addEventListener('click', () => {
    const resumeElement = document.getElementById('dynamic-resume') as HTMLElement;

    

// Options for the PDF    
    const options = {
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
const shareLinkBtn = document.getElementById('share-link-btn') as HTMLButtonElement;
const shareLinkDisplay = document.getElementById('share-link-display') as HTMLParagraphElement;

// Function to generate and display the shareable link
shareLinkBtn.addEventListener('click', () => {
    const userName = nameInput.value.trim();

    if (userName !== '') {
        // Instead of creating a new route, keep it simple and link to the current page
        const currentUrl = window.location.href;  // Current page URL
        const shareableUrl = `${currentUrl}?user=${encodeURIComponent(userName)}`;  // Append username as a query param

        // Display the link
        shareLinkDisplay.textContent = `Shareable Link: ${shareableUrl}`;
        shareLinkDisplay.style.display = 'block';

        // Copy the link to the clipboard
        navigator.clipboard.writeText(shareableUrl).then(() => {
            alert('Link copied to clipboard!');
        });
    } else {
        alert('Please enter your name to generate a shareable link.');
    }
});
