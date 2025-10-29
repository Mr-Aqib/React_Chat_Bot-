import React, { useState, useRef, useEffect } from "react";
import { apiDataFetch } from "./Api";
import { CirclesWithBar } from "react-loader-spinner";

const MainPage = () => {
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [error, setError] = useState(false);
  const answerRef = useRef(null);

  const handleClick = async () => {
    setError(true);
    const data = await apiDataFetch(
      question,
      "AIzaSyDfCxvkkk0jUk0_dyfaT8Ii3lKS14hiWNI"
    );
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from API";
    setError(false);
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
      className="d-flex flex-column justify-content-center align-items-center"
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
        className="d-flex flex-column shadow-lg rounded-4 p-4 bg-white"
        style={{
          maxWidth: "500px",
          width: "100%",
          borderTop: "5px solid #764ba2",
        }}
      >
        {/* Answer Box */}
        <div
          ref={answerRef}
          className="mb-4 p-3 rounded-4"
          style={{
            minHeight: "150px",
            maxHeight: "300px",
            backgroundColor: "#f0f4ff",
            overflowY: "auto",
            whiteSpace: "pre-wrap",
            boxShadow: "inset 0 4px 10px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {answer ? (
            <div
              className="p-3 rounded-3 shadow-sm"
              style={{
                background: "linear-gradient(to right, #667eea, #764ba2)",
                color: "white",
                alignSelf: "flex-start",
                maxWidth: "80%",
                borderRadius: "20px",
                fontSize: "0.95rem",
                lineHeight: "1.4",
              }}
            >
              {answer}
            </div>
          ) : (
            <span className="text-muted">Your answers will appear here...</span>
          )}
          {error && (
            <p className="text-Secondary">
              <CirclesWithBar
                height="25"
                width="25"
                color="#667eea"
                outerCircleColor="#667eea"
                innerCircleColor="#667eea"
                barColor="#667eea"
                ariaLabel="circles-with-bar-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </p>
          )}
        </div>

        {/* Input Group */}
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Type your question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            style={{
              borderTopLeftRadius: "50px",
              borderBottomLeftRadius: "50px",
              borderRight: "none",
              padding: "15px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          />
          <button
            className="btn"
            onClick={handleClick}
            style={{
              borderTopRightRadius: "50px",
              borderBottomRightRadius: "50px",
              background: "linear-gradient(to right, #667eea, #764ba2)",
              color: "white",
              fontWeight: "bold",
              padding: "0 25px",
              transition: "0.3s",
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "scale(1)";
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
