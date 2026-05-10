console.log("JIRA-CHI Main JS Loaded");
document.addEventListener('DOMContentLoaded', () => {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const drawerOverlay = document.getElementById('drawer-overlay');
  const drawerMenu = document.getElementById('drawer-menu');
  const drawerClose = document.getElementById('drawer-close');

  const openDrawer = () => {
    drawerOverlay.classList.add('active');
    drawerMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawerOverlay.classList.remove('active');
    drawerMenu.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', openDrawer);
  }

  if (drawerClose) {
    drawerClose.addEventListener('click', closeDrawer);
  }

  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', (e) => {
      if (e.target === drawerOverlay) closeDrawer();
    });
  }

  // Smooth appearance for elements
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

  // ── Hero Video Crossfade Loop ──────────────────────────────────────
  const FADE_DURATION = 2.8; // フェード時間（秒）

  const vidA = document.getElementById('hero-video-a');
  const vidB = document.getElementById('hero-video-b');

  if (vidA && vidB) {
    let isFading  = false;
    let currentVid = vidA; // 現在再生中の動画を追跡

    const crossfade = (from, to) => {
      // アクティブでない動画からのトリガーは無視
      if (isFading || from !== currentVid) return;
      isFading   = true;
      currentVid = to; // 即座に切り替えて二重発火を防止

      to.currentTime = 0;
      to.play().catch(() => {});
      to.classList.add('active');
      from.classList.remove('active');

      setTimeout(() => {
        from.pause();
        from.currentTime = 0;
        isFading = false;
      }, FADE_DURATION * 1000 + 300);
    };

    // 動画終端付近でクロスフェード開始
    vidA.addEventListener('timeupdate', () => {
      if (vidA.duration && vidA.currentTime >= vidA.duration - FADE_DURATION) crossfade(vidA, vidB);
    });
    vidB.addEventListener('timeupdate', () => {
      if (vidB.duration && vidB.currentTime >= vidB.duration - FADE_DURATION) crossfade(vidB, vidA);
    });

    // フォールバック：万が一 timeupdate が間に合わなかった場合
    vidA.addEventListener('ended', () => { isFading = false; crossfade(vidA, vidB); });
    vidB.addEventListener('ended', () => { isFading = false; crossfade(vidB, vidA); });

    vidA.play().catch(() => {});
  }
});
