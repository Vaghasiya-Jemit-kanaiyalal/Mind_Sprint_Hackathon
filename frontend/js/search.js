// This file implements the search functionality for donors and requests based on hospital name, area, and blood group.

document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const resultsContainer = document.getElementById('searchResults');

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const hospitalName = document.getElementById('hospital').value;
        const area = document.getElementById('area').value;
        const bloodGroup = document.getElementById('bloodGroup').value;

        fetchResults(hospitalName, area, bloodGroup);
    });

    function fetchResults(hospitalName, area, bloodGroup) {
        fetch('/api/donors')
            .then(response => response.json())
            .then(donors => {
                const filteredDonors = donors.filter(donor => {
                    return (donor.hospital.includes(hospitalName) || hospitalName === '') &&
                           (donor.area.includes(area) || area === '') &&
                           (donor.bloodGroup === bloodGroup || bloodGroup === '');
                });
                displayResults(filteredDonors, 'Donors');
            });

        fetch('/api/requests')
            .then(response => response.json())
            .then(requests => {
                const filteredRequests = requests.filter(request => {
                    return (request.hospital.includes(hospitalName) || hospitalName === '') &&
                           (request.area.includes(area) || area === '') &&
                           (request.bloodGroup === bloodGroup || bloodGroup === '');
                });
                displayResults(filteredRequests, 'Requests');
            });
    }

    function displayResults(results, type) {
        resultsContainer.innerHTML = '';
        if (results.length === 0) {
            resultsContainer.innerHTML = `<p>No ${type.toLowerCase()} found.</p>`;
            return;
        }

        results.forEach(result => {
            const resultCard = document.createElement('div');
            resultCard.classList.add('result-card');
            resultCard.innerHTML = `
                <h3>${type === 'Donors' ? result.name : result.patientName}</h3>
                <p>Blood Group: ${result.bloodGroup}</p>
                <p>Hospital: ${result.hospital}</p>
                <p>Area: ${result.area}</p>
                <p>Contact: ${result.mobile}</p>
            `;
            resultsContainer.appendChild(resultCard);
        });
    }
});