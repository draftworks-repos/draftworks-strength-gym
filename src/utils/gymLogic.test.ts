import test from 'node:test';
import assert from 'node:assert/strict';
import {
  parseRoute,
  filterPrograms,
  validateEnquiryForm,
  clampSliderPosition,
  getNextCarouselIndex,
  formatInr,
  getPageMetadata,
} from './gymLogic';
import { PROGRAMS } from '../data/gymData';

test('parseRoute resolves all main pages and program detail slugs', () => {
  assert.deepEqual(parseRoute('/'), { page: 'home' });
  assert.deepEqual(parseRoute('/about'), { page: 'about' });
  assert.deepEqual(parseRoute('/programs/'), { page: 'programs' });
  assert.deepEqual(parseRoute('/programs/foundational-strength'), {
    page: 'program-detail',
    slug: 'foundational-strength',
  });
  assert.deepEqual(parseRoute('/branches'), { page: 'branches' });
  assert.deepEqual(parseRoute('/gallery'), { page: 'gallery' });
  assert.deepEqual(parseRoute('/transformations'), { page: 'transformations' });
  assert.deepEqual(parseRoute('/contact'), { page: 'contact' });
});

test('filterPrograms filters by category, intensity, and search query', () => {
  const strengthOnly = filterPrograms(PROGRAMS, '', 'Strength', 'All');
  assert.equal(strengthOnly.length, 3);
  assert.ok(strengthOnly.every((p) => p.category === 'Strength'));

  const searchSled = filterPrograms(PROGRAMS, 'prowler', 'All', 'All');
  assert.equal(searchSled.length, 1);
  assert.equal(searchSled[0].slug, 'metabolic-engine');

  const combined = filterPrograms(PROGRAMS, 'barbell', 'Strength', 'Foundational');
  assert.equal(combined.length, 1);
  assert.equal(combined[0].slug, 'foundational-strength');
});

test('validateEnquiryForm enforces required fields and Indian phone format', () => {
  const emptyResult = validateEnquiryForm({
    name: '',
    phone: '',
    program: '',
    branch: '',
  });
  assert.equal(emptyResult.valid, false);
  assert.ok(emptyResult.errors.name);
  assert.ok(emptyResult.errors.phone);
  assert.ok(emptyResult.errors.program);
  assert.ok(emptyResult.errors.branch);

  const badPhoneResult = validateEnquiryForm({
    name: 'Aarav Sharma',
    phone: '12345',
    program: 'Foundational Barbell & Strength',
    branch: 'DraftWorks Indiranagar',
  });
  assert.equal(badPhoneResult.valid, false);
  assert.ok(badPhoneResult.errors.phone);

  const validResult = validateEnquiryForm({
    name: 'Aarav Sharma',
    phone: '+91 98450-12345',
    program: 'Foundational Barbell & Strength',
    branch: 'DraftWorks Indiranagar',
  });
  assert.equal(validResult.valid, true);
  assert.equal(validResult.normalizedPhone, '+91 98450 12345');
});

test('clampSliderPosition constrains values between 5 and 95', () => {
  assert.equal(clampSliderPosition(0), 5);
  assert.equal(clampSliderPosition(-20), 5);
  assert.equal(clampSliderPosition(100), 95);
  assert.equal(clampSliderPosition(48.34), 48.3);
  assert.equal(clampSliderPosition(Number.NaN), 50);
});

test('getNextCarouselIndex bounds navigation within visible item range', () => {
  assert.equal(getNextCarouselIndex(0, 6, 3, 'prev'), 0);
  assert.equal(getNextCarouselIndex(0, 6, 3, 'next'), 1);
  assert.equal(getNextCarouselIndex(3, 6, 3, 'next'), 3);
  assert.equal(getNextCarouselIndex(2, 6, 3, 'prev'), 1);
});

test('formatInr formats Indian Rupees accurately', () => {
  assert.equal(formatInr(6500), '₹6,500');
  assert.equal(formatInr(16500), '₹16,500');
});

test('getPageMetadata returns specific title and description per page', () => {
  const progMeta = getPageMetadata(
    { page: 'program-detail', slug: 'metabolic-engine' },
    PROGRAMS
  );
  assert.ok(progMeta.title.includes('Metabolic Engine'));
});
