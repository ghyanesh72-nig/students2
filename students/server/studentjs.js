let currentPage = 1;
const totalPages = 4;

// Function to show the current page
function showPage(pageNumber) {
  const allPages = document.querySelectorAll(".form-page");
  allPages.forEach(page => {
    page.style.display = "none";
  });
  document.getElementById(`page-${pageNumber}`).style.display = "block";

  document.getElementById('prevButton').style.display = pageNumber > 1 ? 'inline-block' : 'none';
  document.getElementById('nextButton').style.display = pageNumber < totalPages ? 'inline-block' : 'none';
  document.getElementById('submitButton').style.display = pageNumber === totalPages ? 'inline-block' : 'none';
}

// Handle "Next" button click
document.getElementById('nextButton').addEventListener('click', () => {
  const currentForm = document.getElementById(`page-${currentPage}`);
  const inputs = currentForm.querySelectorAll("input, select, textarea");

  let isValid = true;
  inputs.forEach(input => {
    if (!input.checkValidity()) {
      isValid = false;
      input.classList.add("error");
    } else {
      input.classList.remove("error");
    }
  });

  if (isValid) {
    currentPage++;
    showPage(currentPage);
  } else {
    alert("Please fill all required fields before proceeding.");
  }
});

// Handle "Previous" button click
document.getElementById('prevButton').addEventListener('click', () => {
  currentPage--;
  showPage(currentPage);
});

// Form submission
document.getElementById("studentForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = {
    firstName: document.getElementById("firstname").value.trim(),
    lastName: document.getElementById("lastname").value.trim(),
    usn: document.getElementById("usn").value.trim(),
    mobile: document.getElementById("mobile").value.trim(),
    email: document.getElementById("email").value.trim(),
    degreeStream: document.getElementById("degreeStream").value.trim(),
    hobbies: document.getElementById("hobbies").value.trim(),
    interestTechnical: document.getElementById("interestTechnical").value.trim(),
    interestExtracurricular: document.getElementById("interestExtracurricular").value.trim(),
    interestSports: document.getElementById("interestSports").value.trim(),
    certifications: document.getElementById("certifications").value.trim(),
    internships: document.getElementById("internships").value.trim(),
    learnSkill: document.getElementById("learnSkill").value.trim(),
    miniProject: document.getElementById("miniProject").value.trim(),
    majorProject: document.getElementById("majorProject").value.trim(),
    researchPapers: document.getElementById("researchPapers").value.trim(),
    achievements: document.getElementById("achievements").value.trim(),
    managementPgcet: document.getElementById("managementPgcet").value.trim(),
    sslc: document.getElementById("sslc").value.trim(),
    puc: document.getElementById("12thPuc").value.trim()
  };

  fetch('http://localhost:5000/submit-form', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => response.json())
    .then(data => {
      alert('Form submitted successfully!');
      console.log(data);
    })
    .catch(error => {
      console.error('Error submitting form:', error);
      alert('Error submitting form.');
    });
});

// Initialize to show the first page
showPage(currentPage);
