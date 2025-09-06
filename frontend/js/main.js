// frontend/js/main.js

document.addEventListener("DOMContentLoaded", function() {
    // Form validation for donor and request forms
    const validateForm = (form) => {
        const name = form.querySelector("input[name='name']").value;
        const mobile = form.querySelector("input[name='mobile']").value;
        const bloodGroup = form.querySelector("select[name='bloodGroup']").value;

        if (!name || !mobile || !bloodGroup) {
            alert("Please fill in all fields.");
            return false;
        }

        const mobilePattern = /^[0-9]{10}$/;
        if (!mobilePattern.test(mobile)) {
            alert("Please enter a valid mobile number.");
            return false;
        }

        return true;
    };

    // AJAX form submission
    const submitForm = (form, url) => {
        const formData = new FormData(form);
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            if (data === "success") {
                window.location.href = "thankyou.html";
            } else {
                alert("There was an error submitting the form. Please try again.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("There was an error submitting the form. Please try again.");
        });
    };

    // Event listeners for forms
    const donorForm = document.querySelector("#donorForm");
    if (donorForm) {
        donorForm.addEventListener("submit", function(event) {
            event.preventDefault();
            if (validateForm(donorForm)) {
                submitForm(donorForm, "/api/donors");
            }
        });
    }

    const requestForm = document.querySelector("#requestForm");
    if (requestForm) {
        requestForm.addEventListener("submit", function(event) {
            event.preventDefault();
            if (validateForm(requestForm)) {
                submitForm(requestForm, "/api/requests");
            }
        });
    }
});