/**
 * Captures section-level screenshots of the Inherit Co. site in all three themes
 * (dark / light / blueprint) with Japanese UI, then assembles a Japanese PDF
 * presentation with feature commentary.
 *
 * Output:
 *   presentation/screenshots/<theme>-<NN-section>.png
 *   presentation/index.html
 *   presentation/inherit-co-japanese-presentation.pdf
 */
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "presentation");
const SHOT_DIR = path.join(OUT_DIR, "screenshots");
fs.mkdirSync(SHOT_DIR, { recursive: true });

const BASE_URL = "http://127.0.0.1:4173/";

const THEMES = [
  { id: "dark",      ja: "ダーク",     en: "Dark"      },
  { id: "light",     ja: "ライト",     en: "Light"     },
  { id: "blueprint", ja: "ブループリント", en: "Blueprint" },
];

/** [filename-slug, selector, ja-title, ja-features[]] */
const SECTIONS = [
  ["01-header", "header", "ヘッダー / ナビゲーション", [
    "固定ナビゲーション・スクロールに追従",
    "ロゴはスクロール速度に応じて傾く（GSAPベロシティ）",
    "上部に細いオレンジのスクロール進捗バー（z-60）",
    "テーマ切替 + 言語切替（EN/JA）",
  ]],
  ["02-hero", "#top", "ヒーロー（トップビュー）", [
    "Pexels提供の4Kドローン空撮を背景動画として再生",
    "見出し・段落・CTAがGSAPタイムラインで段階的に登場",
    "左右にHUD風データ表示（座標・ステータス）",
    "中央下部にスクロール促進インジケーター",
  ]],
  ["03-trust", "main > section:nth-child(2)", "信頼ストリップ / パートナーロゴ", [
    "国土交通省・JAXA・三井物産など主要パートナーの横スクロールマーキー",
    "シームレスループのCSSアニメーション",
    "ブランド層の信頼性を一目で伝達",
  ]],
  ["04-mission", "#mission", "ミッション", [
    "NAPAドローンアカデミー広島で撮影したチーム写真",
    "写真にHUDオーバーレイ・ステータス表示",
    "見出し＋日本語ルビ風アノテーション",
    "「広島で設計、世界へ」というブランドメッセージ",
  ]],
  ["05-solutions", "#solutions", "ソリューション（3本柱）", [
    "物流／インフラ点検／空撮・測量の3軸を提示",
    "カードはホバーで上昇＋オレンジアクセント反応",
    "番号付き・等幅フォントで計器パネル風",
    "ScrollTriggerでステアガーフェードイン",
  ]],
  ["06-process", "#process", "プロセス（4段階）", [
    "ブリーフ→設計→運用→検収の4ステップ可視化",
    "縦線（スパイン）がスクロールに合わせて伸びる",
    "各ノードに番号・英日タイトル・説明",
    "工程の透明性をブランド化",
  ]],
  ["07-technology", "#technology", "テクノロジー", [
    "IH-04 隼プラットフォームの構成可視化",
    "プログレスバーが視野内に入ると0→指定%まで描画",
    "数値カウントアップ（data-count属性駆動）",
    "SVGで描いたスキャン線・グラデーション",
  ]],
  ["08-usecases", "#field", "活用事例（フィールドケース）", [
    "実機運用シーンの写真にスキャンライン・クリップ反転で登場",
    "瀬戸内海沿岸侵食マッピング等のリアル事例",
    "撮影地ラベル・ミッションコードを併記",
    "プレスリリース風のメタ情報",
  ]],
  ["09-stats", "#fleet", "スタッツ / 機体運用実績", [
    "総飛行時間・配送回数・点検距離などの大数字",
    "data-count属性でスクロール時にカウントアップ",
    "千区切り・小数点・接尾辞のフォーマット制御",
    "計器パネル風の罫線レイアウト",
  ]],
  ["10-testimonial", "#voice", "お客様の声", [
    "パートナー企業からの推薦文を大型引用で提示",
    "発話者の肩書・組織を等幅フォントで添付",
    "斜体オレンジで重要語をハイライト",
  ]],
  ["11-faq", "#faq", "よくある質問", [
    "アコーディオン形式の展開UI",
    "開閉時に角括弧アイコンが回転",
    "運航範囲・認可・価格などの定型疑問に対応",
  ]],
  ["12-contact", "#contact", "お問い合わせフォーム", [
    "氏名・メール・組織・所在地・関心領域（柱選択）・ブリーフを入力",
    "クライアントサイドでのバリデーション（必須・形式・最小文字数）",
    "選択した柱と参照番号を含む成功パネルを表示",
    "セキュア送信ラベル＋48時間以内返信を明示",
  ]],
  ["13-footer", "footer", "フッター / SNS / ブランド", [
    "巨大なINHERIT / CO.ワードマーク",
    "テーマ切替＋言語切替を再配置",
    "NEW: SNSセクション — NAPAドローンスクール本部・広島校",
    "本部: 公式ホームページ＋公式LINE",
    "広島校: Instagram＋ホームページ",
    "コピーライト・法務リンク",
  ]],
];

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function primeAnimations(page) {
  await page.evaluate(async () => {
    const h = document.documentElement.scrollHeight;
    for (let y = 0; y < h; y += 250) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 35));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 400));
  });
}

async function hideOverlays(page) {
  // Hide fixed header + scroll progress bar so section captures aren't covered.
  await page.evaluate(() => {
    const style = document.createElement("style");
    style.id = "__shot-hide__";
    style.textContent = `
      header { display: none !important; }
      [data-anim="scroll-progress"] { display: none !important; }
    `;
    document.head.appendChild(style);
  });
}

async function showOverlays(page) {
  await page.evaluate(() => {
    document.getElementById("__shot-hide__")?.remove();
  });
}

async function captureTheme(browser, theme) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    locale: "ja-JP",
  });
  const page = await context.newPage();
  await page.addInitScript(
    ({ themeId }) => {
      try {
        localStorage.setItem("inherit.theme", themeId);
        localStorage.setItem("inherit.lang", "ja");
      } catch {}
    },
    { themeId: theme.id }
  );
  await page.goto(BASE_URL, { waitUntil: "networkidle", timeout: 60_000 });
  await page.waitForLoadState("domcontentloaded");
  await wait(1200);
  await primeAnimations(page);
  await wait(400);

  const results = [];

  for (const [slug, selector, jaTitle] of SECTIONS) {
    const isHeader = selector === "header";

    if (!isHeader) await hideOverlays(page);

    const el = await page.$(selector);
    if (!el) {
      console.warn(`✗ Missing ${selector} for theme=${theme.id}`);
      if (!isHeader) await showOverlays(page);
      continue;
    }
    await el.scrollIntoViewIfNeeded();
    await wait(700);

    const file = `${theme.id}-${slug}.png`;
    const dest = path.join(SHOT_DIR, file);
    try {
      await el.screenshot({ path: dest });
      console.log(`✓ ${file}`);
      results.push({ slug, file, jaTitle });
    } catch (e) {
      console.warn(`✗ Failed ${file}: ${e.message}`);
    }

    if (!isHeader) await showOverlays(page);
  }

  await context.close();
  return results;
}

function buildHtml() {
  const css = `
    @page { size: A4 landscape; margin: 0; }
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    body {
      font-family: "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Noto Sans JP", "Yu Gothic", system-ui, sans-serif;
      color: #0a0a0a;
      background: #fff;
    }
    .page {
      width: 297mm;
      height: 210mm;
      page-break-after: always;
      position: relative;
      overflow: hidden;
    }
    .page:last-child { page-break-after: auto; }

    /* ---------- COVER ---------- */
    .cover {
      background: #0a0a0a;
      color: #fff;
      display: grid;
      grid-template-rows: 1fr auto;
      padding: 22mm;
    }
    .cover .mark {
      font-family: ui-monospace, SFMono-Regular, monospace;
      font-size: 9pt;
      letter-spacing: 0.22em;
      color: #fb923c;
      text-transform: uppercase;
    }
    .cover h1 {
      font-size: 56pt;
      line-height: 1.05;
      letter-spacing: -0.02em;
      font-weight: 300;
      margin: 6mm 0 0;
    }
    .cover h1 em {
      color: #fb923c;
      font-style: italic;
      font-weight: 300;
    }
    .cover .sub {
      margin-top: 4mm;
      font-size: 12pt;
      color: rgba(255,255,255,0.65);
    }
    .cover .meta {
      display: flex;
      gap: 12mm;
      font-family: ui-monospace, SFMono-Regular, monospace;
      font-size: 8.5pt;
      letter-spacing: 0.22em;
      color: rgba(255,255,255,0.5);
      text-transform: uppercase;
      border-top: 1px solid rgba(255,255,255,0.15);
      padding-top: 6mm;
    }

    /* ---------- THEME DIVIDER ---------- */
    .divider {
      display: grid;
      place-content: center;
      gap: 6mm;
      padding: 22mm;
    }
    .divider.dark { background: #0a0a0a; color: #fff; }
    .divider.light { background: #f8f7f4; color: #0a0a0a; }
    .divider.blueprint { background: #0b1d33; color: #d6e6ff; }
    .divider .badge {
      font-family: ui-monospace, monospace;
      font-size: 9pt;
      letter-spacing: 0.22em;
      color: #fb923c;
      text-transform: uppercase;
    }
    .divider h2 {
      font-size: 64pt;
      font-weight: 300;
      line-height: 1;
      letter-spacing: -0.02em;
      margin: 0;
    }
    .divider .desc {
      font-size: 12pt;
      max-width: 180mm;
      opacity: 0.7;
    }

    /* ---------- SECTION PAGE ---------- */
    .section-page {
      display: grid;
      grid-template-columns: 1fr 1.35fr;
      gap: 0;
    }
    .section-page .info {
      padding: 18mm 14mm;
      background: #f5f4f0;
      border-right: 1px solid rgba(10,10,10,0.08);
      display: flex;
      flex-direction: column;
      gap: 5mm;
    }
    .section-page .info .tag {
      font-family: ui-monospace, monospace;
      font-size: 8.5pt;
      letter-spacing: 0.22em;
      color: #fb923c;
      text-transform: uppercase;
    }
    .section-page .info .theme-label {
      font-family: ui-monospace, monospace;
      font-size: 8pt;
      letter-spacing: 0.22em;
      color: rgba(10,10,10,0.45);
      text-transform: uppercase;
    }
    .section-page .info h3 {
      font-size: 26pt;
      font-weight: 300;
      letter-spacing: -0.01em;
      line-height: 1.15;
      margin: 0;
    }
    .section-page .info ul {
      margin: 4mm 0 0;
      padding: 0;
      list-style: none;
      font-size: 10.5pt;
      line-height: 1.55;
    }
    .section-page .info li {
      padding: 2.5mm 0 2.5mm 7mm;
      border-bottom: 1px dashed rgba(10,10,10,0.12);
      position: relative;
    }
    .section-page .info li::before {
      content: "→";
      position: absolute;
      left: 0;
      top: 2.5mm;
      color: #fb923c;
      font-family: ui-monospace, monospace;
    }
    .section-page .image {
      background: #111;
      display: grid;
      place-items: center;
      padding: 6mm;
      overflow: hidden;
    }
    .section-page.theme-light .image { background: #e8e6e0; }
    .section-page.theme-blueprint .image { background: #06182f; }
    .section-page .image img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      box-shadow: 0 6px 18px rgba(0,0,0,0.25);
    }
    .section-page .footer-strip {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 4mm 14mm;
      font-family: ui-monospace, monospace;
      font-size: 7.5pt;
      letter-spacing: 0.22em;
      color: rgba(10,10,10,0.4);
      display: flex;
      justify-content: space-between;
      text-transform: uppercase;
      background: #f5f4f0;
      border-top: 1px solid rgba(10,10,10,0.08);
    }

    /* ---------- TOC ---------- */
    .toc {
      padding: 22mm;
      background: #fff;
    }
    .toc h2 {
      font-size: 32pt;
      font-weight: 300;
      letter-spacing: -0.02em;
      margin: 0 0 8mm;
    }
    .toc h2 em { color: #fb923c; font-style: italic; }
    .toc-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 4mm;
      font-size: 10pt;
    }
    .toc-grid div {
      padding: 3mm 4mm;
      border: 1px solid rgba(10,10,10,0.1);
      background: #fafaf8;
    }
    .toc-grid .num {
      font-family: ui-monospace, monospace;
      font-size: 8pt;
      color: #fb923c;
      letter-spacing: 0.22em;
    }
  `;

  const themes = THEMES;

  let html = `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<title>INHERIT CO. — テーマプレゼンテーション</title>
<style>${css}</style>
</head>
<body>
`;

  // Cover
  html += `
  <section class="page cover">
    <div>
      <div class="mark">INHERIT / CO.  ·  PRESENTATION  ·  JA</div>
      <h1>3つのテーマで見る<br>商用ドローン<em>ランディング</em></h1>
      <div class="sub">株式会社 Inherit Co. — 広島で設計された商用ドローンシステム。<br>本資料はダーク／ライト／ブループリントの3テーマで全セクションを日本語で解説します。</div>
    </div>
    <div class="meta">
      <span>BUILD ${new Date().toISOString().slice(0,10)}</span>
      <span>VARIANTS · 03</span>
      <span>SECTIONS · ${SECTIONS.length}</span>
      <span>LANG · JA</span>
    </div>
  </section>`;

  // TOC
  html += `
  <section class="page toc">
    <h2>目次 / <em>CONTENTS</em></h2>
    <div class="toc-grid">`;
  SECTIONS.forEach(([slug, , jaTitle], i) => {
    const num = String(i + 1).padStart(2, "0");
    html += `<div><div class="num">${num}</div>${jaTitle}</div>`;
  });
  html += `</div></section>`;

  // Per-theme blocks
  for (const theme of themes) {
    html += `
    <section class="page divider ${theme.id}">
      <div class="badge">VARIANT · ${theme.en.toUpperCase()}</div>
      <h2>${theme.ja}テーマ</h2>
      <div class="desc">「${theme.ja}」モードのスクリーンショットを各セクション順に提示します。配色は意味的カラートークン（bg / fg / accent）で切り替わり、ブランドオレンジのみは固定です。</div>
    </section>`;

    for (let i = 0; i < SECTIONS.length; i++) {
      const [slug, , jaTitle, features] = SECTIONS[i];
      const num = String(i + 1).padStart(2, "0");
      const file = `screenshots/${theme.id}-${slug}.png`;
      html += `
      <section class="page section-page theme-${theme.id}">
        <div class="info">
          <div class="tag">SECTION · ${num} / ${String(SECTIONS.length).padStart(2,"0")}</div>
          <div class="theme-label">VARIANT · ${theme.en.toUpperCase()}</div>
          <h3>${jaTitle}</h3>
          <ul>
            ${features.map((f) => `<li>${f}</li>`).join("")}
          </ul>
        </div>
        <div class="image">
          <img src="${file}" alt="${jaTitle} (${theme.en})">
        </div>
        <div class="footer-strip">
          <span>INHERIT / CO. · ${theme.en.toUpperCase()}</span>
          <span>${jaTitle}</span>
        </div>
      </section>`;
    }
  }

  // Closing
  html += `
  <section class="page cover">
    <div>
      <div class="mark">FIN  ·  THANK YOU  ·  ありがとうございました</div>
      <h1>株式会社<br><em>Inherit Co.</em></h1>
      <div class="sub">広島で設計、世界へ。<br>本資料は自動生成され、各テーマのスクリーンショットを反映しています。</div>
    </div>
    <div class="meta">
      <span>HQ · HIROSHIMA</span>
      <span>MLIT BVLOS L4</span>
      <span>2023→</span>
    </div>
  </section>
</body></html>`;

  return html;
}

async function renderPdf(browser, htmlPath, pdfPath) {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  const fileUrl = "file://" + htmlPath;
  await page.goto(fileUrl, { waitUntil: "networkidle" });
  await page.emulateMedia({ media: "print" });
  await page.pdf({
    path: pdfPath,
    format: "A4",
    landscape: true,
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
  await context.close();
}

(async () => {
  const browser = await chromium.launch();
  console.log("Capturing screenshots…");
  for (const theme of THEMES) {
    console.log(`\n— theme: ${theme.id}`);
    await captureTheme(browser, theme);
  }

  const html = buildHtml();
  const htmlPath = path.join(OUT_DIR, "index.html");
  fs.writeFileSync(htmlPath, html);
  console.log(`\nHTML → ${htmlPath}`);

  const pdfPath = path.join(OUT_DIR, "inherit-co-japanese-presentation.pdf");
  console.log("Rendering PDF…");
  await renderPdf(browser, htmlPath, pdfPath);
  console.log(`PDF  → ${pdfPath}`);

  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
