import { useEffect, useState } from "react";

export default function App() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch("/api/weather"); // <-- simple relative path
        if (!response.ok) throw new Error("Error fetching weather data");
        const data = await response.json();
        setWeather(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Weather for {weather?.resolvedAddress}</h1>
      <ul>
        {weather?.days.map((day: any) => (
          <li key={day.datetime}>
            {day.datetime}: {day.temp}°C (min: {day.tempmin}°C, max: {day.tempmax}°C)
          </li>
        ))}
      </ul>
    </div>
  );
}
