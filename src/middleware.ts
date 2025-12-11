import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  // Rotas públicas que não precisam de autenticação
  const publicRoutes = ['/login', '/']
  const isPublicRoute = publicRoutes.some(route => req.nextUrl.pathname.startsWith(route))
  
  if (isPublicRoute) {
    return res
  }

  // Para rotas protegidas, verificar autenticação
  // Por enquanto, permitir acesso (implementar verificação depois)
  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
