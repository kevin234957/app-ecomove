/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração para export estático (necessário para Capacitor)
  output: 'export',
  
  // Desabilitar otimização de imagens para export estático
  images: {
    unoptimized: true
  },
  
  // Configuração de trailing slash
  trailingSlash: true,
  
  // Configuração de asset prefix para produção
  assetPrefix: process.env.NODE_ENV === 'production' ? './' : '',
  
  // Configurações de build
  distDir: 'out',
  
  // Configurações de TypeScript
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // Configurações de ESLint
  eslint: {
    ignoreDuringBuilds: false,
  },
  
  // Headers de segurança
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
  
  // Configurações experimentais
  experimental: {
    optimizeCss: true,
  },
  
  // Configurações de webpack para otimização
  webpack: (config, { isServer }) => {
    // Otimizações para produção
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      }
    }
    
    return config
  },
}

module.exports = nextConfig