# AI Movie Insight
AI Movie Insight Builder is a full-stack web application that allows users to search for a movie using an IMDb ID and view detailed movie information along with AI-generated audience sentiment insights.

The application fetches movie data, stores recent searches locally, and provides a clean, responsive user interface for exploring movie information.

## Features
- Search movies using IMDb ID
- Display movie poster, title, year, and IMDb rating
- Maintain recent search history using localStorage
- Click a history card to view movie details again
- Responsive design for desktop and mobile
- Clean and minimal UI

### Future enhancements can include:
- Audience reviews fetching
- AI-generated sentiment summary
- Sentiment classification (Positive / Mixed / Negative)


## Tech Stack
### Frontend
- Next.js (React framework)
- TypeScript
- Tailwind CSS

## APIs
- OMDb API for movie data

## Deployment
- Vercel (recommended for Next.js apps)


## Installation and Setup

### Clone the repository:
```
git clone https://github.com/yourusername/ai-movie-insight.git
```

### Navigate to the project directory:

```
cd ai-movie-insight
```

### Install dependencies:

```
npm install
```

### Create an environment variable file:

```
.env.local
```

### Add your OMDb API key:

```
NEXT_PUBLIC_OMDB_API_KEY=your_api_key_here
```

### Start the development server:

```
npm run dev
```

### Open the application in the browser:

```
http://localhost:3000
```

## How It Works

1. User enters an IMDb ID in the search input.
2. The app fetches movie data from the OMDb API.
3. Movie details are displayed including poster, title, year, and rating.
4. The searched movie is saved in localStorage.
5. Recent searches appear as cards for quick access.


## Deployment
### The application can be deployed easily using Vercel.
Steps:
- Push the repository to GitHub
- Import the project into Vercel
- Add the environment variable:

NEXT_PUBLIC_OMDB_API_KEY
- Deploy the application

## Author

### Sartaj Alam
- Full Stack Developer (MERN Stack)
- Email: sartaj9806@gmail.com