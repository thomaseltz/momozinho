
const heart = document.querySelector(".heart");
const ending = document.querySelector(".ending");
const sprinkles = document.querySelector(".sprinkles");

let busy = false;

function update() {
  const maxScroll = Math.max(
    1,
    document.documentElement.scrollHeight - window.innerHeight
  );

  const progress = Math.min(
    1,
    Math.max(0, window.scrollY / maxScroll)
  );

  // Suaviza o crescimento do coração.
  const eased = progress * progress * (3 - 2 * progress);

  const scale = 0.12 + eased * 1.05;

  heart.style.transform = `scale(${scale})`;
  heart.style.opacity = String(0.08 + eased * 0.92);

  // Revela a mensagem perto do final.
  ending.classList.toggle("visible", progress > 0.77);

  // Faz os pequenos corações aparecerem.
  sprinkles.style.opacity =
    progress > 0.88
      ? String(Math.min(1, (progress - 0.88) * 8.3))
      : "0";

  busy = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (!busy) {
      requestAnimationFrame(update);
      busy = true;
    }
  },
  { passive: true }
);

window.addEventListener("resize", update);

update();
