import fs from 'node:fs';
import { describe, expect, it } from 'vitest';

const workflow = fs.readFileSync('.github/workflows/deploy.yml', 'utf8');

describe('GitHub Pages deployment', () => {
  it('runs the test suite before building the Pages artifact', () => {
    const testStep = workflow.indexOf('- run: npm test');
    const buildStep = workflow.indexOf('- name: Build');

    expect(testStep).toBeGreaterThan(-1);
    expect(buildStep).toBeGreaterThan(testStep);
  });

  it('builds for the repository base and creates a deep-route fallback', () => {
    expect(workflow).toContain("SITE_BASE: ${{ vars.SITE_BASE || '/fahint-electric-website/' }}");
    expect(workflow).toContain('cp dist/index.html dist/404.html');
  });
});
