import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { TRANSLATIONS, TRANSPORT_TYPES } from './constants'

// Utility para combinar classes CSS
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility para formatação de moeda
export function formatCurrency(amount: number, currency: string = 'EUR'): string {
  return new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
}

// Utility para formatação de tempo
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`
  }
  
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  
  if (remainingMinutes === 0) {
    return `${hours}h`
  }
  
  return `${hours}h ${remainingMinutes}min`
}

// Utility para formatação de distância
export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)}m`
  }
  
  const kilometers = meters / 1000
  return `${kilometers.toFixed(1)}km`
}

// Utility para formatação de peso (CO2)
export function formatWeight(kg: number): string {
  if (kg < 1) {
    return `${Math.round(kg * 1000)}g`
  }
  
  return `${kg.toFixed(1)} kg`
}

// Utility para tradução
export function translate(key: keyof typeof TRANSLATIONS, language: 'pt' | 'en' | 'es' = 'pt'): string {
  const translation = TRANSLATIONS[key]
  return translation ? translation[language] : key
}

// Utility para calcular economia de CO2
export function calculateCO2Savings(distance: number, transportType: keyof typeof TRANSPORT_TYPES): number {
  const carCO2Factor = 0.21 // kg CO2 por km para carro médio
  const transportCO2Factor = TRANSPORT_TYPES[transportType].co2Factor
  
  const carEmissions = distance * carCO2Factor
  const transportEmissions = distance * transportCO2Factor
  
  return Math.max(0, carEmissions - transportEmissions)
}

// Utility para calcular economia de dinheiro
export function calculateMoneySavings(distance: number, transportCost: number): number {
  const carCostPerKm = 0.35 // €0.35 por km (combustível + manutenção + estacionamento)
  const carCost = distance * carCostPerKm
  
  return Math.max(0, carCost - transportCost)
}

// Utility para calcular tempo de viagem
export function calculateTravelTime(distance: number, transportType: keyof typeof TRANSPORT_TYPES): number {
  const avgSpeed = TRANSPORT_TYPES[transportType].avgSpeed
  return Math.round((distance / avgSpeed) * 60) // minutos
}

// Utility para validar coordenadas
export function isValidCoordinate(lat: number, lng: number): boolean {
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180
}

// Utility para calcular distância entre dois pontos (Haversine)
export function calculateDistance(
  lat1: number, 
  lng1: number, 
  lat2: number, 
  lng2: number
): number {
  const R = 6371 // Raio da Terra em km
  const dLat = toRadians(lat2 - lat1)
  const dLng = toRadians(lng2 - lng1)
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c * 1000 // Retorna em metros
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180)
}

// Utility para formatação de data/hora
export function formatDateTime(date: Date | string, locale: string = 'pt-PT'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(dateObj)
}

// Utility para formatação de tempo relativo
export function formatRelativeTime(date: Date | string, locale: string = 'pt-PT'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000)
  
  if (diffInSeconds < 60) {
    return 'Agora'
  }
  
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `${minutes} min`
  }
  
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `${hours}h`
  }
  
  const days = Math.floor(diffInSeconds / 86400)
  if (days === 1) {
    return 'Ontem'
  }
  
  if (days < 7) {
    return `${days} dias`
  }
  
  return formatDateTime(dateObj, locale)
}

// Utility para gerar ID único
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

// Utility para debounce
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    
    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

// Utility para throttle
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Utility para validação de email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Utility para validação de telefone
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^(\+351|351)?[0-9]{9}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

// Utility para storage local
export const storage = {
  get: <T>(key: string, defaultValue?: T): T | null => {
    if (typeof window === 'undefined') return defaultValue || null
    
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue || null
    } catch {
      return defaultValue || null
    }
  },
  
  set: <T>(key: string, value: T): void => {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  },
  
  remove: (key: string): void => {
    if (typeof window === 'undefined') return
    localStorage.removeItem(key)
  },
  
  clear: (): void => {
    if (typeof window === 'undefined') return
    localStorage.clear()
  }
}

// Utility para detecção de dispositivo
export const device = {
  isMobile: (): boolean => {
    if (typeof window === 'undefined') return false
    return window.innerWidth < 768
  },
  
  isTablet: (): boolean => {
    if (typeof window === 'undefined') return false
    return window.innerWidth >= 768 && window.innerWidth < 1024
  },
  
  isDesktop: (): boolean => {
    if (typeof window === 'undefined') return false
    return window.innerWidth >= 1024
  },
  
  isTouchDevice: (): boolean => {
    if (typeof window === 'undefined') return false
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0
  }
}

// Utility para geolocalização
export const geolocation = {
  getCurrentPosition: (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'))
        return
      }
      
      navigator.geolocation.getCurrentPosition(
        resolve,
        reject,
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutos
        }
      )
    })
  },
  
  watchPosition: (
    callback: (position: GeolocationPosition) => void,
    errorCallback?: (error: GeolocationPositionError) => void
  ): number => {
    if (!navigator.geolocation) {
      throw new Error('Geolocation is not supported')
    }
    
    return navigator.geolocation.watchPosition(
      callback,
      errorCallback,
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000 // 1 minuto
      }
    )
  },
  
  clearWatch: (watchId: number): void => {
    navigator.geolocation.clearWatch(watchId)
  }
}