// Tipos para o aplicativo EcoMove

export interface Route {
  id: string
  type: 'fastest' | 'cheapest' | 'sustainable'
  duration: string
  cost: string
  co2Saved: string
  steps: RouteStep[]
  icon: React.ReactNode
  color: string
}

export interface RouteStep {
  transport: string
  line: string
  duration: string
  icon: React.ReactNode
}

export interface Favorite {
  id: string
  name: string
  address: string
  icon: React.ReactNode
}

export interface Trip {
  id: string
  from: string
  to: string
  date: string
  duration: string
  cost: string
  co2Saved: string
  transport: string[]
}

export interface Notification {
  id: string
  type: 'delay' | 'strike' | 'route_change' | 'tip'
  title: string
  message: string
  time: string
  read: boolean
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  isPremium: boolean
  language: 'pt' | 'en' | 'es'
  preferences: UserPreferences
}

export interface UserPreferences {
  notifications: boolean
  offlineMode: boolean
  preferredTransport: string[]
  sustainabilityFocus: boolean
}

export interface TransportCard {
  id: string
  name: string
  type: 'metro' | 'bus' | 'tram' | 'bike' | 'boat'
  balance: number
  isActive: boolean
}

export interface Transaction {
  id: string
  type: 'payment' | 'refund' | 'topup'
  amount: number
  description: string
  timestamp: string
  transportType?: string
}

export interface Statistics {
  totalTrips: number
  moneySaved: number
  co2Saved: number
  timeSaved: number
  favoriteTransport: string
  monthlyTrips: number
}

// Tipos para localização e mapas
export interface Location {
  latitude: number
  longitude: number
  address: string
  name?: string
}

export interface MapPoint {
  id: string
  location: Location
  type: 'station' | 'stop' | 'dock' | 'user'
  transportTypes: string[]
}

// Tipos para monetização
export interface PremiumFeature {
  id: string
  name: string
  description: string
  isAvailable: boolean
}

export interface Subscription {
  id: string
  type: 'free' | 'premium'
  price: number
  features: PremiumFeature[]
  billingCycle: 'monthly' | 'yearly'
}

// Tipos para parceiros e ofertas
export interface PartnerOffer {
  id: string
  partnerName: string
  title: string
  description: string
  discount: string
  location: Location
  category: 'food' | 'shopping' | 'entertainment' | 'services'
  validUntil: string
}

// Tipos para multilíngue
export interface LanguageStrings {
  [key: string]: {
    pt: string
    en: string
    es: string
  }
}

// Tipos para configurações da aplicação
export interface AppConfig {
  apiEndpoints: {
    routes: string
    payments: string
    notifications: string
    maps: string
  }
  features: {
    offlineMode: boolean
    socialLogin: boolean
    partnerOffers: boolean
    realTimeAlerts: boolean
  }
  supportedLanguages: string[]
  supportedCities: string[]
}