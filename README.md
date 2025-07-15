# Bingo Django Web Application

## Project Overview

Bingo Web is a Django-based web application that enables users to play a virtual bingo game. The application provides a user-friendly interface for drawing bingo numbers, tracking game progress, and managing bingo cards. It supports multiple languages and includes CSV-based card generation for flexibility.
<img width="2525" height="1239" alt="image" src="https://github.com/user-attachments/assets/b3e39999-64ca-458c-993f-3bfb20dc66f7" />


## Key Features

* **Real-time Number Drawing**: Automatically draw random bingo numbers and display them live on the web interface.
* **Card Management**: Upload and manage bingo card sets stored in CSV format (`cartillas.csv`).
* **User Interface**: Responsive frontend with custom JavaScript and CSS for interactive play (`play.js`, `styles.css`).
* **Multi-language Support**: Internationalization (i18n) files included for various locales (e.g., `en.js`, `es.js`, `fr.js`).
* **Admin Dashboard**: Built-in Django admin for managing cards, game settings, and viewing logs.

## Technology Stack

* **Backend**: Django (Python)
* **Database**: SQLite (default for development)
* **Frontend**: HTML, CSS, JavaScript
* **Dependencies**:

  * Django
  * XRegExp (for enhanced regex support)

## Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd bingo_web
   ```

2. **Create a virtual environment**:

   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

4. **Apply migrations**:

   ```bash
   python manage.py migrate
   ```

5. **Load initial bingo cards** (if needed):

   ```bash
   # Ensure cartillas.csv is in place
   python manage.py loaddata cartillas.csv
   ```

6. **Run the development server**:

   ```bash
   python manage.py runserver
   ```

7. **Access the app**:
   Open your browser and navigate to `http://localhost:8000/`.

## Usage

* Use the main page to start a new bingo game.
* Click on **Draw Number** to reveal the next bingo number.
* Mark your card interactively as numbers are called.
* Admin users can log in at `/admin/` to manage cards and settings.

## Directory Structure

```
bingo_web/            # Project root
├── bingo_web/        # Django project module
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── bingo/            # Core app for bingo logic
│   ├── models.py
│   ├── views.py
│   ├── urls.py
│   ├── migrations/
│   └── static/       # Static assets
│       ├── cartillas.csv
│       ├── css/
│       └── js/
├── db.sqlite3        # SQLite database
├── manage.py         # Django management script
└── requirements.txt  # Python dependencies
```

## Internationalization

Language files are located under `bingo/static/i18n/`, including:

* `en.js` (English)
* `es.js` (Spanish)
* `fr.js` (French)
* ...

## Contributing

Contributions, issues, and feature requests are welcome! Please open an issue or submit a pull request.

## License

This project is released under the MIT License.
