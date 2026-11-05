'use client';

import Link from 'next/link';
import Image, { type StaticImageData } from 'next/image';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from 'react';
import styles from './landing-interactions.module.css';

interface ToastContextValue {
  showToast: () => void;
}

interface ToastProviderProps {
  children: ReactNode;
}

interface ToastLinkProps {
  href: string;
  className: string;
  children: ReactNode;
}

interface StoreButtonProps {
  image: StaticImageData;
  alt: string;
  ariaLabel: string;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: ToastProviderProps) {
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback(() => {
    setVisible(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setVisible(false), 3200);
  }, []);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className={`toast${visible ? ' is-visible' : ''}`} role="status" aria-live="polite">
        Os links oficiais das lojas serão adicionados em breve.
      </div>
    </ToastContext.Provider>
  );
}

function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('Os componentes de aviso precisam estar dentro de ToastProvider.');
  }
  return context;
}

export function ToastLink({ href, className, children }: ToastLinkProps) {
  const { showToast } = useToast();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    showToast();
  }

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}

export function StoreButton({ image, alt, ariaLabel }: StoreButtonProps) {
  const { showToast } = useToast();

  return (
    <button className="store-button" type="button" onClick={showToast} aria-label={ariaLabel}>
      <Image src={image} alt={alt} />
    </button>
  );
}

const navigationItems = [
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#desafios', label: 'Desafios' },
  { href: '#ranking', label: 'Ranking' },
  { href: '#duvidas', label: 'Dúvidas' },
] as const;

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 601px)');
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setIsOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };

    mediaQuery.addEventListener('change', closeOnDesktop);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      mediaQuery.removeEventListener('change', closeOnDesktop);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={toggleRef}
        className={`menu-toggle ${styles.menuToggle}`}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={isOpen}
        aria-controls="menu-principal"
      >
        <i
          className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'}`}
          aria-hidden="true"
        />
      </button>
      <nav
        className={`nav-links ${styles.mobileNav} ${isOpen ? styles.mobileNavOpen : ''}`}
        id="menu-principal"
        aria-label="Principal"
        onClick={() => setIsOpen(false)}
      >
        {navigationItems.map(({ href, label }) => (
          <Link href={href} key={href}>
            {label}
          </Link>
        ))}
      </nav>
    </>
  );
}
