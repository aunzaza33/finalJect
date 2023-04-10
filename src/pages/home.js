import React from "react";

function Home() {
    const displayname = sessionStorage.getItem("displayname");
    return (
        <div style={{ backgroundColor: "#f2f2f2", padding: "20px" }}>
            <a style={{ color: "#333", fontSize: "18px" }}>
                เข้าสู่ระบบโดย {displayname}
            </a>
        </div>
    );
}

export default Home;