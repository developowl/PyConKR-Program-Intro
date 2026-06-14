import { useState, useEffect } from "react";

/**
 * PyCon Korea 2026 — 프로그램 소개 (본문)
 *
 * 헤더는 공용 컴포넌트를 사용하므로 이 컴포넌트는 본문(main)만 렌더링합니다.
 *
 * 프로그램 내용은 아래 `programs` 배열만 수정하면 됩니다.
 * - link: 없으면 생략하거나 빈 문자열("")로 두면 "관련 링크" 줄이 표시되지 않습니다.
 * - image: 실제 이미지 URL을 넣으면 자동으로 <img>로 렌더링되고, 없으면 "예시 사진" 자리표시자가 보입니다.
 */

const programs = [
  {
    name: "프로그램명",
    time: "00:00 ~ 00:00",
    place: "원흥관 (3층)",
    link: "#",
    description: "내용",
    image: "", // 예: "https://.../photo.jpg"
  },
  {
    name: "프로그램명",
    time: "00:00 ~ 00:00",
    place: "원흥관 (3층)",
    link: "#",
    description: "내용",
    image: "",
  },
  {
    name: "프로그램명",
    time: "00:00 ~ 00:00",
    place: "원흥관 (3층)",
    link: "#",
    description: "내용",
    image: "",
  },
  {
    name: "프로그램명",
    time: "00:00 ~ 00:00",
    place: "원흥관 (3층)",
    link: "#",
    description: "내용",
    image: "",
  },
];

const theme = {
  bg: "#160d28",
  surface: "#1e1338",
  surface2: "#271847",
  line: "#3a2a5e",
  lineSoft: "#2c1e4a",
  ink: "#f3eefb",
  inkSoft: "#c8bde2",
  inkFaint: "#8b7eaa",
  accent: "#e85bc4",
  accentHi: "#f178d4",
  radius: "14px",
};

function useIsMobile(breakpoint = 560) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= breakpoint : false
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);
  return isMobile;
}

function InfoItem({ label, children }) {
  return (
    <li
      style={{
        position: "relative",
        paddingLeft: 20,
        color: theme.inkSoft,
        fontSize: "0.98rem",
        lineHeight: 1.75,
      }}
    >
      <span
        aria-hidden
        style={{
          position: "absolute",
          left: 2,
          top: "0.7em",
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: theme.accent,
        }}
      />
      <span style={{ color: theme.ink, fontWeight: 500 }}>{label}:</span>{" "}
      {children}
    </li>
  );
}

function ProgramCard({ program, index, isMobile }) {
  const { name, time, place, link, description, image } = program;
  const num = String(index + 1).padStart(2, "0");

  return (
    <article
      style={{
        background: theme.surface,
        border: `1px solid ${theme.lineSoft}`,
        borderRadius: theme.radius,
        padding: isMobile ? "28px 24px" : "34px 36px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.95rem",
            color: theme.accent,
            flexShrink: 0,
          }}
        >
          {num}
        </span>
        <h3
          style={{
            fontSize: isMobile ? "1.3rem" : "1.6rem",
            fontWeight: 700,
            letterSpacing: "-0.01em",
            color: theme.ink,
            margin: 0,
          }}
        >
          {name}
        </h3>
      </div>

      <p
        style={{
          fontSize: "0.95rem",
          fontWeight: 600,
          color: theme.ink,
          marginBottom: 14,
        }}
      >
        Info.
      </p>

      <ul style={{ listStyle: "none", display: "grid", gap: 12, margin: 0, padding: 0 }}>
        <InfoItem label="운영시간">
          <span style={{ fontFamily: "'JetBrains Mono', monospace", color: theme.inkSoft }}>
            {time}
          </span>{" "}
          (KST)
        </InfoItem>
        <InfoItem label="장소">{place}</InfoItem>
        {link ? (
          <InfoItem label="관련 링크">
            <a
              href={link}
              style={{ color: theme.accent, textDecoration: "none" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = theme.accentHi;
                e.currentTarget.style.textDecoration = "underline";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = theme.accent;
                e.currentTarget.style.textDecoration = "none";
              }}
            >
              관련 링크
            </a>
          </InfoItem>
        ) : null}
        <InfoItem label="설명">{description}</InfoItem>
      </ul>

      {image ? (
        <img
          src={image}
          alt={`${name} 예시 사진`}
          style={{
            marginTop: 26,
            width: "100%",
            aspectRatio: "16 / 9",
            objectFit: "cover",
            borderRadius: 10,
            border: `1px solid ${theme.line}`,
            display: "block",
          }}
        />
      ) : (
        <div
          style={{
            marginTop: 26,
            aspectRatio: "16 / 9",
            borderRadius: 10,
            border: `1px solid ${theme.line}`,
            background: theme.surface2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: theme.inkFaint,
            fontSize: "0.9rem",
          }}
        >
          예시 사진
        </div>
      )}
    </article>
  );
}

export default function ProgramIntro() {
  const isMobile = useIsMobile();

  return (
    <main
      style={{
        background: theme.bg,
        color: theme.ink,
        fontFamily: "'IBM Plex Sans KR', system-ui, sans-serif",
        lineHeight: 1.75,
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: isMobile ? "48px 20px 72px" : "72px 32px 96px",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 2.9rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            margin: "0 0 28px",
          }}
        >
          프로그램 소개
        </h1>
        <p
          style={{
            color: theme.inkSoft,
            fontSize: "1.05rem",
            maxWidth: 760,
            margin: "0 0 64px",
          }}
        >
          올해 파이콘 한국의 프로그램을 소개합니다! 많은 참여 부탁드립니다.
        </p>

        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            letterSpacing: "-0.01em",
            margin: "0 0 36px",
          }}
        >
          프로그램
        </h2>

        <div style={{ display: "grid", gap: 28 }}>
          {programs.map((program, i) => (
            <ProgramCard key={i} program={program} index={i} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </main>
  );
}
