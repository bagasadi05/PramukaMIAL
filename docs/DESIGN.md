# Design System Document

## 1. Overview & Creative North Star

This design system is built to transform a Scout (Pramuka) learning portal into a high-end educational experience. Moving away from typical "classroom" aesthetics, this system adopts the **"Heritage Explorer"** Creative North Star. 

The **Heritage Explorer** aesthetic balances the rugged, traditional values of scouting with the sophisticated, clean lines of modern editorial design. It utilizes a "Neo-Organic" layout—where rigid grids are disrupted by intentional asymmetry, floating glass layers, and substantial white space. The goal is to make the user feel like they are interacting with a premium, digital field journal: authoritative, deep, and intellectually engaging.

---

## 2. Colors & Tonal Depth

The palette is rooted in deep forest greens and earth-toned golds, but it is applied through a lens of sophisticated layering rather than flat fills.

### Palette Strategy
- **Primary (`#00281e`, `#153f32`):** Used for foundational elements and deep "immersion" sections.
- **Secondary (`#7a5900`, `#d8a73c`):** Reserved for "Golden Moments"—highlights, achievements, and primary calls to action.
- **Surface Neutrals (`#e7fff3`, `#ffffff`):** Provide a crisp, airy environment that prevents the deep greens from feeling heavy.

### The "No-Line" Rule
To maintain a high-end feel, **do not use 1px solid borders to section content.** Separation must be achieved through background shifts. For example, a main content area on `surface` might transition into a sidebar or footer using `surface-container-low`. The change in tone is the boundary.

### Signature Textures & Glass
- **The Gradient Soul:** For Hero sections or primary CTAs, use a subtle linear gradient transitioning from `primary` to `primary_container`. This adds a "visual pulse" that flat hex codes cannot provide.
- **Glassmorphism:** For floating menus or overlay cards, use `surface` with 70% opacity and a `20px` backdrop-blur. This keeps the layout integrated, allowing the rich brand colors to "glow" through the interface.

---

## 3. Typography: The Editorial Scale

We pair the authoritative weight of a Serif with the technical precision of a Sans-Serif to create an "Academic-Modern" hierarchy.

| Level | Font Family | Token | Intent |
| :--- | :--- | :--- | :--- |
| **Display** | Noto Serif | `display-lg` | Hero headlines; pure editorial impact. |
| **Headline** | Noto Serif | `headline-md` | Major section headers; carries the "Heritage" voice. |
| **Title** | Manrope | `title-lg` | Card titles and sub-sections; clean and functional. |
| **Body** | Manrope | `body-md` | Standard reading; high legibility for educational content. |
| **Label** | Manrope | `label-sm` | Meta-data, badges, and micro-copy; uppercase with `0.05em` tracking. |

**Stylistic Note:** Headings should utilize tighter line-heights (1.1 - 1.2) to feel cohesive and "locked in," while body text should breathe at 1.6 to ensure comfort for students during long reading sessions.

---

## 4. Elevation & Depth

In this design system, elevation is a matter of light and layering, not artificial dividers.

- **Tonal Layering:** Instead of shadows, use the Surface Hierarchy.
  - **Base Layer:** `surface`
  - **Interactive Layer:** `surface_container_low`
  - **Primary Content Card:** `surface_container_lowest` (Pure White)
- **Ambient Shadows:** Where physical "lift" is required (e.g., a floating Action Button), use a shadow with a 24px blur and 6% opacity. The shadow color must be a tinted version of `on_surface` (deep green-grey) to avoid the "dirty" look of pure black shadows.
- **The Ghost Border:** If a form field or container requires a stroke for accessibility, use the `outline_variant` token at **15% opacity**. This creates a "suggestion" of a container without breaking the fluid, airy aesthetic.

---

## 5. Components

### Cards & Modules
Cards must never use dividers. Content within cards is separated by `1.5rem` (xl) vertical spacing. Use `surface_container_highest` for the card background to make it pop against a `surface` background.
- **Edge Radius:** Use `xl` (1.5rem) for main containers to echo the organic nature of scouting.

### Buttons
- **Primary:** `primary` background with `on_primary` text. Apply a subtle `4px` inner-glow top-down to simulate a "pressed" high-end material.
- **Secondary:** Use a "Glass" variant—semi-transparent `secondary_container` with a `backdrop-blur`.

### Chips & Badges
Used for lesson categories (e.g., "Sandi," "Tali Temali").
- **Style:** Small caps, `label-md` typography, `0.25rem` (sm) corner radius. Use `surface_variant` backgrounds to keep them subtle.

### Input Fields
Avoid the "boxed" look. Use a `surface_container_low` background with a bottom-only stroke of `outline` at 20% opacity. Upon focus, the stroke should animate to full `primary` color.

### Interactive Lists
Use `body-lg` for list items. Instead of a line divider, use a `surface_container` hover state that expands slightly beyond the text margins with an `md` (0.75rem) corner radius.

---

## 6. Do's and Don'ts

### Do
- **Do** use asymmetric layouts. Place a large `display-lg` heading on the left with a floating, blurred `surface` card overlapping it on the right.
- **Do** lean heavily into white space. If a section feels crowded, double the padding.
- **Do** use the `secondary` (gold) color sparingly—only for success states, achievements, or critical CTAs to maintain its "reward" value.

### Don't
- **Don't** use 100% black text. Always use `on_surface` (`#002117`) to keep the typography harmonious with the green brand colors.
- **Don't** use traditional "Drop Shadows" from default software settings. Always tint and diffuse them.
- **Don't** use sharp corners. Scouting is organic; use the `md` to `xl` roundedness scale to keep the UI feeling approachable and safe.