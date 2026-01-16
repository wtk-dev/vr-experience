'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { 
  Sparkles, 
  Users, 
  Rocket, 
  ChevronDown, 
  Calendar,
  Play,
  Star,
  ArrowRight,
  Zap,
  Target,
  Gamepad2,
  Building2,
  PartyPopper
} from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { useTracking } from '@/components/TrackingProvider'

// Booking link - replace with actual link
const BOOKING_LINK = 'https://calendly.com/your-booking-link'

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
}

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } }
}

// CTAButton Component
function CTAButton({ className = '', children }: { className?: string; children: React.ReactNode }) {
  const { trackEvent } = useTracking()

  const handleClick = () => {
    trackEvent('cta_click', { location: 'landing_page' })
    window.open(BOOKING_LINK, '_blank')
  }

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className={`
        bg-vr-cta hover:bg-vr-cta-hover 
        text-white font-display font-semibold
        px-8 py-4 rounded-full
        cta-glow
        flex items-center gap-3
        transition-all duration-300
        ${className}
      `}
    >
      {children}
    </motion.button>
  )
}

// Section wrapper with scroll animation
function AnimatedSection({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.section>
  )
}

// Hero Section
function HeroSection() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-vr-cta/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 text-sm text-vr-gray mb-8">
            <Sparkles className="w-4 h-4 text-vr-cta" />
            Now accepting bookings
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
        >
          Step Into
          <span className="block gradient-text">Another World</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-xl md:text-2xl text-vr-gray max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          Experience fully immersive VR adventures with friends, colleagues, and teams. 
          From competitive games to cooperative puzzles — we bring virtual reality to you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <CTAButton>
            <Calendar className="w-5 h-5" />
            Book Your Experience
          </CTAButton>
          <a 
            href="#video" 
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
          >
            <span className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-vr-cta group-hover:bg-vr-cta/10 transition-all">
              <Play className="w-5 h-5 ml-1" />
            </span>
            Watch Preview
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-8 h-8 text-vr-gray" />
      </motion.div>
    </section>
  )
}

// Video Section
function VideoSection() {
  return (
    <AnimatedSection className="py-24 px-6" id="video">
      <div className="container mx-auto max-w-5xl">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            See It In Action
          </h2>
          <p className="text-vr-gray text-lg">
            Watch how teams transform their bonding experience with VR
          </p>
        </motion.div>

        <motion.div 
          variants={fadeInUp}
          className="relative rounded-2xl overflow-hidden shadow-elegant-lg"
        >
          <div className="video-container bg-vr-dark/50 glass">
            <iframe
              src="https://www.youtube.com/embed/PVyaj4fWhDc?rel=0&modestbranding=1"
              title="VR Experience Preview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full rounded-2xl"
            />
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="text-center mt-12">
          <CTAButton>
            <Calendar className="w-5 h-5" />
            Book Now
            <ArrowRight className="w-5 h-5" />
          </CTAButton>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

// Experience Details Section
function ExperienceSection() {
  const experiences = [
    {
      icon: Building2,
      title: 'At Your Office',
      description: 'We bring the full VR setup directly to your workplace. Perfect for team building days, corporate events, and company celebrations.',
    },
    {
      icon: PartyPopper,
      title: 'Private Events',
      description: 'Birthday parties, stag dos, family gatherings — we set up everything for an unforgettable VR party at your chosen venue.',
    },
    {
      icon: Gamepad2,
      title: 'At Our Shop',
      description: 'Visit our dedicated VR space for the ultimate immersive experience. Fully equipped with premium headsets and plenty of room to move.',
    },
  ]

  return (
    <AnimatedSection className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-vr-dark/50 to-transparent" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <span className="text-vr-cta font-medium text-sm tracking-wider uppercase mb-4 block">
            How It Works
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Your VR Adventure,{' '}
            <span className="gradient-text">Anywhere</span>
          </h2>
          <p className="text-vr-gray text-lg max-w-2xl mx-auto">
            We provide 10-20 premium VR headsets with a variety of games — from heart-pumping shooters to mind-bending puzzles. 
            Everything you need for an epic group experience.
          </p>
        </motion.div>

        <motion.div variants={stagger} className="grid md:grid-cols-3 gap-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="glass rounded-2xl p-8 shadow-elegant hover:shadow-elegant-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-vr-cta/10 flex items-center justify-center mb-6">
                <exp.icon className="w-7 h-7 text-vr-cta" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">
                {exp.title}
              </h3>
              <p className="text-vr-gray leading-relaxed">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={fadeInUp} className="mt-16 text-center">
          <div className="glass rounded-2xl p-8 md:p-12 inline-block">
            <h3 className="font-display text-2xl font-bold mb-4">
              Games For Every Team
            </h3>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {['Competitive Shooters', 'Puzzle Adventures', 'Team Escape Rooms', 'Sports Games', 'Creative Experiences', 'Horror Thrillers'].map((game, i) => (
                <span key={i} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-vr-gray">
                  {game}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

// Benefits Section
function BenefitsSection() {
  const benefits = [
    {
      icon: Sparkles,
      title: 'Fun & Entertaining',
      description: 'Forget boring team events. VR creates unforgettable memories with laughter, excitement, and friendly competition that everyone will be talking about.',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      icon: Rocket,
      title: 'Innovative Technology',
      description: 'Experience cutting-edge VR with the latest headsets and games. Be at the forefront of entertainment technology that most people have never tried.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Users,
      title: 'Team Building',
      description: 'Nothing builds team spirit like conquering challenges together. VR creates natural collaboration, communication, and trust between team members.',
      gradient: 'from-vr-cta to-orange-400',
    },
  ]

  return (
    <AnimatedSection className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <span className="text-vr-cta font-medium text-sm tracking-wider uppercase mb-4 block">
            Why Choose VR
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Three Reasons Teams{' '}
            <span className="gradient-text">Love Us</span>
          </h2>
        </motion.div>

        <motion.div variants={stagger} className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="relative group"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl"
                   style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-from), var(--tw-gradient-to))` }} 
              />
              <div className="relative glass rounded-3xl p-8 h-full shadow-elegant group-hover:shadow-elegant-lg transition-all duration-500">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-4">
                  {benefit.title}
                </h3>
                <p className="text-vr-gray leading-relaxed text-lg">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

// Reviews Section
function ReviewsSection() {
  const reviews = [
    {
      name: 'Sarah Mitchell',
      role: 'HR Director, TechCorp',
      content: 'Our team building day was transformed by VR Realm. The setup was seamless, the games were incredible, and our team hasn\'t stopped talking about it. Best corporate event we\'ve had in years!',
      rating: 5,
    },
    {
      name: 'James Patterson',
      role: 'Birthday Party Host',
      content: 'Hired VR Realm for my son\'s 16th birthday. Every single kid was blown away. They handled everything professionally and the variety of games kept everyone entertained for hours.',
      rating: 5,
    },
    {
      name: 'Emma Rodriguez',
      role: 'Marketing Manager, StartupXYZ',
      content: 'We wanted something different for our quarterly team meetup. VR Realm delivered beyond expectations. Watching our remote team finally connect in virtual reality was magical.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Operations Lead, Finance Plus',
      content: 'The team building aspect was genuine. Working together in VR puzzles revealed new strengths in our team members. Plus, the competitive games added the perfect amount of fun rivalry!',
      rating: 5,
    },
    {
      name: 'Lisa Thompson',
      role: 'Event Coordinator',
      content: 'I\'ve organized countless corporate events, and this was by far the most engaging. Staff were professional, equipment was top-notch, and guests were absolutely thrilled.',
      rating: 5,
    },
  ]

  return (
    <AnimatedSection className="py-24 px-6 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <span className="text-vr-cta font-medium text-sm tracking-wider uppercase mb-4 block">
            Testimonials
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            What Teams Are{' '}
            <span className="gradient-text">Saying</span>
          </h2>
          <p className="text-vr-gray text-lg">
            Real experiences from real teams
          </p>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index}>
                <div className="glass rounded-2xl p-8 h-full shadow-elegant">
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-vr-cta text-vr-cta" />
                    ))}
                  </div>
                  <p className="text-white/90 leading-relaxed mb-6 text-lg">
                    &ldquo;{review.content}&rdquo;
                  </p>
                  <div className="border-t border-white/10 pt-4">
                    <p className="font-display font-semibold">{review.name}</p>
                    <p className="text-vr-gray text-sm">{review.role}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

// Final CTA Section
function FinalCTASection() {
  return (
    <AnimatedSection className="py-24 px-6 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-vr-cta/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div 
          variants={fadeInUp}
          className="glass rounded-3xl p-12 md:p-16 text-center shadow-elegant-lg relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-vr-cta to-transparent" />
          
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-vr-cta/20 flex items-center justify-center mx-auto mb-8"
          >
            <Zap className="w-10 h-10 text-vr-cta" />
          </motion.div>

          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Ready to{' '}
            <span className="gradient-text">Experience VR?</span>
          </h2>
          <p className="text-vr-gray text-xl mb-10 max-w-2xl mx-auto">
            Book your session today and give your team an experience they&apos;ll never forget. 
            Limited slots available each week.
          </p>

          <CTAButton className="mx-auto text-lg">
            <Calendar className="w-6 h-6" />
            Book Your Session Now
            <ArrowRight className="w-6 h-6" />
          </CTAButton>

          <p className="text-vr-gray/60 text-sm mt-6">
            No payment required to book • Free consultation call
          </p>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

// Footer
function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/10">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="font-display text-2xl font-bold gradient-text">VR Realm</h3>
            <p className="text-vr-gray text-sm mt-1">Immersive experiences for teams</p>
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="text-vr-gray hover:text-vr-cta transition-colors">Instagram</a>
            <a href="#" className="text-vr-gray hover:text-vr-cta transition-colors">TikTok</a>
            <a href="#" className="text-vr-gray hover:text-vr-cta transition-colors">LinkedIn</a>
            <a href="#" className="text-vr-gray hover:text-vr-cta transition-colors">Contact</a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/5 text-center text-vr-gray text-sm">
          <p>&copy; {new Date().getFullYear()} VR Realm. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// Main Page Component
export default function Home() {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <VideoSection />
      <ExperienceSection />
      <BenefitsSection />
      <ReviewsSection />
      <FinalCTASection />
      <Footer />
    </main>
  )
}

