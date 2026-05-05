try {
  const typography = require('@tailwindcss/typography');
  console.log('Typography found!');
} catch (e) {
  console.error('Typography NOT found:', e.message);
}
