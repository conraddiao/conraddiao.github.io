#!/usr/bin/env python3
"""Reframe portfolio images so they fill the media cards at both card shapes.

The cards are 16:10 on desktop and 4:5 on phones, and images are shown with
`object-fit: cover`. For each source image this writes one "master" whose
centre crop at *both* shapes shows the chosen focus area:

  - where the master reaches past the source, the background is extended
    (edge colours, with thin lines and grain filtered out, feathered in);
  - where the source reaches past the master, it is clipped.

Usage: reframe-images.py SRC_DIR OUT_DIR
Recipes are keyed by source filename below. Requires numpy, scipy, Pillow.
"""
import os
import sys

import numpy as np
from PIL import Image
from scipy.ndimage import gaussian_filter1d, median_filter

WIDE, TALL = 16 / 10, 4 / 5  # desktop and phone card shapes (w / h)
MAX_SIDE = 2600

# focus:     (x0, y0, x1, y1) as fractions of the source — what the desktop card
#            must show. "all" = whole image; "content" = auto-trim a plain margin.
# tall_frac: share of the focus width the phone card keeps (centred). Below 1,
#            a wide drawing is clipped at the sides on phones so it reads larger.
# flat:      extend with one paper colour instead of following the edge tones.
# trim:      pixels of scan border to drop first.
# smooth:    how far to even out the edge tones before extending (default 1).
# clip_only: never extend (busy photos): full height, centred on focus x.
RECIPES = {
    "ug1-x2-1.jpg": dict(focus=(0.24, 0.10, 0.84, 0.92)),
    "ug1-x2-2.jpg": dict(focus="all", trim=12, flat=True, tall_frac=0.70),
    "ug1-x2-3.jpg": dict(focus="all", trim=8, flat=True),
    "ug2-x2-1.jpg": dict(focus="all"),
    "ug2-x2-2.jpg": dict(focus=(0.31, 0.0, 0.69, 1.0), clip_only=True),
    "ug2-x2-3.jpg": dict(focus=(0.30, 0.0, 0.75, 1.0), clip_only=True),
    "ug2-x3-1.jpg": dict(focus="all", smooth=3),
    "ug202-x1-1.jpg": dict(focus=(0.36, 0.0, 0.81, 1.0), clip_only=True),
    "ug202-x1-2.jpg": dict(focus="all", clip_only=True),
    "ug202-x1-3.jpg": dict(focus="all"),
    "ug202-x1-4.jpg": dict(focus="all"),
    "ug202-x3-1.jpg": dict(focus=(0.0, 0.035, 1.0, 0.965), smooth=8),
    "ug202-x3-2.jpg": dict(focus=(0.05, 0.0, 0.95, 1.0), tall_frac=0.64),
    "villa-sul-lago-giuseppe-terragni-1.jpg": dict(focus="all", tall_frac=0.64),
    "villa-sul-lago-giuseppe-terragni-2.jpg": dict(focus="all", tall_frac=0.56),
    "villa-sul-lago-giuseppe-terragni-3.jpg": dict(focus="all", tall_frac=0.64),
    "villa-sul-lago-giuseppe-terragni-5.jpg": dict(focus="content", tall_frac=0.60),
    "villa-sul-lago-giuseppe-terragni-6.jpg": dict(focus="content", trim=14, flat=True, tall_frac=0.78),
    "villa-sul-lago-giuseppe-terragni-7.jpg": dict(focus="content"),
}


def content_box(a, margin=0.06):
    """Bounding box of everything that differs from the corner background colour."""
    bg = np.median(np.concatenate([a[:20, :20], a[:20, -20:], a[-20:, :20], a[-20:, -20:]]).reshape(-1, 3), axis=0)
    mask = np.abs(a - bg).max(axis=2) > 28
    ys, xs = np.where(mask)
    h, w = a.shape[:2]
    m = margin * max(xs.max() - xs.min(), ys.max() - ys.min())
    return (max(0, xs.min() - m) / w, max(0, ys.min() - m) / h, min(w, xs.max() + m) / w, min(h, ys.max() + m) / h)


def master_rect(fx0, fy0, fx1, fy1, tall_frac=1.0):
    """Smallest rect, centred on the focus, whose centre crops at WIDE and TALL show it."""
    fw, fh = fx1 - fx0, fy1 - fy0
    wide_w, wide_h = max(fw, fh * WIDE), max(fh, fw / WIDE)
    tw = fw * tall_frac                                   # the phone card may clip the sides
    tall_w, tall_h = max(tw, fh * TALL), max(fh, tw / TALL)
    mw, mh = max(wide_w, tall_w), max(wide_h, tall_h)
    cx, cy = (fx0 + fx1) / 2, (fy0 + fy1) / 2
    return cx - mw / 2, cy - mh / 2, cx + mw / 2, cy + mh / 2


def edge_profile(strip, axis_len, smooth=1.0):
    """Background colour along one edge: thin lines and grain removed, then smoothed."""
    line = np.median(strip, axis=0)                       # (n, 3) along the edge
    win = max(31, (axis_len // 5) | 1)
    line = median_filter(line, size=(win, 1), mode="nearest")
    return gaussian_filter1d(line, sigma=smooth * axis_len / 30, axis=0, mode="nearest")


def extend(a, left, top, right, bottom, flat=False, smooth=1.0):
    """Pad `a` by the given pixel amounts, continuing each edge's background."""
    def pad_rows(a, n_before, n_after):
        h, w = a.shape[:2]
        feather = max(8, int(0.03 * min(h, w)))
        out = a.copy()
        parts = []
        for n, sl, ramp_sl, flip in ((n_before, slice(0, 10), slice(0, feather), False),
                                     (n_after, slice(h - 10, h), slice(h - feather, h), True)):
            if n <= 0:
                parts.append(None)
                continue
            prof = edge_profile(a[sl], w, smooth)         # (w, 3)
            if flat:
                prof = np.broadcast_to(paper, prof.shape)
            ramp = np.linspace(0, 1, feather) ** 1.5      # 0 at the edge -> 1 inside
            if flip:
                ramp = ramp[::-1]
            r = ramp[:, None, None]
            out[ramp_sl] = out[ramp_sl] * r + prof[None] * (1 - r)   # fade lines out before the seam
            parts.append(np.repeat(prof[None], n, axis=0))
        stack = [p for p in (parts[0], out, parts[1]) if p is not None]
        return np.concatenate(stack, axis=0)

    if flat:  # one paper colour, taken from all four edges
        edges = np.concatenate([a[:10].reshape(-1, 3), a[-10:].reshape(-1, 3), a[:, :10].reshape(-1, 3), a[:, -10:].reshape(-1, 3)])
        paper = np.median(edges, axis=0)
    a = pad_rows(a, top, bottom)
    a = pad_rows(a.transpose(1, 0, 2), left, right).transpose(1, 0, 2)
    return a


def reframe(src_path, out_path, focus="all", trim=0, tall_frac=1.0, flat=False, clip_only=False, smooth=1.0):
    a = np.asarray(Image.open(src_path).convert("RGB"), dtype=np.float32)
    if trim:
        a = a[trim:-trim, trim:-trim]
    h, w = a.shape[:2]
    f = content_box(a) if focus == "content" else (0, 0, 1, 1) if focus == "all" else focus
    if clip_only:
        mw = min(w, h * WIDE)
        x0 = min(max(0, (f[0] + f[2]) / 2 * w - mw / 2), w - mw)
        x0, y0, x1, y1 = x0, 0, x0 + mw, h
    else:
        x0, y0, x1, y1 = master_rect(f[0] * w, f[1] * h, f[2] * w, f[3] * h, tall_frac)
    x0, y0, x1, y1 = (int(round(v)) for v in (x0, y0, x1, y1))
    # a sliver of extension is not worth a visible seam: clip a hair tighter instead
    if max(-x0, x1 - w) <= 0.025 * w:
        x0, x1 = max(0, x0), min(w, x1)
    if max(-y0, y1 - h) <= 0.025 * h:
        y0, y1 = max(0, y0), min(h, y1)
    # clip what lies outside the master, then extend to reach it
    cx0, cy0, cx1, cy1 = max(0, x0), max(0, y0), min(w, x1), min(h, y1)
    a = a[cy0:cy1, cx0:cx1]
    a = extend(a, cx0 - x0, cy0 - y0, x1 - cx1, y1 - cy1, flat=flat, smooth=smooth)
    im = Image.fromarray(np.clip(a + 0.5, 0, 255).astype(np.uint8))
    if max(im.size) > MAX_SIDE:
        s = MAX_SIDE / max(im.size)
        im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    im.save(out_path, quality=84, optimize=True, progressive=True)
    return im.size


if __name__ == "__main__":
    src_dir, out_dir = sys.argv[1], sys.argv[2]
    os.makedirs(out_dir, exist_ok=True)
    for name, recipe in RECIPES.items():
        src = os.path.join(src_dir, name)
        if not os.path.exists(src):
            print("missing", name)
            continue
        out = os.path.join(out_dir, name)
        size = reframe(src, out, **recipe)
        print(f"{name:44s} {size[0]}x{size[1]}  {os.path.getsize(out) // 1024} KB")
