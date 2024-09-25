
export async function getWeather() {
  const url = 'http://apis.data.go.kr/1360000/MidFcstInfoService/getMidFcst?ServiceKey=aqEc3lXo6i5YgxXvi9oM3hJylCRJjg4bPdI9012YD7porVEwqJFBBH0BSBCdywhAtzkgOUZ6pn8UJRVrw03xaA%3D%3D&pageNo=2&numOfRows=10&dataType=JSON&stnId=108&tmFc=202409250600'

  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    return data.response.body.items.item;
    // console.log(data);
  } catch (error) {
    console.error("Error fetching data", error)
  }

}

