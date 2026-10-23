import { motion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowDown,
  ArrowRight,
  MapPin,
  Play,
  Heart,
  Users,
  Sparkles,
  CalendarDays,
  BookOpen,
  HandHeart
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SectionHeading from '../components/SectionHeading'
import { Reveal, ParallaxImage } from '../components/Reveal'

const maps =
  'https://www.google.com/maps/place/TMG+MINISTRIES/@5.5472703,5.9167004,924m/'

export default function Home() {
  const { scrollY } = useScroll()

  const heroY = useTransform(
    scrollY,
    [0, 900],
    [0, 180]
  )

  const heroScale = useTransform(
    scrollY,
    [0, 900],
    [1, 1.1]
  )

  return (
    <div className="site-shell">
      <Navbar />

      <main>

        {/* =========================
            HERO
        ========================== */}
        <section className="hero hero-premium">
          <motion.img
            style={{
              y: heroY,
              scale: heroScale
            }}
            className="hero-image"
            src="/images/preacher.jpg"
            alt="TMG Ministries worship service"
          />

          <div className="hero-overlay" />
          <div className="hero-grain" />

          <div className="container hero-content">
            <motion.div
              initial={{
                opacity: 0,
                y: 50
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 1,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <span className="hero-kicker">
                THRONE OF MERCY & GLORY MINISTRIES
              </span>

              <h1>
                Encounter. <em>Belong.</em>
                <br />
                Become.
              </h1>

              <p>
                Welcome to TMG Ministries — a growing church community
                in Ughelli, Delta State, where faith, worship, the Word
                and purpose meet.
              </p>

              <div className="hero-actions">
                <Link
                  className="btn btn-primary"
                  to="/visit"
                >
                  Plan Your Visit
                  <ArrowRight size={17} />
                </Link>

                <Link
                  className="btn btn-glass"
                  to="/sermons"
                >
                  <Play size={16} />
                  Explore Sermons
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="hero-bottom">
            <span>UGHELLI · DELTA STATE</span>

            <span>
              SCROLL TO DISCOVER
              <ArrowDown size={13} />
            </span>
          </div>
        </section>


        {/* =========================
            INTRO
        ========================== */}
        <section className="section intro container">
          <div className="intro-copy">
            <span className="eyebrow">
              WELCOME TO TMG
            </span>

            <h2>
              A place to find{' '}
              <span>faith, family</span> and purpose.
            </h2>

            <p>
              Church is more than a building. It is people choosing
              to follow Jesus together, grow together and make room
              for others.
            </p>

            <div className="micro-points">
              <span>
                <Sparkles size={15} />
                Encounter God
              </span>

              <span>
                <Users size={15} />
                Find community
              </span>

              <span>
                <Heart size={15} />
                Live with purpose
              </span>
            </div>

            <Link
              className="text-link"
              to="/about"
            >
              Discover our story
              <ArrowRight size={16} />
            </Link>
          </div>

          <ParallaxImage
            className="intro-image"
            src="/images/worship-service.jpg"
            alt="TMG congregation in worship"
          />
        </section>


        {/* =========================
            TMG EXPERIENCE
        ========================== */}
        <section className="dark-section section experience-section">
          <div className="container">

            <SectionHeading
              eyebrow="THE TMG EXPERIENCE"
              title="Come for the service. Stay for the family."
              text="A vibrant atmosphere of worship, teaching, community and purpose — experienced through real people and real moments."
              align="center"
              light
            />

            <div className="experience-grid premium-grid">

              {/* MAKE ROOM FOR GOD */}
              <Reveal className="experience-card large">
                <img
                  src="/images/preacher.jpg"
                  alt="TMG worship and preaching"
                />

                <div>
                  <span>
                    01 / ENCOUNTER
                  </span>

                  <h3>
                    Make room for God.
                  </h3>

                  <p>
                    Come with expectation. Leave with something
                    that stays with you.
                  </p>
                </div>
              </Reveal>


              {/* FIND YOUR PEOPLE */}
              <Reveal
                delay={0.1}
                className="experience-card image-card"
              >
                <img
                  src="/images/find-your-people.jpg"
                  alt="TMG church community"
                />

                <div>
                  <span>
                    02 / COMMUNITY
                  </span>

                  <h3>
                    Find your people.
                  </h3>

                  <p>
                    Build meaningful relationships and grow
                    alongside a church family.
                  </p>
                </div>
              </Reveal>


              {/* LIVE WHAT YOU BELIEVE */}
              <Reveal
                delay={0.2}
                className="experience-card red image-card"
              >
                <img
                  src="/images/live-what-you-believe.jpg"
                  alt="TMG serving and living out faith"
                />

                <div>
                  <span>
                    03 / PURPOSE
                  </span>

                  <h3>
                    Live what you believe.
                  </h3>

                  <p>
                    Grow in faith, serve others and step into
                    purpose.
                  </p>
                </div>
              </Reveal>

            </div>
          </div>
        </section>


        {/* =========================
            LIVING COMMUNITY
        ========================== */}
        <section className="section container feature-grid reveal-section">
          <div>

            <SectionHeading
              eyebrow="A LIVING COMMUNITY"
              title="Real people. Real moments. One family."
              text="From worship gatherings to family-focused moments, TMG is a growing community made up of people at different stages of the journey."
            />

            <div className="stat-row">
              <div>
                <strong>01</strong>
                <span>Community</span>
              </div>

              <div>
                <strong>∞</strong>
                <span>Possibility</span>
              </div>

              <div>
                <strong>1</strong>
                <span>Family</span>
              </div>
            </div>

          </div>

          <div className="collage">

            <ParallaxImage
              className="collage-main"
              src="/images/children-event.jpg"
              alt="TMG children's event"
              strength={20}
            />

            <motion.img
              className="collage-small"
              src="/images/leaders.jpg"
              alt="TMG leadership"
              initial={{
                opacity: 0,
                x: 40
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              viewport={{
                once: true
              }}
              transition={{
                duration: 0.9,
                delay: 0.15
              }}
            />

          </div>
        </section>


        {/* =========================
            PLAN YOUR WEEK
        ========================== */}
        <section className="section dark-section editorial-section">
          <div className="container editorial-grid">

            <div className="editorial-copy">
              <span className="eyebrow">
                PLAN YOUR WEEK
              </span>

              <h2>
                There is always a next step.
              </h2>

              <p>
                Explore the rhythms of church life — gatherings,
                teaching, prayer, community and opportunities to
                get involved.
              </p>

              <div className="editorial-links">

                <Link to="/events">
                  <CalendarDays />
                  Upcoming events
                  <ArrowRight size={15} />
                </Link>

                <Link to="/sermons">
                  <BookOpen />
                  Latest messages
                  <ArrowRight size={15} />
                </Link>

                <Link to="/prayer">
                  <HandHeart />
                  Submit a prayer
                  <ArrowRight size={15} />
                </Link>

              </div>
            </div>


            <div className="editorial-image">

              <ParallaxImage
                src="/images/leaders.jpg"
                alt="TMG ministry leaders"
                strength={30}
              />

              <div className="image-caption">
                <span>
                  THRONE OF MERCY & GLORY
                </span>

                <strong>
                  Growing together.
                </strong>
              </div>

            </div>

          </div>
        </section>


        {/* =========================
            VISIT
        ========================== */}
        <section className="section visit-preview">
          <div className="container visit-preview-inner">

            <div>
              <span className="eyebrow">
                YOUR NEXT STEP
              </span>

              <h2>
                We'd love to welcome you.
              </h2>

              <p>
                Find TMG Ministries on KM 14 Warri-Patani Rd,
                Ughelli, Delta State.
              </p>
            </div>

            <div className="visit-actions">

              <Link
                className="btn btn-primary"
                to="/visit"
              >
                Plan Your Visit
                <ArrowRight size={17} />
              </Link>

              <a
                className="btn btn-outline"
                href={maps}
                target="_blank"
                rel="noreferrer"
              >
                <MapPin size={17} />
                Get Directions
              </a>

            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}