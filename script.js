/* ==========================================================================
   德训体彩店 · script.js
   纯原生 JavaScript，不依赖任何框架。
   若 GSAP 加载失败，页面仍可完整使用（渐进增强）。
   ========================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* -------------------------------------------------------------
     0. 页面加载遮罩
  ------------------------------------------------------------- */
  function hidePreloader() {
    var pre = document.getElementById("preloader");
    if (!pre) return;
    pre.classList.add("is-hidden");
    setTimeout(function () { pre.remove(); }, 700);
  }
  if (document.readyState === "complete") {
    hidePreloader();
  } else {
    window.addEventListener("load", hidePreloader);
    // 兜底：避免资源过慢导致遮罩长时间不消失
    setTimeout(hidePreloader, 2200);
  }

  /* -------------------------------------------------------------
     1. 顶部导航：滚动态 + 当前板块高亮
  ------------------------------------------------------------- */
  var siteNav = document.getElementById("siteNav");
  var navLinks = Array.prototype.slice.call(document.querySelectorAll("[data-nav]"));
  var sections = ["home", "environment", "features", "videos", "visit"]
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  function onScrollNav() {
    if (window.scrollY > 30) {
      siteNav.classList.add("is-scrolled");
    } else {
      siteNav.classList.remove("is-scrolled");
    }
  }
  onScrollNav();

  var navTicking = false;
  window.addEventListener("scroll", function () {
    if (!navTicking) {
      window.requestAnimationFrame(function () {
        onScrollNav();
        navTicking = false;
      });
      navTicking = true;
    }
  }, { passive: true });

  if ("IntersectionObserver" in window && sections.length) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        navLinks.forEach(function (link) {
          var match = link.getAttribute("href") === "#" + id;
          link.classList.toggle("active", match);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

    sections.forEach(function (sec) { navObserver.observe(sec); });
  }

  /* -------------------------------------------------------------
     2. 手机端汉堡菜单
  ------------------------------------------------------------- */
  var hamburgerBtn = document.getElementById("hamburgerBtn");
  var mobileMenu = document.getElementById("mobileMenu");

  function closeMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove("is-open");
    hamburgerBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
  function toggleMobileMenu() {
    var isOpen = mobileMenu.classList.toggle("is-open");
    hamburgerBtn.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  }
  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener("click", toggleMobileMenu);
    mobileMenu.querySelectorAll(".mobile-link").forEach(function (link) {
      link.addEventListener("click", closeMobileMenu);
    });
  }

  /* -------------------------------------------------------------
     3. Hero 入场动画 + 滚动视差
  ------------------------------------------------------------- */
  var heroReveals = document.querySelectorAll(".hero .reveal-up");
  heroReveals.forEach(function (el) {
    var delay = parseInt(el.getAttribute("data-delay") || "0", 10);
    el.style.setProperty("--d", delay);
  });
  // 稍作延迟触发，确保 CSS 过渡生效
  requestAnimationFrame(function () {
    setTimeout(function () {
      heroReveals.forEach(function (el) { el.classList.add("is-in"); });
    }, 120);
  });

  var heroSection = document.getElementById("hero");
  var heroImg = document.getElementById("heroImg");
  var heroContent = document.querySelector(".hero-content");

  if (!reduceMotion && heroSection && heroImg) {
    var heroTicking = false;
    window.addEventListener("scroll", function () {
      if (heroTicking) return;
      heroTicking = true;
      requestAnimationFrame(function () {
        var rect = heroSection.getBoundingClientRect();
        var progress = Math.min(Math.max(-rect.top / (rect.height || 1), 0), 1);
        heroImg.style.transform = "translateY(" + (progress * 40) + "px) scale(" + (1 + progress * 0.02) + ")";
        if (heroContent) {
          heroContent.style.transform = "translateY(" + (progress * -30) + "px)";
          heroContent.style.opacity = String(1 - progress * 0.9);
        }
        heroTicking = false;
      });
    }, { passive: true });
  }

  var scrollHint = document.getElementById("scrollHint");
  if (scrollHint) {
    scrollHint.addEventListener("click", function () {
      var target = document.getElementById("features");
      if (target) target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* -------------------------------------------------------------
     4. 滚动出现动画（卡片 / 图片 / 各板块）
  ------------------------------------------------------------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { revealObserver.observe(el); });

    var envPhotos = document.querySelectorAll(".env-photo");
    var envObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          envObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    envPhotos.forEach(function (el) { envObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
    document.querySelectorAll(".env-photo").forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* -------------------------------------------------------------
     5. 门店特色卡片：点击展开更多文字
  ------------------------------------------------------------- */
  document.querySelectorAll("[data-expand]").forEach(function (card) {
    var label = card.querySelector("[data-more-label]");
    card.addEventListener("click", function () {
      var isOpen = card.classList.toggle("is-open");
      if (label) label.textContent = isOpen ? "收起" : "了解更多";
    });
  });

  /* -------------------------------------------------------------
     6. 苹果官网式滚动故事区
  ------------------------------------------------------------- */
  (function initStory() {
    var story = document.getElementById("story");
    var storyBg = document.getElementById("storyBg");
    var stages = document.querySelectorAll(".story-stage");
    var dots = document.querySelectorAll(".story-dot");
    if (!story || !stages.length) return;

    var colors = ["#8F1720", "#FF8A34", "#173C75", "#E53935"];
    var current = -1;
    var ticking = false;

    function update() {
      var rect = story.getBoundingClientRect();
      var vh = window.innerHeight;
      var total = rect.height - vh;
      var raw = total > 0 ? (-rect.top) / total : 0;
      var progress = Math.min(Math.max(raw, 0), 0.9999);
      var stageCount = stages.length;
      var stageFloat = progress * stageCount;
      var idx = Math.min(Math.floor(stageFloat), stageCount - 1);
      idx = Math.max(idx, 0);

      if (idx !== current) {
        current = idx;
        stages.forEach(function (s, i) { s.classList.toggle("is-active", i === idx); });
        dots.forEach(function (d, i) { d.classList.toggle("is-active", i === idx); });
        if (storyBg) storyBg.style.background = colors[idx % colors.length];
      }
      ticking = false;
    }

    // 初始状态
    stages.forEach(function (s, i) { s.classList.toggle("is-active", i === 0); });
    dots.forEach(function (d, i) { d.classList.toggle("is-active", i === 0); });
    if (storyBg) storyBg.style.background = colors[0];

    window.addEventListener("scroll", function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }, { passive: true });
    window.addEventListener("resize", throttle(update, 200));
    update();
  })();

  /* -------------------------------------------------------------
     7. 门店环境灯箱
  ------------------------------------------------------------- */
  (function initLightbox() {
    var triggers = Array.prototype.slice.call(document.querySelectorAll("[data-lightbox]"));
    var lightbox = document.getElementById("lightbox");
    var lightboxImg = document.getElementById("lightboxImg");
    var lightboxCaption = document.getElementById("lightboxCaption");
    var closeBtn = document.getElementById("lightboxClose");
    var prevBtn = document.getElementById("lightboxPrev");
    var nextBtn = document.getElementById("lightboxNext");
    if (!triggers.length || !lightbox) return;

    var items = triggers.map(function (t) {
      var img = t.querySelector("img");
      var caption = t.querySelector(".env-caption");
      return { src: img ? img.src : "", alt: img ? img.alt : "", caption: caption ? caption.textContent : "" };
    });
    var index = 0;
    var lastFocused = null;

    function render() {
      var item = items[index];
      lightboxImg.src = item.src;
      lightboxImg.alt = item.alt;
      lightboxCaption.textContent = item.caption;
    }
    function open(i) {
      index = i;
      lastFocused = document.activeElement;
      render();
      lightbox.hidden = false;
      requestAnimationFrame(function () { lightbox.classList.add("is-open"); });
      document.body.style.overflow = "hidden";
      closeBtn.focus();
    }
    function close() {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
      setTimeout(function () { lightbox.hidden = true; }, 250);
      if (lastFocused) lastFocused.focus();
    }
    function next() { index = (index + 1) % items.length; render(); }
    function prev() { index = (index - 1 + items.length) % items.length; render(); }

    triggers.forEach(function (t, i) {
      t.addEventListener("click", function () { open(i); });
    });
    closeBtn.addEventListener("click", close);
    nextBtn.addEventListener("click", next);
    prevBtn.addEventListener("click", prev);
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) close();
    });
    document.addEventListener("keydown", function (e) {
      if (lightbox.hidden) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    });

    // 手机端左右滑动切换
    var touchStartX = null;
    lightbox.addEventListener("touchstart", function (e) {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });
    lightbox.addEventListener("touchend", function (e) {
      if (touchStartX === null) return;
      var dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); }
      touchStartX = null;
    }, { passive: true });
  })();

  /* -------------------------------------------------------------
     8. 视频播放遮罩
  ------------------------------------------------------------- */
  document.querySelectorAll("[data-video-wrap]").forEach(function (wrap) {
    var video = wrap.querySelector(".video-el");
    var cover = wrap.querySelector("[data-video-cover]");
    var errorEl = wrap.querySelector("[data-video-error]");
    if (!video || !cover) return;

    cover.addEventListener("click", function () {
      // 暂停其他视频
      document.querySelectorAll(".video-el").forEach(function (v) {
        if (v !== video) v.pause();
      });
      document.querySelectorAll(".video-cover").forEach(function (c) {
        if (c !== cover) c.classList.remove("is-hidden");
      });

      video.dataset.attemptedPlay = "1";
      var playPromise = video.play();
      if (playPromise && playPromise.then) {
        playPromise.then(function () {
          cover.classList.add("is-hidden");
        }).catch(function () {
          if (errorEl) errorEl.hidden = false;
        });
      } else {
        cover.classList.add("is-hidden");
      }
    });

    video.addEventListener("pause", function () {
      if (!video.ended && video.currentTime === 0) return;
      cover.classList.add("is-hidden");
    });
    video.addEventListener("ended", function () {
      cover.classList.remove("is-hidden");
    });
    video.addEventListener("error", function () {
      // Show the error message only after the user has tried to play the video —
      // some browsers fire error events during pre-load probing even when the file
      // will play fine once actually played.
      if (video.dataset.attemptedPlay === "1" && errorEl) {
        errorEl.hidden = false;
        cover.classList.add("is-hidden");
      }
    });
  });

  // 视频卡片淡入上移
  var videoCards = document.querySelectorAll(".video-card");
  if ("IntersectionObserver" in window) {
    var videoObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          videoObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    videoCards.forEach(function (el) { videoObserver.observe(el); });
  }

  /* -------------------------------------------------------------
     9. 到店信息：复制地址 + Toast
  ------------------------------------------------------------- */
  var toast = document.getElementById("toast");
  var toastTimer = null;
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("is-visible"); }, 2200);
  }

  var copyBtn = document.getElementById("copyBtn");
  var addressText = document.getElementById("visitAddress");
  if (copyBtn && addressText) {
    copyBtn.addEventListener("click", function () {
      var text = addressText.textContent.trim();
      var done = function () { showToast("地址已复制"); };
      var fail = function () { showToast("复制失败，请手动复制地址"); };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(function () {
          fallbackCopy(text, done, fail);
        });
      } else {
        fallbackCopy(text, done, fail);
      }
    });
  }
  function fallbackCopy(text, done, fail) {
    try {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      var ok = document.execCommand("copy");
      document.body.removeChild(ta);
      ok ? done() : fail();
    } catch (e) {
      fail();
    }
  }

  /* -------------------------------------------------------------
     10. 返回顶部
  ------------------------------------------------------------- */
  var toTopBtn = document.getElementById("toTopBtn");
  if (toTopBtn) {
    window.addEventListener("scroll", throttle(function () {
      var show = window.scrollY > window.innerHeight * 0.8;
      toTopBtn.hidden = !show;
      requestAnimationFrame(function () {
        toTopBtn.classList.toggle("is-visible", show);
      });
    }, 150), { passive: true });

    toTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* -------------------------------------------------------------
     11. 页脚年份
  ------------------------------------------------------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* -------------------------------------------------------------
     工具函数：节流
  ------------------------------------------------------------- */
  function throttle(fn, wait) {
    var lastTime = 0;
    var timer = null;
    return function () {
      var now = Date.now();
      var args = arguments;
      var ctx = this;
      if (now - lastTime >= wait) {
        lastTime = now;
        fn.apply(ctx, args);
      } else {
        clearTimeout(timer);
        timer = setTimeout(function () {
          lastTime = Date.now();
          fn.apply(ctx, args);
        }, wait - (now - lastTime));
      }
    };
  }

})();
