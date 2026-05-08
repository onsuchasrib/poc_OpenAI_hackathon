import { describe, expect, it } from 'vitest';
import { personas } from '../data/personas';
import { buildDashboardSummary, getTrendDirection } from './trendEngine';

describe('trendEngine', () => {
  it('builds dashboard summaries for every persona', () => {
    for (const persona of personas) {
      const summary = buildDashboardSummary(persona.id);
      expect(summary.trends.length).toBeGreaterThan(0);
      expect(summary.notices.length).toBeGreaterThan(0);
      expect(summary.maskingSummary).toContain('AGI may be masking functional change');
    }
  });

  it('detects trend direction from points', () => {
    const summary = buildDashboardSummary('malee');
    expect(getTrendDirection(summary.trends[0])).toBe('down');
  });
});
