import {
  useState,
} from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import toast
from "react-hot-toast";

import {
  FaYoutube,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaGithub,
} from "react-icons/fa";

import {
  signInWithPopup,
  signOut,
} from "firebase/auth";

import {
  auth,
  googleProvider,
  githubProvider,
} from "../firebase";

import API
from "../services/api";

function Signup() {
  const navigate =
    useNavigate();

  const [
    step,
    setStep,
  ] = useState(1);

  const [
    otp,
    setOtp,
  ] = useState("");

  const [
    formData,
    setFormData,
  ] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword:
      "",
  });

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    oauthLoading,
    setOauthLoading,
  ] = useState(false);

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const handleChange =
    (e) => {
      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value,
      });
    };

  // STEP 1 SEND OTP
  const sendOTP =
    async () => {
      try {
        if (
          !formData.email
        ) {
          return toast.error(
            "Enter email first"
          );
        }

        setLoading(
          true
        );

        await API.post(
          "/auth/send-email-otp",
          {
            email:
              formData.email,
          }
        );

        toast.success(
          "OTP sent to email"
        );

        setStep(2);
      } catch (
        error
      ) {
        toast.error(
          error.response
            ?.data
            ?.message ||
            "Failed to send OTP"
        );
      } finally {
        setLoading(
          false
        );
      }
    };

  // STEP 2 VERIFY OTP
  const verifyOTP =
    async () => {
      try {
        setLoading(
          true
        );

        await API.post(
          "/auth/verify-otp",
          {
            identifier:
              formData.email,
            otp,
            otpType:
              "signup",
          }
        );

        toast.success(
          "OTP Verified"
        );

        setStep(3);
      } catch (
        error
      ) {
        toast.error(
          error.response
            ?.data
            ?.message ||
            "Invalid OTP"
        );
      } finally {
        setLoading(
          false
        );
      }
    };

  // STEP 3 SIGNUP
  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        if (
          formData.password !==
          formData.confirmPassword
        ) {
          return toast.error(
            "Passwords do not match"
          );
        }

        setLoading(
          true
        );

        await API.post(
          "/auth/signup",
          {
            email:
              formData.email,
            firstName:
              formData.fullName.split(
                " "
              )[0],
            lastName:
              formData.fullName.split(
                " "
              )[1] ||
              "",
            password:
              formData.password,
            confirmPassword:
              formData.confirmPassword,
          }
        );

        toast.success(
          "Signup Successful"
        );

        navigate(
          "/login"
        );
      } catch (
        error
      ) {
        toast.error(
          error.response
            ?.data
            ?.message ||
            "Signup failed"
        );
      } finally {
        setLoading(
          false
        );
      }
    };

  // OAUTH SIGNUP
  const handleOAuthSignup =
    async (
      provider
    ) => {
      try {
        setOauthLoading(
          true
        );

        await signOut(
          auth
        );

        const result =
          await signInWithPopup(
            auth,
            provider
          );

        const firebaseUser =
          result.user;

        const response =
          await API.post(
            "/auth/oauth-login",
            {
              email:
                firebaseUser.email,
              fullName:
                firebaseUser.displayName,
              profilePic:
                firebaseUser.photoURL,
            }
          );

        localStorage.setItem(
          "token",
          response.data
            .data
            .accessToken
        );

        localStorage.setItem(
          "refreshToken",
          response.data
            .data
            .refreshToken
        );

        localStorage.setItem(
          "user",
          JSON.stringify(
            response.data
              .data
              .user
          )
        );

        toast.success(
          "Signup Successful"
        );

        navigate("/");
      } catch (
        error
      ) {
        console.log(
          error
        );

        toast.error(
          "OAuth signup failed"
        );
      } finally {
        setOauthLoading(
          false
        );
      }
    };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <div style={headerStyle}>
          <FaYoutube
            size={58}
            color="red"
          />

          <h1>
            Create Account
          </h1>

          <p>
            Join YouTube Clone
          </p>
        </div>

        {/* OAuth */}
        <button
          type="button"
          disabled={
            oauthLoading
          }
          onClick={() =>
            handleOAuthSignup(
              googleProvider
            )
          }
          style={
            oauthButtonStyle
          }
        >
          <FaGoogle />
          Continue with
          Google
        </button>

        <button
          type="button"
          disabled={
            oauthLoading
          }
          onClick={() =>
            handleOAuthSignup(
              githubProvider
            )
          }
          style={{
            ...oauthButtonStyle,
            background:
              "#181818",
            color:
              "#fff",
          }}
        >
          <FaGithub />
          Continue with
          GitHub
        </button>

        <div style={divider}>
          <hr
            style={{
              flex: 1,
            }}
          />

          <span>
            OR
          </span>

          <hr
            style={{
              flex: 1,
            }}
          />
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={
                handleChange
              }
              style={
                inputStyle
              }
            />

            <button
              onClick={
                sendOTP
              }
              style={
                buttonStyle
              }
            >
              {loading
                ? "Sending..."
                : "Send OTP"}
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <input
              placeholder="Enter OTP"
              value={otp}
              onChange={(
                e
              ) =>
                setOtp(
                  e.target
                    .value
                )
              }
              style={
                inputStyle
              }
            />

            <button
              onClick={
                verifyOTP
              }
              style={
                buttonStyle
              }
            >
              Verify OTP
            </button>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <form
            onSubmit={
              handleSubmit
            }
          >
            <input
              name="fullName"
              placeholder="Full Name"
              onChange={
                handleChange
              }
              required
              style={
                inputStyle
              }
            />

            <input
              name="username"
              placeholder="Username"
              onChange={
                handleChange
              }
              required
              style={
                inputStyle
              }
            />

            <div
              style={{
                position:
                  "relative",
              }}
            >
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Password"
                onChange={
                  handleChange
                }
                required
                style={
                  inputStyle
                }
              />

              <span
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                style={
                  eyeStyle
                }
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </span>
            </div>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={
                handleChange
              }
              required
              style={
                inputStyle
              }
            />

            <button
              type="submit"
              style={
                buttonStyle
              }
            >
              Create Account
            </button>
          </form>
        )}

        <p
          style={{
            textAlign:
              "center",
            marginTop:
              "20px",
          }}
        >
          Already have an
          account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent:
    "center",
  alignItems:
    "center",
  background:
    "#f5f5f5",
};

const cardStyle = {
  width: "100%",
  maxWidth: "430px",
  background:
    "#fff",
  padding: "40px",
  borderRadius:
    "24px",
  boxShadow:
    "0 8px 30px rgba(0,0,0,0.08)",
};

const headerStyle = {
  textAlign:
    "center",
  marginBottom:
    "28px",
};

const inputStyle = {
  width: "100%",
  padding: "15px",
  marginBottom:
    "14px",
  border:
    "1px solid #ddd",
  borderRadius:
    "14px",
};

const buttonStyle = {
  width: "100%",
  padding: "15px",
  border: "none",
  borderRadius:
    "14px",
  background:
    "#ff0000",
  color: "#fff",
  fontWeight:
    "bold",
  cursor:
    "pointer",
};

const oauthButtonStyle = {
  width: "100%",
  padding: "14px",
  border:
    "1px solid #ddd",
  borderRadius:
    "14px",
  background:
    "#fff",
  display:
    "flex",
  justifyContent:
    "center",
  alignItems:
    "center",
  gap: "10px",
  cursor:
    "pointer",
  marginBottom:
    "10px",
};

const divider = {
  display: "flex",
  alignItems:
    "center",
  gap: "12px",
  margin:
    "20px 0",
};

const eyeStyle = {
  position:
    "absolute",
  right: "15px",
  top: "15px",
  cursor:
    "pointer",
};

export default Signup;