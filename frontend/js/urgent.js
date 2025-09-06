// // This file fetches and displays urgent blood requests dynamically.

// document.addEventListener('DOMContentLoaded', function() {
//     fetchUrgentRequests();
// });

// function fetchUrgentRequests() {
//     fetch('/api/urgent-requests')
//         .then(response => response.json())
//         .then(data => {
//             displayUrgentRequests(data);
//         })
//         .catch(error => {
//             console.error('Error fetching urgent requests:', error);
//         });
// }

// function displayUrgentRequests(requests) {
//     const requestsContainer = document.getElementById('urgent-requests-container');
//     requestsContainer.innerHTML = '';

//     if (requests.length === 0) {
//         requestsContainer.innerHTML = '<p>No urgent requests available at the moment.</p>';
//         return;
//     }

//     requests.forEach(request => {
//         const requestCard = document.createElement('div');
//         requestCard.className = 'request-card';
//         requestCard.innerHTML = `
//             <h3>${request.name}</h3>
//             <p>Patient Type: ${request.patientType}</p>
//             <p>Blood Group: ${request.bloodGroup}</p>
//             <p>Units Needed: ${request.units}</p>
//             <p>Hospital: ${request.hospital}</p>
//             <p>Area: ${request.area}</p>
//             <p>Contact: ${request.mobile}</p>
//         `;
//         requestsContainer.appendChild(requestCard);
//     });
// }
document.addEventListener('DOMContentLoaded', function() {
    fetchUrgentRequests();
});
function fetchUrgentRequests() {
    fetch('/api/urgent-requests')
        .then(response => response.json())
        .then(data => {
            displayUrgentRequests(data);
        })
        .catch(error => {
            console.error('Error fetching urgent requests:', error);
        });
}
function displayUrgentRequests(requests) {
    const requestsContainer = document.getElementById('urgent-requests-container');
    requestsContainer.innerHTML = '';
    if (requests.length === 0) {
        requestsContainer.innerHTML = '<p>No urgent requests available at the moment.</p>';
        return;
    }
    // Get saved IDs from localStorage (or empty array if none)
    const savedIds = JSON.parse(localStorage.getItem('lifeSavedUrgentRequests') || '[]');
    requests.forEach(request => {
        // Skip requests that are already marked as saved
        if (savedIds.includes(request.id)) {
            return; // do not display this request
        }
        const requestCard = document.createElement('div');
        requestCard.className = 'request-card';
        requestCard.innerHTML = `
            <h3>${request.name}</h3>
            <p>Patient Type: ${request.patientType}</p>
            <p>Blood Group: ${request.bloodGroup}</p>
            <p>Units Needed: ${request.units}</p>
            <p>Hospital: ${request.hospital}</p>
            <p>Area: ${request.area}</p>
            <p>Contact: ${request.mobile}</p>
            <button class="life-saved-btn" onclick="removeRequest(this, '${request.id}')">Life is Saved</button>
        `;
        requestsContainer.appendChild(requestCard);
    });
}
// Function to hide the request card when "Life is Saved" button is clicked
function removeRequest(button, id) {
    const requestCard = button.parentElement;
    requestCard.style.display = 'none';
    // Save this id in localStorage
    let savedIds = JSON.parse(localStorage.getItem('lifeSavedUrgentRequests') || '[]');
    if (!savedIds.includes(id)) {
        savedIds.push(id);
        localStorage.setItem('lifeSavedUrgentRequests', JSON.stringify(savedIds));
    }
}
    // You can add more complex logic here, like sending a request to the server
    // to mark this request as fulfilled in your data storage (e.g., requests.txt).