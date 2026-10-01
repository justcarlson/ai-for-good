Answer directly without deliberating. Write a compact JavaScript canvas drawing
module only, under 180 lines. No HTML, explanations, Markdown, tools, or imports.
Export function drawScene(ctx,w,h,t,helpers,palette). t is seconds from 0 to 45;
helpers is 0..5; palette is 'garden', 'sunset', or 'blueprint'. Use 1000x500
logical units scaled to w,h. The host provides animation loop and all controls.

Make an appealing hand-drawn scene: tiny seed courier travels across a grey
city to an empty plot, friendly helpers build a ramp and water, flowers bloom,
then a large leafy tree grows. Original dot-eyed blobs with little legs, layers
of buildings/windows, curb, textured garden beds, watering can, petal shapes.
Warm paper, dark ink, orange, moss green. Distinct palette options. A visible
seed in the courier's hands. Helpers visibly change the scene immediately.
Story timeline: 0-8 courier walks; 8-17 helper/ramp; 17-29 garden patches bloom;
29-38 seed planted and tree grows; 38-45 warm final garden. Use graceful easing,
tiny walking bob and expressive details. Everything depends deterministically
on t/helpers. No random flicker, no timers/global mutable state, no text in
canvas, no external resources. Helper/flower count capped. End holds still.
Keep functions small and use ctx.save/restore so transforms do not leak.
The host owns keyboard/reduced-motion using fixed timeline snapshots. You own
all drawing and motion in this module. Make it delightful but keep it compact.
