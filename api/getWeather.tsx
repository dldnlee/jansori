

export async function getWeather(lat: number, lon: number) {
  // const url = 'http://apis.data.go.kr/1360000/MidFcstInfoService/getMidFcst?ServiceKey=aqEc3lXo6i5YgxXvi9oM3hJylCRJjg4bPdI9012YD7porVEwqJFBBH0BSBCdywhAtzkgOUZ6pn8UJRVrw03xaA%3D%3D&pageNo=2&numOfRows=10&dataType=JSON&stnId=108&tmFc=202409250600'

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5abb8ac93d9588324344c91a133522a5&units=metric&lang=kr`
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data", error)
  }

}

