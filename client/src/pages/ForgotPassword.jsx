import { useState } from "react";
import API from "../services/api";

function ForgotPassword() {
  const [email, setEmail] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  const handleSubmit =
    async (e) => {
      e.preventDefault();
        console.log(email);
      try {
        setLoading(true);
        
        const response =
          await API.post(
            "/auth/forgot-password",
            { email }
          );

        alert(
          response.data
            .message
        );
      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
            "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div
      style={{
        display: "flex",
        justifyContent:
          "center",
        alignItems:
          "center",
        height: "100vh",
      }}
    >
      <form
        onSubmit={
          handleSubmit
        }
        style={{
          width: "350px",
          padding: "20px",
          border:
            "1px solid #ddd",
          borderRadius:
            "10px",
        }}
      >
        <h2>
          Forgot Password
        </h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          required
        />

        <br />
        <br />

        <button
          type="submit"
        >
          {loading
            ? "Sending..."
            : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;