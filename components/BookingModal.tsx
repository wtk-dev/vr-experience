'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, User, Mail, MapPin, Building2, Loader2, CheckCircle, ArrowRight } from 'lucide-react'
import { useTracking } from './TrackingProvider'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

type LocationType = '' | 'at_our_office' | 'private_event' | 'find_location'

interface FormData {
  name: string
  email: string
  city: string
  locationType: LocationType
}

// Google Apps Script Web App URL - Replace with your own
const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || ''

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const { trackEvent, trackingData } = useTracking()
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    city: '',
    locationType: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const locationOptions = [
    { value: 'at_our_office', label: 'At our office', icon: Building2 },
    { value: 'private_event', label: 'Private event', icon: User },
    { value: 'find_location', label: 'Find a location for us', icon: MapPin },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError(null)
  }

  const handleLocationSelect = (value: LocationType) => {
    setFormData(prev => ({ ...prev, locationType: value }))
    setError(null)
  }

  const validateForm = () => {
    if (!formData.name.trim()) return 'Please enter your name'
    if (!formData.email.trim()) return 'Please enter your email'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return 'Please enter a valid email'
    if (!formData.city.trim()) return 'Please enter your city'
    if (!formData.locationType) return 'Please select a location type'
    return null
  }

  const handleSubmit = async () => {
    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setIsSubmitting(true)
    setError(null)

    // Track the booking submission
    trackEvent('booking_form_submit', {
      city: formData.city,
      locationType: formData.locationType,
    })

    try {
      // Prepare data for Google Sheets
      const submissionData = {
        ...formData,
        timestamp: new Date().toISOString(),
        source: trackingData?.source || 'direct',
        medium: trackingData?.medium || '',
        campaign: trackingData?.campaign || '',
        referrer: trackingData?.referrer || '',
        visitorCountry: trackingData?.location?.country || '',
        visitorCity: trackingData?.location?.city || '',
        visitorRegion: trackingData?.location?.region || '',
      }

      if (GOOGLE_SCRIPT_URL) {
        // Send to Google Sheets via Apps Script
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submissionData),
        })
      } else {
        // Log to console if no Google Script URL configured
        console.log('📋 Booking Submission (configure NEXT_PUBLIC_GOOGLE_SCRIPT_URL to send to Google Sheets):', submissionData)
      }

      // Store locally as backup
      const bookings = JSON.parse(localStorage.getItem('vr_bookings') || '[]')
      bookings.push(submissionData)
      localStorage.setItem('vr_bookings', JSON.stringify(bookings))

      setIsSuccess(true)
      trackEvent('booking_form_success', { email: formData.email })

    } catch (err) {
      console.error('Submission error:', err)
      setError('Something went wrong. Please try again.')
      trackEvent('booking_form_error', { error: String(err) })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isSuccess) {
      onClose()
    }
  }

  const handleGoBack = () => {
    setIsSuccess(false)
    setFormData({ name: '', email: '', city: '', locationType: '' })
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(8px)' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-lg glass rounded-3xl shadow-elegant-lg overflow-hidden"
          >
            {/* Orange accent line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-vr-cta to-transparent" />

            {/* Close button - hide on success */}
            {!isSuccess && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors z-10"
              >
                <X className="w-5 h-5 text-vr-gray" />
              </button>
            )}

            {/* Content */}
            <div className="p-8 md:p-10">
              {!isSuccess ? (
                <>
                  {/* Header */}
                  <div className="text-center mb-8">
                    <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
                      Book Your <span className="gradient-text">VR Experience</span>
                    </h2>
                    <p className="text-vr-gray">
                      Tell us a bit about yourself and we&apos;ll get back to you shortly
                    </p>
                  </div>

                  {/* Form */}
                  <div className="space-y-5">
                    {/* Name */}
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-vr-gray" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your name *"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-vr-gray/60 focus:outline-none focus:border-vr-cta/50 focus:ring-1 focus:ring-vr-cta/50 transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-vr-gray" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email address *"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-vr-gray/60 focus:outline-none focus:border-vr-cta/50 focus:ring-1 focus:ring-vr-cta/50 transition-all"
                      />
                    </div>

                    {/* City */}
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-vr-gray" />
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Your city *"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-vr-gray/60 focus:outline-none focus:border-vr-cta/50 focus:ring-1 focus:ring-vr-cta/50 transition-all"
                      />
                    </div>

                    {/* Location Type */}
                    <div>
                      <p className="text-sm text-vr-gray mb-3">Where would you like the experience? <span className="text-vr-cta">*</span></p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {locationOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => handleLocationSelect(option.value as LocationType)}
                            className={`
                              flex flex-col items-center gap-2 p-4 rounded-xl border transition-all
                              ${formData.locationType === option.value
                                ? 'bg-vr-cta/20 border-vr-cta text-white'
                                : 'bg-white/5 border-white/10 text-vr-gray hover:border-white/20'
                              }
                            `}
                          >
                            <option.icon className={`w-5 h-5 ${formData.locationType === option.value ? 'text-vr-cta' : ''}`} />
                            <span className="text-sm text-center">{option.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Error message */}
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm text-center"
                      >
                        {error}
                      </motion.p>
                    )}

                    {/* Submit button */}
                    <motion.button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      className="w-full bg-vr-cta hover:bg-vr-cta-hover text-white font-display font-semibold py-4 rounded-xl cta-glow flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Continue
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </motion.button>
                  </div>

                  <p className="text-center text-vr-gray/50 text-xs mt-6">
                    <span className="text-vr-cta">*</span> All fields are required
                  </p>
                </>
              ) : (
                /* Success state */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                    className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </motion.div>
                  <h3 className="font-display text-2xl font-bold mb-3">Thanks for your inquiry</h3>
                  <p className="text-vr-gray text-lg mb-8">
                    We will get in touch with you shortly.
                  </p>
                  <motion.button
                    onClick={handleGoBack}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-3 rounded-xl border border-white/20 text-white font-display font-medium hover:bg-white/5 transition-all"
                  >
                    Go Back
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

