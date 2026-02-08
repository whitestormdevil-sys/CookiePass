// ============================================================================
// CookiePass Smart Cookie Analyzer
// ============================================================================
// Port of analyticsEngine.js — detects auth cookies by name patterns,
// value analysis, and security attributes.
// ============================================================================

import type { CookieData, AnalyzedCookie, CookieCategory } from '@/types';

// --- Auth cookie name patterns by confidence level ---

const CRITICAL_EXACT: string[] = [
  'sessionid', 'session_id', 'sessid', 'sid', 'phpsessid', 'jsessionid',
  'aspsessionid', 'asp.net_sessionid', 'cfid', 'cftoken', 'session',
  'auth_token', 'authtoken', 'auth-token', 'access_token', 'accesstoken',
  'access-token', 'bearer_token', 'bearertoken', 'api_token', 'apitoken',
  'jwt', 'jwt_token', 'jwttoken', 'id_token', 'idtoken',
  'refresh_token', 'refreshtoken', 'refresh-token', 'rt', 'refresh',
  'user_session', 'usersession', 'user_token', 'usertoken',
  'logged_in', 'loggedin', 'is_logged_in', 'authenticated',
  'remember_token', 'remembertoken', 'remember_me', 'rememberme',
  'persistent_token', 'persistenttoken', 'stay_logged_in',
  'csrf_token', 'csrftoken', 'csrf', '_csrf', 'xsrf_token', 'xsrftoken',
  'connect.sid', '_session', 'rack.session', 'laravel_session',
  'django_session', 'flask_session', 'play_session', 'session_token',
];

const CRITICAL_PATTERNS: RegExp[] = [
  /^sess[_-]?id$/i,
  /^session[_-]?id$/i,
  /^auth[_-]?token$/i,
  /^access[_-]?token$/i,
  /^jwt[_-]?token$/i,
  /^user[_-]?session$/i,
  /^login[_-]?token$/i,
];

const HIGH_PREFIXES = [
  'auth', 'sess', 'session', 'token', 'jwt', 'bearer', 'login',
  'user_', 'usr_', 'account_', 'acct_', 'member_', 'identity_',
  'credential', 'cred_', 'sso_', 'saml_', 'oauth', 'oidc',
];

const HIGH_SUFFIXES = [
  '_token', '_session', '_auth', '_jwt', '_key', '_id',
  '_credential', '_identity', 'token', 'session', 'auth',
  '_sess', '_sid', '_hash', '_sig', '_signature',
];

const HIGH_CONTAINS = [
  'session', 'token', 'auth', 'login', 'credential', 'identity',
  'bearer', 'jwt', 'oauth', 'sso', 'saml',
];

const FRAMEWORK_PATTERNS: RegExp[] = [
  // PHP
  /^phpsessid$/i, /^php_session/i, /^zend_session/i, /^symfony/i,
  /^laravel_/i, /^yii_/i, /^cake_/i, /^codeigniter_/i,
  // Java
  /^jsessionid$/i, /^jsession/i, /^spring_/i, /^wicket/i, /^grails_/i,
  // .NET
  /^asp\.net_sessionid$/i, /^\.aspxauth$/i, /^aspnet_/i,
  /^__requestverificationtoken$/i, /^blazor/i,
  // Python
  /^django_/i, /^flask_/i, /^pyramid_/i, /^tornado_/i, /^bottle_/i,
  // Ruby
  /^rack\.session$/i, /^_rails_/i, /^_sinatra_/i,
  // Node.js
  /^connect\.sid$/i, /^express[_-]/i, /^koa[_-]/i, /^hapi[_-]/i, /^fastify[_-]/i,
  // Cloud
  /^aws/i, /^azure/i, /^gcp_/i, /^firebase/i, /^auth0/i, /^okta/i, /^cognito/i,
];

const MEDIUM_PATTERNS: RegExp[] = [
  /^[a-z]{2,4}id$/i,
  /^[a-z]+_id$/i,
  /^id_[a-z]+$/i,
  /^[a-z]+_hash$/i,
  /remember/i,
  /persist/i,
];

// --- Value analysis helpers ---

function isJWT(value: string): boolean {
  const parts = value.split('.');
  if (parts.length !== 3) return false;
  try {
    const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
    return !!header.alg;
  } catch {
    return false;
  }
}

function isHighEntropyValue(value: string): boolean {
  if (value.length < 16) return false;
  const freq: Record<string, number> = {};
  for (const ch of value) freq[ch] = (freq[ch] || 0) + 1;
  let entropy = 0;
  const len = value.length;
  for (const count of Object.values(freq)) {
    const p = count / len;
    entropy -= p * Math.log2(p);
  }
  return entropy > 3.5;
}

function isSessionIdLike(value: string): boolean {
  const patterns = [
    /^[a-f0-9]{32}$/i, // MD5
    /^[a-f0-9]{40}$/i, // SHA1
    /^[a-f0-9]{64}$/i, // SHA256
    /^[a-f0-9-]{36}$/i, // UUID
    /^s%3A[A-Za-z0-9%]+/i, // Express signed
  ];
  return patterns.some(p => p.test(value));
}

// --- Main analysis ---

interface AnalysisScore {
  nameScore: number;
  valueScore: number;
  securityScore: number;
  maxScore: number;
  category: CookieCategory;
}

function analyzeNameScore(name: string): { score: number; maxScore: number } {
  let score = 0;
  const maxScore = 4.0;
  const nameLower = name.toLowerCase();

  // Critical exact match
  if (CRITICAL_EXACT.includes(nameLower)) {
    score += 1.0;
  }

  // Critical patterns
  if (CRITICAL_PATTERNS.some(p => p.test(name))) {
    score += 0.9;
  }

  // High prefixes
  if (HIGH_PREFIXES.some(p => nameLower.startsWith(p))) {
    score += 0.6;
  }

  // High suffixes
  if (HIGH_SUFFIXES.some(s => nameLower.endsWith(s))) {
    score += 0.6;
  }

  // High contains
  if (HIGH_CONTAINS.some(c => nameLower.includes(c))) {
    score += 0.5;
  }

  // Framework patterns
  if (FRAMEWORK_PATTERNS.some(p => p.test(name))) {
    score += 0.8;
  }

  // Medium patterns
  if (MEDIUM_PATTERNS.some(p => p.test(name))) {
    score += 0.3;
  }

  return { score: Math.min(score, maxScore), maxScore };
}

function analyzeValueScore(value: string): { score: number; maxScore: number } {
  let score = 0;
  const maxScore = 1.5;

  if (!value) return { score: 0, maxScore };

  if (isJWT(value)) {
    score += 1.0;
  } else if (isSessionIdLike(value)) {
    score += 0.5;
  } else if (isHighEntropyValue(value)) {
    score += 0.3;
  }

  return { score, maxScore };
}

function analyzeSecurityScore(cookie: CookieData): { score: number; maxScore: number } {
  let score = 0;
  const maxScore = 0.5;

  if (cookie.httpOnly) score += 0.2;
  if (cookie.secure) score += 0.15;
  if (cookie.sameSite === 'strict' || cookie.sameSite === 'lax') score += 0.15;

  return { score, maxScore };
}

function determineCategory(name: string, value: string): CookieCategory {
  const nameLower = name.toLowerCase();

  if (isJWT(value) || nameLower.includes('jwt')) return 'jwt';
  if (nameLower.includes('oauth')) return 'oauth';
  if (nameLower.includes('csrf') || nameLower.includes('xsrf')) return 'csrf';
  if (nameLower.includes('remember') || nameLower.includes('persist')) return 'persistent_auth';
  if (nameLower.includes('sess') || nameLower.includes('sid') || CRITICAL_EXACT.includes(nameLower)) return 'session';
  if (nameLower.includes('_ga') || nameLower.includes('analytics') || nameLower.includes('_gid')) return 'analytics';
  if (nameLower.includes('pref') || nameLower.includes('theme') || nameLower.includes('lang')) return 'preference';
  if (nameLower.includes('track') || nameLower.includes('_fbp') || nameLower.includes('_gcl')) return 'tracking';

  return 'unknown';
}

/**
 * Analyze a single cookie and classify it.
 */
export function analyzeCookie(cookie: CookieData): AnalyzedCookie {
  const nameResult = analyzeNameScore(cookie.name);
  const valueResult = analyzeValueScore(cookie.value);
  const securityResult = analyzeSecurityScore(cookie);

  const totalScore = nameResult.score + valueResult.score + securityResult.score;
  const maxScore = nameResult.maxScore + valueResult.maxScore + securityResult.maxScore;
  const confidence = maxScore > 0 ? totalScore / maxScore : 0;

  // Threshold: 0.25 (high sensitivity for auth detection)
  const isAuth = confidence >= 0.25;
  const category = isAuth
    ? determineCategory(cookie.name, cookie.value)
    : determineCategory(cookie.name, cookie.value);

  const classification = isAuth ? 'authentication' : 'other';
  const finalCategory: CookieCategory = isAuth
    ? (category === 'analytics' || category === 'tracking' || category === 'preference' ? 'authentication' : category)
    : category;

  return {
    ...cookie,
    classification,
    category: finalCategory,
    confidence: Math.round(confidence * 100) / 100,
    selected: isAuth,
  };
}

/**
 * Analyze an array of cookies.
 */
export function analyzeCookies(cookies: CookieData[]): AnalyzedCookie[] {
  return cookies.map(analyzeCookie);
}

/**
 * Get only the auth cookies, sorted by confidence.
 */
export function getAuthCookies(cookies: CookieData[]): AnalyzedCookie[] {
  return analyzeCookies(cookies)
    .filter(c => c.classification === 'authentication')
    .sort((a, b) => b.confidence - a.confidence);
}

/**
 * Quick check if a cookie name looks like an auth cookie.
 */
export function isAuthCookieName(name: string): boolean {
  const { score, maxScore } = analyzeNameScore(name);
  return maxScore > 0 && (score / maxScore) >= 0.2;
}
