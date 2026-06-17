import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRelativeTime(dateString: string): string {
  try {
    const past = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - past.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    
    const diffHrs = Math.floor(diffMins / 60);
    if (diffHrs < 24) return `${diffHrs}h ago`;
    
    const diffDays = Math.floor(diffHrs / 24);
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  } catch (e) {
    return '';
  }
}

export function formatTimeOnly(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  } catch (e) {
    return '';
  }
}

export function formatDateHeading(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
  } catch (e) {
    return '';
  }
}

export function getTeamFlagUrl(identifier: string | undefined): string {
  if (!identifier) return 'https://flagcdn.com/w80/un.png';
  
  const clean = identifier.trim().toLowerCase();
  
  const mapping: Record<string, string> = {
    // Emojis
    '🇺🇸': 'us', '🇲🇽': 'mx', '🇨🇦': 'ca', '🇨🇴': 'co', '🏴󠁧󠁢󠁥󠁮󠁧󠁿': 'gb-eng',
    '🇸🇳': 'sn', '🇺🇦': 'ua', '🇦🇺': 'au', '🇦🇷': 'ar', '🇵🇱': 'pl',
    '🇸🇦': 'sa', '🇪🇬': 'eg', '🇫🇷': 'fr', '🇩🇰': 'dk', '🇹🇳': 'tn',
    '🇵🇪': 'pe', '🇪🇸': 'es', '🇩🇪': 'de', '🇯🇵': 'jp', '🇨🇷': 'cr',
    '🇧🇪': 'be', '🇭🇷': 'hr', '🇲🇦': 'ma', '🇰🇷': 'kr', '🇧🇷': 'br',
    '🇨🇭': 'ch', '🇷🇸': 'rs', '🇨🇲': 'cm', '🇵🇹': 'pt', '🇺🇾': 'uy',
    '🇬🇭': 'gh', '🇮🇷': 'ir',

    // Team IDs
    't-usa': 'us', 't-mex': 'mx', 't-can': 'ca', 't-col': 'co', 't-eng': 'gb-eng',
    't-sen': 'sn', 't-ukr': 'ua', 't-aus': 'au', 't-arg': 'ar', 't-pol': 'pl',
    't-sau': 'sa', 't-egy': 'eg', 't-fra': 'fr', 't-den': 'dk', 't-tun': 'tn',
    't-per': 'pe', 't-esp': 'es', 't-ger': 'de', 't-jpn': 'jp', 't-crc': 'cr',
    't-bel': 'be', 't-cro': 'hr', 't-mar': 'ma', 't-kor': 'kr', 't-bra': 'br',
    't-sui': 'ch', 't-srb': 'rs', 't-cmr': 'cm', 't-por': 'pt', 't-ury': 'uy',
    't-gha': 'gh', 't-irn': 'ir',

    // Short names
    'usa': 'us', 'mex': 'mx', 'can': 'ca', 'col': 'co', 'eng': 'gb-eng',
    'sen': 'sn', 'ukr': 'ua', 'aus': 'au', 'arg': 'ar', 'pol': 'pl',
    'ksa': 'sa', 'egy': 'eg', 'fra': 'fr', 'den': 'dk', 'tun': 'tn',
    'per': 'pe', 'esp': 'es', 'ger': 'de', 'jpn': 'jp', 'crc': 'cr',
    'bel': 'be', 'cro': 'hr', 'mar': 'ma', 'kor': 'kr', 'bra': 'br',
    'sui': 'ch', 'srb': 'rs', 'cmr': 'cm', 'por': 'pt', 'ury': 'uy',
    'gha': 'gh', 'irn': 'ir',

    // Team Names
    'united states': 'us', 'mexico': 'mx', 'canada': 'ca', 'colombia': 'co', 'england': 'gb-eng',
    'senegal': 'sn', 'ukraine': 'ua', 'australia': 'au', 'argentina': 'ar', 'poland': 'pl',
    'saudi arabia': 'sa', 'egypt': 'eg', 'france': 'fr', 'denmark': 'dk', 'tunisia': 'tn',
    'peru': 'pe', 'spain': 'es', 'germany': 'de', 'japan': 'jp', 'costa rica': 'cr',
    'belgium': 'be', 'croatia': 'hr', 'morocco': 'ma', 'south korea': 'kr', 'brazil': 'br',
    'switzerland': 'ch', 'serbia': 'rs', 'cameroon': 'cm', 'portugal': 'pt', 'uruguay': 'uy',
    'ghana': 'gh', 'iran': 'ir'
  };

  const code = mapping[clean] || clean;
  if (code === 'gb-eng') {
    return 'https://flagcdn.com/gb-eng.svg';
  }
  return `https://flagcdn.com/w80/${code}.png`;
}

