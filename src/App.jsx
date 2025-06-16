// src/App.jsx
import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo       from './assets/thirdylogo.svg'
import dotPattern from './assets/dot-pattern.png'
import heroImg    from './assets/launcher-screenshot.png'
import heroVideo  from './assets/hero-video.mp4'

export default function App() {
  const [gamesOpen, setGamesOpen] = useState(false)
  const [videoPlayed, setVideoPlayed] = useState(false)
  const videoRef = useRef(null)

  const games = [
    'Thirdy: The Chosen One',
    "Thirdy's Revenge",
    'El Thirdy',
  ]

  useEffect(() => {
    if (!videoRef.current || videoPlayed) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          videoRef.current.play().catch(()=>{})
          setVideoPlayed(true)
          obs.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    obs.observe(videoRef.current)
    return () => obs.disconnect()
  }, [videoPlayed])

  return (
    <div className="min-h-screen flex flex-col bg-nx-black text-gray-200 font-sans">
      {/* ===== NAVBAR ===== */}
      <nav className="relative bg-nx-dark border-b border-gray-800 h-16 shadow-sm">
        <img
          src={logo}
          alt="Thirdy Logo"
          className="absolute left-6 top-1/2 transform -translate-y-1/2 w-[150px] h-auto"
        />
        <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Games dropdown */}
          <div className="relative">
            <button
              onClick={() => setGamesOpen(!gamesOpen)}
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition"
            >
              GAMES ▾
            </button>
            {gamesOpen && (
              <div className="absolute top-full mt-2 w-56 bg-nx-dark border border-gray-700 rounded-xl shadow-xl z-50">
                {games.map((g, i) => (
                  <a
                    key={i}
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition"
                  >
                    {g}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Nav Buttons */}
          <div className="flex items-center space-x-4">
            <button className="px-5 py-2.5 bg-thirdy-blue text-white rounded-xl text-sm font-semibold shadow-md">
              DOWNLOAD
            </button>
            <button className="px-5 py-2.5 bg-yellow-400 text-black rounded-xl text-sm font-semibold shadow-md">
              BUY $TTT
            </button>
            <Link
              to="/login"
              className="px-5 py-2.5 bg-gray-800 text-white rounded-xl text-sm font-semibold shadow-md text-center"
            >
              LOG IN
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2.5 bg-white text-black rounded-xl text-sm font-semibold shadow-md text-center"
            >
              CREATE ACCOUNT
            </Link>
          </div>
        </div>
      </nav>

      {/* ===== HERO SECTION ===== */}
      <main className="flex-grow">
        <section
          className="py-32 bg-repeat"
          style={{ backgroundImage: `url(${dotPattern})`, backgroundSize: '80px' }}
        >
          <div className="max-w-4xl mx-auto px-8 text-center space-y-8">
            <h1 className="text-6xl font-extrabold tracking-tight">THIRDY LAUNCHER</h1>
            <p className="text-xl text-gray-400 mx-auto max-w-2xl">
              Play all your Thirdy games in one sleek, global launcher. Fast installs,
              instant updates, and all your friends in one place.
            </p>

            {/* Coming Soon */}
            <span className="uppercase text-gray-400 text-sm tracking-wide">
              Coming Soon
            </span>

            {/* Symmetrical cards */}
            <div className="flex justify-center items-start gap-12">
              <div className="bg-gray-800 p-5 rounded-2xl shadow-2xl flex justify-center items-center" style={{ width: 420 }}>
                <img
                  src={heroImg}
                  alt="Launcher Screenshot"
                  className="max-w-full max-h-[500px] rounded-lg object-contain"
                />
              </div>
              <div className="bg-gray-800 p-5 rounded-2xl shadow-2xl flex justify-center items-center" style={{ width: 420 }}>
                <video
                  ref={videoRef}
                  src={heroVideo}
                  muted
                  playsInline
                  controls={false}
                  className="max-w-full max-h-[500px] rounded-lg object-contain"
                />
              </div>
            </div>

            {/* Download button */}
            <button className="mt-8 px-8 py-4 bg-nx-blue text-white rounded-full text-lg font-semibold shadow-lg">
              ⬇ DOWNLOAD FOR WINDOWS
            </button>
          </div>
        </section>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="bg-nx-dark border-t border-gray-800 py-10 mt-20">
        <div className="max-w-6xl mx-auto px-8 flex flex-col items-center space-y-4">
          {/* top row */}
          <div className="flex justify-center space-x-12">
            <a href="#" className="text-sm text-gray-400 hover:text-white transition">
              SUPPORT
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition">
              PRESSROOM
            </a>
          </div>
          {/* bottom row: social links */}
          <div className="flex justify-center space-x-12">
            <a
              href="https://t.me/OfficialThirdyPortal"
              target="_blank"
              rel="noopener"
              className="text-sm text-gray-400 hover:text-white transition uppercase"
            >
              Telegram
            </a>
            <a
              href="https://x.com/ToughThirdy"
              target="_blank"
              rel="noopener"
              className="text-sm text-gray-400 hover:text-white transition uppercase"
            >
              X
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
