import { useState } from "react";
import {
  useParams,
  useNavigate,
} from "react-router-dom";

import API from "../services/api";

function ResetPassword() {
  const { token } =
    useParams();

  const navigate =
    useNavigate();

  const [password,
    setPassword] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        const response =
          await API.post(
            `/auth/reset-password/${token}`,
            {
              password,
            }
          );

        alert(
          "Password Reset Successful"
        );

        navigate(
          "/login"
        );
      } catch (error) {
        console.log(
          error.response
        );

        alert(
          error.response?.data
            ?.message ||
            "Reset failed"
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
          Reset Password
        </h2>

        <input
          type="password"
          placeholder="Enter New Password"
          value={password}
          onChange={(e) =>
            setPassword(
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
            ? "Updating..."
            : "Reset Password"}
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;