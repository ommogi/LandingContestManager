import { MeshGradient } from "@paper-design/shaders-react"

export default function HeroBackground() {
  return (
    <div className="hero-bg-shader" aria-hidden="true">
      <MeshGradient
        style={{ width: "100%", height: "100%" }}
        colors={["#07090d", "#0d2a18", "#091e2e", "#112b12", "#07090d"]}
        speed={0.3}
        distortion={0.75}
        swirl={0.15}
      />
    </div>
  )
}
