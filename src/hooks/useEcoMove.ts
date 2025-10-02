"use client"

import { useState, useEffect, useCallback } from 'react'
import { storage } from '@/lib/utils'
import type { User, Route, Favorite, Trip, Notification, Statistics } from '@/lib/types'
import { Home, Briefcase, GraduationCap } from 'lucide-react'

// Hook principal para gerenciar o estado do EcoMove
export function useEcoMove() {
  // Estados principais
  const [user, setUser] = useState<User | null>(null)
  const [activeTab, setActiveTab] = useState('map')
  const [searchDestination, setSearchDestination] = useState('')
  const [showRoutes, setShowRoutes] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState<'pt' | 'en' | 'es'>('pt')
  const [walletBalance, setWalletBalance] = useState(45.80)
  const [userLocation, setUserLocation] = useState('Lisboa, Portugal')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Estados para dados
  const [routes, setRoutes] = useState<Route[]>([])
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [recentTrips, setRecentTrips] = useState<Trip[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [statistics, setStatistics] = useState<Statistics | null>(null)

  // Inicializar dados padrão
  useEffect(() => {
    // Dados padrão para demonstração
    const defaultFavorites: Favorite[] = [
      {
        id: '1',
        name: 'Casa',
        address: 'Rua das Flores, 123, Lisboa',
        icon: <Home className="w-5 h-5 text-blue-600" />
      },
      {
        id: '2',
        name: 'Trabalho',
        address: 'Av. da Liberdade, 456, Lisboa',
        icon: <Briefcase className="w-5 h-5 text-green-600" />
      },
      {
        id: '3',
        name: 'Universidade',
        address: 'Campus Universitário, Alameda',
        icon: <GraduationCap className="w-5 h-5 text-purple-600" />
      }
    ]

    const defaultTrips: Trip[] = [
      {
        id: '1',
        from: 'Casa',
        to: 'Trabalho',
        date: 'Hoje, 08:30',
        duration: '25 min',
        cost: '€2.40',
        co2Saved: '1.2 kg',
        transport: ['metro', 'bus']
      },
      {
        id: '2',
        from: 'Trabalho',
        to: 'Centro Comercial',
        date: 'Ontem, 18:45',
        duration: '18 min',
        cost: '€1.80',
        co2Saved: '0.8 kg',
        transport: ['bus']
      },
      {
        id: '3',
        from: 'Casa',
        to: 'Universidade',
        date: 'Ontem, 09:15',
        duration: '32 min',
        cost: '€2.10',
        co2Saved: '1.5 kg',
        transport: ['bike', 'metro']
      }
    ]

    const defaultNotifications: Notification[] = [
      {
        id: '1',
        type: 'delay',
        title: 'Atraso na Linha Azul',
        message: 'Metro com atraso de 5 minutos devido a avaria técnica.',
        time: '10 min',
        read: false
      },
      {
        id: '2',
        type: 'tip',
        title: 'Dica Sustentável',
        message: 'Usar bicicleta para trajetos curtos pode poupar até 2kg de CO₂ por dia!',
        time: '1h',
        read: false
      },
      {
        id: '3',
        type: 'route_change',
        title: 'Nova Rota Disponível',
        message: 'Descobrimos uma rota 15% mais rápida para o seu trabalho.',
        time: '2h',
        read: true
      }
    ]

    const defaultUser: User = {
      id: '1',
      name: 'João Silva',
      email: 'joao.silva@email.com',
      isPremium: false,
      language: 'pt',
      preferences: {
        notifications: true,
        offlineMode: false,
        preferredTransport: ['metro', 'bus'],
        sustainabilityFocus: true
      }
    }

    // Carregar dados salvos ou usar padrões
    const savedUser = storage.get<User>('ecomove_user') || defaultUser
    const savedLanguage = storage.get<'pt' | 'en' | 'es'>('ecomove_language', 'pt')
    const savedBalance = storage.get<number>('ecomove_balance', 45.80)
    const savedFavorites = storage.get<Favorite[]>('ecomove_favorites') || defaultFavorites
    const savedTrips = storage.get<Trip[]>('ecomove_trips') || defaultTrips
    const savedNotifications = storage.get<Notification[]>('ecomove_notifications') || defaultNotifications

    setUser(savedUser)
    setSelectedLanguage(savedLanguage)
    setWalletBalance(savedBalance)
    setFavorites(savedFavorites)
    setRecentTrips(savedTrips)
    setNotifications(savedNotifications)
  }, [])

  // Salvar dados no localStorage quando mudarem
  useEffect(() => {
    if (user) storage.set('ecomove_user', user)
  }, [user])

  useEffect(() => {
    storage.set('ecomove_language', selectedLanguage)
  }, [selectedLanguage])

  useEffect(() => {
    storage.set('ecomove_balance', walletBalance)
  }, [walletBalance])

  useEffect(() => {
    storage.set('ecomove_favorites', favorites)
  }, [favorites])

  useEffect(() => {
    storage.set('ecomove_trips', recentTrips)
  }, [recentTrips])

  useEffect(() => {
    storage.set('ecomove_notifications', notifications)
  }, [notifications])

  // Funções para busca de rotas
  const searchRoutes = useCallback(async (destination: string) => {
    if (!destination.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      // Simular chamada à API
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Dados simulados de rotas mais realistas
      const mockRoutes: Route[] = [
        {
          id: '1',
          type: 'fastest',
          duration: '28 min',
          cost: '€2.40',
          co2Saved: '1.2 kg',
          color: 'from-blue-500 to-cyan-500',
          icon: '⚡',
          steps: [
            { transport: 'Metro', line: 'Linha Azul - Marquês de Pombal', duration: '15 min', icon: '🚇' },
            { transport: 'Autocarro', line: '728 - Saldanha', duration: '13 min', icon: '🚌' }
          ]
        },
        {
          id: '2',
          type: 'cheapest',
          duration: '35 min',
          cost: '€1.80',
          co2Saved: '1.8 kg',
          color: 'from-green-500 to-emerald-500',
          icon: '💰',
          steps: [
            { transport: 'Autocarro', line: '735 - Avenidas Novas', duration: '20 min', icon: '🚌' },
            { transport: 'Tram', line: '28 - Chiado', duration: '15 min', icon: '🚋' }
          ]
        },
        {
          id: '3',
          type: 'sustainable',
          duration: '32 min',
          cost: '€2.10',
          co2Saved: '2.5 kg',
          color: 'from-emerald-500 to-green-600',
          icon: '🌱',
          steps: [
            { transport: 'Bicicleta', line: 'GIRA - Estação Cais do Sodré', duration: '12 min', icon: '🚲' },
            { transport: 'Metro', line: 'Linha Verde - Baixa-Chiado', duration: '20 min', icon: '🚇' }
          ]
        }
      ]

      setRoutes(mockRoutes)
      setShowRoutes(true)
    } catch (err) {
      setError('Erro ao buscar rotas. Verifique sua conexão e tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Funções para carteira
  const addBalance = useCallback((amount: number) => {
    setWalletBalance(prev => prev + amount)
    
    // Simular notificação de recarga
    const notification: Notification = {
      id: Date.now().toString(),
      type: 'tip',
      title: 'Saldo Adicionado',
      message: `€${amount.toFixed(2)} foram adicionados à sua carteira com sucesso!`,
      time: 'Agora',
      read: false
    }
    setNotifications(prev => [notification, ...prev])
  }, [])

  const deductBalance = useCallback((amount: number) => {
    setWalletBalance(prev => Math.max(0, prev - amount))
  }, [])

  // Funções para favoritos
  const addFavorite = useCallback((favorite: Omit<Favorite, 'id'>) => {
    const newFavorite: Favorite = {
      ...favorite,
      id: Date.now().toString()
    }
    setFavorites(prev => [...prev, newFavorite])
  }, [])

  const removeFavorite = useCallback((id: string) => {
    setFavorites(prev => prev.filter(fav => fav.id !== id))
  }, [])

  // Funções para viagens
  const addTrip = useCallback((trip: Omit<Trip, 'id'>) => {
    const newTrip: Trip = {
      ...trip,
      id: Date.now().toString()
    }
    setRecentTrips(prev => [newTrip, ...prev.slice(0, 9)]) // Manter apenas 10 viagens
  }, [])

  // Funções para notificações
  const markNotificationAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }, [])

  const markAllNotificationsAsRead = useCallback(() => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    )
  }, [])

  const addNotification = useCallback((notification: Omit<Notification, 'id'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString()
    }
    setNotifications(prev => [newNotification, ...prev])
  }, [])

  // Função para obter localização do usuário
  const getUserLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      setError('Geolocalização não suportada neste dispositivo')
      return
    }

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        })
      })

      const { latitude, longitude } = position.coords
      
      // Simular reverse geocoding com localizações de Lisboa
      const locations = [
        'Marquês de Pombal, Lisboa',
        'Cais do Sodré, Lisboa',
        'Rossio, Lisboa',
        'Chiado, Lisboa',
        'Bairro Alto, Lisboa'
      ]
      
      const randomLocation = locations[Math.floor(Math.random() * locations.length)]
      setUserLocation(randomLocation)
      
      // Notificar sucesso
      const notification: Notification = {
        id: Date.now().toString(),
        type: 'tip',
        title: 'Localização Atualizada',
        message: `Sua localização foi atualizada para ${randomLocation}`,
        time: 'Agora',
        read: false
      }
      setNotifications(prev => [notification, ...prev])
      
    } catch (err) {
      setError('Erro ao obter localização. Verifique as permissões do navegador.')
    }
  }, [])

  // Função para alternar idioma
  const changeLanguage = useCallback((language: 'pt' | 'en' | 'es') => {
    setSelectedLanguage(language)
    
    // Atualizar idioma do usuário
    if (user) {
      setUser(prev => prev ? { ...prev, language } : null)
    }
  }, [user])

  // Função para upgrade premium
  const upgradeToPremium = useCallback(() => {
    if (user) {
      setUser(prev => prev ? { ...prev, isPremium: true } : null)
      
      // Notificar upgrade
      const notification: Notification = {
        id: Date.now().toString(),
        type: 'tip',
        title: 'Bem-vindo ao Premium!',
        message: 'Agora você tem acesso a rotas offline, estatísticas avançadas e muito mais!',
        time: 'Agora',
        read: false
      }
      setNotifications(prev => [notification, ...prev])
    }
  }, [user])

  // Calcular estatísticas
  useEffect(() => {
    const totalTrips = recentTrips.length
    const moneySaved = recentTrips.reduce((sum, trip) => {
      const cost = parseFloat(trip.cost.replace('€', ''))
      return sum + (cost * 0.6) // Simular economia vs carro
    }, 0)
    const co2Saved = recentTrips.reduce((sum, trip) => {
      const co2 = parseFloat(trip.co2Saved.replace(' kg', ''))
      return sum + co2
    }, 0)
    const timeSaved = recentTrips.reduce((sum, trip) => {
      const duration = parseInt(trip.duration.replace(' min', ''))
      return sum + (duration * 0.25) // Simular tempo poupado vs trânsito
    }, 0)

    setStatistics({
      totalTrips,
      moneySaved,
      co2Saved,
      timeSaved: timeSaved / 60, // converter para horas
      favoriteTransport: 'metro',
      monthlyTrips: totalTrips
    })
  }, [recentTrips])

  return {
    // Estados
    user,
    activeTab,
    searchDestination,
    showRoutes,
    selectedLanguage,
    walletBalance,
    userLocation,
    isLoading,
    error,
    routes,
    favorites,
    recentTrips,
    notifications,
    statistics,

    // Setters
    setUser,
    setActiveTab,
    setSearchDestination,
    setShowRoutes,
    setError,

    // Funções
    searchRoutes,
    addBalance,
    deductBalance,
    addFavorite,
    removeFavorite,
    addTrip,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    addNotification,
    getUserLocation,
    changeLanguage,
    upgradeToPremium
  }
}