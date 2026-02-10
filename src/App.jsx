// App.jsx
import { useState, useRef, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const fromName = "Veeru";
const toName = "Jaanu";

function App() {
  const [yesPressed, setYesPressed] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const noButtonRef = useRef(null);

  const handleYes = () => {
    setYesPressed(true);
    toast.success(`YAYYY 💖 ${toName} said YES!`, {
      position: "top-center",
      autoClose: 2000,
      theme: "colored",
    });
  };

  const handleNoClick = (e) => {
    e.preventDefault();
    setNoCount(prev => prev + 1);

    if (noButtonRef.current) {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const randomX = Math.random() * (vw * 0.7) + vw * 0.15;
      const randomY = Math.random() * (vh * 0.7) + vh * 0.15;

      noButtonRef.current.style.left = `${randomX}px`;
      noButtonRef.current.style.top = `${randomY}px`;
    }

    const messages = [
      "Almost had me... 😏",
      "Nope nope nope 😂",
      "You're really trying huh 👀",
      `${toName}, just say YES already 💕`,
      "This button is untouchable 😈"
    ];

    toast.info(messages[Math.min(noCount, messages.length - 1)], {
      position: "top-center",
      autoClose: 1800,
      pauseOnHover: false,
      theme: "dark",
    });
  };

  useEffect(() => {
    if (yesPressed) return;

    const noBtn = noButtonRef.current;
    if (!noBtn) return;

    const moveButton = (e) => {
      const rect = noBtn.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = centerX - mouseX;
      const dy = centerY - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 120) {
        let newX = rect.left + dx * 1.8;
        let newY = rect.top + dy * 1.8;

        newX = Math.max(40, Math.min(window.innerWidth - rect.width - 40, newX));
        newY = Math.max(40, Math.min(window.innerHeight - rect.height - 100, newY));

        noBtn.style.position = 'fixed';
        noBtn.style.left = `${newX}px`;
        noBtn.style.top = `${newY}px`;
      }
    };

    window.addEventListener('mousemove', moveButton);

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const rect = noBtn.getBoundingClientRect();

    noBtn.style.position = 'fixed';
    noBtn.style.left = `${vw / 2 - rect.width / 2}px`;
    noBtn.style.top = `${vh / 2 - rect.height / 2 - 40}px`;

    return () => {
      window.removeEventListener('mousemove', moveButton);
    };
  }, [yesPressed]);

  return (
    <>
      <ToastContainer />

      {yesPressed ? (
        <div className="yes-fullscreen">
          <div className="hearts-container">
            {[...Array(35)].map((_, i) => (
              <div
                key={i}
                className="heart"
                style={{
                  left: `${Math.random() * 100}vw`,
                  animationDelay: `${Math.random() * 6}s`,
                  animationDuration: `${7 + Math.random() * 9}s`,
                }}
              >
                ❤️
              </div>
            ))}
          </div>

          <div className="message-box">
            <h1>Yayyyy {toName}! 💖✨</h1>

            <p className="main-text">
              {fromName} knew you would say Yes! 😍
            </p>

            <p className="sub-text">
              {toName}, you’re officially {fromName}’s forever now… no running away! 🫶
            </p>

            <div className="floating-words">
              <span style={{ animationDelay: '0.4s' }}>Jaanu ❤️</span>
              <span style={{ animationDelay: '1.1s' }}>you would be</span>
              <span style={{ animationDelay: '1.9s' }}>Forever</span>
              <span style={{ animationDelay: '2.7s' }}>my 💕</span>
            </div>
          </div>

          <div className="sparkles">
            {[...Array(25)].map((_, i) => (
              <div
                key={i}
                className="sparkle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="container">
          <h1>{toName}, will you be my Valentine? 💕</h1>

          <div className="buttons-wrapper">
            <button className="yes-btn" onClick={handleYes}>
              Yes ❤️
            </button>

            <button
              ref={noButtonRef}
              className={`no-btn ${noCount > 0 ? 'uncatchable' : ''}`}
              onClick={handleNoClick}
            >
              No 😢
            </button>
          </div>

          <p className="hint">
            {toName}, No is super fast and impossible to catch… just give up and say Yes already 😘
          </p>

          <div className="background-hearts">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="bg-heart">💗</div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
