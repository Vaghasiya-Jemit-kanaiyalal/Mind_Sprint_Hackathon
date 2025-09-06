// // This file fetches and displays the list of donors from donors.txt dynamically.

document.addEventListener('DOMContentLoaded', function() {
    fetchDonors();
});

// function fetchDonors() {
//     fetch('/api/donors')
//         .then(response => response.json())
//         .then(data => {
//             displayDonors(data);
//         })
//         .catch(error => {
//             console.error('Error fetching donors:', error);
//         });
// }

// function displayDonors(donors) {
//     const donorsContainer = document.getElementById('donor-list');
//     donorsContainer.innerHTML = '';

//     donors.forEach(donor => {
//         const donorCard = document.createElement('div');
//         donorCard.className = 'donor-card';
//         donorCard.innerHTML = `
//             <h3>${donor.name}</h3>
//             <p>Blood Group: ${donor.bloodGroup}</p>
//             <p>Hospital: ${donor.hospital}</p>
//             <p>Area: ${donor.area}</p>
//             <p>Mobile: ${donor.mobile}</p>
//             <button class="life-saved-btn" onclick="removeDonor(this)">Life is Saved</button>
//         `;
//         donorsContainer.appendChild(donorCard);
//     });
// }

// function removeDonor(button) {
//     const donorCard = button.parentElement;
//     donorCard.style.display = 'none';
//     // Optionally, you can also send a request to the server to update the donors list.
// }

function fetchDonors() {
    fetch('/api/donors')
        .then(response => response.json())
        .then(data => {
            displayDonors(data);
        })
        .catch(error => {
            console.error('Error fetching donors:', error);
        });
}
function displayDonors(donors) {
    const donorsContainer = document.getElementById('donor-list');
    donorsContainer.innerHTML = '';
    donors.forEach(donor => {
        const donorCard = document.createElement('div');
        donorCard.className = 'donor-card';
        donorCard.innerHTML = `
            <h3>${donor.name}</h3>
            <p>Blood Group: ${donor.bloodGroup}</p>
            <p>Hospital: ${donor.hospital}</p>
            <p>Area: ${donor.area}</p>
            <p>Mobile: ${donor.mobile}</p>
            <!-- Removed "Life is Saved" button from here -->
        `;
        donorsContainer.appendChild(donorCard);
    });
}
// The removeDonor function is no longer needed here as the button is removed.
// If you had other functionality tied to removeDonor, you would move it elsewhere.