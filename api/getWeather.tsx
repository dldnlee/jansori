

export async function getWeather(lat: number, lon: number) {
  const url = `${process.env.EXPO_PUBLIC_OPENWEATHER_API_URL}data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY}&units=metric&lang=kr`
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data", error)
  }

}

