# Concept Doc: Playful Motion Demo for AI for Good Workshop
Branch: `ideas/opus` · Status: concept only, no code

## Three Ideas

**1. Seed Courier (preferred brief)**
A small round creature carries one glowing seed across a grey, hand-drawn city. Each helper the audience adds does one kind act: one waters a cracked planter, another lifts a fallen sign, a third shares shade. Each act turns a patch of grey into a small garden. The point is that small contributions add up.

**2. Lantern Relay (stronger alternative)**
At dusk, a creature must carry a single lantern flame across a river of stepping stones. Alone, it cannot reach the far shore. Each helper becomes a stepping stone, a bridge plank, or a windbreak. When the flame arrives, the far bank lights up in drawn lines.
*Why it may be stronger:* the goal is visible from frame one, and each helper's role is easy to read without words.

**3. Mapmakers**
A blank paper map slowly fills with ink paths as helpers walk. Each helper draws a different kind of route. Overlapping routes bloom into shared landmarks. This shows how a group builds collective knowledge, but the drama is lower.

## Selected: **Seed Courier**, with one idea borrowed from Lantern Relay

I am keeping the brief's concept and adding a visible destination. An empty plot glows faintly at the far right from the start. This gives Seed Courier the clear goal that made Lantern Relay compelling, without losing the garden payoff.

### 45-Second Stage Sequence
| Time | Stage | What we see |
|---|---|---|
| 0–6s | **Grey City** | Ink-line buildings and grey wash. The creature enters at left holding the seed. The empty plot pulses softly at right. |
| 6–15s | **Alone** | The creature walks, then stalls at a cracked curb. The prompt "Add a helper" appears in large type. |
| 15–24s | **First Help** | The first helper arrives and builds a ramp. One orange flower draws itself stroke by stroke. Moss creeps along the curb. |
| 24–34s | **Many Hands** | Helpers two to four each do one act: watering, shading, clearing litter. Each act blooms one garden patch. The grey recedes in place. |
| 34–42s | **Planting** | The seed reaches the plot. A sprout grows into a tree whose branches connect all the patches. |
| 42–45s | **Rest** | The scene holds still. Caption: "Small help, shared, grows." A loop button appears. |

If nobody presses anything, a gentle default helper arrives at 20s so the story still completes.

### Audience Controls
- **Space / "Add a helper"**: spawns the next helper (up to 5).
- **P / "Pace"**: cycles slow, normal, and brisk.
- **C / "Palette"**: cycles three palettes.
- **S / "Story"**: switches the act set. Options: *City* (default), *Schoolyard*, *Riverbank*. The same structure gets new props.
- **R / "Replay"**: restarts the scene.

### Teaching Iteration
Pace, palette, and story live in one plain config object at the top of the file. Participants change one value, reload, and compare. Suggested exercise: "Change only the pace, then describe how the feeling shifted."

### One Clear Takeaway
**Many small, visible acts of help can transform a shared place, and you can reshape the story by changing a few values.**

### Implementation Scope (under 30 minutes)
- One HTML file with inline JavaScript and one `<canvas>`. No libraries, fonts, or images.
- Drawing uses jittered lines and circles to give a hand-drawn feel. The creature is a blob with two dot eyes.
- A stage timeline array holds start time, duration, and draw function for each stage.
- Five predefined helper acts, each a small function that tweens a garden patch.
- Out of scope: sound, physics, character rigging, and saving state.

### Reduced Motion and Keyboard
- The page respects `prefers-reduced-motion`. When it is set, motion is replaced by crossfades between still stages. Blooms appear fully drawn, and there is no jitter or idle bobbing.
- A visible "Motion: on/off" toggle overrides the system setting.
- All controls are real `<button>` elements with key shortcuts and visible focus rings. Tab order follows the visual order.
- A live text region narrates each stage, for example "A helper builds a ramp." The story therefore works without sound or sight of the canvas.

### No-Network Fallback
- The file is fully self-contained and works offline from `file://`.
- If canvas is unsupported, a `<noscript>`/fallback block shows a drawn SVG still of the finished garden plus a five-line text version of the story.

## Workshop Home Page: Two Visual Directions

### A. "Field Notebook"
- **Typography:** Large serif display for headings, such as system Georgia at 72px or larger. Humanist sans for body text at 18px.
- **Palette:** Paper `#F4EEE1`, Ink `#1E1B18`, Orange accent `#FF5A1F`, Pencil grey `#8A847A`, Moss `#5E7A4A`.
- **Composition:** An asymmetric single column with a big hand-lettered title. Projects are listed as numbered notebook entries with doodled underlines, not as cards. Wide margins carry small sketches.
- **Button labels:** "Watch it grow," "Add a helper," "Change the story," "Try it yourself."

### B. "Poster Wall"
- **Typography:** Condensed bold sans, uppercase, very large (system Impact-style stack) for headings. Monospace for small labels.
- **Palette:** Warm paper `#EFE6D2`, Deep ink `#141210`, Signal orange `#F2551B`, Faded blue-grey `#6F7C85`, Cream highlight `#FFF8EA`.
- **Composition:** One oversized poster block, with a slightly rotated title over a hand-drawn circle and arrow pointing to the demo. Secondary links run as a tight row of ink-stamped labels.
- **Button labels:** "Start," "Remix pace," "Swap colors," "Read the steps."

### Three Pitfalls to Avoid
1. **Generic polish:** purple gradients, glassy cards, or a uniform card grid. These erase the handmade warmth.
2. **Unsupported claims:** impact numbers, "AI saves X" statements, or implied endorsements. Keep the copy descriptive and honest.
3. **Overusing the accent:** orange everywhere loses its signal. Reserve it for the single next action and the first bloom.