# Design System: High-End Editorial & Cinematic Experience

## 1. Overview & Creative North Star: "The Digital Curator"
The Creative North Star for this design system is **"The Digital Curator."** This is not a standard website; it is a high-end gallery experience that prioritizes the "void" as much as the content. By utilizing a deep black foundation and an asymmetric modular layout, we move away from "template" design into a bespoke, cinematic realm.

The system breaks traditional web patterns through **intentional overlaps**, where typography or imagery may bleed across container boundaries, and **significant negative space** to create a sense of luxury and breathing room. Every element must feel like it was placed with surgical precision, emphasizing high-tech sophistication and editorial authority.

---

### 2. Colors & Surface Philosophy
The palette is rooted in absolute depth, using a tiered black-to-grey system to define hierarchy without the use of crude borders.

*   **Primary Base:** `surface` (#131313) provides a softer, more cinematic black than #000000, allowing for a subtle grain texture to be visible.
*   **The Accent:** `inverse_primary` (#124af0) and `primary_container` (#003ace) serve as the "Electric Blue" focal points. Use these sparingly to guide the eye to interactive elements.
*   **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. Boundaries must be defined solely through background color shifts. For example, a `surface_container_low` (#1b1b1b) section should sit on a `surface` background to create a "soft" edge.
*   **Surface Hierarchy & Nesting:** Treat the UI as stacked sheets of glass. 
    *   **Level 0:** `surface_container_lowest` (#0e0e0e) for the deepest background layers.
    *   **Level 1:** `surface` (#131313) for the primary content area.
    *   **Level 2:** `surface_container_high` (#2a2a2a) for elevated cards or floating panels.
*   **Glass & Gradient Rule:** For floating navigation or modal overlays, use a semi-transparent `surface_variant` (#353535) with a `backdrop-blur` of 20px. This creates a "frosted" premium feel that integrates with the underlying grain texture.

---

### 3. Typography: The Editorial Voice
We use **Inter** exclusively, but we treat it as a sculptural element.

*   **Display & Headlines (`display-lg` to `headline-sm`):** These must be **Massive, Bold, and All-Caps**. Use `display-lg` (3.5rem) for hero statements. These are not just titles; they are graphic elements. Tracking should be tightened (-0.02em) to create a compact, high-tech aesthetic.
*   **Body Text (`body-lg` to `body-md`):** Refined and elegant. Use `on_surface` (#e2e2e2) for readability. Ensure a generous line-height (1.6 - 1.8) to maintain the premium editorial feel.
*   **Metadata & Labels (`label-md` to `label-sm`):** Use **All-Caps** with increased letter-spacing (0.1rem) in `on_surface_variant` (#c3c6d5). These should feel like technical annotations on a blueprint.

---

### 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are too "web-standard" for this system. We use light and tone to imply height.

*   **The Layering Principle:** To "lift" a project card, do not add a shadow. Instead, change the container from `surface_container` (#1f1f1f) to `surface_container_highest` (#353535). The contrast against the deep black background creates a natural, sophisticated lift.
*   **Ambient Shadows:** If a floating element (like a dropdown) requires a shadow, it must be ultra-diffused. 
    *   *Shadow Setting:* `0px 24px 48px rgba(0, 0, 0, 0.5)`. The shadow should feel like a soft glow rather than a hard edge.
*   **The "Ghost Border" Fallback:** If a layout requires a visual boundary for accessibility, use the `outline_variant` (#434653) at **15% opacity**. This creates a "barely-there" suggestion of a container.
*   **Sharpness:** All `Roundedness` tokens are set to **0px**. Every corner in this system is a sharp 90-degree angle, reinforcing the brutalist, high-tech luxury feel.

---

### 5. Components

*   **Buttons:**
    *   *Primary:* Solid `primary_container` (#003ace) with `on_primary_container` (#aebbff) text. All-caps Inter Bold. No rounded corners.
    *   *Secondary:* `Ghost` style. No background, `outline` (#8d909e) at 20% opacity, white text.
*   **Project Cards:** Use `surface_container_low` (#1b1b1b). Images within cards should have a subtle 5% black overlay that disappears on hover to "reveal" the cinematic quality of the work.
*   **Inputs:** Bottom-border only using `outline` (#8d909e). When focused, the border transitions to `inverse_primary` (#124af0). Labels must be `label-sm` and all-caps.
*   **Lists:** Forbid divider lines. Separate list items using `spacing-6` (2rem) of vertical white space or a subtle shift to `surface_container_lowest` on hover.
*   **Custom Component - The Grain Overlay:** A global `fixed` div with a high-frequency noise PNG at 3% opacity. This "binds" the digital elements together, making them feel like physical film.

---

### 6. Do’s and Don’ts

#### Do:
*   **Do** use asymmetrical grids. If an image is on the left, let the caption overlap it or sit far to the right on a different grid line.
*   **Do** use "Black Space" (Negative Space) aggressively. A single line of text in the middle of a `surface` screen is a valid design choice.
*   **Do** use `inverse_primary` (#124af0) for micro-interactions like scroll progress bars or custom cursors.

#### Don’t:
*   **Don’t** use rounded corners (`0px` is the law).
*   **Don’t** use center-aligned body text. Stick to left-aligned editorial layouts.
*   **Don’t** use standard "Grey" (#808080). Use the provided `surface_variant` or `on_surface_variant` tokens to ensure the color has the correct cinematic undertone.
*   **Don’t** crowd the screen. If a section feels "full," it is likely over-designed. Remove an element.

---

### 7. Spacing Scale
Spacing is the "glue" of this system. Use large increments to define major shifts in content.
*   **Section Gaps:** Use `24` (8.5rem) or `20` (7rem).
*   **Content Grouping:** Use `8` (2.75rem) or `10` (3.5rem).
*   **Micro-spacing:** Use `2` (0.7rem) for label-to-heading relationships.