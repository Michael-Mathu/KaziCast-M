---
version: alpha
name: KaziCast Labs
description: A clean, high-contrast, functional aesthetic inspired by Google Labs.
colors:
  primary: "#1A73E8"
  primary-hover: "#1557B0"
  surface: "#FFFFFF"
  surface-variant: "#F8F9FA"
  text-main: "#202124"
  text-muted: "#5F6368"
  border: "#DADCE0"
  success: "#1E8E3E"
  warning: "#F9AB00"
  danger: "#D93025"
typography:
  h1:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: -0.02em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0.05em
rounded:
  sm: 4px
  md: 8px
  lg: 16px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 32px
  xl: 64px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: 12px
  card:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.border}"
    rounded: "{rounded.lg}"
---

## Overview

A functional, data-dense, and professional interface. 
We prioritize clarity over cinematic flair. The design is explicitly "Light Mode" by default, emphasizing readable typography, generous whitespace, and unmistakable interactive elements.

## Colors

The palette uses standard high-contrast neutrals with Google Blue for primary actions.

- **Surface (#FFFFFF):** The default background for all elevated containers.
- **Surface Variant (#F8F9FA):** A subtle off-white for app backgrounds or distinct sections.
- **Text Main (#202124):** High-legibility dark grey for core typography.
- **Text Muted (#5F6368):** Secondary grey for metadata and subtitles.
- **Border (#DADCE0):** Crisp structure without visual noise.
- **Primary (#1A73E8):** Our sole brand and interaction color.

## Typography

- **Headlines:** Inter Bold for structural clarity and hierarchy.
- **Body:** Inter Regular at 16px for long-form readability.
- **Labels:** Inter SemiBold for crisp metadata and tight spaces.

## Elevation & Depth

Glassmorphism is removed entirely. Depth is achieved via:
1. 1px borders (`#DADCE0`)
2. Tonal separation (White surfaces on `#F8F9FA` backgrounds)
3. Very soft shadow on hover (`0 2px 8px rgba(0,0,0,0.08)`)

## Shapes

- UI elements (buttons, inputs) use a functional 8px border radius.
- Larger structural elements (cards, dialogs) use 16px to feel modern but structured.

## Components

- **Buttons**: Flat fills. Primary uses `#1A73E8`, secondary uses a 1px border. No gradients.
- **Inputs**: Crisp 1px border (`#DADCE0`), white background, 8px radius.
- **Cards**: Flat white containers with a 1px border.
