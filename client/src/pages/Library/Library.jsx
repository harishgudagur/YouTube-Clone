import Navbar
from "../../components/Navbar/Navbar";

import Sidebar
from "../../components/Sidebar/Sidebar";

function Library() {
  return (
    <>
      <Navbar />

      <div
        style={{
          display:
            "flex",
          background:
            "#0f0f0f",
          color:
            "#fff",
          minHeight:
            "100vh",
        }}
      >
        <Sidebar />

        <div
          style={{
            marginLeft:
              window.innerWidth <
              768
                ? "80px"
                : "240px",

            padding:
              "95px 30px",
          }}
        >
          <h1>
            📚 Library
          </h1>

          <p
            style={{
              color:
                "#aaa",
            }}
          >
            Your saved
            content
            appears here.
          </p>
        </div>
      </div>
    </>
  );
}

export default
Library;