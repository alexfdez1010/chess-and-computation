import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { isAttacked, knightPath, knightSteps, minimaxSteps, queenSteps } from '../src/lib/lesson-models.ts';

for (const lang of ['es', 'en']) {
  const queens = queenSteps(lang);
  for (const step of queens) {
    assert.ok(step.queens.includes('b3') && step.queens.includes('e2'), 'Fixed queens must remain');
    for (const queen of step.queens) assert.equal(isAttacked(queen, step.queens.filter((q) => q !== queen)), false, 'Placed queens must not attack each other');
  }
  const deadEnd = queens.find((step) => step.column === 'd' && step.queens.includes('a1'));
  assert.ok(deadEnd);
  assert.ok([1, 2, 3, 4, 5].every((rank) => isAttacked(`d${rank}`, deadEnd.queens)), 'The failed branch must actually block all of d');
  assert.ok(queens.some((step, i) => i > 0 && step.queens.length < queens[i - 1].queens.length), 'Show backtracking, not just a solution');
  assert.deepEqual([...queens.at(-1).queens].sort(), ['a5', 'b3', 'c1', 'd4', 'e2']);

  const minimax = minimaxSteps(lang);
  const final = minimax.at(-1).values;
  assert.equal(final.left, Math.min(final.l1, final.l2));
  assert.equal(final.middle, Math.min(final.m1, final.m2));
  assert.equal(final.root, Math.max(final.left, final.middle, final.right));
  assert.equal(final.root, 2.32);
  assert.equal(minimax[0].values.root, undefined, 'Do not reveal the answer before evaluation');
  assert.equal(minimax[2].values.middle, undefined, 'Compute each branch only at its narrated step');

  const source = await readFile(new URL(`../src/content/${lang}/knight-tour.md`, import.meta.url), 'utf8');
  const arrows = source.match(/data-arrows="(a8-b6[^"]+)"/)[1];
  const path = knightPath(arrows);
  assert.equal(path.length, 64);
  assert.equal(new Set(path).size, 64);
  assert.equal(path[0], 'a8');
  assert.equal(path.at(-1), 'h6');
  const knight = knightSteps(arrows, lang);
  knight.forEach((step, index) => {
    assert.equal(step.visited.length, index + 1);
    assert.equal(step.knight, path[index]);
  });
  assert.throws(() => knightPath('a8-a7'), /Illegal/);
  assert.throws(() => knightPath('a8-b6,b6-a8'), /Incomplete/);
  assert.throws(() => knightPath('a8-b6,c5-a4'), /Disconnected/);

  for (const [slug, kind] of [['min-max', 'minimax'], ['n-queens', 'queens'], ['knight-tour', 'knight']]) {
    const html = await readFile(new URL(`../dist/${lang}/${slug}/index.html`, import.meta.url), 'utf8');
    assert.ok(html.includes(`data-lesson="${kind}"`), `${lang}/${slug}: missing player mount`);
    assert.match(html, /<img[^>]+src="\/assets\//, 'Keep static images available without JS');
  }
}
console.log('Lesson QA passed: legal knight tour, valid backtracking, minimax propagation, six localized mounts');
