// Constantes e configurações do EcoMove

export const APP_CONFIG = {
  name: 'EcoMove',
  version: '1.0.0',
  description: 'Mobilidade Inteligente e Sustentável',
  
  // URLs e endpoints (para produção)
  api: {
    base: process.env.NEXT_PUBLIC_API_URL || 'https://api.ecomove.app',
    routes: '/api/routes',
    payments: '/api/payments',
    notifications: '/api/notifications',
    maps: '/api/maps',
    auth: '/api/auth'
  },
  
  // Configurações de mapa
  map: {
    defaultCenter: {
      lat: 38.7223,
      lng: -9.1393 // Lisboa
    },
    defaultZoom: 13,
    maxZoom: 18,
    minZoom: 10
  },
  
  // Configurações de pagamento
  payment: {
    currency: 'EUR',
    minTopUp: 5,
    maxTopUp: 100,
    serviceFee: 0.05 // 5% taxa de serviço
  },
  
  // Configurações premium
  premium: {
    monthlyPrice: 4.99,
    yearlyPrice: 49.99,
    features: [
      'offline_routes',
      'advanced_statistics',
      'priority_support',
      'custom_alerts',
      'unlimited_favorites'
    ]
  }
}

// Tipos de transporte suportados
export const TRANSPORT_TYPES = {
  metro: {
    name: 'Metro',
    icon: 'train',
    color: '#3b82f6',
    avgSpeed: 35, // km/h
    co2Factor: 0.05 // kg CO2 por km
  },
  bus: {
    name: 'Autocarro',
    icon: 'bus',
    color: '#10b981',
    avgSpeed: 20,
    co2Factor: 0.08
  },
  tram: {
    name: 'Elétrico',
    icon: 'train',
    color: '#f59e0b',
    avgSpeed: 15,
    co2Factor: 0.04
  },
  bike: {
    name: 'Bicicleta',
    icon: 'bike',
    color: '#22c55e',
    avgSpeed: 12,
    co2Factor: 0 // Zero emissões
  },
  boat: {
    name: 'Barco',
    icon: 'ship',
    color: '#06b6d4',
    avgSpeed: 25,
    co2Factor: 0.12
  },
  scooter: {
    name: 'Trotinete',
    icon: 'zap',
    color: '#8b5cf6',
    avgSpeed: 15,
    co2Factor: 0.02
  }
} as const

// Idiomas suportados
export const SUPPORTED_LANGUAGES = {
  pt: {
    name: 'Português',
    flag: '🇵🇹',
    code: 'pt-PT'
  },
  en: {
    name: 'English',
    flag: '🇬🇧',
    code: 'en-US'
  },
  es: {
    name: 'Español',
    flag: '🇪🇸',
    code: 'es-ES'
  }
} as const

// Cidades suportadas
export const SUPPORTED_CITIES = {
  lisboa: {
    name: 'Lisboa',
    country: 'Portugal',
    center: { lat: 38.7223, lng: -9.1393 },
    transportTypes: ['metro', 'bus', 'tram', 'bike', 'boat']
  },
  porto: {
    name: 'Porto',
    country: 'Portugal',
    center: { lat: 41.1579, lng: -8.6291 },
    transportTypes: ['metro', 'bus', 'tram', 'bike']
  },
  madrid: {
    name: 'Madrid',
    country: 'España',
    center: { lat: 40.4168, lng: -3.7038 },
    transportTypes: ['metro', 'bus', 'bike']
  },
  barcelona: {
    name: 'Barcelona',
    country: 'España',
    center: { lat: 41.3851, lng: 2.1734 },
    transportTypes: ['metro', 'bus', 'tram', 'bike']
  }
} as const

// Strings de tradução
export const TRANSLATIONS = {
  // Navegação
  map: { pt: 'Mapa', en: 'Map', es: 'Mapa' },
  routes: { pt: 'Rotas', en: 'Routes', es: 'Rutas' },
  wallet: { pt: 'Carteira', en: 'Wallet', es: 'Cartera' },
  notifications: { pt: 'Alertas', en: 'Alerts', es: 'Alertas' },
  profile: { pt: 'Perfil', en: 'Profile', es: 'Perfil' },
  
  // Tipos de rota
  fastest: { pt: 'Mais Rápida', en: 'Fastest', es: 'Más Rápida' },
  cheapest: { pt: 'Mais Barata', en: 'Cheapest', es: 'Más Barata' },
  sustainable: { pt: 'Mais Sustentável', en: 'Most Sustainable', es: 'Más Sostenible' },
  
  // Ações
  search: { pt: 'Buscar', en: 'Search', es: 'Buscar' },
  select: { pt: 'Selecionar', en: 'Select', es: 'Seleccionar' },
  add_balance: { pt: 'Adicionar Saldo', en: 'Add Balance', es: 'Añadir Saldo' },
  upgrade_premium: { pt: 'Upgrade Premium', en: 'Upgrade Premium', es: 'Upgrade Premium' },
  
  // Placeholders
  search_destination: { 
    pt: 'Para onde você quer ir?', 
    en: 'Where do you want to go?', 
    es: '¿A dónde quieres ir?' 
  },
  
  // Estatísticas
  trips_this_month: { pt: 'Viagens este mês', en: 'Trips this month', es: 'Viajes este mes' },
  money_saved: { pt: 'Economizado', en: 'Saved', es: 'Ahorrado' },
  co2_saved: { pt: 'CO₂ poupado', en: 'CO₂ saved', es: 'CO₂ ahorrado' },
  time_saved: { pt: 'Tempo poupado', en: 'Time saved', es: 'Tiempo ahorrado' },
  
  // Favoritos
  home: { pt: 'Casa', en: 'Home', es: 'Casa' },
  work: { pt: 'Trabalho', en: 'Work', es: 'Trabajo' },
  university: { pt: 'Universidade', en: 'University', es: 'Universidad' },
  
  // Notificações
  delay_alert: { pt: 'Atraso', en: 'Delay', es: 'Retraso' },
  sustainability_tip: { pt: 'Dica Sustentável', en: 'Sustainability Tip', es: 'Consejo Sostenible' },
  route_change: { pt: 'Mudança de Rota', en: 'Route Change', es: 'Cambio de Ruta' },
  
  // Premium
  premium_features: {
    pt: 'Rotas offline, estatísticas avançadas e muito mais!',
    en: 'Offline routes, advanced statistics and much more!',
    es: '¡Rutas offline, estadísticas avanzadas y mucho más!'
  }
} as const

// Configurações de notificação
export const NOTIFICATION_TYPES = {
  delay: {
    icon: 'clock',
    color: 'red',
    priority: 'high'
  },
  strike: {
    icon: 'alert-triangle',
    color: 'yellow',
    priority: 'high'
  },
  route_change: {
    icon: 'navigation',
    color: 'blue',
    priority: 'medium'
  },
  tip: {
    icon: 'leaf',
    color: 'green',
    priority: 'low'
  },
  offer: {
    icon: 'gift',
    color: 'purple',
    priority: 'low'
  }
} as const

// Configurações de tema
export const THEME_CONFIG = {
  colors: {
    primary: {
      green: '#10b981',
      blue: '#3b82f6'
    },
    secondary: {
      yellow: '#f59e0b',
      purple: '#8b5cf6',
      orange: '#f97316'
    },
    status: {
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#06b6d4'
    }
  },
  gradients: {
    primary: 'from-green-500 to-blue-500',
    secondary: 'from-blue-500 to-cyan-500',
    sustainable: 'from-emerald-500 to-green-600',
    premium: 'from-yellow-400 to-orange-500'
  }
}

// Configurações de desenvolvimento
export const DEV_CONFIG = {
  enableMockData: process.env.NODE_ENV === 'development',
  enableDebugLogs: process.env.NODE_ENV === 'development',
  mockApiDelay: 1000, // ms
  enableOfflineMode: true
}