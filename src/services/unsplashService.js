import Constants from 'expo-constants';

const ACCESS_KEY = Constants.expoConfig.extra.unsplashAccessKey;
const BASE_URL = 'https://api.unsplash.com';

export async function fetchPhotos(page = 1, perPage = 20, query) {
  const endpoint = query
    ? `/search/photos?page=${page}&per_page=${perPage}&query=${query}`
    : `/photos?page=${page}&per_page=${perPage}`;


  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch photos');
  }

  const data = await response.json();
  return query ? data.results : data;
}
