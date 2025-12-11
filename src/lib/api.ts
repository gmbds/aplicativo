// Cliente para API RapidAPI Soccer Data
const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY || 'd195083c46mshcdde1b4e394c451p1ce77ejsn4eb0d815dcbd'
const RAPIDAPI_HOST = 'soccer-data6.p.rapidapi.com'

export interface MatchInfo {
  id: string
  date: string
  time: string
  contestant: Array<{
    id: string
    name: string
    position: 'home' | 'away'
    country?: string
  }>
  stage?: {
    name: string
  }
  competition?: {
    name: string
    country?: string
  }
  venue?: {
    name: string
  }
}

export interface MatchFact {
  fact: string
  type?: string
  value?: string
}

export interface MatchAnalysis {
  matchInfo: MatchInfo
  message: MatchFact[]
}

export async function fetchMatchAnalysis(matchId: string): Promise<MatchAnalysis> {
  const response = await fetch(
    `https://${RAPIDAPI_HOST}/soccerdata/matchfactsbetting/1t97ffnd5cp761lay7ucgk9qak?fx=${matchId}`,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-host': RAPIDAPI_HOST,
        'x-rapidapi-key': RAPIDAPI_KEY,
      },
    }
  )

  if (!response.ok) {
    throw new Error('Falha ao buscar análise do jogo')
  }

  return response.json()
}

export async function fetchUpcomingMatches() {
  // Mock data para desenvolvimento - substituir com endpoint real
  return {
    matches: [
      {
        id: 'd0fn05ld3ohh4zolzok42dmok',
        homeTeam: 'Crystal Palace',
        awayTeam: 'Ipswich Town',
        date: '2024-01-20',
        time: '15:00',
        league: 'Premier League',
        status: 'upcoming'
      }
    ]
  }
}

export async function fetchLiveMatches() {
  // Mock data para desenvolvimento - substituir com endpoint real
  return {
    matches: []
  }
}

export async function fetchLeagues() {
  // Mock data para desenvolvimento - substituir com endpoint real
  return {
    leagues: [
      { id: '1', name: 'Premier League', country: 'Inglaterra', logo: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
      { id: '2', name: 'La Liga', country: 'Espanha', logo: '🇪🇸' },
      { id: '3', name: 'Bundesliga', country: 'Alemanha', logo: '🇩🇪' },
      { id: '4', name: 'Serie A', country: 'Itália', logo: '🇮🇹' },
      { id: '5', name: 'Ligue 1', country: 'França', logo: '🇫🇷' },
      { id: '6', name: 'Brasileirão', country: 'Brasil', logo: '🇧🇷' },
    ]
  }
}
