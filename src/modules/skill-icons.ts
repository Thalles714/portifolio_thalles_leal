import cloudflareIcon from "simple-icons/icons/cloudflare.svg";
import cssIcon from "simple-icons/icons/css.svg";
import gitIcon from "simple-icons/icons/git.svg";
import githubIcon from "simple-icons/icons/github.svg";
import githubActionsIcon from "simple-icons/icons/githubactions.svg";
import html5Icon from "simple-icons/icons/html5.svg";
import javascriptIcon from "simple-icons/icons/javascript.svg";
import nextIcon from "simple-icons/icons/nextdotjs.svg";
import nodeIcon from "simple-icons/icons/nodedotjs.svg";
import postgresqlIcon from "simple-icons/icons/postgresql.svg";
import reactIcon from "simple-icons/icons/react.svg";
import supabaseIcon from "simple-icons/icons/supabase.svg";
import tailwindIcon from "simple-icons/icons/tailwindcss.svg";
import typescriptIcon from "simple-icons/icons/typescript.svg";
import vercelIcon from "simple-icons/icons/vercel.svg";
import viteIcon from "simple-icons/icons/vite.svg";
import vitestIcon from "simple-icons/icons/vitest.svg";
import playwrightIcon from "../../node_modules/playwright-core/lib/vite/dashboard/playwright-logo.svg";

const iconUrls = {
  cloudflare: cloudflareIcon,
  css: cssIcon,
  git: gitIcon,
  github: githubIcon,
  githubactions: githubActionsIcon,
  html5: html5Icon,
  javascript: javascriptIcon,
  nextdotjs: nextIcon,
  nodedotjs: nodeIcon,
  playwright: playwrightIcon,
  postgresql: postgresqlIcon,
  react: reactIcon,
  supabase: supabaseIcon,
  tailwindcss: tailwindIcon,
  typescript: typescriptIcon,
  vercel: vercelIcon,
  vite: viteIcon,
  vitest: vitestIcon
} as const;

type SkillIconName = keyof typeof iconUrls;

function isSkillIconName(value: string): value is SkillIconName {
  return value in iconUrls;
}

export function mountSkillIcons(): void {
  document.querySelectorAll<HTMLElement>("[data-skill-icon]").forEach((icon) => {
    const key = icon.dataset.skillIcon;
    if (!key || !isSkillIconName(key)) return;

    const iconUrl = iconUrls[key];

    if (key === "playwright") {
      const image = document.createElement("img");
      image.src = iconUrl;
      image.alt = "";
      image.decoding = "async";
      icon.appendChild(image);
      icon.classList.add("skill-tool__icon--multicolor");
      return;
    }

    icon.style.setProperty("--skill-icon", `url("${iconUrl}")`);
    icon.classList.add("skill-tool__icon--ready");
  });
}
