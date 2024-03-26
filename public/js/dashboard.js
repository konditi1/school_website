
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
    
    
    //   .then(res => {
    //       if(res?.status==200){
    //         let data =JSON.parse(res.json());
    //         console.log(data);
    //         res.data.forEach((student,index)=>{
    //             let append = `<tr>
    //             <th scope="row">${index+1}</th>
    //             <td>${student?.name}</td>
    //             <td>${student?.contacts}</td>
    //             <td>${student?.admissionNumber}</td>
    //             <td>${student?.faculty}</td>
    //             <td>${student?.year}</td>
    //             </tr>`
    //             tbody.innerHTML += append
    //         })
    //       }
    //   })
    //   .catch(err => {
    //       console.log(err);
    //   })
}
function logout(){
    window.location.href = 'home.html';
  };