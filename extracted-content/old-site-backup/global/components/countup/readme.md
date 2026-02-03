# Count Up Animation

A lightweight JavaScript plugin that animates numerical values counting up from a starting number to a target number. It supports localization, custom speeds, and Squarespace Scaled Text blocks.

## Installation

Ensure the script is loaded in your project. It utilizes `noevu.init` for initialization.

```html
<script src="/global/components/countup/countup.js" type="module"></script>
```

## Usage

There are two ways to initialize the count up animation: using HTML data attributes or using Anchor links (useful for Squarespace text links).

### Method 1: Data Attributes

Wrap your number in an element with `data-plugin="countup"`.

```html
<span data-plugin="countup" data-start="0" data-speed="2000">1,500</span>
```

### Method 2: Anchor Links

Create a link with a hash containing `#countup`. You can pass parameters via the URL query string.

* **Link URL:** `#countup?start=0&speed=3000`
* **Link Text:** `100%`

The plugin will replace the link with a span and animate the number inside the link text.

## Configuration

You can configure the animation using data attributes on the element or CSS variables.

| Option | Data Attribute | CSS Variable | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Duration** | `data-speed` or `data-duration` | `--speed` | `3000` | Duration of animation in milliseconds. |
| **Start Value** | `data-start` | `--start` | `0` | The number to start counting from. |
| **FPS** | `data-fps` | `--fps` | `60` | Frames per second. |
| **Locale** | `data-locale` | `--locale-string` | `"de-CH"` | Locale for number formatting (e.g., "en-US"). |
| **Delay** | `data-delay` | `--delay` | `200` | Delay before animation starts in milliseconds. |
| **Stagger** | `data-stagger` | `--stagger` | `100` | Delay between multiple elements in milliseconds. |

### Examples

**Basic:**

```html
<h2 data-plugin="countup">500</h2>
```

**Custom Speed and Start:**

```html
<h2 data-plugin="countup" data-speed="5000" data-start="100">1,000</h2>
```

**German Locale (1.000,00):**

```html
<h2 data-plugin="countup" data-locale="de-DE">1.000,50</h2>
```

## Features

* **Suffix Support**: Automatically detects non-numeric suffixes (e.g., `%`, `+`, `k`) and appends them to the animation.
* **Squarespace Scaled Text**: Automatically handles layout shifts for Squarespace Scaled Text blocks (`.sqsrte-scaled-text`).
* **Intersection Observer**: Animation starts only when the element enters the viewport.
* **Stagger & Delay**: Control the timing of animations with initial delays and staggering for groups of elements.
