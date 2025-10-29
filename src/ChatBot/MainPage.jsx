import React, { useState, useRef, useEffect } from "react";
import { apiDataFetch } from "./Api";
import { CirclesWithBar } from "react-loader-spinner";
import "./global.css";
const MainPage = () => {
  const Api_Key = import.meta.env.VITE_GEMINI_API_KEY;
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const answerRef = useRef(null);

  const handleClick = async () => {
    if (!question.trim()) return; // ignore empty
    setLoading(true);
    const data = await apiDataFetch(question, Api_Key);
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from API";
    setLoading(false);
    setAnswer(text);
    setQuestion("");
  };

  // Auto-scroll to bottom when answer updates
  useEffect(() => {
    if (answerRef.current) {
      answerRef.current.scrollTop = answerRef.current.scrollHeight;
    }
  }, [answer]);

  return (
    <div
      className="d-flex main-con flex-column justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #1e3c72, #2a5298)",
        padding: "20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Header */}
      <div
        className="text-center mb-4 p-3 rounded-3 shadow"
        style={{
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          color: "white",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <h1 className="fw-bold mb-0">🤖 Chat Bot</h1>
        <small>Powered by Gemini API</small>
      </div>

      {/* Chat Container */}
      <div
        className="d-flex flex-column shadow-lg rounded-4 p-3 bg-white w-100"
        style={{
          maxWidth: "500px",
          borderTop: "5px solid #764ba2",
        }}
      >
        {/* Answer Box */}
        <div
          ref={answerRef}
          className="mb-3 p-3 rounded-4 d-flex flex-column gap-2"
          style={{
            minHeight: "150px",
            maxHeight: "350px",
            backgroundColor: "#f0f4ff",
            overflowY: "auto",
            whiteSpace: "pre-wrap",
            boxShadow: "inset 0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          {answer ? (
            <div
              className="p-3 shadow-sm"
              style={{
                background: "linear-gradient(to right, #667eea, #764ba2)",
                color: "white",
                alignSelf: "flex-start",
                maxWidth: "80%",
                borderRadius: "20px",
                fontSize: "0.95rem",
                lineHeight: "1.4",
                wordBreak: "break-word",
              }}
            >
              {answer}
            </div>
          ) : (
            <span className="text-muted">Your answers will appear here...</span>
          )}

          {loading && (
            <div className="d-flex justify-content-start">
              <CirclesWithBar
                height="25"
                width="25"
                color="#667eea"
                outerCircleColor="#667eea"
                innerCircleColor="#667eea"
                barColor="#667eea"
                ariaLabel="loading"
                visible={true}
              />
            </div>
          )}
        </div>

        {/* Input Group */}
        <div className="d-flex w-100 gap-2">
          <input
            type="text"
            className="form-control flex-grow-1"
            placeholder="Type your question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleClick()}
            style={{
              borderRadius: "50px",
              padding: "12px 20px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          />
          <button
            className="btn"
            onClick={handleClick}
            style={{
              borderRadius: "50px",
              background: "linear-gradient(to right, #667eea, #764ba2)",
              color: "white",
              fontWeight: "bold",
              padding: "0 20px",
              flexShrink: 0,
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
