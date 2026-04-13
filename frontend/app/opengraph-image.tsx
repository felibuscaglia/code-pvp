import { ImageResponse } from "next/og"

export const alt = "CodePvP — Real-Time Competitive Coding Battles"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f0f18",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background grid dots */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(140,130,200,0.07) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            display: "flex",
          }}
        />

        {/* Primary glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(79,57,246,0.15) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Logo icon (code brackets) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 32,
          }}
        >
          <svg
            width="72"
            height="72"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M13 7L5 16L13 25"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 7L27 16L19 25"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18 9L14 23"
              stroke="#6d5bf7"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Brand name */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            marginBottom: 20,
          }}
        >
          <span
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "white",
              letterSpacing: "-2px",
              lineHeight: 1,
            }}
          >
            Code
          </span>
          <span
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#6d5bf7",
              letterSpacing: "-2px",
              lineHeight: 1,
            }}
          >
            PvP
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: "rgba(255,255,255,0.6)",
            letterSpacing: "0.5px",
            display: "flex",
          }}
        >
          Real-Time Competitive Coding Battles
        </div>

        {/* Feature pills */}
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 40,
          }}
        >
          {["Head-to-Head", "Live Scoring", "No Signup"].map((label) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 20px",
                borderRadius: 999,
                border: "1px solid rgba(109,91,247,0.3)",
                backgroundColor: "rgba(109,91,247,0.08)",
                fontSize: 16,
                color: "rgba(255,255,255,0.7)",
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Domain */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            fontSize: 18,
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "1px",
            display: "flex",
          }}
        >
          codepvp.com
        </div>
      </div>
    ),
    { ...size },
  )
}
