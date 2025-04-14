document.addEventListener('DOMContentLoaded', function() {
  // Initialize theme
  initTheme();
  initTypingAnimation();
  initProjects();
  initCVTracking();
  initContactForm();
  initDateDisplay();
  initScrollAnimations();
});

// Theme handling functionality
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const moonIcon = document.getElementById('moonIcon');
  const sunIcon = document.getElementById('sunIcon');
  
  function setTheme(theme) {
    document.body.className = theme;
    if (theme === 'dark') {
      moonIcon.classList.add('hidden');
      sunIcon.classList.remove('hidden');
    } else {
      moonIcon.classList.remove('hidden');
      sunIcon.classList.add('hidden');
    }
    localStorage.setItem('theme', theme);
  }
  
  // Check local storage for theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme);
  }
  
  themeToggle.addEventListener('click', function() {
    const currentTheme = document.body.className;
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  });
}

// Typing animation
function initTypingAnimation() {
  const roles = ['Web Developer', 'AI/ML Enthusiast', 'Passionate Learner', 'Problem Solver'];
  const roleElement = document.getElementById('role');
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeRole() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      roleElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      roleElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 150;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 1000; // Pause at the end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500; // Pause before typing next role
    }

    setTimeout(typeRole, typingSpeed);
  }
  
  typeRole();
}

// Project rendering
function initProjects() {
  const projects = [
    {
      title: 'Tax Paying Prototype App',
      description: 'Designed and developed a prototype using Figma and related software tools.',
      image: 'tax.jpg',
    },
    {
      title: 'Brain Tumor Classification and Segmentation Model',
      description: 'Utilized deep learning techniques for tumor detection and segmentation.',
      image: 'brain.jpg',
    },
    {
      title: 'Bakery Shop Website',
      description: 'A fully responsive bakery website built with web technologies.',
      image: 'cake.jpeg',
    }
  ];

  const projectsContainer = document.getElementById('projects-container');
  
  if (projectsContainer) {
    projects.forEach(project => {
      const projectCard = document.createElement('div');
      projectCard.className = 'project-card fade-in';

      projectCard.innerHTML = `
        <img src="${project.image}" alt="${project.title}" class="project-image">
        <div class="project-content">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
        </div>
      `;

      projectsContainer.appendChild(projectCard);
    });
  }
}

// CV download tracking
function initCVTracking() {
  const downloadBtn = document.querySelector('.download-cv');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function() {
      console.log('CV downloaded');
    });
  }
}

// Contact form functionality
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const statusMessage = document.getElementById('status-message');
  
  if (!contactForm) return;
  
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  // Google Sheet script URL - Replace with your actual script URL
  const scriptURL = 'https://script.google.com/macros/s/AKfycbwRjHMNb7nE5qOdglZga_2TrR3vgqungjr914Iadpb_/dev';
  
  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
  function validateForm() {
    let isValid = true;
    
    // Reset error messages
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    
    // Validate name
    if (nameInput.value.trim() === '') {
      nameError.textContent = 'Name is required';
      isValid = false;
    }
    
    // Validate email
    if (emailInput.value.trim() === '') {
      emailError.textContent = 'Email is required';
      isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
      emailError.textContent = 'Please enter a valid email address';
      isValid = false;
    }
    
    // Validate message
    if (messageInput.value.trim() === '') {
      messageError.textContent = 'Message is required';
      isValid = false;
    }
    
    return isValid;
  }
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateForm()) {
      // // Show loading state
      // const submitBtn = contactForm.querySelector('button[type="submit"]');
      // const originalBtnText = submitBtn.textContent;
      // submitBtn.disabled = true;
      // submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
      
      // // Simulate form submission (replace with actual endpoint in production)
      // setTimeout(() => {
      //   // Show success message
      //   formStatus.classList.remove('hidden', 'error');
      //   formStatus.classList.add('success');
      //   statusMessage.textContent = 'Message sent successfully!';
      //   contactForm.reset();
        
      //   // Reset button
      //   submitBtn.disabled = false;
      //   submitBtn.innerHTML = originalBtnText;
        
      //   // Hide status message after 5 seconds
      //   setTimeout(() => {
      //     formStatus.classList.add('hidden');
      //   }, 5000);
      // }, 1500);
      // Show loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
      
      // Create form data object
      const formData = new FormData(contactForm);
      
      // Add timestamp
      formData.append('timestamp', new Date().toISOString());
      
      // Send to Google Sheets
      fetch(scriptURL, { 
        method: 'POST', 
        body: formData
      })
      .then(response => {
        if (response.ok) {
          // Show success message
          formStatus.classList.remove('hidden', 'error');
          formStatus.classList.add('success');
          statusMessage.textContent = 'Message sent successfully!';
          contactForm.reset();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .catch(error => {
        console.error('Error submitting form:', error);
        formStatus.classList.remove('hidden', 'success');
        formStatus.classList.add('error');
        statusMessage.textContent = 'There was an error sending your message. Please try again later.';
      })
      .finally(() => {
        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        
        // Hide status message after 5 seconds
        setTimeout(() => {
          formStatus.classList.add('hidden');
        }, 5000);
      });
    }
  });
}

// Display current date
function initDateDisplay() {
  const currentYear = document.getElementById('current-year');
  const currentDate = document.getElementById('current-date');
  
  if (currentYear && currentDate) {
    const now = new Date();
    currentYear.textContent = now.getFullYear();
    currentDate.textContent = now.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
}

// Scroll animations
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  // Target all section elements
  document.querySelectorAll('section').forEach((section) => {
    observer.observe(section);
  });
}
