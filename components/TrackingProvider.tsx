'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface TrackingData {
  source: string | null
  medium: string | null
  campaign: string | null
  referrer: string | null
  location: {
    country: string | null
    city: string | null
    region: string | null
  } | null
  timestamp: string
  sessionId: string
}

interface TrackingContextType {
  trackingData: TrackingData | null
  trackEvent: (eventName: string, eventData?: Record<string, unknown>) => void
}

const TrackingContext = createContext<TrackingContextType | null>(null)

export const useTracking = () => {
  const context = useContext(TrackingContext)
  if (!context) {
    throw new Error('useTracking must be used within TrackingProvider')
  }
  return context
}

function generateSessionId() {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
}

function getUTMParams() {
  if (typeof window === 'undefined') return { source: null, medium: null, campaign: null }
  
  const params = new URLSearchParams(window.location.search)
  return {
    source: params.get('utm_source'),
    medium: params.get('utm_medium'),
    campaign: params.get('utm_campaign'),
  }
}

export function TrackingProvider({ children }: { children: ReactNode }) {
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null)

  useEffect(() => {
    async function initializeTracking() {
      const utmParams = getUTMParams()
      
      // Get location data using free IP geolocation API
      let locationData = null
      try {
        const response = await fetch('https://ipapi.co/json/')
        if (response.ok) {
          const data = await response.json()
          locationData = {
            country: data.country_name || null,
            city: data.city || null,
            region: data.region || null,
          }
        }
      } catch (error) {
        console.log('Could not fetch location data:', error)
      }

      // Check for existing session or create new one
      let sessionId = sessionStorage.getItem('vr_session_id')
      if (!sessionId) {
        sessionId = generateSessionId()
        sessionStorage.setItem('vr_session_id', sessionId)
      }

      const data: TrackingData = {
        source: utmParams.source,
        medium: utmParams.medium,
        campaign: utmParams.campaign,
        referrer: document.referrer || null,
        location: locationData,
        timestamp: new Date().toISOString(),
        sessionId,
      }

      setTrackingData(data)

      // Log page view with tracking data
      console.log('📊 Page View Tracked:', {
        ...data,
        page: window.location.pathname,
      })

      // Store in localStorage for persistence
      const visits = JSON.parse(localStorage.getItem('vr_visits') || '[]')
      visits.push({
        ...data,
        page: window.location.pathname,
      })
      localStorage.setItem('vr_visits', JSON.stringify(visits.slice(-50))) // Keep last 50 visits
    }

    initializeTracking()
  }, [])

  const trackEvent = (eventName: string, eventData?: Record<string, unknown>) => {
    const event = {
      eventName,
      eventData,
      trackingData,
      timestamp: new Date().toISOString(),
      page: typeof window !== 'undefined' ? window.location.pathname : null,
    }

    console.log('📊 Event Tracked:', event)

    // Store events for analytics
    const events = JSON.parse(localStorage.getItem('vr_events') || '[]')
    events.push(event)
    localStorage.setItem('vr_events', JSON.stringify(events.slice(-100))) // Keep last 100 events
  }

  return (
    <TrackingContext.Provider value={{ trackingData, trackEvent }}>
      {children}
    </TrackingContext.Provider>
  )
}

