window.onload = async() => {
    const token = await localStorage.getItem('token');
    if (!token) {
        window.location.href = '/home.html';
    }
    const tbody = document.querySelector("table > tbody");

    async function getStudents() {
        try {
            let response = await fetch('/students', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 401) {
                window.location.href = '/home.html';
            }

            let data = await response.json();
            if (!data || data.length === 0) {
                document.getElementById('no-records').innerHTML = 'No students records found! Please add a student record.';
                return;
            }
            tbody.innerHTML = ""; // Clear table before appending
            data.forEach((student, index) => {
                let studentRow = `
                    <tr>
                        <th scope="row">${index + 1}</th>
                        <td>${student?.name}</td>
                        <td>${student?.contact}</td>
                        <td>${student?.admissionNumber}</td>
                        <td>${student?.faculty}</td>
                        <td>${student?.year}</td>
                        <td>
                        <button class="btn btn-danger" onclick="deleteStudent('${student._id}')">Delete</button>
                    </td>
                    
                    </tr>`;
                tbody.innerHTML += studentRow;
            });
        } catch (error) {
            console.log('Error fetching student data:', error);
        }
    }

    getStudents();
}

function logout() {
    // send request to logout route
    try {
        fetch('/logout', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        window.location.href = '/home.html';
    } catch (error) {
        console.log('Error logging out:', error);
        window.location.href = '/home.html';
    }
    
    localStorage.clear();
};

async function deleteStudent(id) {
    const confirmation = confirm('Are you sure you want to delete this student?');

    if (!confirmation) {
        return;
    }

    try {
        let response = await fetch(`/student/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to delete student');
        }
        document.getElementById('message').innerHTML = 'Student deleted successfully';
        // set time out
        setTimeout(() => {
            document.getElementById('message').innerHTML = '';
            window.location.reload();
        }, 2000);
        
    } catch (error) {
        console.log('Error deleting student:', error);
        // alert('Failed to delete student');
    }
}
