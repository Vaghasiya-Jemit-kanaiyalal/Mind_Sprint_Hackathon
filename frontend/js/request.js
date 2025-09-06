// request.js

document.addEventListener('DOMContentLoaded', function() {
    const requestForm = document.getElementById('requestForm');
    
    requestForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const formData = new FormData(requestForm);
        const data = {
            name: formData.get('name'),
            patientType: formData.get('patientType'),
            bloodGroup: formData.get('bloodGroup'),
            units: formData.get('units'),
            hospital: formData.get('hospital'),
            area: formData.get('area'),
            mobile: formData.get('mobile')
        };

       fetch('/api/request', {  // <-- Change here
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
})
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = 'thankyou.html';
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        });
    });
});