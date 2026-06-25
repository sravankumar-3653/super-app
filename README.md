# Super App

A React-based entertainment dashboard application built with **Vite**, **React Router**, and **Zustand**.  
This app allows users to register, choose entertainment categories, view a personalized dashboard, browse movies, read live news, check weather updates, write notes, and use a countdown timer.

---

## Live Features

### 1. User Registration
- User enters:
  - Name
  - Username
  - Email
  - Mobile number
- Data is stored in **localStorage** using Zustand.

### 2. Category Selection
- User selects entertainment categories.
- Minimum **3 categories** required.
- Selected categories are stored in **localStorage**.

### 3. Dashboard
Dashboard contains:
- **Profile card**
- **Weather widget**
- **Notes widget**
- **News widget**
- **Timer widget**
- **Browse button** to go to movie page

### 4. Movies Page
- Fetches movies based on selected categories
- Displays movies in category rows
- Clicking a movie opens **Movie Details Modal**

### 5. Notes
- User can write notes
- Notes are stored in localStorage

### 6. Weather Widget
- Fetches live weather data from **OpenWeather API**
- Displays:
  - Weather icon
  - Temperature
  - Pressure
  - Wind speed
  - Humidity
- Shows current date and time

### 7. News Widget
- Fetches top news from **News API**
- Rotates news every **2 seconds**
- Refreshes news data every **60 seconds**
- Handles duplicate articles filtering

### 8. Timer Widget
- Custom timer with:
  - Hours
  - Minutes
  - Seconds
- Start / Pause / Reset controls

---

# Tech Stack

- **React**
- **Vite**
- **React Router DOM**
- **Zustand**
- **OpenWeather API**
- **News API**
- **OMDb API**
- **CSS / Inline Styling**

---

# Folder Structure

```bash
src/
│
├── assets/
│   ├── action.jpg
│   ├── drama.jpg
│   ├── romance.jpg
│   ├── thriller.jpg
│   ├── western.jpg
│   ├── horror.jpg
│   ├── fantasy.jpg
│   ├── music.jpg
│   ├── fiction.jpg
│   ├── news.jpg
│   ├── smallprofile.jpg
│
├── components/
│   ├── CategoryCard.jsx
│   ├── ProtectedRoute.jsx
│   ├── WeatherWidget.jsx
│   ├── NotesWidget.jsx
│   ├── NewsWidget.jsx
│   ├── TimerWidget.jsx
│   ├── MovieDetailsModal.jsx
│
├── pages/
│   ├── Register.jsx
│   ├── Categories.jsx
│   ├── Dashboard.jsx
│   ├── Movies.jsx
│
├── routes/
│   ├── AppRoutes.jsx
│
├── services/
│   ├── movieApi.js
│   ├── weatherApi.js
│   ├── newsApi.js
│
├── store/
│   ├── useStore.js
│
├── App.jsx
├── main.jsx