
function logout(){
    window.location.href = '/home.html';
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
          method: 'POST',
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
          if (res.status === 500) {
              document.getElementById('student-error').innerHTML = 'Internal server error';
              throw new Error('Internal server error');
          }
          if (res.status === 400) {
              document.getElementById('student-adm-error').innerHTML = 'Student with the same admission number already exists';
              throw new Error('Duplicate admission number');
          }
          if (res.status === 201) {
              document.getElementById('student-error').innerHTML = `${name} registered successfully`;
              createStudentForm.reset(); 
          }
          return res.json(); 
      })
      .catch(err => {
          console.log(err);
      });
  };
  