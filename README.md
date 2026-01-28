````md
# Event Media Viewer 📸

Event Media Viewer is a React Native mobile application that allows users to browse events and view event-related photos in a smooth, performant, and user-friendly way.  
The app is designed to simulate how event media platforms display events and their photo galleries.

This project was developed as part of a **React Native Internship – Technical Task Assignment** and was built incrementally with a commit-by-commit approach.

---

## ✨ Features

### Core Features
- 📅 **Event List Screen**
  - Displays a list of events with name and code
  - Search events by name or event code
- 🧾 **Event Details Screen**
  - Shows selected event information
  - Navigate to event photo gallery
- 🖼️ **Photo Gallery Screen**
  - Grid-based photo layout
  - Photos fetched from the Unsplash API
  - Lazy loading and pagination
  - Loading indicators and empty states
- 🔍 **Photo Viewer Screen**
  - Fullscreen photo viewing
  - Swipe left/right between photos
  - Pinch-to-zoom support

### Bonus Features
- ⚡ **Offline Image Caching** using `expo-image`
- 🌙 **System-based Dark Mode**
- ✨ **Subtle Fade-in Animations**
- 🧠 Graceful error and empty-state handling

---

## 🛠️ Tech Stack

- **React Native**
- **Expo**
- **React Navigation (Native Stack)**
- **Unsplash Public API**
- **expo-image** (disk & memory caching)
- **react-native-gesture-handler**
- **react-native-reanimated**

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18 or later recommended)
- Expo CLI
- Android Emulator or Expo Go app

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/bishalnaik13/event-media-viewer.git
   cd event-media-viewer


2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Add Unsplash Access Key**

   Update `app.json`:

   ```json
   {
     "expo": {
       "extra": {
         "unsplashAccessKey": "YOUR_UNSPLASH_ACCESS_KEY"
       }
     }
   }
   ```

4. **Run the app**

   ```bash
   npm start
   ```

5. Open the app using:

   * Android Emulator, or
   * Expo Go (scan QR code)

---

## 📱 APK Build

The APK build can be downloaded from:

👉 **[APK Download Link](https://github.com/bishalnaik13/Event-Media-Viewer/releases/download/v1.0.0/event-media-viewer.apk)**

---

## 🎥 Screen Recording

A short demo video demonstrating the complete app flow:

👉 **[Screen Recording Link](https://private-user-images.githubusercontent.com/185886008/541848860-61e5312d-d159-4604-bc2c-57bc172561f2.mp4?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3Njk2MzIzODgsIm5iZiI6MTc2OTYzMjA4OCwicGF0aCI6Ii8xODU4ODYwMDgvNTQxODQ4ODYwLTYxZTUzMTJkLWQxNTktNDYwNC1iYzJjLTU3YmMxNzI1NjFmMi5tcDQ_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwMTI4JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDEyOFQyMDI4MDhaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0xNWVjYTI1ZjQ0ODllNWNjZjI2ZmM1ZjczNWIyNjE0NTY5MDIyMDQwMTQ0YTljMTViMDQyYjFiODk5MzNjOTI2JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.3wokwrJXzlVfpV8MxT1EXYc4E9UxMueEIInxWu1pOrg)**

---

## 🧠 Assumptions Made

* Event data is static and simulates backend-driven data.
* Photos are fetched dynamically from the Unsplash public API.
* Photos are not persisted on a backend server.
* Image caching is handled locally on the device.
* Dark mode follows the system theme.
* Search functionality is applied at the event discovery level.

---

## 📌 Notes

* The app was built incrementally with clean, reviewable commits.
* Focus was given to performance, code structure, and user experience.
* Offline image caching improves performance and usability.
* Error handling ensures the app does not crash on API or network failures.

---

## 🧪 Evaluation Coverage

✔ Clean and readable code
✔ Proper app structure and navigation
✔ Smooth image loading and caching
✔ UI/UX consistency and spacing
✔ Error and empty-state handling

---

## 📄 License

This project is created for evaluation and learning purposes.


