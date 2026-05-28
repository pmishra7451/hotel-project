import { useState, useEffect } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────
const ROOMS = [
  {
    id: 1,
    name: "Deluxe Room",
    size: "32 m²",
    guests: 2,
    bed: "King Bed",
    view: "City View",
    price: "₹8,500",
    badge: "Popular",
    color: "#e8d5c0",
  },
  {
    id: 2,
    name: "Superior Suite",
    size: "55 m²",
    guests: 2,
    bed: "King Bed",
    view: "Pool View",
    price: "₹14,000",
    badge: "Best Value",
    color: "#d4e0d0",
  },
  {
    id: 3,
    name: "Presidential Suite",
    size: "120 m²",
    guests: 4,
    bed: "2 King Beds",
    view: "Panoramic",
    price: "₹32,000",
    badge: "Luxury",
    color: "#d0d8e8",
  },
];

const GALLERY = [
  { label: "Hotel Facade", bg: "#c8b898", span: true },
  { label: "Deluxe Room", bg: "#e8d5c0", span: false },
  { label: "Pool & Garden", bg: "#d4e8d4", span: false },
  { label: "Restaurant", bg: "#f0e8d8", span: false },
];

const STATS = [
  { num: "150+", label: "Luxury Rooms" },
  { num: "25yr", label: "Of Excellence" },
  { num: "98%", label: "Happy Guests" },
  { num: "12", label: "Awards Won" },
];

// ─── STYLES ─────────────────────────────────────────────────────────────────
const S = {
  gold: "#c9a84c",
  goldLight: "#e8d5a3",
  dark: "#1a1a1a",
  text: "#2d2d2d",
  muted: "#888",
  bg: "#fafaf8",
  white: "#ffffff",
  border: "#e8e8e0",
  serif: "'Cormorant Garamond', serif",
  sans: "'Outfit', sans-serif",
};

const gStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Outfit:wght@300;400;500;600&display=swap');

  *{
    box-sizing:border-box;
    margin:0;
    padding:0;
  }

  body{
    font-family:'Outfit',sans-serif;
    background:#fafaf8;
    color:#2d2d2d;
    overflow-x:hidden;
  }

  html{
    scroll-behavior:smooth;
  }

  .nav-link{
    color:#888;
    font-size:13px;
    letter-spacing:0.08em;
    text-transform:uppercase;
    font-weight:500;
    text-decoration:none;
  }

  .nav-link:hover{
    color:#c9a84c;
  }

  .btn-primary{
    background:#1a1a1a;
    color:#fff;
    padding:13px 28px;
    border-radius:4px;
    font-size:13px;
    border:none;
    cursor:pointer;
  }

  .btn-primary:hover{
    background:#c9a84c;
  }

  .light-input{
    border:1px solid #ddd;
    background:#fff;
    padding:12px;
    border-radius:4px;
    width:100%;
    outline:none;
    font-size:14px;
  }

  .light-input:focus{
    border-color:#c9a84c;
  }

  .book-btn{
    background:#1a1a1a;
    color:#fff;
    border:none;
    padding:10px 18px;
    border-radius:4px;
    cursor:pointer;
  }

  .book-btn:hover{
    background:#c9a84c;
  }
`;

// ─── LOGIN PAGE ─────────────────────────────────────────────────────────────
function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    if (email === "admin@gmail.com" && password === "12345") {
      alert("Login Successful ✅");
      onLogin();
    } else {
      alert("Invalid Email or Password ❌");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg,#e8e0d0 0%,#d4c9b5 50%,#c8bba5 100%)",
        padding: "2rem",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#fff",
          padding: "2.5rem",
          borderRadius: "12px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontFamily: S.serif,
            fontSize: "42px",
            marginBottom: "0.5rem",
          }}
        >
          Grand<span style={{ color: S.gold }}>Vista</span>
        </h1>

        <p
          style={{
            textAlign: "center",
            color: S.muted,
            marginBottom: "2rem",
          }}
        >
          Login to continue
        </p>

        <div style={{ marginBottom: "1rem" }}>
          <label>Email Address</label>
          <input
            type="email"
            className="light-input"
            placeholder="admin@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label>Password</label>
          <input
            type="password"
            className="light-input"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn-primary"
          style={{ width: "100%" }}
        >
          Login →
        </button>

        <div
          style={{
            marginTop: "1.5rem",
            textAlign: "center",
            color: S.muted,
            fontSize: "13px",
          }}
        >
          Demo Login:
          <br />
          admin@gmail.com / 12345
        </div>
      </form>
    </div>
  );
}

// ─── NAVBAR ─────────────────────────────────────────────────────────────────
function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1.2rem 3rem",
        background: "#fff",
        borderBottom: `1px solid ${S.border}`,
      }}
    >
      <div
        style={{
          fontFamily: S.serif,
          fontSize: 24,
          fontWeight: 600,
        }}
      >
        Grand<span style={{ color: S.gold }}>Vista</span>
      </div>

      <ul
        style={{
          display: "flex",
          gap: "2rem",
          listStyle: "none",
        }}
      >
        <li>
          <a className="nav-link" href="#rooms">
            Rooms
          </a>
        </li>

        <li>
          <a className="nav-link" href="#gallery">
            Gallery
          </a>
        </li>

        <li>
          <a className="nav-link" href="#contact">
            Contact
          </a>
        </li>
      </ul>

      <button className="btn-primary">Book Now</button>
    </nav>
  );
}

// ─── HERO ───────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      style={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "4rem 2rem",
        background:
          "linear-gradient(135deg,#f5f0e8 0%,#e8e0d0 50%,#d8ccb8 100%)",
      }}
    >
      <div>
        <h1
          style={{
            fontFamily: S.serif,
            fontSize: "70px",
            marginBottom: "1rem",
          }}
        >
          Luxury & Comfort
        </h1>

        <p
          style={{
            color: S.muted,
            maxWidth: "600px",
            margin: "0 auto 2rem",
            lineHeight: 1.7,
          }}
        >
          Welcome to GrandVista Hotel — where elegance, comfort, and
          world-class hospitality come together.
        </p>

        <button className="btn-primary">Explore Rooms</button>
      </div>
    </section>
  );
}

// ─── ROOMS ──────────────────────────────────────────────────────────────────
function Rooms() {
  return (
    <section
      id="rooms"
      style={{
        padding: "5rem 3rem",
        background: S.bg,
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontFamily: S.serif,
          fontSize: "48px",
          marginBottom: "3rem",
        }}
      >
        Our Rooms
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            window.innerWidth < 768 ? "1fr" : "repeat(3,1fr)",
          gap: "1.5rem",
        }}
      >
        {ROOMS.map((room) => (
          <div
            key={room.id}
            style={{
              background: "#fff",
              borderRadius: "8px",
              overflow: "hidden",
              border: `1px solid ${S.border}`,
            }}
          >
            <div
              style={{
                height: "200px",
                background: room.color,
              }}
            />

            <div style={{ padding: "1.5rem" }}>
              <h3
                style={{
                  fontFamily: S.serif,
                  fontSize: "26px",
                  marginBottom: "1rem",
                }}
              >
                {room.name}
              </h3>

              <p style={{ color: S.muted, marginBottom: "0.5rem" }}>
                {room.size}
              </p>

              <p style={{ color: S.muted, marginBottom: "0.5rem" }}>
                {room.guests} Guests
              </p>

              <p style={{ color: S.muted, marginBottom: "1rem" }}>
                {room.view}
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                >
                  {room.price}
                </div>

                <button className="book-btn">Book</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── GALLERY ────────────────────────────────────────────────────────────────
function Gallery() {
  return (
    <section
      id="gallery"
      style={{
        padding: "5rem 3rem",
        background: "#fff",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontFamily: S.serif,
          fontSize: "48px",
          marginBottom: "3rem",
        }}
      >
        Gallery
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            window.innerWidth < 768 ? "1fr" : "repeat(4,1fr)",
          gap: "1rem",
        }}
      >
        {GALLERY.map((item, i) => (
          <div
            key={i}
            style={{
              height: "250px",
              background: item.bg,
              borderRadius: "8px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "600",
            }}
          >
            {item.label}
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── CONTACT ────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section
      id="contact"
      style={{
        padding: "5rem 3rem",
        background: S.bg,
        textAlign: "center",
      }}
    >
      <h2
        style={{
          fontFamily: S.serif,
          fontSize: "48px",
          marginBottom: "1rem",
        }}
      >
        Contact Us
      </h2>

      <p style={{ color: S.muted }}>
        📍 New Delhi, India
      </p>

      <p style={{ color: S.muted }}>
        📞 +91 98765 43210
      </p>

      <p style={{ color: S.muted }}>
        ✉️ info@grandvistahotel.com
      </p>
    </section>
  );
}

// ─── FOOTER ─────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      style={{
        background: "#111",
        color: "#999",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      © 2026 GrandVista Hotel. All rights reserved.
    </footer>
  );
}

// ─── MAIN APP ───────────────────────────────────────────────────────────────
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <style>{gStyles}</style>

      {!isLoggedIn ? (
        <LoginPage onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <>
          <Navbar />
          <Hero />
          <Rooms />
          <Gallery />
          <Contact />
          <Footer />
        </>
      )}
    </>
  );
}