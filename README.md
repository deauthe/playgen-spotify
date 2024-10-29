# Spotify Playlist Service

This project is a Spotify service that helps you create a monthly playlist according to the month you select and your liked songs in that month. It also lets you know how obscure a song is based on its popularity.

<img width="1462" alt="Screenshot 2024-10-29 at 1 02 12 PM" src="https://github.com/user-attachments/assets/6c7913dc-20e4-4316-b12d-37e4a22444ae">
<img width="1456" alt="Screenshot 2024-10-29 at 1 03 57 PM" src="https://github.com/user-attachments/assets/3f7743b4-0173-424b-95a5-d39ea7de6bbe">


## Features

- **Monthly Playlist Creation**: Generate playlists for any month based on your liked songs.
- **Song Obscurity Indicator**: Discover how obscure a song is with popularity metrics.
- **Authentication**: Secure authentication using Spotify OAUTH PKCE flow.
- **State Management**: Efficient state management with Recoil.
- **Next.js with Tailwind CSS**: Styled using daisyUI and shadCn components for a modern UI.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Spotify Developer Account

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/spotify-playlist-service.git
cd spotify-playlist-service

2.Insall dependencies: npm i

3.Create a .env.local file in the root directory and add your Spotify Client ID and Client Secret:
NEXT_PUBLIC_CLIENT_ID=your_spotify_client_id
NEXT_PUBLIC_CLIENT_SECRET=your_spotify_client_secret
NEXT_PUBLIC_REDIRECT_URI = http://localhost:3000/callback
NEXT_PUBLIC_JWT_SECRET=kamwdlkanwlkam

4.Start the development server:
npm run dev

Technologies Used
Next.js: React framework for server-side rendering and static site generation.
Tailwind CSS: Utility-first CSS framework.
daisyUI: Tailwind CSS components.
shadCn: Additional Tailwind CSS components.
Recoil: State management for React.
```
