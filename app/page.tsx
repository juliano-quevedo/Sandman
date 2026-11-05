import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import appleStoreBadge from '../assets/apple-store-badge.png';
import googlePlayBadge from '../assets/google-play-badge.png';
import heroMotorcycle from '../assets/hero-motorcycle.jpg';
import rodowLogo from '../assets/rodow-logo.png';
import {
  MobileNavigation,
  StoreButton,
  ToastLink,
  ToastProvider,
} from './landing-interactions';

interface IconProps {
  name: string;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface Challenge {
  category: string;
  title: string;
  points: string;
}

interface Leader {
  name: string;
  challenges: number;
  score: string;
  icon: string;
}

interface Step {
  number: string;
  action: string;
  title: string;
  description: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

function Icon({ name }: IconProps) {
  return <i className={`fa-solid ${name}`} aria-hidden="true" />;
}

const features: Feature[] = [
  {
    icon: 'fa-route',
    title: 'Registre suas viagens',
    description:
      'Registre seus trajetos de carro ou moto e transforme cada passeio, deslocamento ou aventura em parte da sua jornada.',
  },
  {
    icon: 'fa-bullseye',
    title: 'Vá além do caminho',
    description:
      'Descubra desafios variados, defina seu próximo objetivo e encontre novas razões para explorar.',
  },
  {
    icon: 'fa-trophy',
    title: 'Conquiste seu lugar',
    description:
      'Acumule pontos ao concluir desafios, acompanhe sua posição e dispute espaço no ranking da comunidade.',
  },
];

const challenges: Challenge[] = [
  { category: 'Desafio de distância', title: 'Mais longe, mais alto', points: '+300' },
  { category: 'Consistência', title: 'Ritmo de estrada', points: '+150' },
  { category: 'Exploração', title: 'Novos horizontes', points: '+200' },
  { category: 'Sua evolução', title: 'Próxima conquista', points: '???' },
];

const leaders: Leader[] = [
  { name: 'RotaLivre', challenges: 12, score: '2.840', icon: 'fa-motorcycle' },
  { name: 'CurvaCerta', challenges: 10, score: '2.560', icon: 'fa-road' },
  { name: 'KmExtra', challenges: 9, score: '2.210', icon: 'fa-car' },
  { name: 'VentoNorte', challenges: 8, score: '1.980', icon: 'fa-mountain-sun' },
];

const steps: Step[] = [
  {
    number: '01',
    action: 'REGISTRE',
    title: 'Faça sua viagem',
    description: 'Abra o Rodow e registre seus trajetos de carro ou moto.',
  },
  {
    number: '02',
    action: 'CONQUISTE',
    title: 'Complete desafios',
    description: 'Escolha seus objetivos, conclua desafios e acumule pontos pelo caminho.',
  },
  {
    number: '03',
    action: 'EVOLUA',
    title: 'Suba no ranking',
    description: 'Acompanhe sua pontuação e compare sua evolução com a comunidade.',
  },
];

const frequentlyAskedQuestions: FAQItem[] = [
  {
    question: 'O Rodow é para carro e moto?',
    answer:
      'Sim. A proposta do Rodow é permitir que pessoas registrem viagens feitas de carro ou moto e participem de desafios da comunidade.',
  },
  {
    question: 'Como ganho pontos?',
    answer:
      'A ideia é conquistar pontos ao concluir os desafios disponíveis no aplicativo. As regras e pontuações específicas devem ser apresentadas dentro de cada desafio.',
  },
  {
    question: 'Como funciona o ranking?',
    answer:
      'O ranking destaca participantes de acordo com a pontuação acumulada, incentivando a evolução e a participação na comunidade.',
  },
  {
    question: 'O aplicativo já está disponível?',
    answer:
      'Esta página é um protótipo de divulgação. Substitua este conteúdo pelos links oficiais das lojas e pelas informações de disponibilidade do Rodow quando estiverem definidos.',
  },
];

function Logo({ small = false }: { small?: boolean }) {
  return (
    <Link
      className={`logo${small ? ' logo--sm' : ''}`}
      href="#inicio"
      aria-label="Rodow — início"
    >
      <Image className="logo__image" src={rodowLogo} alt="" width={224} height={30} />
    </Link>
  );
}

function Header() {
  return (
    <header className="site-header">
      <div className="container site-header__bar">
        <Logo />
        <MobileNavigation />
        <ToastLink className="btn btn--primary nav-cta" href="#comecar">
          Quero fazer parte <Icon name="fa-arrow-up-right-from-square" />
        </ToastLink>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="container hero__grid">
        <div>
          <div className="eyebrow">
            <span className="eyebrow__dot" aria-hidden="true" /> Sua próxima conquista começa na
            estrada
          </div>
          <h1 className="hero__title">
            Não é só chegar.
            <br />É <em>conquistar</em>
            <br />
            o caminho.
          </h1>
          <p className="hero__copy">
            Registre suas viagens de carro ou moto, encare desafios, acumule pontos e mostre à
            comunidade até onde você pode chegar.
          </p>
          <div className="hero__actions">
            <ToastLink className="btn btn--primary" href="#comecar">
              Quero rodar com o Rodow <Icon name="fa-arrow-up-right-from-square" />
            </ToastLink>
            <Link className="btn btn--secondary" href="#como-funciona">
              Descubra como funciona <Icon name="fa-arrow-down" />
            </Link>
          </div>
          <p className="hero__micro">Sua jornada. Seus desafios. Seu lugar no ranking.</p>
        </div>

        <div className="hero-art">
          <Image
            className="hero-art__img"
            src={heroMotorcycle}
            alt="Motocicleta de aventura estacionada em uma estrada cercada por árvores"
            fill
            priority
            sizes="(max-width: 850px) 100vw, 48vw"
          />
          <div className="hero-art__shade" aria-hidden="true" />
          <div className="hero-art__tag">
            <Icon name="fa-circle" /> MODO AVENTURA ATIVADO
          </div>
          <svg
            className="hero-art__route"
            viewBox="0 0 360 300"
            fill="none"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M30 265 C80 235 52 185 120 176 S190 222 207 155 S170 90 240 82 S275 48 325 25"
              stroke="var(--color-primary-main)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="2 11"
            />
            <circle
              cx="30"
              cy="265"
              r="8"
              fill="var(--color-primary-main)"
              stroke="var(--color-neutral-600)"
              strokeWidth="4"
            />
            <circle
              cx="325"
              cy="25"
              r="8"
              fill="var(--color-primary-main)"
              stroke="var(--color-neutral-600)"
              strokeWidth="4"
            />
            <circle
              cx="207"
              cy="155"
              r="15"
              fill="var(--color-primary-main)"
              fillOpacity=".2"
            />
            <circle cx="207" cy="155" r="5" fill="var(--color-primary-main)" />
          </svg>
          <div className="hero-art__badge">
            <b>+250 pts</b>
            <span>
              DESAFIO CONCLUÍDO <Icon name="fa-star" />
            </span>
          </div>
          <div className="route-card">
            <div>
              <small>ÚLTIMA VIAGEM</small>
              <strong>Serra &amp; liberdade</strong>
            </div>
            <div className="route-card__metric">
              <strong>186 km</strong>
              <span>DE ESTRADA PELA FRENTE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Ticker() {
  const items = [
    { icon: 'fa-route', text: 'Registre cada viagem' },
    { icon: 'fa-bolt', text: 'Complete desafios' },
    { icon: 'fa-coins', text: 'Ganhe pontos' },
    { icon: 'fa-trophy', text: 'Suba no ranking' },
  ];

  return (
    <div className="ticker">
      <div className="container ticker__inner">
        <div className="ticker__label">A estrada é o começo</div>
        {items.map(({ icon, text }) => (
          <div className="ticker__item" key={text}>
            <Icon name={icon} /> {text}
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionHeading({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-head">
      <div className="kicker">{kicker}</div>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

function FeaturesSection() {
  return (
    <section className="section" id="como-funciona">
      <div className="container">
        <SectionHeading
          kicker="Mais que um trajeto"
          title="Transforme cada quilômetro em uma conquista."
        >
          O Rodow coloca uma nova dose de propósito em cada saída. Você roda do seu jeito,
          acompanha sua evolução e encontra novos motivos para pegar a estrada.
        </SectionHeading>
        <div className="feature-grid">
          {features.map(({ icon, title, description }) => (
            <article className="feature" key={title}>
              <div className="feature__icon" aria-hidden="true">
                <Icon name={icon} />
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChallengesSection() {
  return (
    <section className="challenge" id="desafios">
      <div className="container challenge__grid">
        <div>
          <div className="kicker">Desafio aceito?</div>
          <h2>Seu próximo nível está a algumas curvas de distância.</h2>
          <p>
            De metas de distância a novas formas de explorar, cada desafio é uma oportunidade de
            somar pontos e avançar. A próxima conquista pode começar na sua próxima viagem.
          </p>
          <ToastLink className="btn btn--dark" href="#comecar">
            Quero encarar desafios <Icon name="fa-arrow-up-right-from-square" />
          </ToastLink>
        </div>
        <div className="challenge__cards">
          {challenges.map(({ category, title, points }) => (
            <article className="challenge-card" key={title}>
              <div className="challenge-card__mini">{category}</div>
              <h3>{title}</h3>
              <div className="challenge-card__points">
                {points} <small>PTS</small>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Leaderboard() {
  return (
    <div className="leaderboard">
      <div className="leaderboard__head">
        <strong>Ranking da comunidade</strong>
        <span>
          <Icon name="fa-circle" /> TEMPORADA ATIVA
        </span>
      </div>
      {leaders.map(({ name, challenges: challengeCount, score, icon }, index) => (
        <div className="rank-row" key={name}>
          <div className="rank-row__num">{String(index + 1).padStart(2, '0')}</div>
          <div className="rider">
            <div className="rider__avatar" aria-hidden="true">
              <Icon name={icon} />
            </div>
            <div>
              <b>{name}</b>
              <small>{challengeCount} desafios concluídos</small>
            </div>
          </div>
          <div className="rank-row__score">
            {score}
            <small>pontos</small>
          </div>
        </div>
      ))}
    </div>
  );
}

function RankingSection() {
  return (
    <section className="section rank-section" id="ranking">
      <div className="container rank__grid">
        <div className="rank__copy">
          <div className="kicker">A comunidade Rodow</div>
          <h2>Compartilhe a estrada. Dispute o topo.</h2>
          <p>
            Cada desafio concluído é uma chance de evoluir. Acompanhe seus pontos, compare seu
            progresso e veja sua posição no ranking da comunidade.
          </p>
          <p className="rank__note">
            Os perfis e pontuações ao lado são exemplos ilustrativos do conceito de ranking.
          </p>
          <ToastLink className="btn btn--primary" href="#comecar">
            Quero entrar no ranking <Icon name="fa-arrow-up-right-from-square" />
          </ToastLink>
        </div>
        <Leaderboard />
      </div>
    </section>
  );
}

function StepsSection() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          kicker="É simples começar"
          title="Três passos. Uma estrada inteira pela frente."
        >
          O próximo capítulo da sua jornada começa com uma escolha: sair para rodar.
        </SectionHeading>
        <div className="steps">
          {steps.map(({ number, action, title, description }) => (
            <article className="step" key={number}>
              <div className="step__num">
                {number} / {action}
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="section section--faq" id="duvidas">
      <div className="container">
        <SectionHeading kicker="Perguntas frequentes" title="Antes de pegar a estrada." />
        <div className="faq">
          {frequentlyAskedQuestions.map(({ question, answer }) => (
            <details key={question}>
              <summary>{question}</summary>
              <div className="faq__content">
                <p>{answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="cta" id="comecar">
      <div className="container">
        <div className="cta__panel">
          <div className="kicker">A estrada está chamando</div>
          <h2>Não deixe sua próxima viagem ser só mais uma.</h2>
          <p>Registre. Desafie-se. Conquiste seu lugar no Rodow.</p>
          <div className="store-buttons" aria-label="Lojas de aplicativos">
            <StoreButton
              image={appleStoreBadge}
              alt="Baixe na App Store"
              ariaLabel="Baixar o Rodow na App Store"
            />
            <StoreButton
              image={googlePlayBadge}
              alt="Baixe no Google Play"
              ariaLabel="Baixar o Rodow no Google Play"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <Logo small />
        <span>Feito para quem encontra liberdade no caminho.</span>
        <div className="site-footer__links">
          <span>© 2026 Rodow · Protótipo conceitual</span>
          <Link href="/politica-de-privacidade">Política de privacidade</Link>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <ToastProvider>
      <Link className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </Link>
      <div className="page-landing">
        <Header />
        <main id="conteudo">
          <Hero />
          <Ticker />
          <FeaturesSection />
          <ChallengesSection />
          <RankingSection />
          <StepsSection />
          <FAQSection />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </ToastProvider>
  );
}
