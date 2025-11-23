// src/components/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  Home,
  User,
  Code,
  Briefcase,
  Award,
  GraduationCap,
  FileText,
  Mail,
} from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Home', href: '/' }, // route
  { icon: User, label: 'About', href: '#about' },
  { icon: Code, label: 'Skills', href: '#skills' },
  { icon: Briefcase, label: 'Projects', href: '#projects' },
  { icon: Award, label: 'Certifications', href: '#certifications' },
  { icon: GraduationCap, label: 'Education', href: '#education' },
  { icon: FileText, label: 'Resume', href: '#resume' },
  { icon: Mail, label: 'Contact', href: '/contact' }, // separate contact page
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const HEADER_OFFSET = 84;
  const NAV_DELAY_MS = 140;

  const scrollToIdWithOffset = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  useEffect(() => {
    // close mobile menu on route change
    setIsOpen(false);

    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => scrollToIdWithOffset(id), 80);
      return;
    }

    if (location.pathname === '/contact') {
      setActiveSection('contact');
      setScrolled(window.scrollY > 50);
      return;
    }

    if (location.pathname === '/') return;

    setActiveSection('');
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (location.pathname !== '/') return;

    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + HEADER_OFFSET + 10;

      sections.forEach((section) => {
        const sec = section as HTMLElement;
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveSection(sec.id);
        }
      });

      setScrolled(window.scrollY > 50);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [location.pathname]);

  // lock page scroll when mobile menu open and disable main interaction
  useEffect(() => {
    const mainEl = document.querySelector('main');
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
      if (mainEl) {
        mainEl.setAttribute('aria-hidden', 'true');
        (mainEl as HTMLElement).style.pointerEvents = 'none';
      }
    } else {
      document.body.classList.remove('overflow-hidden');
      if (mainEl) {
        mainEl.removeAttribute('aria-hidden');
        (mainEl as HTMLElement).style.pointerEvents = '';
      }
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
      if (mainEl) {
        mainEl.removeAttribute('aria-hidden');
        (mainEl as HTMLElement).style.pointerEvents = '';
      }
    };
  }, [isOpen]);

  function NavLink({ item, className, onClick }: any) {
    const isRoute = item.href.startsWith('/');
    const baseClasses = `flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${className}`;

    if (isRoute) {
      return (
        <Link
          to={item.href}
          onClick={(e) => {
            onClick?.();
            if (item.href === '/') {
              if (location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                history.replaceState(null, '', '/');
                return;
              }
            }
          }}
          className={baseClasses}
        >
          <item.icon className="w-4 h-4" />
          <span>{item.label}</span>
        </Link>
      );
    }

    return (
      <a
        href={item.href}
        onClick={(e) => {
          e.preventDefault();
          onClick?.();
          const id = item.href.replace('#', '');
          if (location.pathname === '/') {
            history.replaceState(null, '', `#${id}`);
            scrollToIdWithOffset(id);
            return;
          }
          // navigate to root with hash so homepage mounts and effect scrolls
          navigate(`/#${id}`);
        }}
        className={baseClasses}
      >
        <item.icon className="w-4 h-4" />
        <span>{item.label}</span>
      </a>
    );
  }

  /* Simple mobile menu variants (kept minimal) */
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  const menuVariants = {
    hidden: { y: -8, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -8, opacity: 0 },
  };

  /* Render mobile menu into body to avoid transform/stacking issues */
  const mobileMenu = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-portal"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          className="fixed inset-0 z-[9999] flex items-start justify-center"
        >
          {/* darker overlay so background doesn't peek through */}
          <div className="absolute inset-0 bg-black/65" onClick={() => setIsOpen(false)} />

          {/* menu card positioned from top so it always appears centered in viewport */}
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative mt-14 w-full max-w-md mx-4 bg-white rounded-2xl shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{ willChange: 'transform' }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <div className="font-semibold">Menu</div>
              <button onClick={() => setIsOpen(false)} className="p-2 rounded-md">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col divide-y">
              {navItems.map((item) => {
                const key = item.href.startsWith('#') ? item.href.slice(1) : item.href.replace('/', '');
                const active = activeSection === key;
                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      setIsOpen(false);
                      // small delay to allow close animation
                      setTimeout(() => {
                        if (item.href.startsWith('/')) {
                          if (item.href === '/') {
                            if (location.pathname === '/') {
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                              history.replaceState(null, '', '/');
                              return;
                            }
                            navigate('/');
                            return;
                          }
                          navigate(item.href);
                          return;
                        }
                        // hash link
                        const id = item.href.replace('#', '');
                        if (location.pathname === '/') {
                          scrollToIdWithOffset(id);
                          history.replaceState(null, '', `#${id}`);
                        } else {
                          navigate(`/#${id}`);
                        }
                      }, NAV_DELAY_MS);
                    }}
                    className={`w-full text-left px-4 py-4 flex items-center gap-3 ${active ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                  >
                    <item.icon className="w-5 h-5 text-gray-700" />
                    <span className="text-sm font-medium text-gray-900">{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="px-4 py-3 border-t text-xs text-gray-500">© {new Date().getFullYear()} Samrat</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/30 dark:bg-gray-900/30 backdrop-blur-xl shadow-lg' : 'bg-transparent'
      }`}
      role="navigation"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="relative">
            <Link to="/" aria-label="Home">
              <span className="text-1.5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 to-fuchsia-600 text-transparent bg-clip-text">
                PORTFOLIO
              </span>
            </Link>
            <motion.div
              className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-fuchsia-600"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5 }}
            />
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const key = item.href.startsWith('#') ? item.href.slice(1) : item.href.replace('/', '');
              const active = activeSection === key;
              return (
                <NavLink
                  key={item.label}
                  item={item}
                  onClick={() => setIsOpen(false)}
                  className={`${
                    active
                      ? 'bg-gradient-to-r from-blue-500 to-fuchsia-500 text-white shadow-md'
                      : 'text-black hover:bg-gradient-to-r hover:from-blue-500 hover:to-fuchsia-500 hover:text-white'
                  }`}
                />
              );
            })}
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(true)} className="p-2 rounded-full bg-white/20" aria-label="Open menu">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Portal the mobile menu into body so it's viewport-centered regardless of transforms */}
      {typeof document !== 'undefined' ? createPortal(mobileMenu, document.body) : null}
    </nav>
  );
}

/* ---------- NavLink component extracted to avoid duplication ---------- */
function NavLink({ item, className, onClick }: any) {
  const isRoute = item.href.startsWith('/');
  const baseClasses = `flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${className}`;
  if (isRoute) {
    return (
      <Link to={item.href} onClick={onClick} className={baseClasses}>
        <item.icon className="w-4 h-4" />
        <span>{item.label}</span>
      </Link>
    );
  }
  return (
    <a
      href={item.href}
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
        // fallback behaviour: update hash if already on root
        const id = item.href.replace('#', '');
        if (window.location.pathname === '/') {
          history.replaceState(null, '', `#${id}`);
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.location.href = `/#${id}`;
        }
      }}
      className={baseClasses}
    >
      <item.icon className="w-4 h-4" />
      <span>{item.label}</span>
    </a>
  );
}
