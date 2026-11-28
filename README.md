# Alberto Clocks — Art of KeepingTime

A responsive, single-page web application (SPA) built for **Alberto Watch Company**. This project serves as a digital storefront for a full-service luxury watch repair, appraisal, and retail store. 

##  Live Demo
Check out the deployed website here: https://alberto-clocks-six.vercel.app/

## Project Overview
The website is designed to be highly responsive, working seamlessly across desktop, tablet, and mobile browsers. It features a modern, editorial-style layout with a luxury aesthetic (cream, espresso, and bronze color palette). 

The application dynamically fetches product data from a local JSON file, rendering the UI on the fly without needing to reload the page.

## Tech Stack
 **Frontend:** HTML5, CSS3
 **Framework:** Bootstrap 5 (used extensively for layout, grids, modals, and utilities)
 **Languages:** JavaScript (ES6), jQuery
 **Data Store:** JSON (`data/data.json`)
 **Fonts:** Google Fonts (Cinzel, Cormorant Garamond, Inter, JetBrains Mono)
 **Icons:** Bootstrap Icons
 **Deployment:** Vercel

## Key Features According to Problem Statement Compliance
**Dynamic Collections:** Products are categorized into four distinct lines (Vintage, Luxury, Smart Watches, Sport).
**Interactive Popups:** Clicking any watch opens a Bootstrap-powered modal displaying full details, high-res imagery, and pricing.
**Live Price List:** A searchable and sortable table of all available watches.
**Masonry Gallery:** A responsive image gallery showcasing the craftsmanship of the timepieces.
**Contact & Sitemap:** Includes a fully functional UI for customer enquiries, store address, and site navigation.
**Live Status Ticker:** A continuous scrolling ticker at the bottom of the page showing the live Date, Time, and the user's Geolocation (using the HTML5 Geolocation API).
**Visitor Counter:** Tracks and displays the number of visitors using `localStorage`.
**Responsive Navbar:** A floating, glassmorphism navigation bar that animates into a pill shape on scroll, with an animated hamburger menu for mobile.

How to Run Locally
Because this project uses AJAX ($.getJSON) to fetch data from a JSON file, you cannot simply double-click index.html. Modern browsers block local file requests for security reasons (CORS policy).

*Clone the repository to your local machine.
Open the project folder in Visual Studio Code.
Install the Live Server extension (by Ritwick Dey) if you haven't already.
Right-click on index.html and select "Open with Live Server".
The site will open in your default browser at http://127.0.0.1:5500.*

Team / Credits
Developed by: [Alberto Clocks (2606D) / Tanveer Jaweed, Faiqa Ali, Sana]

Project Type: Academic eProject Submission

## 📁 Folder Structure
```The Current File/ Folder structure looks like this
alberto-clocks/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Custom styling & animations
├── js/
│   └── script.js       # jQuery logic, AJAX, and DOM manipulation
├── data/
│   └── data.json       # JSON database for watches, gallery, and product lines
└── assets/
    ├── bootstrap/      # Local Bootstrap CSS & JS
    └── bootstrap-icons/
