(async function () {
      const container = document.querySelector("#dotted-surface");
      if (!container) return;

      const scriptUrl = document.currentScript && document.currentScript.src
        ? document.currentScript.src
        : document.baseURI;

      const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      const SEPARATION = 150;
      const AMOUNT_X = 40;
      const AMOUNT_Y = 60;
      const POINT_COUNT = AMOUNT_X * AMOUNT_Y;

      let THREE;
      let renderer;
      let scene;
      let camera;
      let geometry;
      let material;
      let positions;
      let animationFrame = 0;
      let resizeObserver = null;
      let visibilityObserver = null;
      let phase = 0.8;
      let lastTime = 0;
      let isVisible = false;
      let isDisposed = false;

      function stop() {
        if (animationFrame) cancelAnimationFrame(animationFrame);
        animationFrame = 0;
        lastTime = 0;
      }

      function updateWave() {
        let vertex = 0;
        for (let ix = 0; ix < AMOUNT_X; ix += 1) {
          for (let iy = 0; iy < AMOUNT_Y; iy += 1) {
            positions[vertex + 1] =
              Math.sin((ix + phase) * 0.3) * 50 +
              Math.sin((iy + phase) * 0.5) * 50;
            vertex += 3;
          }
        }
        geometry.attributes.position.needsUpdate = true;
      }

      function draw() {
        updateWave();
        renderer.render(scene, camera);
      }

      function animate(time) {
        animationFrame = 0;
        if (isDisposed || !isVisible || document.hidden || motionQuery.matches) return;

        const delta = Math.min(32, lastTime ? time - lastTime : 16.67);
        lastTime = time;
        phase += delta * 0.0027;
        draw();
        animationFrame = requestAnimationFrame(animate);
      }

      function start() {
        if (isDisposed || animationFrame || !isVisible || document.hidden || motionQuery.matches) return;
        animationFrame = requestAnimationFrame(animate);
      }

      function resize() {
        if (!renderer || !camera) return;
        const bounds = container.getBoundingClientRect();
        const width = Math.max(1, Math.round(bounds.width));
        const height = Math.max(1, Math.round(bounds.height));
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
        renderer.setSize(width, height, false);
        draw();
      }

      function onVisibilityChange() {
        if (document.hidden) stop();
        else start();
      }

      function onMotionChange() {
        if (motionQuery.matches) {
          stop();
          phase = 0.8;
          draw();
        } else {
          start();
        }
      }

      function onPageHide(event) {
        if (event.persisted) stop();
        else dispose();
      }

      function onPageShow() {
        start();
      }

      function dispose() {
        if (isDisposed) return;
        isDisposed = true;
        stop();
        if (resizeObserver) resizeObserver.disconnect();
        if (visibilityObserver) visibilityObserver.disconnect();
        document.removeEventListener("visibilitychange", onVisibilityChange);
        window.removeEventListener("resize", resize);
        window.removeEventListener("pagehide", onPageHide);
        window.removeEventListener("pageshow", onPageShow);
        if (typeof motionQuery.removeEventListener === "function") {
          motionQuery.removeEventListener("change", onMotionChange);
        } else {
          motionQuery.removeListener(onMotionChange);
        }
        if (geometry) geometry.dispose();
        if (material) material.dispose();
        if (renderer) {
          const canvas = renderer.domElement;
          renderer.dispose();
          if (canvas && canvas.parentNode === container) container.removeChild(canvas);
        }
      }

      try {
        const threeUrl = window.location.protocol === "file:"
          ? "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.min.js"
          : new URL("./lib/three.module.js", scriptUrl).href;
        THREE = await import(threeUrl);

        scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0x050506, 1500, 8500);

        camera = new THREE.PerspectiveCamera(60, 1, 1, 10000);
        camera.position.set(0, 355, 1220);

        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "high-performance"
        });
        renderer.setClearColor(scene.fog.color, 0);
        renderer.domElement.setAttribute("aria-hidden", "true");
        container.appendChild(renderer.domElement);

        positions = new Float32Array(POINT_COUNT * 3);
        const colors = new Float32Array(POINT_COUNT * 3);
        let vertex = 0;

        for (let ix = 0; ix < AMOUNT_X; ix += 1) {
          for (let iy = 0; iy < AMOUNT_Y; iy += 1) {
            const depth = iy / (AMOUNT_Y - 1);
            positions[vertex] = ix * SEPARATION - (AMOUNT_X * SEPARATION) / 2;
            positions[vertex + 1] = 0;
            positions[vertex + 2] = iy * SEPARATION - (AMOUNT_Y * SEPARATION) / 2;
            colors[vertex] = 0.48 + depth * 0.24;
            colors[vertex + 1] = 0.55 + depth * 0.2;
            colors[vertex + 2] = 0.66 + depth * 0.22;
            vertex += 3;
          }
        }

        geometry = new THREE.BufferGeometry();
        const positionAttribute = new THREE.BufferAttribute(positions, 3);
        positionAttribute.setUsage(THREE.DynamicDrawUsage);
        geometry.setAttribute("position", positionAttribute);
        geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

        material = new THREE.PointsMaterial({
          size: 8,
          vertexColors: true,
          transparent: true,
          opacity: 0.78,
          sizeAttenuation: true,
          depthWrite: false
        });

        const pointField = new THREE.Points(geometry, material);
        pointField.rotation.y = -0.08;
        scene.add(pointField);

        resize();
        container.classList.add("is-ready");

        if ("ResizeObserver" in window) {
          resizeObserver = new ResizeObserver(resize);
          resizeObserver.observe(container);
        } else {
          window.addEventListener("resize", resize, { passive: true });
        }

        if ("IntersectionObserver" in window) {
          visibilityObserver = new IntersectionObserver(function (entries) {
            isVisible = Boolean(entries[0] && entries[0].isIntersecting);
            if (isVisible) start();
            else stop();
          }, { rootMargin: "20% 0px", threshold: 0.01 });
          visibilityObserver.observe(container);
        } else {
          isVisible = true;
          start();
        }

        document.addEventListener("visibilitychange", onVisibilityChange);
        if (typeof motionQuery.addEventListener === "function") {
          motionQuery.addEventListener("change", onMotionChange);
        } else {
          motionQuery.addListener(onMotionChange);
        }
        window.addEventListener("pagehide", onPageHide);
        window.addEventListener("pageshow", onPageShow);
      } catch (error) {
        container.classList.add("is-fallback");
        dispose();
      }
    })();
