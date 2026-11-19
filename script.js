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

// キャッチコピーの表示
const catchEl = document.querySelector('.catch');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (catchEl) {
  if (reduceMotion) {
    // 「動きを減らす」設定：文字は分けず、全体をふわっと表示するだけ
    catchEl.classList.add('catch-soft');
  } else {
    // 通常：1文字ずつ、浮き上がって表示
    const text = catchEl.textContent.trim();
    catchEl.textContent = '';

    const sr = document.createElement('span');
    sr.className = 'sr-only';
    sr.textContent = text;
    catchEl.appendChild(sr);

    [...text].forEach((ch, i) => {
      const span = document.createElement('span');
      span.className = 'catch-char';
      span.setAttribute('aria-hidden', 'true');
      span.textContent = ch;
      span.style.animationDelay = (0.3 + i * 0.07) + 's';
      catchEl.appendChild(span);
    });
  }
}