const API_KEY = '1fvGjMHdW85x3VmAklanxUniZW7thdEy';

export default async function getGifByTag(gifTag: string) {
  const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${gifTag}`;

  const gifData = await fetch(url)
    .then((response) => response.json())
    .catch((error) => {
      throw new Error(`Произошла HTTP ошибка: ${error.message}`);
    });

  return { tag: gifTag, gifData };
}
