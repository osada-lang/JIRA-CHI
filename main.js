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

  // ── Hero Video Crossfade Loop (Final Robust Version) ──────────────────
  const FADE_DURATION = 2.8; // フェード時間（秒）
  const vidA = document.getElementById('hero-video-a');
  const vidB = document.getElementById('hero-video-b');

  if (vidA && vidB) {
    let isFading = false;
    let currentVid = vidA;
    let nextVid = vidB;

    const crossfade = () => {
      if (isFading) return;
      isFading = true;

      const from = currentVid;
      const to = nextVid;

      console.log(`Starting crossfade from ${from.id} to ${to.id}`);

      // 準備
      to.currentTime = 0;
      to.play().then(() => {
        to.classList.add('active');
        from.classList.remove('active');

        // 切り替え完了後のクリーンアップ
        setTimeout(() => {
          from.pause();
          from.currentTime = 0;
          currentVid = to;
          nextVid = from;
          isFading = false;
          console.log(`Crossfade complete. Current: ${currentVid.id}`);
        }, FADE_DURATION * 1000);
      }).catch(err => {
        console.error("Video play failed during crossfade:", err);
        isFading = false;
        // 失敗した場合は単純に即座に切り替えを試みる
        to.classList.add('active');
        from.classList.remove('active');
        currentVid = to;
        nextVid = from;
      });
    };

    // 精密な時間監視ループ
    const update = () => {
      if (!isFading && currentVid.duration > 0) {
        // 終端の FADE_DURATION 秒前になったら切り替え開始
        if (currentVid.currentTime >= (currentVid.duration - FADE_DURATION)) {
          crossfade();
        }
      }
      requestAnimationFrame(update);
    };

    // 万が一の停止を検知して再開させる見張り役
    const safetyCheck = setInterval(() => {
      if (!isFading && currentVid.paused) {
        console.log("Safety check: video was paused, resuming...");
        currentVid.play().catch(() => {});
      }
    }, 2000);

    // 初期化
    const init = () => {
      vidA.play().then(() => {
        console.log("Initial video started");
        requestAnimationFrame(update);
      }).catch(e => {
        console.log("Initial play blocked. Waiting for interaction.");
        const startOnInteract = () => {
          vidA.play().then(() => {
            requestAnimationFrame(update);
            document.removeEventListener('click', startOnInteract);
          });
        };
        document.addEventListener('click', startOnInteract);
      });
    };

    // メタデータ読み込み完了を待って開始
    if (vidA.readyState >= 1) {
      init();
    } else {
      vidA.addEventListener('loadedmetadata', init);
    }
  }
});
