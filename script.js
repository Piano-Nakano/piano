const targets = document.querySelectorAll('.reveal');

if (!('IntersectionObserver' in window)) {
  // 古いブラウザでは、演出なしで、全部表示する
  targets.forEach(el => el.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' });

  targets.forEach(el => observer.observe(el));
}

// キャッチコピーを、1文字ずつ表示する
const catchEl = document.querySelector('.catch');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (catchEl && !reduceMotion) {
  const text = catchEl.textContent.trim();
  catchEl.textContent = '';

  // 読み上げ用の、元の文章（見た目には出さない）
  const sr = document.createElement('span');
  sr.className = 'sr-only';
  sr.textContent = text;
  catchEl.appendChild(sr);

  // 1文字ずつ、span に分けて、少しずつ遅らせて表示
  [...text].forEach((ch, i) => {
    const span = document.createElement('span');
    span.className = 'catch-char';
    span.setAttribute('aria-hidden', 'true');
    span.textContent = ch;
    span.style.animationDelay = (0.3 + i * 0.07) + 's';
    catchEl.appendChild(span);
  });
}