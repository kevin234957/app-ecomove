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
  WifiOff
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
  const [isOffline, setIsOffline] = useState(false)
  const [showLoginDialog, setShowLoginDialog] = useState(false)

  const isPremium = user?.isPremium || false

  const handleSearch = () => {
    if (searchDestination.trim()) {
      searchRoutes(searchDestination)
    }
  }

  // Componente do Mapa
  const MapView = () => (
    <div className="relative h-full bg-gradient-to-br from-blue-50 to-green-50 rounded-lg overflow-hidden">
      {/* Simulação do mapa */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23e5f3ff\" fill-opacity=\"0.3\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      
      {/* Localização do usuário */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
          <div className="absolute -top-2 -left-2 w-10 h-10 bg-blue-500/20 rounded-full animate-ping"></div>
        </div>
      </div>

      {/* Pontos de transporte simulados */}
      <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-green-500 rounded-full shadow-md"></div>
      <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-blue-500 rounded-full shadow-md"></div>
      <div className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-purple-500 rounded-full shadow-md"></div>
      
      {/* Controles do mapa */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <Button size="sm" variant="secondary" className="w-10 h-10 p-0 bg-white/90 backdrop-blur-sm">
          <Plus className="w-4 h-4" />
        </Button>
        <Button 
          size="sm" 
          variant="secondary" 
          className="w-10 h-10 p-0 bg-white/90 backdrop-blur-sm"
          onClick={getUserLocation}
        >
          <Navigation className="w-4 h-4" />
        </Button>
      </div>

      {/* Localização atual */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md">
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4 text-blue-500" />
          <span className="font-medium">{userLocation}</span>
        </div>
      </div>

      {/* Indicador offline */}
      {isOffline && (
        <div className="absolute top-4 right-4 bg-red-500/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md">
          <div className="flex items-center gap-2 text-sm text-white">
            <WifiOff className="w-4 h-4" />
            <span>Offline</span>
          </div>
        </div>
      )}
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
            className="pl-10 h-12 text-lg"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <Button 
          onClick={handleSearch} 
          disabled={isLoading}
          className="w-full h-12 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
          ) : (
            <Search className="w-5 h-5 mr-2" />
          )}
          {isLoading ? 'Buscando...' : 'Buscar Rotas'}
        </Button>
      </div>

      {/* Favoritos */}
      <div>
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          Destinos Favoritos
        </h3>
        <div className="grid gap-2">
          {favorites.length > 0 ? favorites.map((fav) => (
            <Button
              key={fav.id}
              variant="outline"
              className="justify-start h-auto p-4"
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
              <p>Nenhum favorito adicionado</p>
              <p className="text-sm">Adicione seus destinos frequentes</p>
            </div>
          )}
        </div>
      </div>

      {/* Resultados das rotas */}
      {showRoutes && routes.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold">Rotas para {searchDestination || 'destino'}</h3>
          {routes.map((route) => (
            <Card key={route.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className={`bg-gradient-to-r ${route.color} text-white p-3 rounded-lg mb-3`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {route.type === 'fastest' && <Zap className="w-5 h-5" />}
                      {route.type === 'cheapest' && <DollarSign className="w-5 h-5" />}
                      {route.type === 'sustainable' && <Leaf className="w-5 h-5" />}
                      <span className="font-semibold capitalize">
                        {route.type === 'fastest' ? 'Mais Rápida' : 
                         route.type === 'cheapest' ? 'Mais Barata' : 'Mais Sustentável'}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">{route.duration}</div>
                      <div className="text-sm opacity-90">{route.cost}</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {route.steps.map((step, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm">
                      {step.transport === 'Metro' && <Train className="w-4 h-4" />}
                      {step.transport === 'Autocarro' && <Bus className="w-4 h-4" />}
                      {step.transport === 'Tram' && <Train className="w-4 h-4" />}
                      {step.transport === 'Bicicleta' && <Bike className="w-4 h-4" />}
                      <span className="font-medium">{step.transport}</span>
                      <span className="text-gray-500">{step.line}</span>
                      <span className="ml-auto text-gray-600">{step.duration}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between mt-3 pt-3 border-t">
                  <div className="flex items-center gap-1 text-green-600">
                    <Leaf className="w-4 h-4" />
                    <span className="text-sm">CO₂ poupado: {route.co2Saved}</span>
                  </div>
                  <Button size="sm" className="bg-gradient-to-r from-green-500 to-blue-500">
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
      <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Saldo Disponível</p>
              <p className="text-3xl font-bold">{formatCurrency(walletBalance)}</p>
            </div>
            <Wallet className="w-12 h-12 opacity-80" />
          </div>
        </CardContent>
      </Card>

      {/* Adicionar saldo */}
      <div>
        <h3 className="font-semibold mb-3">Adicionar Saldo</h3>
        <div className="grid grid-cols-3 gap-3">
          {[10, 20, 50].map((amount) => (
            <Button
              key={amount}
              variant="outline"
              onClick={() => addBalance(amount)}
              className="h-16 flex flex-col gap-1"
            >
              <Plus className="w-5 h-5" />
              <span>{formatCurrency(amount)}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Cartões de transporte */}
      <div>
        <h3 className="font-semibold mb-3">Cartões de Transporte</h3>
        <div className="space-y-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Cartão Metropolitano</p>
                    <p className="text-sm text-gray-500">Metro, Autocarro, Tram</p>
                  </div>
                </div>
                <Badge variant="secondary">Ativo</Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Bike className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">GIRA Bicicletas</p>
                  <p className="text-sm text-gray-500">Bicicletas partilhadas</p>
                </div>
                <Badge variant="secondary" className="ml-auto">Ativo</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Histórico de transações */}
      <div>
        <h3 className="font-semibold mb-3">Transações Recentes</h3>
        <div className="space-y-2">
          {[
            { type: 'Metro', amount: -2.40, time: 'Hoje, 08:30' },
            { type: 'Recarga', amount: +20.00, time: 'Ontem, 19:15' },
            { type: 'Autocarro', amount: -1.80, time: 'Ontem, 18:45' }
          ].map((transaction, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  transaction.amount > 0 ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {transaction.amount > 0 ? 
                    <Plus className="w-4 h-4 text-green-600" /> : 
                    <CreditCard className="w-4 h-4 text-red-600" />
                  }
                </div>
                <div>
                  <p className="font-medium">{transaction.type}</p>
                  <p className="text-sm text-gray-500">{transaction.time}</p>
                </div>
              </div>
              <span className={`font-semibold ${
                transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {formatCurrency(Math.abs(transaction.amount), transaction.amount > 0 ? '+' : '-')}
              </span>
            </div>
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
        <Card key={notification.id} className={`${!notification.read ? 'border-blue-200 bg-blue-50/50' : ''}`}>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                notification.type === 'delay' ? 'bg-red-100' :
                notification.type === 'tip' ? 'bg-green-100' :
                notification.type === 'strike' ? 'bg-yellow-100' :
                'bg-blue-100'
              }`}>
                {notification.type === 'delay' && <Clock className="w-5 h-5 text-red-600" />}
                {notification.type === 'tip' && <Leaf className="w-5 h-5 text-green-600" />}
                {notification.type === 'route_change' && <Navigation className="w-5 h-5 text-blue-600" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{notification.title}</h3>
                  <span className="text-sm text-gray-500">{notification.time}</span>
                </div>
                <p className="text-gray-600 mt-1">{notification.message}</p>
              </div>
              {!notification.read && (
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              )}
            </div>
          </CardContent>
        </Card>
      )) : (
        <div className="text-center py-8 text-gray-500">
          <Bell className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>Nenhuma notificação</p>
          <p className="text-sm">Você está em dia!</p>
        </div>
      )}
    </div>
  )

  // Componente do Perfil
  const ProfileView = () => (
    <div className="space-y-6">
      {/* Header do perfil */}
      <Card>
        <CardContent className="p-6">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-gray-500">{user.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  {isPremium ? (
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500">
                      <Crown className="w-3 h-3 mr-1" />
                      Premium
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Gratuito</Badge>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <User className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="font-semibold mb-2">Faça login para continuar</h3>
              <p className="text-gray-500 mb-4">Acesse suas rotas, favoritos e estatísticas</p>
              <Button onClick={() => setShowLoginDialog(true)} className="bg-gradient-to-r from-green-500 to-blue-500">
                Fazer Login
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Estatísticas */}
      {statistics && (
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{statistics.totalTrips}</div>
              <div className="text-sm text-gray-500">Viagens este mês</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{formatCurrency(statistics.moneySaved)}</div>
              <div className="text-sm text-gray-500">Economizado</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{statistics.co2Saved.toFixed(1)} kg</div>
              <div className="text-sm text-gray-500">CO₂ poupado</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{Math.round(statistics.timeSaved)}h</div>
              <div className="text-sm text-gray-500">Tempo poupado</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Upgrade para Premium */}
      {!isPremium && (
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Crown className="w-12 h-12 text-yellow-600" />
              <div className="flex-1">
                <h3 className="font-bold text-lg">Upgrade para Premium</h3>
                <p className="text-gray-600">Rotas offline, estatísticas avançadas e muito mais!</p>
                <Button className="mt-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                  Assinar por €4.99/mês
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Configurações */}
      <div className="space-y-4">
        <h3 className="font-semibold">Configurações</h3>
        
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5" />
                <span>Idioma</span>
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
                <span>Notificações Push</span>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5" />
                <span>Modo Offline</span>
              </div>
              <Switch disabled={!isPremium} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Histórico de viagens */}
      {recentTrips.length > 0 && (
        <div>
          <h3 className="font-semibold mb-3">Viagens Recentes</h3>
          <div className="space-y-3">
            {recentTrips.slice(0, 5).map((trip) => (
              <Card key={trip.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium">{trip.from}</span>
                        <Navigation className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{trip.to}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{trip.date}</span>
                        <span>{trip.duration}</span>
                        <span>{trip.cost}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-green-600">
                      <Leaf className="w-4 h-4" />
                      <span className="text-sm">{trip.co2Saved}</span>
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
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
                className="pl-10 h-12"
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
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
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
                className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
                  activeTab === tab.id 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="text-xs">{tab.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </nav>

      {/* Menu mobile overlay */}
      {showMobileMenu && (
        <div className="fixed inset-0 bg-black/50 z-50 md:hidden">
          <div className="bg-white w-64 h-full p-4">
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
          <div className="space-y-4 py-4">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <Smartphone className="w-5 h-5 mr-2" />
              Continuar com Google
            </Button>
            <Button variant="outline" className="w-full">
              <Smartphone className="w-5 h-5 mr-2" />
              Continuar com Apple
            </Button>
            <Button variant="outline" className="w-full">
              <Smartphone className="w-5 h-5 mr-2" />
              Continuar com Facebook
            </Button>
            <div className="text-center text-sm text-gray-500">
              Ao continuar, você concorda com nossos Termos de Uso e Política de Privacidade
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}