import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useState,
} from "react";

import {
  FaYoutube,
  FaSearch,
  FaBell,
  FaPlus,
} from "react-icons/fa";

function Navbar() {
  const navigate =
    useNavigate();

  const [
    search,
    setSearch,
  ] = useState("");

  const token =
    localStorage.getItem(
      "token"
    );

  const user =
  JSON.parse(
    localStorage.getItem(
      "user"
    ) || "null"
  );

  const handleSearch =
    () => {
      if (
        !search.trim()
      )
        return;

      navigate(
        `/search/${search}`
      );
    };

  const logout =
    () => {
      localStorage.clear();

      navigate(
        "/login"
      );
    };

  return (
    <nav
      style={{
        height: "70px",
        width: "100%",
        display: "flex",
        justifyContent:
          "space-between",
        alignItems:
          "center",
        padding: "0 25px",
        background:
          "#0f0f0f",
        borderBottom:
          "1px solid #272727",

        position: "fixed",
        top: 0,
        left: 0,
        right: 0,

        zIndex: 9999,

        backdropFilter:
          "blur(10px)",
      }}
    >
      {/* Left */}
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems:
            "center",
          gap: "10px",
          textDecoration:
            "none",
          color: "#fff",
          fontSize: "24px",
          fontWeight:
            "bold",
          minWidth: "180px",
        }}
      >
        <FaYoutube
          color="red"
          size={34}
        />

        YouTube
      </Link>

      {/* Search */}
      <div
        style={{
          display: "flex",
          alignItems:
            "center",
          width:
            window.innerWidth <
            768
              ? "45%"
              : "42%",
          maxWidth:
            "650px",
        }}
      >
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          onKeyDown={(e) => {
            if (
              e.key ===
              "Enter"
            ) {
              handleSearch();
            }
          }}
          style={{
            width: "100%",
            padding:
              "12px 20px",
            border:
              "1px solid #303030",
            borderRadius:
              "40px 0 0 40px",
            outline: "none",
            background:
              "#121212",
            color: "#fff",
            fontSize: "15px",
          }}
        />

        <button
          onClick={
            handleSearch
          }
          style={{
            padding:
              "12px 28px",
            border:
              "1px solid #303030",
            borderLeft:
              "none",
            borderRadius:
              "0 40px 40px 0",
            background:
              "#222",
            color:
              "#fff",
            cursor:
              "pointer",
          }}
        >
          <FaSearch />
        </button>
      </div>

      {/* Right */}
      <div
        style={{
          display: "flex",
          alignItems:
            "center",
          gap: "18px",
        }}
      >
        {token ? (
          <>
            {/* Upload */}
            <Link
              to="/upload"
              style={{
                color:
                  "#fff",
                background:
                  "#272727",
                padding:
                  "10px 16px",
                borderRadius:
                  "999px",
                textDecoration:
                  "none",
                display:
                  "flex",
                alignItems:
                  "center",
                gap: "8px",
              }}
            >
              <FaPlus />
              Create
            </Link>

            {/* Bell */}
            <button
              style={{
                border:
                  "none",
                background:
                  "transparent",
                color:
                  "#fff",
                fontSize:
                  "20px",
                cursor:
                  "pointer",
              }}
            >
              <FaBell />
            </button>

            {/* Profile */}
            <Link
              to="/profile"
              style={{
                textDecoration:
                  "none",
                display:
                  "flex",
                alignItems:
                  "center",
                gap: "10px",
                color:
                  "#fff",
              }}
            >
              {user?.profilePic ? (
                <img
                  src={
                    user.profilePic
                  }
                  alt="profile"
                  onError={(e) => {
                    e.target.style.display =
                      "none";
                  }}
                  style={{
                    width:
                      "42px",
                    height:
                      "42px",
                    borderRadius:
                      "50%",
                    objectFit:
                      "cover",
                    border:
                      "2px solid #333",
                  }}
                />
              ) : (
                <div
                  style={{
                    width:
                      "42px",
                    height:
                      "42px",
                    borderRadius:
                      "50%",
                    background:
                      "#272727",
                    display:
                      "flex",
                    alignItems:
                      "center",
                    justifyContent:
                      "center",
                    fontWeight:
                      "bold",
                  }}
                >
                  {user?.username?.[0]?.toUpperCase()}
                </div>
              )}

              {window.innerWidth >
                768 && (
                <span>
                  {
                    user?.username
                  }
                </span>
              )}
            </Link>

            {/* Logout */}
            <button
              onClick={
                logout
              }
              style={{
                border:
                  "none",
                background:
                  "#ff0000",
                color:
                  "#fff",
                padding:
                  "10px 18px",
                borderRadius:
                  "999px",
                cursor:
                  "pointer",
                fontWeight:
                  "bold",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={{
                color:
                  "#fff",
              }}
            >
              Login
            </Link>

            <Link
              to="/signup"
              style={{
                color:
                  "#fff",
              }}
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;