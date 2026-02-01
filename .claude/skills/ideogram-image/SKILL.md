---
name: ideogram-image
description: Generate brand-consistent images using the Ideogram API. Reads brand guidelines from docs/brand/image-constitution.md and dynamically builds optimized prompts. Use when the user asks to generate, create, remix, or make images, graphics, visuals, or illustrations that should match their brand style.
---

# Ideogram Brand Image Generator

Generate and remix images that automatically incorporate brand guidelines from `docs/brand/image-constitution.md`.

## Workflow

1. **Read brand file**: Load `docs/brand/image-constitution.md`
2. **Parse sections**: Extract style, colors, imagery guidelines, and defaults
3. **Build prompt**: Combine user request with brand context following Ideogram's prompt structure
4. **Generate/Remix**: Call Ideogram API v3
5. **Replace in content**: Always replace the image in the content (see below)

## Image Replacement (CRITICAL)

**ALWAYS replace images in the content after generating.** Never leave a generated image without updating content references.

### Replacement Workflow

When replacing an existing image:

1. **Backup the old image**: Rename with `-old` suffix
   ```bash
   mv src/public/images/pillar-education.jpg src/public/images/pillar-education-old.jpg
   ```

2. **Save new image with original name**: Use the same filename as the original
   ```bash
   python3 src/scripts/generateimage.py generate --prompt "..." --output src/public/images/pillar-education.jpg
   ```

This way, all content JSON files automatically use the new image without any edits needed.

### When Creating New Images

If creating a brand new image (not replacing), still update all relevant content files to reference the new image path.

### Never Do This

- ❌ Generate image with `-new` or `-remix` suffix and forget to update content
- ❌ Leave orphaned images that aren't referenced anywhere
- ❌ Update only some language files (EN but not DE/PT)

## Brand File Location

The skill expects `docs/brand/image-constitution.md`. If missing, offer to create one from `assets/brand-template.md`.

## Prompt Construction

Follow Ideogram's recommended structure, placing brand elements strategically:

```
[User's core request]. [Brand aesthetic] style, [Brand medium]. [Brand mood], [Brand lighting]. [Brand color guidance]. [Imagery includes]. [Imagery avoids - reframe positively].
```

**Key rules from Ideogram docs:**
- Main subject/text first (gets more weight)
- Use natural language, no technical syntax
- Keep under ~150 words for best results
- Never use negatives ("no X") — reframe positively
- Put text in quotes if generating text in image

## API Key

The script looks for the API key in this order:

1. **Environment variable** (via `src/.env`):
   ```
   IDEOGRAM_API_KEY=your_key_here
   ```

2. **macOS Keychain** (fallback):
   ```bash
   security find-generic-password -s "ideogram_api_key" -a "api-key" -w
   ```

## Script Usage

```bash
# Generate new image
python3 src/scripts/generateimage.py generate --prompt "CONSTRUCTED_PROMPT" --output output.png

# Generate and upscale for hero/large images
python3 src/scripts/generateimage.py generate --prompt "..." --output hero.png --upscale

# Remix existing image (auto-detects aspect ratio from input)
python3 src/scripts/generateimage.py remix --input image.png --prompt "Same scene but with sunset..." --output remixed.png

# Remix with custom settings
python3 src/scripts/generateimage.py remix --input image.png --prompt "..." --output remixed.png --image-weight 60 --upscale

# Upscale existing image
python3 src/scripts/generateimage.py upscale --input image.png --output image_large.png
```

### Generate Options

**`--aspect`** — Aspect ratio (default from brand file or 4:3)
- Common: `1:1`, `16:9`, `9:16`, `4:3`, `3:4`, `3:2`, `2:3`
- Wide: `21:9`, `32:9`
- Social: `4:5` (Instagram), `9:16` (Stories/Reels)
- 68 distinct resolutions supported (e.g., `1024x1024`, `1536x640`)

**`--style`** — Style preset (default from brand file or REALISTIC)
- **General**: `AUTO`, `REALISTIC`, `DESIGN`
- **Illustration**: `80S_ILLUSTRATION`, `CHILDRENS_BOOK`, `DOODLE`, `OLD_CARTOONS`, `MINIMAL_ILLUSTRATION`
- **Art movements**: `ART_DECO`, `BAUHAUS`, `CUBISM`, `SURREAL_COLLAGE`
- **Photography**: `LONG_EXPOSURE`, `DOUBLE_EXPOSURE`, `EXPIRED_FILM`
- **Modern**: `FLAT_VECTOR`, `GEO_MINIMALIST`, `ISOMETRIC`
- 56 styles available total

**`--speed`** — Rendering speed (default: QUALITY)
- `FLASH`: Fastest execution
- `TURBO`: High-speed option
- `DEFAULT`: Balanced speed/quality
- `QUALITY`: Maximum quality output (recommended for final images)

**`--color-palette`** — Color palette preset
- Presets: `EMBER`, `FRESH`, `JUNGLE`, `MAGIC`, `MELON`, `MOSAIC`, `PASTEL`, `ULTRAMARINE`
- Custom: Hex values with optional weights (0.05–1.0), e.g., `#ec7a11:0.8,#1a1a1a:0.2`

**`--seed`** — Random seed for reproducible generation (integer)

**`--num-images`** — Number of images to generate (default: 1)

**`--upscale`** — Auto-upscale after generation (recommended for hero images)

### Remix Options

**`--input`** — Input image file to remix (required)

**`--prompt`** — Text description guiding the remix (required)

**`--output`** — Output file path (required)

**`--image-weight`** — How much to preserve the original (0-100, default: 60)
- Lower values = more creative freedom, less of original
- Higher values = closer to original, less prompt influence

**`--aspect`** — Aspect ratio (auto-detected from input image if not specified)

**`--negative-prompt`** — Elements to exclude from generation

**`--upscale`** — Auto-upscale after remix

### Upscale Options

**`--input`** — Input image file path (required for upscale command)

**`--output`** — Output file path (default: input_upscaled.ext)

**`--resemblance`** — How closely to match original (0-100, default: 90)

**`--detail`** — Level of detail enhancement (0-100, default: 50)

## Examples

### Generate New Image

User: "Generate a hero image showing teamwork"

Brand file defines: modern minimalist, 3D render, optimistic mood, blue/green palette

Constructed prompt:
> A 3D render of diverse professionals collaborating in a modern workspace. Modern minimalist aesthetic, optimistic and professional mood, soft natural light. Deep blue and emerald green color accents on clean white background. Open airy composition with geometric shapes.

Then run:
```bash
python3 src/scripts/generateimage.py generate --prompt "..." --output hero-teamwork.png --aspect 4:3
```

### Remix Existing Image

User: "Take the hero image and create a sunset version"

```bash
python3 src/scripts/generateimage.py remix \
  --input public/images/hero-home-original.jpg \
  --prompt "Same scene with dramatic sunset sky, golden hour lighting, orange and red clouds, warm silhouette effect" \
  --output public/images/hero-home-sunset.jpg \
  --image-weight 90 \
  --upscale
```
