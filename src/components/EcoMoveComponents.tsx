"use client"

import { useState } from 'react'
import { 
  MapPin, 
  Navigation, 
  Wifi, 
  WifiOff, 
  Plus, 
  Minus,
  Star,
  Clock,
  Zap,
  Shield,
  Crown,
  Smartphone,
  QrCode,
  CreditCard,
  Ticket
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

// Componente de Mapa Interativo
export function InteractiveMap({ userLocation, onLocationUpdate }: {
  userLocation: string
  onLocationUpdate: () => void
}) {
  const [mapZoom, setMapZoom] = useState(13)
  const [isOffline, setIsOffline] = useState(false)

  return (
    <div className="relative h-full bg-gradient-to-br from-blue-50 to-green-50 rounded-lg overflow-hidden">
      {/* Simulação do mapa com padrão de pontos */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23e5f3ff\" fill-opacity=\"0.3\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      
      {/* Localização do usuário com animação */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
          <div className="absolute -top-2 -left-2 w-10 h-10 bg-blue-500/20 rounded-full animate-ping"></div>
        </div>
      </div>

      {/* Pontos de transporte simulados com diferentes tipos */}
      <div className="absolute top-1/4 left-1/3 group cursor-pointer">
        <div className="w-4 h-4 bg-green-500 rounded-full shadow-md hover:scale-110 transition-transform"></div>
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Metro - Marquês de Pombal
        </div>
      </div>
      
      <div className="absolute top-3/4 right-1/4 group cursor-pointer">
        <div className="w-4 h-4 bg-blue-500 rounded-full shadow-md hover:scale-110 transition-transform"></div>
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Autocarro - Avenidas Novas
        </div>
      </div>
      
      <div className="absolute bottom-1/4 left-1/4 group cursor-pointer">
        <div className="w-4 h-4 bg-purple-500 rounded-full shadow-md hover:scale-110 transition-transform"></div>
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          GIRA - Bicicletas
        </div>
      </div>
      
      {/* Controles do mapa */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <Button 
          size="sm" 
          variant="secondary" 
          className="w-10 h-10 p-0 bg-white/90 backdrop-blur-sm hover:bg-white"
          onClick={() => setMapZoom(prev => Math.min(18, prev + 1))}
        >
          <Plus className="w-4 h-4" />
        </Button>
        <Button 
          size="sm" 
          variant="secondary" 
          className="w-10 h-10 p-0 bg-white/90 backdrop-blur-sm hover:bg-white"
          onClick={() => setMapZoom(prev => Math.max(10, prev - 1))}
        >
          <Minus className="w-4 h-4" />
        </Button>
        <Button 
          size="sm" 
          variant="secondary" 
          className="w-10 h-10 p-0 bg-white/90 backdrop-blur-sm hover:bg-white"
          onClick={onLocationUpdate}
        >
          <Navigation className="w-4 h-4" />
        </Button>
      </div>

      {/* Localização atual */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md max-w-[200px]">
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
          <span className="font-medium truncate">{userLocation}</span>
        </div>
      </div>

      {/* Indicador de zoom */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md">
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium">Zoom: {mapZoom}</span>
        </div>
      </div>

      {/* Indicador offline */}
      {isOffline && (
        <div className="absolute bottom-4 left-4 bg-red-500/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md">
          <div className="flex items-center gap-2 text-sm text-white">
            <WifiOff className="w-4 h-4" />
            <span>Modo Offline</span>
          </div>
        </div>
      )}

      {/* Botão para alternar modo offline */}
      <Button
        size="sm"
        variant="secondary"
        className="absolute top-16 right-4 bg-white/90 backdrop-blur-sm hover:bg-white"
        onClick={() => setIsOffline(!isOffline)}
      >
        {isOffline ? <WifiOff className="w-4 h-4" /> : <Wifi className="w-4 h-4" />}
      </Button>
    </div>
  )
}

// Componente de Cartão de Transporte
export function TransportCard({ 
  name, 
  type, 
  balance, 
  isActive, 
  onTopUp 
}: {
  name: string
  type: string
  balance: number
  isActive: boolean
  onTopUp: () => void
}) {
  return (
    <Card className={`transition-all duration-200 ${isActive ? 'ring-2 ring-blue-500' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              type === 'metro' ? 'bg-blue-100' :
              type === 'bus' ? 'bg-green-100' :
              type === 'bike' ? 'bg-purple-100' :
              'bg-gray-100'
            }`}>
              {type === 'metro' && <CreditCard className="w-5 h-5 text-blue-600" />}
              {type === 'bus' && <Ticket className="w-5 h-5 text-green-600" />}
              {type === 'bike' && <QrCode className="w-5 h-5 text-purple-600" />}
            </div>
            <div>
              <p className="font-medium">{name}</p>
              <p className="text-sm text-gray-500">{type}</p>
            </div>
          </div>
          <Badge variant={isActive ? "default" : "secondary"}>
            {isActive ? 'Ativo' : 'Inativo'}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Saldo</p>
            <p className="text-lg font-bold">€{balance.toFixed(2)}</p>
          </div>
          <Button size="sm" onClick={onTopUp} className="bg-gradient-to-r from-green-500 to-blue-500">
            <Plus className="w-4 h-4 mr-1" />
            Carregar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Componente de Estatísticas Premium
export function PremiumStats({ 
  stats, 
  isPremium 
}: {
  stats: {
    totalTrips: number
    moneySaved: number
    co2Saved: number
    timeSaved: number
  }
  isPremium: boolean
}) {
  if (!isPremium) {
    return (
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <CardContent className="p-6 text-center">
          <Crown className="w-12 h-12 mx-auto mb-3 text-yellow-600" />
          <h3 className="font-bold text-lg mb-2">Estatísticas Premium</h3>
          <p className="text-gray-600 mb-4">
            Desbloqueie estatísticas detalhadas, comparações mensais e insights personalizados
          </p>
          <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
            <Crown className="w-4 h-4 mr-2" />
            Upgrade para Premium
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Crown className="w-5 h-5 text-yellow-600" />
        <h3 className="font-bold">Estatísticas Premium</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.totalTrips}</div>
            <div className="text-sm text-gray-500">Viagens este mês</div>
            <Progress value={75} className="mt-2" />
            <div className="text-xs text-gray-400 mt-1">Meta: 40 viagens</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">€{stats.moneySaved.toFixed(0)}</div>
            <div className="text-sm text-gray-500">Economizado</div>
            <Progress value={60} className="mt-2" />
            <div className="text-xs text-gray-400 mt-1">vs. carro próprio</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.co2Saved.toFixed(1)} kg</div>
            <div className="text-sm text-gray-500">CO₂ poupado</div>
            <Progress value={85} className="mt-2" />
            <div className="text-xs text-gray-400 mt-1">Equivale a 3 árvores</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{Math.round(stats.timeSaved)}h</div>
            <div className="text-sm text-gray-500">Tempo poupado</div>
            <Progress value={45} className="mt-2" />
            <div className="text-xs text-gray-400 mt-1">vs. trânsito</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Insights Premium */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-blue-600" />
            <span className="font-semibold">Insight Semanal</span>
          </div>
          <p className="text-sm text-gray-600">
            Você está 23% mais sustentável que a média dos utilizadores! 
            Continue usando transportes públicos para manter este ritmo.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

// Componente de Login Social
export function SocialLogin({ onLogin }: { onLogin: (provider: string) => void }) {
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Smartphone className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-xl font-bold mb-2">Bem-vindo ao EcoMove</h2>
        <p className="text-gray-600">Faça login para sincronizar seus dados e acessar funcionalidades premium</p>
      </div>
      
      <Button 
        className="w-full bg-blue-600 hover:bg-blue-700 h-12"
        onClick={() => onLogin('google')}
      >
        <div className="w-5 h-5 mr-3 bg-white rounded-full flex items-center justify-center">
          <span className="text-blue-600 text-xs font-bold">G</span>
        </div>
        Continuar com Google
      </Button>
      
      <Button 
        variant="outline" 
        className="w-full h-12"
        onClick={() => onLogin('apple')}
      >
        <div className="w-5 h-5 mr-3 bg-black rounded-full flex items-center justify-center">
          <span className="text-white text-xs">🍎</span>
        </div>
        Continuar com Apple
      </Button>
      
      <Button 
        variant="outline" 
        className="w-full h-12"
        onClick={() => onLogin('facebook')}
      >
        <div className="w-5 h-5 mr-3 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">f</span>
        </div>
        Continuar com Facebook
      </Button>
      
      <div className="text-center text-xs text-gray-500 mt-6">
        Ao continuar, você concorda com nossos{' '}
        <a href="#" className="text-blue-600 hover:underline">Termos de Uso</a>
        {' '}e{' '}
        <a href="#" className="text-blue-600 hover:underline">Política de Privacidade</a>
      </div>
    </div>
  )
}

// Componente de Notificação em Tempo Real
export function RealTimeAlert({ 
  type, 
  message, 
  onDismiss 
}: {
  type: 'delay' | 'strike' | 'route_change' | 'tip'
  message: string
  onDismiss: () => void
}) {
  const getAlertStyle = () => {
    switch (type) {
      case 'delay':
        return 'bg-red-50 border-red-200 text-red-800'
      case 'strike':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800'
      case 'route_change':
        return 'bg-blue-50 border-blue-200 text-blue-800'
      case 'tip':
        return 'bg-green-50 border-green-200 text-green-800'
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800'
    }
  }

  const getIcon = () => {
    switch (type) {
      case 'delay':
        return <Clock className="w-5 h-5" />
      case 'strike':
        return <Shield className="w-5 h-5" />
      case 'route_change':
        return <Navigation className="w-5 h-5" />
      case 'tip':
        return <Star className="w-5 h-5" />
      default:
        return <Clock className="w-5 h-5" />
    }
  }

  return (
    <div className={`fixed top-20 left-4 right-4 max-w-md mx-auto p-4 rounded-lg border shadow-lg z-50 ${getAlertStyle()}`}>
      <div className="flex items-start gap-3">
        {getIcon()}
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={onDismiss}
          className="h-6 w-6 p-0 hover:bg-black/10"
        >
          ×
        </Button>
      </div>
    </div>
  )
}