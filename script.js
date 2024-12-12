const submitSurvey = async (event) => {
  event.preventDefault(); // Prevent the form from reloading the page

  const form = document.querySelector('form');
  const assignmentId = form.querySelector('input[name="assignment_id"]').value;
  const answer = form.querySelector('textarea[name="answer"]').value; // Ensure you're getting 'answer'

  console.log('Form submission triggered');
  console.log('Assignment ID:', assignmentId);
  console.log('Answer:', answer); // Log the answer

  const surveyData = {
    assignment_id: assignmentId,
    answer: answer  // This must be 'answer' (singular) to match the backend
  };

  try {
    const response = await fetch('http://localhost:3000/survey/store-results', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(surveyData)
    });

    const result = await response.json();
    if (response.ok) {
      console.log('Survey results submitted:', result);
      
      // Scroll back to the homepage (hero section)
      scrollToSection('hero');
    } else {
      console.error('Failed to submit survey:', result);
    }
  } catch (error) {
    console.error('Error submitting survey:', error);
  }
};

// This function scrolls to the section with the specified ID
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: 'smooth',  // Smooth scrolling effect
      block: 'start'       // Align the section to the top of the viewport
    });
  } else {
    console.error(`Section with ID '${sectionId}' not found.`);
  }
}

// This will call scrollToSection when the "Take the Survey" button is clicked
document.querySelector('button').addEventListener('click', function () {
  scrollToSection('survey'); // Scroll to the survey section
});
