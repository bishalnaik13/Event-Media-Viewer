import Constants from 'expo-constants';

const ACCESS_KEY = Constants.expoConfig.extra.unsplashAccessKey;
const BASE_URL = 'https://api.unsplash.com';

export async function fetchPhotos(page = 1, perPage = 20) {
  const url = `${BASE_URL}/photos?page=${page}&per_page=${perPage}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch photos from Unsplash');
  }

  const data = await response.json();
  return data;
}
