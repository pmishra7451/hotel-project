import { useState, useEffect } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────
const ROOMS = [
  {
    id: 1, name: "Deluxe Room", size: "32 m²", guests: 2,
    bed: "King Bed", view: "City View", price: "₹8,500",
    badge: "Popular", color: "#e8d5c0",
  },
  {
    id: 2, name: "Superior Suite", size: "55 m²", guests: 2,
    bed: "King Bed", view: "Pool View", price: "₹14,000",
    badge: "Best Value", color: "#d4e0d0",
  },
  {
    id: 3, name: "Presidential Suite", size: "120 m²", guests: 4,
    bed: "2 King Beds", view: "Panoramic", price: "₹32,000",
    badge: "Luxury", color: "#d0d8e8",
  },
];

const GALLERY = [
  { label: "Hotel Facade", bg: "#c8b898", span: true },
  { label: "Deluxe Room",  bg: "#e8d5c0", span: false },
  { label: "Pool & Garden",bg: "#d4e8d4", span: false },
  { label: "Restaurant",   bg: "#f0e8d8", span: false },
];

const STATS = [
  { num: "150+", label: "Luxury Rooms" },
  { num: "25yr", label: "Of Excellence" },
  { num: "98%",  label: "Happy Guests" },
  { num: "12",   label: "Awards Won" },
];

// ─── STYLES ─────────────────────────────────────────────────────────────────
const S = {
  // tokens
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
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'Outfit',sans-serif;background:#fafaf8;color:#2d2d2d;overflow-x:hidden;}
  html{scroll-behavior:smooth;}

  @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.35}}

  .fade-up{animation:fadeUp 0.65s ease both;}
  .fade-up-1{animation:fadeUp 0.65s 0.1s ease both;}
  .fade-up-2{animation:fadeUp 0.65s 0.2s ease both;}
  .fade-up-3{animation:fadeUp 0.65s 0.3s ease both;}
  .fade-up-4{animation:fadeUp 0.65s 0.4s ease both;}

  .room-card{transition:transform 0.3s,box-shadow 0.3s;}
  .room-card:hover{transform:translateY(-5px);box-shadow:0 16px 48px rgba(0,0,0,0.1);}

  .gallery-item .overlay{opacity:0;transition:opacity 0.3s;}
  .gallery-item:hover .overlay{opacity:1;}
  .gallery-item:hover{filter:brightness(0.88);}

  .nav-link{color:#888;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;font-weight:500;text-decoration:none;transition:color 0.2s;}
  .nav-link:hover{color:#c9a84c;}

  .btn-primary{background:#1a1a1a;color:#fff;padding:13px 28px;border-radius:4px;font-size:13px;font-weight:500;letter-spacing:0.05em;text-decoration:none;border:none;cursor:pointer;transition:background 0.2s;display:inline-block;font-family:'Outfit',sans-serif;}
  .btn-primary:hover{background:#c9a84c;}
  .btn-outline{background:transparent;color:#1a1a1a;padding:13px 28px;border-radius:4px;font-size:13px;font-weight:500;letter-spacing:0.05em;text-decoration:none;border:1.5px solid #e8e8e0;cursor:pointer;transition:all 0.2s;display:inline-block;font-family:'Outfit',sans-serif;}
  .btn-outline:hover{border-color:#c9a84c;color:#c9a84c;}

  .book-btn{background:#1a1a1a;color:#fff;border:none;padding:8px 18px;border-radius:4px;font-size:12px;font-weight:500;cursor:pointer;font-family:'Outfit',sans-serif;transition:background 0.2s;}
  .book-btn:hover{background:#c9a84c;}

  .search-btn{background:#c9a84c;color:#1a1a1a;border:none;padding:13px 28px;border-radius:4px;font-family:'Outfit',sans-serif;font-size:13px;font-weight:600;cursor:pointer;white-space:nowrap;transition:opacity 0.2s;letter-spacing:0.05em;}
  .search-btn:hover{opacity:0.88;}

  .submit-btn{background:#1a1a1a;color:#fff;border:none;padding:13px;border-radius:4px;font-family:'Outfit',sans-serif;font-size:14px;font-weight:500;cursor:pointer;transition:background 0.2s;margin-top:0.5rem;width:100%;}
  .submit-btn:hover{background:#c9a84c;}

  .dark-input{background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);color:#fff;padding:12px 14px;border-radius:4px;font-family:'Outfit',sans-serif;font-size:14px;outline:none;transition:border-color 0.2s;width:100%;}
  .dark-input:focus{border-color:#c9a84c;}
  .dark-input option{background:#1a1a1a;}

  .light-input{border:1.5px solid #e8e8e0;background:#fafaf8;padding:11px 14px;border-radius:4px;font-family:'Outfit',sans-serif;font-size:14px;color:#2d2d2d;outline:none;transition:border-color 0.2s;width:100%;}
  .light-input:focus{border-color:#c9a84c;}

  .footer-link{color:rgba(255,255,255,0.4);text-decoration:none;font-size:13px;transition:color 0.2s;}
  .footer-link:hover{color:#c9a84c;}

  .skill-bar-fill{height:100%;border-radius:2px;background:#c9a84c;transition:width 1s ease;}
`;

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav style={{
      position:"sticky",top:0,zIndex:100,
      display:"flex",alignItems:"center",justifyContent:"space-between",
      padding:"1.2rem 3rem",
      background: scrolled ? "rgba(250,250,248,0.96)" : "rgba(250,250,248,0.92)",
      backdropFilter:"blur(16px)",
      borderBottom:`1px solid ${S.border}`,
      transition:"background 0.3s",
    }}>
      <div style={{fontFamily:S.serif,fontSize:22,fontWeight:600,letterSpacing:"0.05em",color:S.dark}}>
        Grand<span style={{color:S.gold}}>Vista</span> Hotel
      </div>
      <ul style={{display:"flex",gap:"2.5rem",listStyle:"none"}}>
        {["Rooms","Gallery","Contact"].map(l => (
          <li key={l}><a className="nav-link" href={`#${l.toLowerCase()}`}>{l}</a></li>
        ))}
      </ul>
      <button className="btn-primary" style={{padding:"10px 22px",fontSize:13}}>Book Now</button>
    </nav>
  );
}

function Hero() {
  return (
    <div style={{minHeight:"88vh",display:"grid",gridTemplateColumns:"1fr 1fr",alignItems:"center"}}>
      {/* Left */}
      <div style={{padding:"5rem 3rem"}}>
        <div className="fade-up" style={{
          display:"inline-block",fontSize:11,letterSpacing:"0.2em",textTransform:"uppercase",
          color:S.gold,border:`1px solid ${S.goldLight}`,padding:"5px 14px",borderRadius:100,
          marginBottom:"1.5rem",
        }}>★ Award Winning Hotel</div>

        <h1 className="fade-up-1" style={{
          fontFamily:S.serif,fontSize:"clamp(44px,5vw,68px)",fontWeight:500,
          lineHeight:1.05,color:S.dark,marginBottom:"1.25rem",letterSpacing:-1,
        }}>
          Experience<br/>True <em style={{color:S.gold,fontStyle:"italic"}}>Luxury</em><br/>&amp; Comfort
        </h1>

        <p className="fade-up-2" style={{color:S.muted,fontSize:15,lineHeight:1.7,maxWidth:400,marginBottom:"2rem"}}>
          Nestled in the heart of the city, GrandVista offers world-class hospitality with breathtaking views and unmatched service.
        </p>

        <div className="fade-up-3" style={{display:"flex",gap:"1rem",flexWrap:"wrap"}}>
          <a href="#rooms" className="btn-primary">Explore Rooms</a>
          <a href="#gallery" className="btn-outline">View Gallery</a>
        </div>
      </div>

      {/* Right */}
      <div style={{
        height:"88vh",position:"relative",overflow:"hidden",
        background:"linear-gradient(135deg,#e8e0d0 0%,#d4c9b5 50%,#c8bba5 100%)",
        display:"flex",alignItems:"center",justifyContent:"center",
      }}>
        <svg width="280" height="280" viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
          <rect x="30" y="60" width="220" height="180" rx="4" fill="#b8a888" opacity="0.4"/>
          <rect x="50" y="80" width="180" height="160" rx="2" fill="#c8b898"/>
          {[60,100,140,180].map(x => (
            <rect key={x} x={x} y="90" width="30" height="40" rx="2" fill="#a89070" opacity="0.6"/>
          ))}
          {[60,140,180].map(x => (
            <rect key={x+"b"} x={x} y="145" width="30" height="40" rx="2" fill="#a89070" opacity="0.6"/>
          ))}
          <rect x="100" y="145" width="30" height="40" rx="2" fill="#f5e6c8" opacity="0.9"/>
          <rect x="110" y="200" width="60" height="40" rx="2" fill="#7a6050"/>
          <rect x="20" y="55" width="240" height="10" rx="2" fill="#a89070"/>
        </svg>

        {/* Rating badge */}
        <div style={{
          position:"absolute",bottom:"2rem",left:"-1rem",
          background:S.white,padding:"1rem 1.5rem",borderRadius:8,
          boxShadow:"0 8px 32px rgba(0,0,0,0.1)",display:"flex",alignItems:"center",gap:12,
        }}>
          <span style={{fontSize:28}}>⭐</span>
          <div>
            <div style={{fontFamily:S.serif,fontSize:22,fontWeight:600,color:S.dark}}>4.9/5</div>
            <div style={{fontSize:11,color:S.muted,letterSpacing:"0.08em",textTransform:"uppercase"}}>Guest Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatsBar() {
  return (
    <div style={{
      display:"grid",gridTemplateColumns:"repeat(4,1fr)",
      borderTop:`1px solid ${S.border}`,borderBottom:`1px solid ${S.border}`,
      background:S.white,
    }}>
      {STATS.map((s, i) => (
        <div key={i} style={{
          padding:"2rem",textAlign:"center",
          borderRight: i < 3 ? `1px solid ${S.border}` : "none",
        }}>
          <div style={{fontFamily:S.serif,fontSize:36,fontWeight:600,color:S.dark}}>{s.num}</div>
          <div style={{fontSize:12,color:S.muted,letterSpacing:"0.1em",textTransform:"uppercase",marginTop:4}}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

function BookingBar() {
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
  const [checkin, setCheckin] = useState(today);
  const [checkout, setCheckout] = useState(tomorrow);
  const [msg, setMsg] = useState("");

  const check = () => {
    if (!checkin || !checkout) { setMsg("⚠ Please select both dates."); return; }
    setMsg("✓ Rooms available for your dates! Scroll down to book.");
  };

  return (
    <div style={{background:S.dark,padding:"4rem 3rem",color:S.white}}>
      <div style={{fontSize:11,letterSpacing:"0.2em",textTransform:"uppercase",color:S.goldLight,marginBottom:"0.75rem"}}>// Quick Reservation</div>
      <h2 style={{fontFamily:S.serif,fontSize:36,fontWeight:500,color:S.white,marginBottom:"0.5rem"}}>Check Availability</h2>
      <p style={{color:"rgba(255,255,255,0.5)",fontSize:14,marginBottom:"2rem"}}>Select your dates and room type to see available options instantly.</p>

      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr) auto",gap:"1rem",alignItems:"flex-end"}}>
        {[
          {label:"Check In", el:<input className="dark-input" type="date" min={today} value={checkin} onChange={e=>setCheckin(e.target.value)}/>},
          {label:"Check Out",el:<input className="dark-input" type="date" min={today} value={checkout} onChange={e=>setCheckout(e.target.value)}/>},
          {label:"Guests",   el:<select className="dark-input"><option>1 Guest</option><option>2 Guests</option><option>3 Guests</option><option>4+ Guests</option></select>},
          {label:"Room Type",el:<select className="dark-input"><option>Any Room</option><option>Deluxe Room</option><option>Suite</option><option>Presidential Suite</option></select>},
        ].map(({label,el}) => (
          <div key={label} style={{display:"flex",flexDirection:"column",gap:6}}>
            <label style={{fontSize:11,letterSpacing:"0.1em",textTransform:"uppercase",color:"rgba(255,255,255,0.5)"}}>{label}</label>
            {el}
          </div>
        ))}
        <button className="search-btn" onClick={check}>Search Rooms →</button>
      </div>

      {msg && <p style={{marginTop:"1rem",fontSize:14,color:S.goldLight}}>{msg}</p>}
    </div>
  );
}

function RoomCard({ room }) {
  return (
    <div className="room-card" style={{
      background:S.white,border:`1px solid ${S.border}`,
      borderRadius:8,overflow:"hidden",cursor:"pointer",
    }}>
      <div style={{height:200,position:"relative",background:room.color,display:"flex",alignItems:"center",justifyContent:"center"}}>
        <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
          <rect width="300" height="200" fill={room.color}/>
          <rect x="20" y="80" width="260" height="100" rx="4" fill="rgba(0,0,0,0.1)"/>
          <rect x="30" y="60" width="110" height="80" rx="4" fill="rgba(255,255,255,0.3)"/>
          <rect x="155" y="60" width="115" height="80" rx="4" fill="rgba(255,255,255,0.2)"/>
          <rect x="110" y="120" width="80" height="60" rx="2" fill="rgba(0,0,0,0.15)"/>
        </svg>
        <span style={{
          position:"absolute",top:12,right:12,background:S.white,color:S.dark,
          fontSize:11,fontWeight:600,padding:"4px 10px",borderRadius:100,letterSpacing:"0.05em",
        }}>{room.badge}</span>
      </div>
      <div style={{padding:"1.25rem"}}>
        <div style={{fontFamily:S.serif,fontSize:20,fontWeight:600,color:S.dark,marginBottom:4}}>{room.name}</div>
        <div style={{display:"flex",gap:"1rem",flexWrap:"wrap",margin:"0.75rem 0"}}>
          {[`📐 ${room.size}`,`👤 ${room.guests} Guests`,`🛏 ${room.bed}`,`🌆 ${room.view}`].map(f=>(
            <span key={f} style={{fontSize:12,color:S.muted}}>{f}</span>
          ))}
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:"1rem",paddingTop:"1rem",borderTop:`1px solid ${S.border}`}}>
          <div style={{fontFamily:S.serif,fontSize:22,fontWeight:600,color:S.dark}}>
            {room.price}<span style={{fontSize:12,color:S.muted,fontFamily:S.sans,fontWeight:400}}>/night</span>
          </div>
          <button className="book-btn" onClick={()=>alert(`"${room.name}" selected!\n\nThank you for choosing GrandVista Hotel! 🏨`)}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

function Rooms() {
  return (
    <section id="rooms" style={{padding:"5rem 3rem",background:S.bg}}>
      <div style={{textAlign:"center",marginBottom:"3.5rem"}}>
        <div style={{fontSize:11,letterSpacing:"0.2em",textTransform:"uppercase",color:S.gold,marginBottom:"0.75rem"}}>// Accommodations</div>
        <h2 style={{fontFamily:S.serif,fontSize:"clamp(32px,4vw,48px)",fontWeight:500,color:S.dark,letterSpacing:-1}}>Our Rooms &amp; Suites</h2>
        <p style={{color:S.muted,fontSize:14,marginTop:"0.5rem"}}>Every room crafted for comfort, elegance, and a restful stay.</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1.5rem"}}>
        {ROOMS.map(r => <RoomCard key={r.id} room={r}/>)}
      </div>
    </section>
  );
}

function GalleryItem({ item }) {
  return (
    <div className="gallery-item" style={{borderRadius:8,overflow:"hidden",position:"relative",cursor:"pointer",gridRow:item.span?"1/3":"auto"}}>
      <svg viewBox={item.span?"0 0 400 440":"0 0 200 220"} xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",display:"block"}}>
        <rect width="100%" height="100%" fill={item.bg}/>
        <text x="50%" y="90%" fontFamily="Georgia" fontSize="16" fill="rgba(255,255,255,0.7)" textAnchor="middle">{item.label}</text>
      </svg>
      <div className="overlay" style={{
        position:"absolute",inset:0,background:"rgba(0,0,0,0.3)",
        display:"flex",alignItems:"center",justifyContent:"center",
      }}>
        <span style={{color:"white",fontSize:13,fontWeight:500,letterSpacing:"0.1em"}}>VIEW</span>
      </div>
    </div>
  );
}

function Gallery() {
  return (
    <section id="gallery" style={{padding:"5rem 3rem",background:S.white}}>
      <div style={{textAlign:"center",marginBottom:"3.5rem"}}>
        <div style={{fontSize:11,letterSpacing:"0.2em",textTransform:"uppercase",color:S.gold,marginBottom:"0.75rem"}}>// Visual Tour</div>
        <h2 style={{fontFamily:S.serif,fontSize:"clamp(32px,4vw,48px)",fontWeight:500,color:S.dark,letterSpacing:-1}}>Hotel Gallery</h2>
        <p style={{color:S.muted,fontSize:14,marginTop:"0.5rem"}}>A glimpse into the world of GrandVista.</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gridTemplateRows:"220px 220px",gap:"1rem"}}>
        {GALLERY.map((g,i) => <GalleryItem key={i} item={g}/>)}
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" style={{padding:"5rem 3rem",background:S.white}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4rem",alignItems:"start"}}>
        {/* Info */}
        <div>
          <h2 style={{fontFamily:S.serif,fontSize:38,fontWeight:500,color:S.dark,marginBottom:"1rem",lineHeight:1.15}}>Get In<br/>Touch With Us</h2>
          <p style={{color:S.muted,fontSize:14,lineHeight:1.7,marginBottom:"2rem"}}>
            Our concierge team is available 24/7 to assist you with reservations, special requests, and any inquiries.
          </p>
          <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
            {[
              {icon:"📍", text:"42 Luxury Avenue, New Delhi, India"},
              {icon:"📞", text:"+91 98765 43210"},
              {icon:"✉️", text:"info@grandvistahotel.com"},
              {icon:"🕐", text:"Check-in: 2PM · Check-out: 11AM"},
            ].map(({icon,text}) => (
              <div key={text} style={{display:"flex",alignItems:"center",gap:12,fontSize:14,color:S.text}}>
                <div style={{
                  width:36,height:36,borderRadius:"50%",
                  background:"linear-gradient(135deg,#f5f0e8,#ede5d5)",
                  display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0,
                }}>{icon}</div>
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem"}}>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              <label style={{fontSize:12,fontWeight:500,color:S.text}}>First Name</label>
              <input className="light-input" placeholder="Rahul"/>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              <label style={{fontSize:12,fontWeight:500,color:S.text}}>Last Name</label>
              <input className="light-input" placeholder="Sharma"/>
            </div>
          </div>
          {[
            {label:"Email Address", type:"email", ph:"rahul@email.com"},
            {label:"Phone Number",  type:"tel",   ph:"+91 98765 43210"},
          ].map(({label,type,ph}) => (
            <div key={label} style={{display:"flex",flexDirection:"column",gap:6}}>
              <label style={{fontSize:12,fontWeight:500,color:S.text}}>{label}</label>
              <input className="light-input" type={type} placeholder={ph}/>
            </div>
          ))}
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            <label style={{fontSize:12,fontWeight:500,color:S.text}}>Subject</label>
            <select className="light-input">
              <option>Room Booking Enquiry</option>
              <option>Special Occasion</option>
              <option>Corporate Stay</option>
              <option>Feedback</option>
            </select>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            <label style={{fontSize:12,fontWeight:500,color:S.text}}>Message</label>
            <textarea className="light-input" rows={4} placeholder="Tell us how we can help you..." style={{resize:"vertical"}}/>
          </div>
          <button className="submit-btn" onClick={()=>setSent(true)}>Send Message →</button>
          {sent && (
            <div style={{color:"#2a7a4a",fontSize:13,textAlign:"center",padding:8,background:"#e8f5e8",borderRadius:4}}>
              ✓ Message sent! We'll get back to you within 24 hours.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    {title:"Quick Links", links:["Rooms & Suites","Gallery","Contact","Dining"]},
    {title:"Amenities",   links:["Swimming Pool","Spa & Wellness","Fitness Center","Rooftop Bar"]},
    {title:"Policies",    links:["Cancellation Policy","Privacy Policy","Terms of Service","FAQ"]},
  ];
  return (
    <>
      <footer style={{background:"#111",color:"rgba(255,255,255,0.5)",padding:"3rem",display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:"3rem"}}>
        <div>
          <div style={{fontFamily:S.serif,fontSize:22,fontWeight:600,color:"white",marginBottom:"0.75rem"}}>
            Grand<span style={{color:S.gold}}>Vista</span> Hotel
          </div>
          <p style={{fontSize:13,lineHeight:1.6,maxWidth:220}}>Where luxury meets comfort. Your perfect stay awaits in New Delhi.</p>
        </div>
        {cols.map(c => (
          <div key={c.title}>
            <h4 style={{color:"white",fontSize:13,fontWeight:500,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:"1rem"}}>{c.title}</h4>
            <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:8}}>
              {c.links.map(l => <li key={l}><a href="#" className="footer-link">{l}</a></li>)}
            </ul>
          </div>
        ))}
      </footer>
      <div style={{background:"#0a0a0a",color:"rgba(255,255,255,0.3)",textAlign:"center",padding:"1rem 3rem",fontSize:12}}>
        © 2025 GrandVista Hotel. All rights reserved. · Made with ♥ in New Delhi
      </div>
    </>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <style>{gStyles}</style>
      <Navbar />
      <Hero />
      <StatsBar />
      <BookingBar />
      <Rooms />
      <Gallery />
      <Contact />
      <Footer />
    </>
  );
}
