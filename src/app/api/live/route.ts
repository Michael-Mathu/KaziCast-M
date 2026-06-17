/**
 * Live match data API route
 * 
 * Proxies ESPN's public API (no key required) and returns matches
 * in our app's Match[] format. This keeps all external calls server-side.
 * 
 * GET /api/live
 * GET /api/live?dates=20260617
 * GET /api/live?ids=wc-1,wc-2
 */

import { NextRequest, NextResponse } from 'next/server';
import { fetchESPNScoreboard, fetchESPNMatchesForDate } from '@/lib/espn';
import { Match } from '@/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const dates = searchParams.get('dates');
  const ids = searchParams.get('ids');

  try {
    let matches: Match[];

    if (dates) {
      matches = await fetchESPNMatchesForDate(dates);
    } else {
      matches = await fetchESPNScoreboard();
    }

    // If specific match IDs requested, filter
    if (ids) {
      const idSet = new Set(ids.split(','));
      matches = matches.filter(m => idSet.has(m.id));
    }

    return NextResponse.json(
      { matches, timestamp: new Date().toISOString() },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, max-age=0, stale-while-revalidate=30',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    console.error('Live API error:', error);
    return NextResponse.json(
      { matches: [], timestamp: new Date().toISOString(), error: 'Failed to fetch live data' },
      { status: 200 } // Return 200 with empty data so the client doesn't break
    );
  }
}