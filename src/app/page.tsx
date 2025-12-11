'use client'

import { useEffect, useState } from 'react'
import { fetchLeagues, fetchUpcomingMatches, fetchLiveMatches } from '@/lib/api'
import { Navbar } from '@/components/custom/navbar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Trophy, Calendar, TrendingUp, Clock, MapPin, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface League {
  id: string
  name: string
  country: string
  logo: string
}

interface Match {
  id: string
  homeTeam: string
  awayTeam: string
  date: string
  time: string
  league: string
  status: 'live' | 'upcoming'
}

export default function Home() {
  const [leagues, setLeagues] = useState<League[]>([])
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([])
  const [liveMatches, setLiveMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [leaguesData, upcomingData, liveData] = await Promise.all([
          fetchLeagues(),
          fetchUpcomingMatches(),
          fetchLiveMatches(),
        ])
        
        setLeagues(leaguesData.leagues)
        setUpcomingMatches(upcomingData.matches)
        setLiveMatches(liveData.matches)
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            <Trophy className="h-12 w-12 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Bem-vindo ao StatRealm
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Análise esportiva profissional com estatísticas em tempo real, probabilidades e insights detalhados de todos os campeonatos do mundo.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border-blue-200 dark:border-blue-900/50 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/50 dark:to-gray-900">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Campeonatos
              </CardTitle>
              <Trophy className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{leagues.length}+</div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Ligas disponíveis
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200 dark:border-green-900/50 bg-gradient-to-br from-green-50 to-white dark:from-green-950/50 dark:to-gray-900">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Jogos Ao Vivo
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{liveMatches.length}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Acontecendo agora
              </p>
            </CardContent>
          </Card>

          <Card className="border-purple-200 dark:border-purple-900/50 bg-gradient-to-br from-purple-50 to-white dark:from-purple-950/50 dark:to-gray-900">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Próximos Jogos
              </CardTitle>
              <Calendar className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">{upcomingMatches.length}+</div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Nas próximas 24h
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="leagues" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="leagues">Campeonatos</TabsTrigger>
            <TabsTrigger value="matches">Jogos</TabsTrigger>
          </TabsList>

          {/* Leagues Tab */}
          <TabsContent value="leagues" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Campeonatos em Destaque
              </h2>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mt-2"></div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {leagues.map((league) => (
                  <Link key={league.id} href={`/league/${league.id}`}>
                    <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-blue-400 dark:hover:border-blue-600">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-3xl">{league.logo}</span>
                            <div>
                              <CardTitle className="text-lg">{league.name}</CardTitle>
                              <CardDescription>{league.country}</CardDescription>
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </div>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Matches Tab */}
          <TabsContent value="matches" className="space-y-6">
            {/* Live Matches */}
            {liveMatches.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse"></div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Ao Vivo
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {liveMatches.map((match) => (
                    <MatchCard key={match.id} match={match} isLive />
                  ))}
                </div>
              </div>
            )}

            {/* Upcoming Matches */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Próximos Jogos
              </h2>
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="animate-pulse">
                      <CardContent className="p-6">
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : upcomingMatches.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {upcomingMatches.map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                      Nenhum jogo programado no momento
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

function MatchCard({ match, isLive = false }: { match: Match; isLive?: boolean }) {
  return (
    <Link href={`/match/${match.id}`}>
      <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Badge variant={isLive ? "destructive" : "secondary"} className="text-xs">
              {isLive ? (
                <span className="flex items-center">
                  <span className="h-2 w-2 bg-white rounded-full mr-1 animate-pulse"></span>
                  AO VIVO
                </span>
              ) : (
                match.league
              )}
            </Badge>
            {!isLive && (
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <Clock className="h-3 w-3 mr-1" />
                {match.time}
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-900 dark:text-white">
                {match.homeTeam}
              </span>
              {isLive && <span className="text-xl font-bold text-blue-600">2</span>}
            </div>
            <div className="flex items-center justify-center">
              <div className="h-px bg-gray-200 dark:bg-gray-700 flex-1"></div>
              <span className="px-3 text-xs text-gray-500 dark:text-gray-400">VS</span>
              <div className="h-px bg-gray-200 dark:bg-gray-700 flex-1"></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-900 dark:text-white">
                {match.awayTeam}
              </span>
              {isLive && <span className="text-xl font-bold text-blue-600">1</span>}
            </div>
          </div>

          {!isLive && (
            <div className="mt-4 flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Calendar className="h-3 w-3 mr-1" />
              {new Date(match.date).toLocaleDateString('pt-BR')}
            </div>
          )}

          <Button variant="ghost" className="w-full mt-4 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950">
            Ver Análise Completa
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </CardContent>
      </Card>
    </Link>
  )
}
