
window.onload=()=>{
    const tbody = document.querySelector("table > tbody");
     async function getStudents(){
        let response = await fetch('/students', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        let data = await response.json();
        data.forEach((student,index)=>{
                        let append = `<tr>
                        <th scope="row">${index+1}</th>
                        <td>${student?.name}</td>
                        <td>${student?.contact}</td>
                        <td>${student?.admissionNumber}</td>
                        <td>${student?.faculty}</td>
                        <td>${student?.year}</td>
                        </tr>`
                        tbody.innerHTML += append
                    });
    }
    getStudents();
    

}
function logout(){
    window.location.href = 'home.html';
  };