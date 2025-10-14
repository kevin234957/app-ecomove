"use client"

import { useState } from 'react'
import { 
  MapPin, 
  Search, 
  Navigation, 
  Wallet, 
  Bell, 
  User, 
  Bus, 
  Train, 
  Ship, 
  Bike, 
  Car,
  Clock,
  DollarSign,
  Leaf,
  Star,
  Plus,
  CreditCard,
  History,
  Settings,
  Globe,
  Crown,
  Zap,
  Shield,
  Heart,
  Home,
  Briefcase,
  GraduationCap,
  Menu,
  X,
  Smartphone,
  Wifi,
  WifiOff,
  QrCode,
  Ticket,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Award,
  Target,
  Calendar,
  MapIcon,
  Route,
  CreditCard as CardIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { useEcoMove } from '@/hooks/useEcoMove'
import { formatCurrency, formatRelativeTime } from '@/lib/utils'
import { TRANSLATIONS } from '@/lib/constants'
import { 
  InteractiveMap, 
  TransportCard, 
  PremiumStats, 
  SocialLogin, 
  RealTimeAlert 
} from '@/components/EcoMoveComponents'

export default function EcoMove() {
  const {
    activeTab,
    setActiveTab,
    searchDestination,
    setSearchDestination,
    showRoutes,
    selectedLanguage,
    walletBalance,
    userLocation,
    isLoading,
    routes,
    favorites,
    recentTrips,
    notifications,
    statistics,
    user,
    searchRoutes,
    addBalance,
    changeLanguage,
    markAllNotificationsAsRead,
    getUserLocation
  } = useEcoMove()

  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [showRealTimeAlert, setShowRealTimeAlert] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)

  const isPremium = user?.isPremium || false

  const handleSearch = () => {
    if (searchDestination.trim()) {
      searchRoutes(searchDestination)
    }
  }

  const handleSocialLogin = (provider: string) => {
    console.log(`Login com ${provider}`)
    setShowLoginDialog(false)
    
    setTimeout(() => {
      setShowRealTimeAlert(true)
    }, 1000)
  }

  // Componente de Boas-vindas
  const WelcomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="text-center shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Leaf className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
              EcoMove
            </h1>
            
            <p className="text-xl font-semibold text-gray-800 mb-2">
              Mobilidade Inteligente
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Transporte sustentável na palma da sua mão
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <MapIcon className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold">Rotas Inteligentes</p>
                  <p className="text-sm text-gray-600">Encontre o melhor caminho</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold">Carteira Digital</p>
                  <p className="text-sm text-gray-600">Pagamentos integrados</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold">Sustentável</p>
                  <p className="text-sm text-gray-600">Reduza sua pegada de carbono</p>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={() => setShowWelcome(false)}
              className="w-full h-12 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-lg font-semibold"
            >
              Começar Jornada
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <p className="text-xs text-gray-500 mt-4">
              Junte-se a milhares de utilizadores que já escolheram a mobilidade sustentável
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  // Componente do Mapa
  const MapView = () => (
    <div className="h-full">
      <InteractiveMap 
        userLocation={userLocation} 
        onLocationUpdate={getUserLocation}
      />
    </div>
  )

  // Componente de Busca de Rota
  const RouteSearch = () => (
    <div className="space-y-6">
      {/* Campo de busca */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Para onde você quer ir?"
            value={searchDestination}
            onChange={(e) => setSearchDestination(e.target.value)}
            className="pl-10 h-12 text-lg border-2 focus:border-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <Button 
          onClick={handleSearch} 
          disabled={isLoading}
          className="w-full h-12 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-lg font-semibold"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
          ) : (
            <Search className="w-5 h-5 mr-2" />
          )}
          {isLoading ? 'Buscando rotas...' : 'Buscar Rotas'}
        </Button>
      </div>

      {/* Favoritos */}
      <div>
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          Destinos Favoritos
        </h3>
        <div className="grid gap-3">
          {favorites.length > 0 ? favorites.map((fav) => (
            <Button
              key={fav.id}
              variant="outline"
              className="justify-start h-auto p-4 hover:bg-blue-50 hover:border-blue-300 transition-all"
              onClick={() => {
                setSearchDestination(fav.address)
                searchRoutes(fav.address)
              }}
            >
              <div className="flex items-center gap-3">
                {fav.icon}
                <div className="text-left">
                  <div className="font-medium">{fav.name}</div>
                  <div className="text-sm text-gray-500">{fav.address}</div>
                </div>
              </div>
            </Button>
          )) : (
            <div className="text-center py-8 text-gray-500">
              <Star className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="font-medium">Nenhum favorito adicionado</p>
              <p className="text-sm">Adicione seus destinos frequentes</p>
            </div>
          )}
        </div>
      </div>

      {/* Resultados das rotas */}
      {showRoutes && routes.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Rotas para {searchDestination || 'destino'}</h3>
          {routes.map((route) => (
            <Card key={route.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200">
              <CardContent className="p-0">
                <div className={`bg-gradient-to-r ${route.color} text-white p-4`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {route.type === 'fastest' && <Zap className="w-6 h-6" />}
                      {route.type === 'cheapest' && <DollarSign className="w-6 h-6" />}
                      {route.type === 'sustainable' && <Leaf className="w-6 h-6" />}
                      <span className="font-bold text-lg capitalize">
                        {route.type === 'fastest' ? 'Mais Rápida' : 
                         route.type === 'cheapest' ? 'Mais Barata' : 'Mais Sustentável'}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{route.duration}</div>
                      <div className="text-sm opacity-90">{route.cost}</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 space-y-3">
                  {route.steps.map((step, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
                      {step.transport === 'Metro' && <Train className="w-5 h-5 text-blue-600" />}
                      {step.transport === 'Autocarro' && <Bus className="w-5 h-5 text-green-600" />}
                      {step.transport === 'Tram' && <Train className="w-5 h-5 text-yellow-600" />}
                      {step.transport === 'Bicicleta' && <Bike className="w-5 h-5 text-purple-600" />}
                      <div className="flex-1">
                        <span className="font-medium">{step.transport}</span>
                        <span className="text-gray-500 ml-2">{step.line}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-600">{step.duration}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between p-4 bg-green-50 border-t">
                  <div className="flex items-center gap-2 text-green-700">
                    <Leaf className="w-5 h-5" />
                    <span className="font-medium">CO₂ poupado: {route.co2Saved}</span>
                  </div>
                  <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 font-semibold">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Selecionar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )

  // Componente da Carteira Digital
  const DigitalWallet = () => (
    <div className="space-y-6">
      {/* Saldo atual */}
      <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 mb-1">Saldo Disponível</p>
              <p className="text-4xl font-bold">{formatCurrency(walletBalance)}</p>
              <p className="text-sm opacity-90 mt-1">Atualizado agora</p>
            </div>
            <div className="text-right">
              <Wallet className="w-16 h-16 opacity-80 mb-2" />
              <Badge className="bg-white/20 text-white border-white/30">
                Ativo
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Adicionar saldo */}
      <div>
        <h3 className="font-semibold mb-4 text-lg">Adicionar Saldo</h3>
        <div className="grid grid-cols-3 gap-3">
          {[10, 20, 50].map((amount) => (
            <Button
              key={amount}
              variant="outline"
              onClick={() => addBalance(amount)}
              className="h-20 flex flex-col gap-2 hover:bg-green-50 hover:border-green-300 transition-all border-2"
            >
              <Plus className="w-6 h-6 text-green-600" />
              <span className="font-bold text-lg">{formatCurrency(amount)}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Cartões de transporte */}
      <div>
        <h3 className="font-semibold mb-4 text-lg">Cartões de Transporte</h3>
        <div className="space-y-4">
          <TransportCard
            name="Cartão Metropolitano"
            type="metro"
            balance={25.40}
            isActive={true}
            onTopUp={() => addBalance(10)}
          />
          
          <TransportCard
            name="GIRA Bicicletas"
            type="bike"
            balance={8.60}
            isActive={true}
            onTopUp={() => addBalance(5)}
          />
          
          <TransportCard
            name="Carris Autocarro"
            type="bus"
            balance={12.20}
            isActive={false}
            onTopUp={() => addBalance(10)}
          />
        </div>
      </div>

      {/* Histórico de transações */}
      <div>
        <h3 className="font-semibold mb-4 text-lg">Transações Recentes</h3>
        <div className="space-y-3">
          {[
            { type: 'Metro', amount: -2.40, time: 'Hoje, 08:30', icon: <Train className="w-5 h-5" />, status: 'completed' },
            { type: 'Recarga', amount: +20.00, time: 'Ontem, 19:15', icon: <Plus className="w-5 h-5" />, status: 'completed' },
            { type: 'Autocarro', amount: -1.80, time: 'Ontem, 18:45', icon: <Bus className="w-5 h-5" />, status: 'completed' },
            { type: 'GIRA', amount: -1.50, time: 'Anteontem, 14:20', icon: <Bike className="w-5 h-5" />, status: 'completed' }
          ].map((transaction, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.amount > 0 ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {transaction.icon}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.type}</p>
                      <p className="text-sm text-gray-500">{transaction.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`font-bold text-lg ${
                      transaction.amount > 0 ? 'text-green-600' : 'text-gray-800'
                    }`}>
                      {formatCurrency(Math.abs(transaction.amount), transaction.amount > 0 ? '+' : '-')}
                    </span>
                    <div className="flex items-center gap-1 mt-1">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-green-600">Concluído</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )

  // Componente de Notificações
  const NotificationsView = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Notificações</h2>
        <Button variant="ghost" size="sm" onClick={markAllNotificationsAsRead}>
          Marcar todas como lidas
        </Button>
      </div>
      
      {notifications.length > 0 ? notifications.map((notification) => (
        <Card key={notification.id} className={`${!notification.read ? 'border-blue-200 bg-blue-50/50 shadow-md' : ''} hover:shadow-lg transition-all`}>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                notification.type === 'delay' ? 'bg-red-100' :
                notification.type === 'tip' ? 'bg-green-100' :
                notification.type === 'strike' ? 'bg-yellow-100' :
                'bg-blue-100'
              }`}>
                {notification.type === 'delay' && <Clock className="w-6 h-6 text-red-600" />}
                {notification.type === 'tip' && <Leaf className="w-6 h-6 text-green-600" />}
                {notification.type === 'route_change' && <Navigation className="w-6 h-6 text-blue-600" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{notification.title}</h3>
                  <span className="text-sm text-gray-500">{notification.time}</span>
                </div>
                <p className="text-gray-600">{notification.message}</p>
                {!notification.read && (
                  <Badge className="mt-2 bg-blue-100 text-blue-800">
                    Nova
                  </Badge>
                )}
              </div>
              {!notification.read && (
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              )}
            </div>
          </CardContent>
        </Card>
      )) : (
        <div className="text-center py-12 text-gray-500">
          <Bell className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">Nenhuma notificação</p>
          <p className="text-sm">Você está em dia!</p>
        </div>
      )}
    </div>
  )

  // Componente do Perfil
  const ProfileView = () => (
    <div className="space-y-6">
      {/* Header do perfil */}
      <Card className="shadow-lg">
        <CardContent className="p-6">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-gray-500 mb-2">{user.email}</p>
                <div className="flex items-center gap-2">
                  {isPremium ? (
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                      <Crown className="w-4 h-4 mr-1" />
                      Premium
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Gratuito</Badge>
                  )}
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    <Leaf className="w-3 h-3 mr-1" />
                    Eco-Friendly
                  </Badge>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <User className="w-20 h-20 mx-auto mb-4 text-gray-400" />
              <h3 className="font-semibold text-xl mb-2">Faça login para continuar</h3>
              <p className="text-gray-500 mb-6">Acesse suas rotas, favoritos e estatísticas</p>
              <Button onClick={() => setShowLoginDialog(true)} className="bg-gradient-to-r from-green-500 to-blue-500 text-lg px-8 py-3">
                Fazer Login
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Estatísticas */}
      {statistics && (
        <PremiumStats stats={statistics} isPremium={isPremium} />
      )}

      {/* Upgrade para Premium */}
      {!isPremium && (
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Crown className="w-16 h-16 text-yellow-600" />
              <div className="flex-1">
                <h3 className="font-bold text-xl mb-2">Upgrade para Premium</h3>
                <p className="text-gray-600 mb-4">Rotas offline, estatísticas avançadas e muito mais!</p>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Rotas offline</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Estatísticas avançadas</span>
                  </div>
                </div>
                <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-lg px-6 py-3">
                  <Crown className="w-5 h-5 mr-2" />
                  Assinar por €4.99/mês
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Configurações */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Configurações</h3>
        
        <Card className="shadow-md">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5" />
                <span className="font-medium">Idioma</span>
              </div>
              <Select value={selectedLanguage} onValueChange={changeLanguage}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt">Português</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5" />
                <span className="font-medium">Notificações Push</span>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5" />
                <span className="font-medium">Modo Offline</span>
              </div>
              <Switch disabled={!isPremium} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Histórico de viagens */}
      {recentTrips.length > 0 && (
        <div>
          <h3 className="font-semibold mb-4 text-lg">Viagens Recentes</h3>
          <div className="space-y-3">
            {recentTrips.slice(0, 5).map((trip) => (
              <Card key={trip.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium">{trip.from}</span>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{trip.to}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {trip.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {trip.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          {trip.cost}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-green-600">
                      <Leaf className="w-4 h-4" />
                      <span className="text-sm font-medium">{trip.co2Saved}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  // Se mostrar tela de boas-vindas
  if (showWelcome) {
    return <WelcomeScreen />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                EcoMove
              </h1>
            </div>
            
            {/* Menu mobile */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="max-w-md mx-auto">
        {/* Campo de busca fixo (apenas na aba mapa) */}
        {activeTab === 'map' && (
          <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Para onde você quer ir?"
                value={searchDestination}
                onChange={(e) => setSearchDestination(e.target.value)}
                className="pl-10 h-12 border-2 focus:border-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
          </div>
        )}

        {/* Conteúdo das abas */}
        <div className="p-4 pb-20">
          {activeTab === 'map' && (
            <div className="h-[calc(100vh-200px)]">
              <MapView />
            </div>
          )}
          {activeTab === 'search' && <RouteSearch />}
          {activeTab === 'wallet' && <DigitalWallet />}
          {activeTab === 'notifications' && <NotificationsView />}
          {activeTab === 'profile' && <ProfileView />}
        </div>
      </main>

      {/* Navegação inferior */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-md mx-auto px-4 py-2">
          <div className="flex items-center justify-around">
            {[
              { id: 'map', icon: MapPin, label: 'Mapa' },
              { id: 'search', icon: Search, label: 'Rotas' },
              { id: 'wallet', icon: Wallet, label: 'Carteira' },
              { id: 'notifications', icon: Bell, label: 'Alertas' },
              { id: 'profile', icon: User, label: 'Perfil' }
            ].map((tab) => (
              <Button
                key={tab.id}
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1 h-auto py-3 px-4 transition-all ${
                  activeTab === tab.id 
                    ? 'text-blue-600 bg-blue-50 scale-105' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="text-xs font-medium">{tab.label}</span>
                {activeTab === tab.id && (
                  <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                )}
              </Button>
            ))}
          </div>
        </div>
      </nav>

      {/* Menu mobile overlay */}
      {showMobileMenu && (
        <div className="fixed inset-0 bg-black/50 z-50 md:hidden">
          <div className="bg-white w-64 h-full p-4 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Menu</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowMobileMenu(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="w-5 h-5 mr-3" />
                Configurações
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <History className="w-5 h-5 mr-3" />
                Histórico
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Heart className="w-5 h-5 mr-3" />
                Favoritos
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Crown className="w-5 h-5 mr-3" />
                Upgrade Premium
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Dialog de Login */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-center">Entrar no EcoMove</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <SocialLogin onLogin={handleSocialLogin} />
          </div>
        </DialogContent>
      </Dialog>

      {/* Alerta em tempo real */}
      {showRealTimeAlert && (
        <RealTimeAlert
          type="tip"
          message="Bem-vindo ao EcoMove! Comece explorando as rotas sustentáveis da sua cidade."
          onDismiss={() => setShowRealTimeAlert(false)}
        />
      )}
    </div>
  )
}