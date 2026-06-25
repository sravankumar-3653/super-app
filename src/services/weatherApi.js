const WEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

// You can change city if you want
const CITY = "Kurnool";

export const fetchWeather = async () => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${WEATHER_API_KEY}&units=metric`
    );

    const data = await response.json();

    if (!response.ok || !data.main) {
      throw new Error(data.message || "Failed to fetch weather");
    }

    return {
      temp: Math.round(data.main.temp),
      pressure: data.main.pressure,
      humidity: data.main.humidity,
      windSpeed: Math.round((data.wind?.speed || 0) * 3.6),
      condition: data.weather?.[0]?.description || "Unknown",
      icon: data.weather?.[0]?.icon || "01d",
    };
  } catch (error) {
    console.error("Weather API error:", error);
    return null;
  }
};