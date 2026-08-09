const BASE_URL = 'https://api.jamendo.com/v3.0';

export function mapJamendoTrack(track) {
  return {
    id: track.id,
    title: track.name,
    artist: track.artist_name,
    img: track.image,
    audioUrl: track.audio,
    license: track.license_ccurl
  };
}

function getClientId() {
  const clientId = import.meta.env.VITE_JAMENDO_CLIENT_ID;
  if (!clientId) {
    throw new Error('VITE_JAMENDO_CLIENT_ID is missing in environment variables.');
  }
  return clientId;
}

export async function fetchTrendingTracks(limit = 12) {
  try {
    const clientId = getClientId();
    const url = `${BASE_URL}/tracks/?client_id=${clientId}&format=json&limit=${limit}&order=popularity_total&include=musicinfo&audioformat=mp32`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.results.map(mapJamendoTrack);
  } catch (error) {
    console.error('Error fetching trending tracks from Jamendo:', error);
    return [];
  }
}

export async function searchTracks(query, limit = 20) {
  try {
    const clientId = getClientId();
    const url = `${BASE_URL}/tracks/?client_id=${clientId}&format=json&limit=${limit}&search=${encodeURIComponent(query)}&include=musicinfo&audioformat=mp32`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.results.map(mapJamendoTrack);
  } catch (error) {
    console.error('Error searching tracks from Jamendo:', error);
    return [];
  }
}
