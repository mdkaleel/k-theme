# K-Theme for webtrees 2.x

Modern, upgrade-safe theme with light/dark palettes, oversized iconography, and polished layout tweaks for core webtrees screens.

## Features
- **Light & Dark palettes** (`resources/css/k-theme.light.css`, `k-theme.dark.css`) driven by CSS variables; toggled via the built-in palette selector or the header toggle.
- **Icon-forward navigation** (`k-theme.icons.css` + `resources/js/k-theme.js`) injects Font Awesome 6/7 solid icons for top-level menu items and block headers; per-menu glyphs sized to 30px for better legibility.
- **Refined layout & components** (`k-theme.base.css`): header/search bar, pill navigation, cards, buttons, forms, dropdowns, and block titles tuned to the theme surfaces and borders.
- **DataTables theming**: table headers, stripes, and borders now match theme surfaces in both palettes.
- **Login experience**: dedicated styling in `k-theme.login.css`.
- **Upgrade-safe**: lives entirely in `modules_v4/k-theme` with no core overrides.

## Installation
1. Copy the `k-theme` folder into `webtrees/modules_v4/` on your server.
2. In webtrees Control Panel → **Modules → Themes**, enable **K-Theme**.
3. Set it as the default theme for your tree (or per tree as desired).
4. Choose **Light** or **Dark** palette from the module wrench or the theme selector.

## Customization tips
- **Nav icons**: adjust glyphs/sizes in `resources/css/k-theme.icons.css`; JS mapping for labels → icons lives in `resources/js/k-theme.js`.
- **Block icons**: automatic injection is in `k-theme.js`; fallback CSS icons are defined in `k-theme.base.css`.
- **Palettes**: tweak color tokens in the light/dark CSS files; base styles pull everything from the `--k-*` variables.

## Supported versions
- webtrees 2.x

## Development
No build step is required. CSS/JS are plain assets loaded directly by the module. If you edit assets, clear your browser cache to see changes.
