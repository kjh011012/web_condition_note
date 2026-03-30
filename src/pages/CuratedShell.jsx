import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import SiteFooter from "../components/SiteFooter";
import SkipLink from "../components/SkipLink";
import { primaryNav } from "../data/siteData";

const navClassName = ({ isActive }) =>
  isActive ? "cn-header__nav-link cn-header__nav-link--active" : "cn-header__nav-link";

const mobileNavItems = [
  { label: "스테이", to: "/villages" },
  { label: "여정", to: "/chat?start=curation" },
  { label: "리포트", to: "/archive" },
];

function CuratedShell() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isCheckout =
    location.pathname.startsWith("/checkout") ||
    location.pathname === "/booking-complete";
  const isDetailPage = /^\/villages\/[^/]+$/.test(location.pathname);
  const isHome = location.pathname === "/";
  const isStayCatalog = location.pathname === "/villages";
  // 풀블리드 히어로가 있는 페이지 — 스크롤 전 투명 헤더
  const isHeroPage =
    isHome ||
    /^\/villages(\/[^/]+)?$/.test(location.pathname);
  const headerTransparent = isHeroPage && !scrolled;
  const headerClassName = headerTransparent
    ? isStayCatalog
      ? "cn-header--transparent-light"
      : "cn-header--transparent"
    : "cn-header--scrolled";

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="curated-app">
      <SkipLink />
      <div className="curated-app__ambient curated-app__ambient--one" />
      <div className="curated-app__ambient curated-app__ambient--two" />
      <header
        className={`cn-header ${headerClassName}`}
      >
        <div className="cn-header__inner">
          <NavLink className="cn-header__logo" to="/">
            Condition Note
          </NavLink>
          <nav className="cn-header__nav" aria-label="주 메뉴">
            {primaryNav.map((item) => (
              <NavLink
                key={item.to}
                className={navClassName}
                end={item.to === "/"}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink className={navClassName} to="/support">
              도움
            </NavLink>
          </nav>
          <div className="cn-header__actions">
            <NavLink className="cn-header__cta" to="/my/reservations">
              나의 여정
            </NavLink>
          </div>
          <button
            aria-controls="mobile-menu"
            aria-expanded={mobileMenuOpen}
            aria-label="메뉴"
            className="cn-header__hamburger"
            onClick={() => setMobileMenuOpen((open) => !open)}
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {mobileMenuOpen ? (
        <div
          className="cn-header__mobile-menu"
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
        >
          {primaryNav.map((item) => (
            <NavLink
              key={item.to}
              className={navClassName}
              end={item.to === "/"}
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink className={navClassName} to="/support">
            도움
          </NavLink>
          <NavLink className="cn-header__cta" to="/my/reservations">
            나의 여정
          </NavLink>
        </div>
      ) : null}

      <main
        className={`cn-main ${isHome ? "cn-main--home" : ""}`}
        id="main-content"
        tabIndex={-1}
      >
        <Outlet />
      </main>

      {!isCheckout ? <SiteFooter /> : null}

      {!isCheckout && !isDetailPage ? (
        <nav className="cn-bottom-nav" aria-label="하단 내비게이션">
          {mobileNavItems.map((item) => (
            <NavLink
              key={item.to}
              className={({ isActive }) =>
                isActive ? "cn-bottom-nav__link cn-bottom-nav__link--active" : "cn-bottom-nav__link"
              }
              end={item.to === "/"}
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      ) : null}
    </div>
  );
}

export default CuratedShell;
