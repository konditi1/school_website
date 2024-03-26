
function logout(){
    window.location.href = '/';
  };
  
let createStudentForm = document.getElementById('create-student-form');
createStudentForm.onsubmit = (e) => {
    e.preventDefault();
      let name = e.target.name.value;
      let contact = e.target.contact.value;
      let admissionNumber = e.target.admissionNumber.value;
      let faculty = e.target.faculty.value;
      let year = e.target.year.value;
    fetch('/student', {
      method: 'Post',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          "name": name,
          "contact": contact,
          "admissionNumber": admissionNumber,
          "faculty": faculty,
          "year": year
      })
    })
    .then(res => {
        document.getElementById('create-student-form').reset()
    })
    .catch(err => {
        console.log(err);
    })
  }