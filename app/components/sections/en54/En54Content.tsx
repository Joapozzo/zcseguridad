'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { FaWhatsapp } from 'react-icons/fa'
import { CONTACT } from '@/app/constants/contact'
import Image from 'next/image'
import {
  ArrowRight,
  BatteryFull,
  Building2,
  Flame,
  Radio,
  ShieldCheck,
  Network,
  Hotel,
  GraduationCap,
  Hospital,
  Landmark,
  Video,
  Settings,
  Zap,
  Bell,
  Wrench,
} from 'lucide-react'
import { Container, Section } from '../../ui/Layout'
import { Button } from '../../ui/Button'
import { Card } from '../../ui/Card'
import { CountUp } from '../../ui/CountUp'
import { useHeroReveal } from '@/app/hooks/useHeroReveal'
import { useScrollReveal } from '@/app/hooks/useScrollReveal'
import { FireFaqSection } from '../incendio/FireFaqSection'
import styles from './En54Content.module.css'

const products = [
  {
    image: 'hub',
    name: 'EN54 Fire Hub Jeweller',
    text: 'El control del sistema en una pantalla táctil.',
  },
  {
    image: 'smoke',
    name: 'EN54 FireProtect (Smoke) Jeweller',
    text: 'Detección de humo con sensor de doble espectro.',
  },
  {
    image: 'heat',
    name: 'EN54 FireProtect (Heat) Jeweller',
    text: 'Detección de calor con dos termistores.',
  },
  {
    image: 'sounder',
    name: 'EN54 FireProtect (Sounder/VAD) Jeweller',
    text: 'Alarma sonora y visual en un solo dispositivo.',
  },
  {
    image: 'vad',
    name: 'EN54 FireProtect (VAD) Jeweller',
    text: 'Señalización visual de una emergencia.',
  },
  {
    image: 'callpoint',
    name: 'ManualCallPoint (Red) Jeweller',
    text: 'Activación manual de la alarma de incendio.',
  },
  {
    image: 'rex',
    name: 'EN54 Fire ReX Jeweller',
    text: 'Más cobertura para tu sistema inalámbrico.',
  },
  {
    image: 'module',
    name: 'EN54 I/O Module (2X2) Jeweller',
    text: 'Conectá equipos de terceros al sistema.',
  },
]
const advantages = [
  {
    icon: ShieldCheck,
    title: 'Certificación EN 54',
    text: 'Componentes certificados para trabajar como un único sistema.',
  },
  {
    icon: Radio,
    title: 'Comunicación bidireccional',
    text: 'Jeweller mantiene conectado cada dispositivo y supervisa su estado.',
  },
  {
    icon: BatteryFull,
    title: '5 años de autonomía',
    text: 'Baterías de larga duración para detectores, sirenas y alarmas visuales.',
  },
  {
    icon: Wrench,
    title: 'Instalación rápida',
    text: 'Instalación y cambio de batería simples, sin herramientas adicionales.',
  },
  {
    icon: Bell,
    title: 'Alarma antisabotaje',
    text: 'Aviso inmediato si se retira o se daña un dispositivo.',
  },
  {
    icon: Zap,
    title: 'Actualizaciones inalámbricas',
    text: 'Nuevas funciones y mejoras sin intervenir el cableado.',
  },
]

function ProductImage({ name, large = false }: { name: string; large?: boolean }) {
  const label =
    products.find(product => product.image === name)?.name ??
    (name === 'battery' ? 'EN54 Internal Battery' : 'GlandBox para EN54 Fire Hub')
  return (
    <Image
      src={`/images/en54/${name}-hd.png`}
      alt={label}
      width={1082}
      height={1082}
      quality={90}
      sizes={large ? '(max-width: 767px) 320px, 400px' : '(max-width: 767px) 320px, 360px'}
      className={large ? styles.largeProduct : styles.productImage}
    />
  )
}

export function En54Content() {
  const root = useRef<HTMLDivElement>(null)
  const hero = useRef<HTMLDivElement>(null)
  useHeroReveal(hero)
  useScrollReveal(root)
  return (
    <div ref={root} className={styles.root}>
      <section className={styles.hero}>
        <div className={styles.heroMedia}>
          <picture>
            <source media="(max-width: 767px)" srcSet="/images/en54/hero-mobile.webp" />
            <img
              src="/images/en54/hero.webp"
              alt="Línea Ajax EN54 de detección y alarma de incendios"
              width={3840}
              height={1600}
              fetchPriority="high"
              className={styles.heroImage}
            />
          </picture>
        </div>
        <Container className={styles.heroContainer}>
          <div ref={hero} className={styles.heroCopy}>
            <h1 className="hero-reveal">
              Ajax EN54.
              <br />
              <span>Protección sin cables.</span>
            </h1>
            <p className={`hero-reveal ${styles.intro}`}>
              Detección y alarma de incendios inalámbrica en Córdoba.
            </p>
            <div className={`hero-reveal ${styles.heroActions}`}>
              <Button href="#contacto" variant="fire">
                Consultá por tu proyecto <ArrowRight size={16} />
              </Button>
              <a href="#equipos" className={styles.secondaryLink}>
                Explorá los equipos
              </a>
            </div>
          </div>
        </Container>
      </section>
      <div className={styles.statBand}>
        <Container className={styles.stats}>
          {[
            { icon: ShieldCheck, value: 'EN 54', count: null, suffix: '', label: 'Certificación' },
            {
              icon: Radio,
              value: '100 %',
              count: 100,
              suffix: ' %',
              label: 'Dispositivos inalámbricos',
            },
            {
              icon: Network,
              value: '200',
              count: 200,
              suffix: '',
              label: 'Dispositivos direccionables',
            },
            { icon: Building2, value: '40', count: 40, suffix: '', label: 'Zonas de incendio' },
            {
              icon: BatteryFull,
              value: '5 años',
              count: 5,
              suffix: ' años',
              label: 'Autonomía de detectores y sirenas',
            },
          ].map(({ icon: Icon, value, count, suffix, label }) => (
            <div key={value} data-reveal>
              <Icon size={25} />
              <strong>{count === null ? value : <CountUp value={count} suffix={suffix} />}</strong>
              <span>{label}</span>
            </div>
          ))}
        </Container>
      </div>
      <Section id="solucion">
        <Container>
          <nav aria-label="Ruta de navegación" className={styles.breadcrumb}>
            <Link href="/">Inicio</Link>
            <span aria-hidden="true">/</span>
            <Link href="/incendios">Incendios</Link>
            <span aria-hidden="true">/</span>
            <span>Ajax EN54</span>
          </nav>
          <div className={`${styles.split} ${styles.solutionSplit}`}>
            <div className={`${styles.photo} ${styles.solutionPhoto}`} data-reveal>
              <Image
                src="/images/en54/commercial-hd.webp"
                alt="Central Ajax EN54 en la recepción de un edificio de oficinas"
                fill
                quality={95}
                sizes="(max-width: 767px) 100vw, 660px"
                className={styles.cover}
                data-parallax
              />
            </div>
            <div data-reveal>
              <p className={styles.eyebrow}>Ideal para edificios existentes</p>
              <h2>
                Detección de incendios inalámbrica.
                <br />
                <span>Menos intervención en tu edificio.</span>
              </h2>
              <p>
                Ajax EN54 Line para edificios comerciales y municipales. En ZC Seguridad analizamos
                tu proyecto en Córdoba capital y provincia. Próximamente disponible.
              </p>
              <div className={styles.sites}>
                {[
                  { icon: Hotel, text: 'Restaurantes y hoteles' },
                  { icon: Building2, text: 'Oficinas y centros de negocios' },
                  { icon: GraduationCap, text: 'Escuelas y guarderías' },
                  { icon: Hospital, text: 'Instalaciones médicas' },
                  { icon: Landmark, text: 'Sitios históricos' },
                  { icon: Building2, text: 'Tiendas y edificios municipales' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text}>
                    <Icon size={20} />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>
      <Section variant="surface" id="integracion">
        <Container>
          <div className={styles.split}>
            <div data-reveal>
              <p className={styles.eyebrow}>Integración total</p>
              <h2>
                Un único sistema.
                <br />
                <span>Protección integral.</span>
              </h2>
              <p>
                Incendio, intrusión, videovigilancia y automatización. Todo conectado desde una
                misma plataforma.
              </p>
              <Button href="#contacto" variant="outline">
                Consultá por tu proyecto <ArrowRight size={16} />
              </Button>
            </div>
            <div className={styles.integration} data-reveal>
              <div className={styles.orbit} aria-hidden />
              <ProductImage name="hub" large />
              <div className={styles.integrations}>
                {[
                  { icon: Flame, name: 'Incendio · EN 54' },
                  { icon: ShieldCheck, name: 'Intrusión · EN 50131' },
                  { icon: Video, name: 'Videovigilancia' },
                  { icon: Settings, name: 'Automatización' },
                ].map(({ icon: Icon, name }) => (
                  <div key={name}>
                    <Icon size={22} />
                    <span>{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>
      <Section id="equipos">
        <Container>
          <div className={styles.sectionHeading} data-reveal>
            <p className={styles.eyebrow}>Principales componentes</p>
            <h2>
              Un sistema completo.
              <br />
              <span>Listo para crecer.</span>
            </h2>
            <p>Cada dispositivo, una función. Toda la protección, conectada.</p>
          </div>
          <div className={styles.products}>
            {products.map(product => (
              <article key={product.name} className={styles.product} data-reveal>
                <div className={styles.productTop}>
                  <ProductImage name={product.image} />
                </div>
                <div className={styles.productCopy}>
                  <h3>{product.name.replace(' Jeweller', '')}</h3>
                  <p>{product.text}</p>
                </div>
              </article>
            ))}
          </div>
          <div className={styles.catalogCta} data-reveal>
            <p>¿Qué equipos necesita tu edificio?</p>
            <Button href="#contacto" variant="outline">
              Solicitá asesoramiento <ArrowRight size={16} />
            </Button>
          </div>
        </Container>
      </Section>
      <Section variant="surface" id="accesorios">
        <Container>
          <div className={styles.sectionHeading} data-reveal>
            <p className={styles.eyebrow}>Accesorios</p>
            <h2>
              Los detalles que
              <br />
              <span>completan el sistema.</span>
            </h2>
          </div>
          <div className={styles.accessories}>
            <article className={styles.accessory} data-reveal>
              <div className={styles.accessoryImage}>
                <ProductImage name="battery" />
              </div>
              <div>
                <h3>EN54 Internal Battery</h3>
                <p>Respaldo de energía para el hub y el repetidor.</p>
                <span className={styles.accessoryDetail}>24 h · 5 Ah / 72 h · 10 Ah</span>
              </div>
            </article>
            <article className={styles.accessory} data-reveal>
              <div className={styles.accessoryImage}>
                <ProductImage name="glandbox" />
              </div>
              <div>
                <h3>GlandBox</h3>
                <p>Conexión lateral de cables para EN54 Fire Hub.</p>
                <span className={styles.accessoryDetail}>Entrada mediante prensacables</span>
              </div>
            </article>
          </div>
        </Container>
      </Section>
      <Section variant="light" className={styles.light}>
        <Container>
          <div className={styles.sectionHeading} data-reveal>
            <p className={styles.eyebrow}>Diseñado para simplificar</p>
            <h2>
              Fiabilidad en la que puede confiar.
              <br />
              <span>Simplicidad que le encantará.</span>
            </h2>
          </div>
          <div className={styles.advantages}>
            {advantages.map(({ icon: Icon, title, text }) => (
              <Card key={title} className={styles.advantage}>
                <div data-reveal>
                  <Icon size={28} />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
      {/* <Section id="control">
        <Container>
          <div className={styles.split}>
            <div data-reveal>
              <p className={styles.eyebrow}>Control local y remoto</p>
              <h2>
                Apps potentes.
                <br />
                <span>Gestión intuitiva.</span>
              </h2>
              <p>
                Configurá, supervisá y gestioná el sistema desde las apps gratuitas de Ajax, en el
                sitio o a distancia.
              </p>
              <div className={styles.apps}>
                {[
                  [
                    'Ajax PRO: Tool for Engineers',
                    'Conecte, configure y compruebe dispositivos en remoto y en el sitio.',
                  ],
                  [
                    'Ajax Security System',
                    'Alarmas de incendio instantáneas y notificaciones de mantenimiento.',
                  ],
                  [
                    'Ajax PRO Desktop',
                    'Administre los sistemas y monitorice las alarmas con verificación visual.',
                  ],
                ].map(([title, text]) => (
                  <div key={title}>
                    <Smartphone size={22} />
                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.photo} data-reveal>
              <Image
                src="/images/en54/hub-installed.webp"
                alt="Central Ajax EN54 instalada en un espacio comercial"
                fill
                sizes="(max-width: 767px) 100vw, 50vw"
                className={styles.cover}
                data-parallax
              />
            </div>
          </div>
        </Container>
      </Section> */}
      <FireFaqSection
        subject="Ajax EN54"
        subtitle="Lo esencial para tu proyecto."
        showServiceArea={false}
        faqs={[
          [
            '¿Para qué edificios está pensado?',
            'Para restaurantes, hoteles, edificios de apartamentos, escuelas, guarderías, oficinas, comercios, edificios municipales, instalaciones médicas y sitios históricos. La solución se define según el proyecto y la normativa aplicable.',
          ],
          [
            '¿El sistema necesita alimentación eléctrica?',
            'Los detectores, sirenas y dispositivos visuales funcionan con baterías. El hub y el repetidor tienen alimentación de 240 V y pueden incorporar baterías de reserva de 24 o 72 horas. El sistema reduce el cableado entre dispositivos.',
          ],
          [
            '¿Qué certificaciones tiene?',
            'La certificación corresponde a cada modelo y función. El hub contempla EN 54-2, EN 54-4, EN 54-13, EN 54-21 y EN 54-25. La certificación EN 54 del ManualCallPoint corresponde a la versión roja.',
          ],
          [
            '¿Ya está disponible en ZC Seguridad?',
            'La línea EN54 está anunciada como próxima incorporación. Consultanos para analizar tu proyecto y conocer la disponibilidad.',
          ],
        ].map(([question, answer]) => ({ question, answer }))}
      />
      <a
        href={`https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent('Hola, quiero asesoramiento sobre Ajax EN54 para un proyecto de detección de incendios en Córdoba.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.floatingContact}
        aria-label="Consultar por Ajax EN54 en WhatsApp"
      >
        <FaWhatsapp size={24} />
        <span>Consultá por EN54</span>
      </a>
    </div>
  )
}
