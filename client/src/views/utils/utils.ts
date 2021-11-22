export const addCountryToStorage = (countryName: string): string[] => {
  const favoriteCountries = localStorage.getItem('favoriteCountries');
  const updatedFavoriteCountries = favoriteCountries ? `${favoriteCountries},${countryName}` : countryName;
  localStorage.setItem('favoriteCountries', updatedFavoriteCountries);
  return updatedFavoriteCountries.split(',');
};
