# Blood Donation Portal

## Overview
The Blood Donation Portal is a web application designed to facilitate blood donation and requests. It allows potential donors to submit their information and enables users to request blood for patients in need. The portal features a modern and professional layout, ensuring a user-friendly experience.

## Project Structure
```
blood-donation-portal
├── backend
│   ├── server.js          # Express server handling requests
│   └── package.json       # Backend dependencies and scripts
├── data
│   ├── donors.txt         # Stores donor information
│   └── requests.txt       # Stores blood request information
├── frontend
│   ├── css
│   │   └── style.css      # CSS styles for the frontend
│   ├── js
│   │   ├── main.js        # General JavaScript functions
│   │   ├── donor.js       # Donor page specific functionality
│   │   ├── request.js     # Request page specific functionality
│   │   ├── donors.js      # Fetch and display donors
│   │   ├── urgent.js      # Fetch and display urgent requests
│   │   ├── requirements.js # Fetch and display all requests
│   │   ├── search.js      # Search functionality for donors and requests
│   │   └── help.js        # FAQ and instructions page functionality
│   ├── index.html         # Main dashboard page
│   ├── donor.html         # Donor submission page
│   ├── request.html       # Blood request submission page
│   ├── thankyou.html      # Thank you page after submission
│   ├── blood_donors.html  # Displays all donors
│   ├── urgent.html        # Displays urgent blood requests
│   ├── requirements.html   # Displays all blood requests
│   ├── search.html        # Search page for donors and requests
│   └── help.html          # FAQ and instructions page
├── images
│   ├── hero.jpg           # Hero image for the dashboard
│   ├── slider1.jpg        # Image for the donor page slider
│   ├── slider2.jpg        # Image for the donor page slider
│   ├── background.jpg      # Background image for forms
│   └── footer.jpg         # Footer image for all pages
└── README.md              # Project documentation
```

## Setup Instructions

1. **Clone the Repository**
   ```
   git clone <repository-url>
   cd blood-donation-portal
   ```

2. **Install Backend Dependencies**
   Navigate to the `backend` directory and install the required packages:
   ```
   cd backend
   npm install
   ```

3. **Run the Server**
   Start the Express server:
   ```
   node server.js
   ```

4. **Access the Application**
   Open your web browser and navigate to `http://localhost:3000` to access the Blood Donation Portal.

## Usage
- **Be a Donor**: Fill out the donor form on `donor.html` to register as a donor.
- **Request Blood**: Use the `request.html` page to submit a blood request.
- **View Donors**: Check the `blood_donors.html` page to see all registered donors.
- **Urgent Requests**: Visit `urgent.html` to view urgent blood requests.
- **Search Functionality**: Use the `search.html` page to find donors or requests based on specific criteria.
- **Help and FAQs**: Access the `help.html` page for frequently asked questions and instructions.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.