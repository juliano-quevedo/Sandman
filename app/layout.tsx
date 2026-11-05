import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '../css/tokens.css';
import '../css/base.css';
import '../css/components.css';
import '../css/landing.css';
import '../css/policy.css';

export const metadata: Metadata = {
  title: 'Rodow — Cada viagem vale mais',
  description:
    'Registre viagens de carro ou moto, complete desafios, ganhe pontos e suba no ranking da comunidade Rodow.',
  openGraph: {
    type: 'website',
    siteName: 'Rodow',
    locale: 'pt_BR',
    title: 'Rodow — Cada viagem vale mais',
    description:
      'Registre viagens de carro ou moto, complete desafios, ganhe pontos e suba no ranking da comunidade Rodow.',
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="theme-color" content="#f1f3f9" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.3.1/css/fontawesome.min.css"
          integrity="sha512-SMQ1DwSGiIDyNoXdQae7kUBADdtQa8Xsb3LxBxzAXExZNCCH/36yQSpZSYo1c6ckFshd1iMp9eD9+s9+tdhmyg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.3.1/css/solid.min.css"
          integrity="sha512-E5l6RuM1LLr8r+BTSEtKE9mqwPrO+HQNKbBacr303FoExXNvjq2dX7/0A3sV6OwusCkVmMRZ5zcSDwCziA+n8Q=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
