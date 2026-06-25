import { useEffect, useState } from "react";
import { fetchWeather } from "../services/weatherApi";

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const getWeather = async () => {
      const data = await fetchWeather();
      setWeather(data);
    };

    getWeather();

    const weatherInterval = setInterval(() => {
      getWeather();
    }, 60000); // refresh weather every 60 sec

    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(weatherInterval);
    };
  }, []);

  const formattedDate = `${String(dateTime.getDate()).padStart(2, "0")}-${String(
    dateTime.getMonth() + 1
  ).padStart(2, "0")}-${dateTime.getFullYear()}`;

  const formattedTime = dateTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      style={{
        borderRadius: "20px",
        overflow: "hidden",
        background: "#101744",
        color: "#fff",
        height: "165px",
      }}
    >
      <div
        style={{
          background: "#FF4ADE",
          padding: "10px 18px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "18px",
          fontWeight: "700",
        }}
      >
        <span>{formattedDate}</span>
        <span>{formattedTime}</span>
      </div>

      {!weather ? (
        <div
          style={{
            height: "calc(100% - 46px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "16px",
            color: "#d9d9d9",
          }}
        >
          Loading weather...
        </div>
      ) : (
        <div
          style={{
            height: "calc(100% - 46px)",
            padding: "14px 16px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
            }}
          >
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt={weather.condition}
              style={{
                width: "52px",
                height: "52px",
                objectFit: "contain",
              }}
            />
            <p
              style={{
                fontSize: "12px",
                margin: 0,
                textTransform: "capitalize",
              }}
            >
              {weather.condition}
            </p>
          </div>

          <div
            style={{
              textAlign: "center",
              borderLeft: "1px solid rgba(255,255,255,0.25)",
              borderRight: "1px solid rgba(255,255,255,0.25)",
              padding: "0 12px",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h2 style={{ fontSize: "34px", margin: "0 0 6px 0" }}>
              {weather.temp}°C
            </h2>
            <p style={{ fontSize: "11px", margin: "0 0 2px 0" }}>
              {weather.pressure} mbar
            </p>
            <p style={{ fontSize: "11px", margin: 0 }}>Pressure</p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "10px",
              paddingLeft: "4px",
            }}
          >
            <div>
              <p style={{ fontSize: "11px", margin: 0 }}>
                {weather.windSpeed} km/h
              </p>
              <p style={{ fontSize: "11px", color: "#d9d9d9", margin: 0 }}>
                Wind
              </p>
            </div>

            <div>
              <p style={{ fontSize: "11px", margin: 0 }}>
                {weather.humidity}%
              </p>
              <p style={{ fontSize: "11px", color: "#d9d9d9", margin: 0 }}>
                Humidity
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;