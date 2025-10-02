# Phone-Tracker 📱🔍

Track phone number information with ease! This project provides a simple interface to look up details about a phone number, including its country, service provider, and geographical location.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Features ✨

*   **Phone Number Lookup:** Get detailed information about a phone number.
*   **Geographical Location:**  Find the country, latitude, and longitude associated with the number.
*   **Service Provider:**  Identify the carrier associated with the phone number.
*   **User-Friendly Interface:**  A clean and intuitive web interface built with Tailwind CSS.
*   **Copy to Clipboard:** Easily copy the lookup results with a click.

## Technologies Used 🛠️

*   **Python:** Backend logic and API.
*   **Flask:**  Web framework.
*   **OpenCage Geocoder:**  For geocoding (latitude and longitude).
*   **phonenumbers:**  For parsing and validating phone numbers.
*   **colorama:**  For colorful terminal output.
*   **python-dotenv:**  For managing environment variables.
*   **HTML/CSS:**  Structure and styles for the web interface.
*   **JavaScript:**  Frontend logic and API interaction.
*   **Tailwind CSS:**  CSS framework for styling.

[![Python](https://img.shields.io/badge/Python-3.7+-blue.svg?style=flat-square&logo=python)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-2.0+-green.svg?style=flat-square&logo=flask)](https://flask.palletsprojects.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0+-blue.svg?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installation ⬇️

Follow these steps to get the project up and running:

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd Phone-Tracker
    ```

2.  **Create a virtual environment (recommended):**

    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Linux/macOS
    venv\Scripts\activate  # On Windows
    ```

3.  **Install the dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

## Configuration ⚙️

1.  **Set up environment variables:**

    *   Create a `.env` file in the project root.
    *   Add your OpenCage API key:

        ```
        OPENCAGE_API_KEY=YOUR_OPENCAGE_API_KEY
        ```

    *   You can obtain an API key from [OpenCage Geocoder](https://opencagedata.com/).

## Usage 🚀

1.  **Run the application:**

    ```bash
    python main.py
    ```

2.  **Open the web interface:**

    *   Navigate to `http://127.0.0.1:5000/` in your web browser.

3.  **Enter a phone number:**

    *   Type the phone number you want to look up in the input field (e.g., +12025550104).
    *   Click the "Get Information" button.

4.  **View the results:**

    *   The results will be displayed in a card below the input form, including the country, service provider, latitude, longitude, and formatted address.

## API Documentation 📖

The application provides a simple API endpoint for looking up phone number information.

### Endpoint: `/lookup`

*   **Method:** `POST`
*   **Content-Type:** `application/json`

#### Request Body:

```json
{
  "phone": "+12025550104"
}
```

#### Response (Success - 200 OK):

```json
{
  "phone": "+12025550104",
  "country": "United States",
  "service_provider": "AT&T",
  "latitude": 38.8951,
  "longitude": -77.0364,
  "address": "1600 Pennsylvania Avenue NW, Washington, D.C. 20500, USA"
}
```

#### Response (Error - 400 Bad Request):

```
ERROR : No phone number in the body of the request
```

#### Response (Error - 500 Internal Server Error):

```
ERROR : Unable to lookup phone number
```

**Example using `curl`:**

```bash
curl -X POST -H "Content-Type: application/json" -d '{"phone": "+12025550104"}' http://127.0.0.1:5000/lookup
```

## Deployment 📦

To deploy this application to a production environment, consider the following:

1.  **Web Server:** Use a production-ready web server like Gunicorn or uWSGI to serve the Flask application.
2.  **Reverse Proxy:**  Set up a reverse proxy server like Nginx or Apache to handle incoming requests and route them to the Flask application.
3.  **Environment Variables:**  Ensure all necessary environment variables (especially `OPENCAGE_API_KEY`) are properly configured in the production environment.
4.  **HTTPS:**  Enable HTTPS to secure the communication between the client and the server.
5.  **Logging:** Implement robust logging to monitor the application's performance and troubleshoot issues.

## Contributing 🤝

We welcome contributions to this project! Here's how you can contribute:

1.  **Fork the repository.**
2.  **Create a new branch** for your feature or bug fix.
3.  **Make your changes** and commit them with descriptive messages.
4.  **Submit a pull request** to the main branch.

## License 📝

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

*   Thanks to [OpenCage Geocoder](https://opencagedata.com/) for providing the geocoding API.
*   Thanks to the [phonenumbers](https://github.com/daviddrysdale/python-phonenumbers) library for phone number parsing and formatting.
*   Special thanks to [Colorama](https://github.com/pallets/flask) for terminal styling.

[![Built with DocMint](https://img.shields.io/badge/Generated%20by-DocMint-red)](https://github.com/kingsleyesisi/DocMint)