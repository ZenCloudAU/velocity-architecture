import axios from 'axios';
import { VAFFramework } from './types/index';
import { logger } from './logger';

const KB_BASE_URL = process.env.VAF_KB_URL || 'https://raw.githubusercontent.com/ZenCloudAU/velocity-architecture/main';
const CACHE_TTL = parseInt(process.env.VAF_KB_CACHE_TTL || '3600', 10) * 1000;

let cachedFramework: VAFFramework | null = null;
let cacheExpiry: number = 0;

export async function loadVAFFramework(): Promise<VAFFramework> {
  const now = Date.now();

  // Return cached if valid
  if (cachedFramework && now < cacheExpiry) {
    logger.debug({ cacheAge: now - (cachedFramework.lastLoaded.getTime()) }, 'VAF framework from cache');
    return cachedFramework;
  }

  logger.info('Loading VAF framework from GitHub...');

  try {
    const [spec, vp1, vp2, vp3, rules, govExample, stratExample, designExample, foundation] =
      await Promise.all([
        fetchWithRetry(`${KB_BASE_URL}/spec/FRAMEWORK-SPEC.md`),
        fetchWithRetry(`${KB_BASE_URL}/viewpoints/vp1-direction/README.md`),
        fetchWithRetry(`${KB_BASE_URL}/viewpoints/vp2-decision/README.md`),
        fetchWithRetry(`${KB_BASE_URL}/viewpoints/vp3-truth/README.md`),
        fetchWithRetry(`${KB_BASE_URL}/correspondence-rules/RULES.md`),
        fetchWithRetry(`${KB_BASE_URL}/examples/guardrail-canvas-example.md`),
        fetchWithRetry(`${KB_BASE_URL}/examples/trade-off-matrix-example.md`),
        fetchWithRetry(`${KB_BASE_URL}/examples/adr-example.md`),
        fetchWithRetry(`${KB_BASE_URL}/foundation/EPISTEMOLOGY.md`),
      ]);

    const now = new Date();
    const expiresAt = new Date(now.getTime() + CACHE_TTL);

    cachedFramework = {
      spec,
      viewpoints: { vp1, vp2, vp3 },
      correspondenceRules: rules,
      examples: {
        governance: govExample,
        strategy: stratExample,
        design: designExample,
      },
      foundation,
      lastLoaded: now,
      expiresAt,
    };

    cacheExpiry = expiresAt.getTime();

    logger.info({ expiresAt }, 'VAF framework loaded and cached');
    return cachedFramework;
  } catch (error) {
    logger.error({ error }, 'Failed to load VAF framework');
    throw new Error('Unable to load VAF framework from GitHub. Check network and repo availability.');
  }
}

async function fetchWithRetry(url: string, maxRetries: number = 3): Promise<string> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await axios.get(url, { timeout: 10000 });
      return response.data;
    } catch (error) {
      lastError = error as Error;
      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt - 1) * 1000;
        logger.warn({ url, attempt, delay }, `Retry fetch after ${delay}ms`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw new Error(`Failed to fetch ${url} after ${maxRetries} retries: ${lastError?.message}`);
}

export function invalidateCache(): void {
  cachedFramework = null;
  cacheExpiry = 0;
  logger.info('VAF framework cache invalidated');
}
