import { Fragment } from "react";
import { Link } from "react-router-dom";

function IconAppStore() {
  return (
    <svg
      aria-hidden
      className="cn-site-footer__store-icon"
      fill="none"
      height="18"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect height="20" rx="2" ry="2" width="14" x="5" y="2" />
      <line x1="12" x2="12.01" y1="18" y2="18" />
    </svg>
  );
}

function IconPlayStore() {
  return (
    <svg
      aria-hidden
      className="cn-site-footer__store-icon"
      fill="none"
      height="18"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg
      aria-hidden
      className="cn-site-footer__social-icon"
      fill="none"
      height="18"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect height="20" rx="5" ry="5" width="20" x="2" y="2" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function IconKakao() {
  return (
    <svg
      aria-hidden
      className="cn-site-footer__social-icon"
      fill="none"
      height="18"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function IconYouTube() {
  return (
    <svg
      aria-hidden
      className="cn-site-footer__social-icon"
      fill="none"
      height="18"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  );
}

const navLinks = [
  { label: "회복스테이", to: "/villages" },
  { label: "큐레이션", to: "/chat?start=curation" },
  { label: "앱 소개", to: "/archive" },
  { label: "치유마을 입점 문의", to: "/my/inquiries" },
];

export default function SiteFooter() {
  return (
    <footer className="cn-site-footer">
      <div className="cn-site-footer__shell">
        <div className="cn-site-footer__grid">
          <div className="cn-site-footer__col cn-site-footer__col--brand cn-site-footer__fade cn-site-footer__fade--100">
            <Link className="cn-site-footer__brand" to="/">
              컨디션노트
            </Link>
            <p className="cn-site-footer__tagline">
              강원도 치유마을·치유농장
              <br className="cn-site-footer__br-md-only" /> 웰니스 플랫폼
            </p>
          </div>

          <div className="cn-site-footer__col cn-site-footer__col--nav cn-site-footer__fade cn-site-footer__fade--200">
            <ul className="cn-site-footer__nav">
              {navLinks.map((item, index) => (
                <Fragment key={item.to}>
                  {index > 0 ? (
                    <li aria-hidden className="cn-site-footer__nav-sep">
                      ·
                    </li>
                  ) : null}
                  <li className="cn-site-footer__nav-item">
                    <Link className="cn-site-footer__nav-link" to={item.to}>
                      {item.label}
                    </Link>
                  </li>
                </Fragment>
              ))}
            </ul>
          </div>

          <div className="cn-site-footer__col cn-site-footer__col--actions cn-site-footer__fade cn-site-footer__fade--300">
            <div className="cn-site-footer__stores">
              <a
                className="cn-site-footer__store"
                href="https://apps.apple.com"
                rel="noreferrer"
                target="_blank"
              >
                <IconAppStore />
                <span>App Store</span>
              </a>
              <a
                className="cn-site-footer__store"
                href="https://play.google.com"
                rel="noreferrer"
                target="_blank"
              >
                <IconPlayStore />
                <span>Google Play</span>
              </a>
            </div>
            <div className="cn-site-footer__social-row">
              <a
                aria-label="Instagram"
                className="cn-site-footer__social"
                href="https://instagram.com"
                rel="noreferrer"
                target="_blank"
              >
                <IconInstagram />
              </a>
              <a
                aria-label="KakaoTalk"
                className="cn-site-footer__social"
                href="https://pf.kakao.com"
                rel="noreferrer"
                target="_blank"
              >
                <IconKakao />
              </a>
              <a
                aria-label="YouTube"
                className="cn-site-footer__social"
                href="https://youtube.com"
                rel="noreferrer"
                target="_blank"
              >
                <IconYouTube />
              </a>
            </div>
          </div>
        </div>

        <div className="cn-site-footer__bottom cn-site-footer__fade cn-site-footer__fade--400">
          <div className="cn-site-footer__legal-links">
            <Link className="cn-site-footer__legal-link" to="/support">
              이용약관
            </Link>
            <span aria-hidden className="cn-site-footer__legal-sep">
              |
            </span>
            <Link
              className="cn-site-footer__legal-link"
              to="/support/privacy"
            >
              개인정보처리방침
            </Link>
          </div>
          <div className="cn-site-footer__meta">
            <span className="cn-site-footer__meta-line">© 2026 컨디션노트</span>
            <span aria-hidden className="cn-site-footer__meta-dot">
              ·
            </span>
            <span className="cn-site-footer__meta-line">
              강원도 OO시 OO로 OO
            </span>
            <span aria-hidden className="cn-site-footer__meta-dot">
              ·
            </span>
            <span className="cn-site-footer__meta-line">
              사업자등록번호 XXX-XX-XXXXX
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
