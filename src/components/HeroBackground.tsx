import { MeshGradient } from "@paper-design/shaders-react"

export default function HeroBackground() {
  return (
    <div className="hero-bg-shader" aria-hidden="true">
      <MeshGradient
        style={{ width: "100%", height: "100%" }}
        colors={["#07090d", "#0d2a18", "#daf0e2", "#07090d", "#0a1e2e"]}
        speed={0.35}
        distortion={0.9}
        swirl={0.2}
      />
    </div>
  )
}
