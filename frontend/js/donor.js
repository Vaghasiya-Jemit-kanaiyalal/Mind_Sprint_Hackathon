// donor.js
document.addEventListener('DOMContentLoaded', function() {
    const donorForm = document.getElementById('donorForm');
    const thankYouMessage = document.getElementById('thankYouMessage');

    donorForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const formData = new FormData(donorForm);
        const data = {
            name: formData.get('name'),
            bloodGroup: formData.get('bloodGroup'),
            hospital: formData.get('hospital'),
            area: formData.get('area'),
            mobile: formData.get('mobile')
        };

      fetch('/api/donor', {  // <-- Change here
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
})
        .then(response => {
            if (response.ok) {
                donorForm.reset();
                thankYouMessage.style.display = 'block';
                setTimeout(() => {
                    window.location.href = 'thankyou.html';
                }, 2000);
            } else {
                alert('There was an error submitting your information. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error submitting your information. Please try again.');
        });
    });
});