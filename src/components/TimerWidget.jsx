import { useEffect, useMemo, useState } from "react";

const TimerWidget = () => {
  const [hours, setHours] = useState(5);
  const [minutes, setMinutes] = useState(9);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const initialTime = useMemo(
    () => hours * 3600 + minutes * 60 + seconds,
    [hours, minutes, seconds]
  );

  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(initialTime);
    }
  }, [initialTime, isRunning]);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const displayHours = String(Math.floor(timeLeft / 3600)).padStart(2, "0");
  const displayMinutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(
    2,
    "0"
  );
  const displaySeconds = String(timeLeft % 60).padStart(2, "0");

  const changeValue = (type, amount) => {
    if (isRunning) return;

    if (type === "hours") {
      setHours((prev) => Math.max(0, prev + amount));
    }

    if (type === "minutes") {
      setMinutes((prev) => Math.max(0, Math.min(59, prev + amount)));
    }

    if (type === "seconds") {
      setSeconds((prev) => Math.max(0, Math.min(59, prev + amount)));
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(hours * 3600 + minutes * 60 + seconds);
  };

  return (
    <div
      style={{
        background: "#1E2343",
        borderRadius: "20px",
        padding: "18px 22px",
        color: "#fff",
        height: "182px",
      }}
    >
      <div
        style={{
          height: "100%",
          display: "grid",
          gridTemplateColumns: "170px 1fr",
          gap: "24px",
          alignItems: "center",
        }}
      >
        {/* TIMER CIRCLE */}
        <div
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            background: "#191E39",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow:
              "inset 0 0 0 4px #FF6A6A, inset 0 0 0 12px #1E2343, 0 0 0 8px #11162f",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              fontWeight: "700",
              letterSpacing: "1px",
            }}
          >
            {displayHours}:{displayMinutes}:{displaySeconds}
          </div>
        </div>

        {/* CONTROLS */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              textAlign: "center",
              gap: "10px",
            }}
          >
            {[
              { label: "Hours", value: hours, type: "hours" },
              { label: "Minutes", value: minutes, type: "minutes" },
              { label: "Seconds", value: seconds, type: "seconds" },
            ].map((item) => (
              <div key={item.type}>
                <p
                  style={{
                    color: "#A9A9A9",
                    margin: "0 0 8px 0",
                    fontSize: "16px",
                  }}
                >
                  {item.label}
                </p>

                <button
                  onClick={() => changeValue(item.type, 1)}
                  style={arrowBtnStyle}
                >
                  ▲
                </button>

                <div
                  style={{
                    fontSize: "28px",
                    margin: "6px 0",
                    fontWeight: "500",
                  }}
                >
                  {String(item.value).padStart(2, "0")}
                </div>

                <button
                  onClick={() => changeValue(item.type, -1)}
                  style={arrowBtnStyle}
                >
                  ▼
                </button>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "14px",
            }}
          >
            <button
              onClick={() => setIsRunning((prev) => !prev)}
              style={{
                flex: 1,
                border: "none",
                borderRadius: "24px",
                background: "#FF6A6A",
                color: "#fff",
                padding: "10px",
                fontSize: "18px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              {isRunning ? "Pause" : "Start"}
            </button>

            <button
              onClick={handleReset}
              style={{
                flex: 1,
                border: "none",
                borderRadius: "24px",
                background: "#148A08",
                color: "#fff",
                padding: "10px",
                fontSize: "18px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const arrowBtnStyle = {
  background: "transparent",
  border: "none",
  color: "#d8d8d8",
  fontSize: "16px",
  cursor: "pointer",
};

export default TimerWidget;