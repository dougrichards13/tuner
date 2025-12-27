# NeuroLine Design System

**By Smart Factory | AI Accelerator Program**

---

## Brand Overview

NeuroLine embodies Smart Factory's commitment to **premium, enterprise-grade AI solutions**. As a tool for high-end consulting clients ($1M+ projects), the interface must convey:

- **Professional Excellence** - No compromises on quality
- **Future-Tech Aesthetic** - Modern, powerful, forward-thinking
- **Intuitive Power** - Complex capabilities, simple experience
- **Premium Feel** - Worthy of Smart Factory's brand

---

## Design Philosophy

### Core Principles

1. **Dark Mode First** - Reduces eye strain for long work sessions, modern aesthetic
2. **Information Hierarchy** - Clear visual priority through typography and color
3. **Intentional Motion** - Smooth, purposeful transitions (200ms standard)
4. **Generous Whitespace** - Breathable layouts, premium feel
5. **Glassmorphism** - Depth through blur and transparency
6. **Professional Icons** - SVG, monochrome, sharp

### Inspiration
- **Warp Terminal** - Command palette, sleek dark UI
- **Vercel Dashboard** - Clean cards, modern gradients
- **Linear** - Fast interactions, beautiful animations
- **Raycast** - Polished, professional, powerful

---

## Color System

### Background Palette
```css
slate-950  /* #020617 - Darkest, sidebar */
slate-900  /* #0f172a - Primary background */
slate-800  /* #1e293b - Secondary background */
```

### UI Elements
```css
slate-700/50  /* Borders - semi-transparent */
slate-800/30  /* Card backgrounds with blur */
slate-800/50  /* Hover states */
```

### Text Hierarchy
```css
slate-100  /* #f1f5f9 - Primary headings */
slate-200  /* #e2e8f0 - Secondary headings */
slate-300  /* #cbd5e1 - Labels */
slate-400  /* #94a3b8 - Body text */
slate-500  /* #64748b - Muted text */
```

### Brand Accent
```css
blue-600   /* #2563eb - Primary actions */
blue-500   /* #3b82f6 - Hover state */
blue-400   /* #60a5fa - Text accents */
```

### Status Colors
```css
/* Active/Success */
emerald-500  /* #10b981 */
emerald-400  /* #34d399 */
bg-emerald-500/10 border-emerald-500/20  /* Badge */

/* Warning/Paused */
amber-500    /* #f59e0b */
amber-400    /* #fbbf24 */
bg-amber-500/10 border-amber-500/20

/* Info/Complete */
blue-500     /* #3b82f6 */
blue-400     /* #60a5fa */
bg-blue-500/10 border-blue-500/20

/* Neutral/Archived */
slate-500    /* #64748b */
slate-400    /* #94a3b8 */
bg-slate-500/10 border-slate-500/20

/* Destructive */
red-500      /* #ef4444 */
red-400      /* #f87171 */
bg-red-500/10 border-red-500/20
```

---

## Typography

### Font Stack
```css
font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
-webkit-font-smoothing: antialiased;
```

### Type Scale
```css
/* Headings */
.heading-xl   { font-size: 2rem; font-weight: 600; letter-spacing: -0.025em; }
.heading-lg   { font-size: 1.5rem; font-weight: 600; letter-spacing: -0.025em; }
.heading-md   { font-size: 1.125rem; font-weight: 600; }
.heading-sm   { font-size: 1rem; font-weight: 600; }

/* Body */
.body-lg      { font-size: 1rem; line-height: 1.5; }
.body-md      { font-size: 0.875rem; line-height: 1.5; }
.body-sm      { font-size: 0.75rem; line-height: 1.5; }

/* Labels */
.label        { font-size: 0.875rem; font-weight: 500; }
.label-sm     { font-size: 0.75rem; font-weight: 500; }
```

### Tracking
- Headings: `-0.025em` (tight)
- Body: `normal`
- All caps: `0.05em` (loose)

---

## Components

### Buttons

#### Primary
```html
<button class="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg 
               transition-all duration-200 shadow-lg shadow-blue-600/20 
               hover:shadow-blue-500/30 font-medium">
  Action
</button>
```

#### Secondary
```html
<button class="px-4 py-2 bg-slate-700/50 hover:bg-slate-700 text-slate-300 
               rounded-lg transition-all font-medium">
  Cancel
</button>
```

#### Icon Button
```html
<button class="p-2 bg-slate-700/30 hover:bg-slate-700 text-slate-400 
               hover:text-slate-200 rounded-lg transition-all">
  <svg>...</svg>
</button>
```

### Cards

#### Standard Card
```html
<div class="bg-slate-800/30 backdrop-blur-sm hover:bg-slate-800/50 
            border border-slate-700/50 hover:border-slate-600/50 
            rounded-xl p-5 transition-all duration-200 
            hover:shadow-xl hover:shadow-black/20">
  <!-- Content -->
</div>
```

#### Glassmorphic Panel
```html
<div class="bg-slate-800/50 backdrop-blur-xl rounded-xl 
            border border-slate-700/50 p-6 shadow-2xl">
  <!-- Content -->
</div>
```

### Form Controls

#### Input
```html
<input class="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700/50 
              rounded-lg text-slate-100 placeholder-slate-500 
              focus:outline-none focus:ring-2 focus:ring-blue-500/50 
              focus:border-transparent transition-all">
```

#### Select
```html
<select class="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700/50 
               rounded-lg text-slate-100 focus:outline-none focus:ring-2 
               focus:ring-blue-500/50 focus:border-transparent transition-all">
  <option>Option</option>
</select>
```

#### Textarea
```html
<textarea class="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700/50 
                 rounded-lg text-slate-100 placeholder-slate-500 
                 focus:outline-none focus:ring-2 focus:ring-blue-500/50 
                 focus:border-transparent transition-all resize-none" 
          rows="3"></textarea>
```

### Status Badges
```html
<!-- Active -->
<span class="px-2 py-1 rounded-md text-xs font-medium border 
             bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
  Active
</span>

<!-- Paused -->
<span class="px-2 py-1 rounded-md text-xs font-medium border 
             bg-amber-500/10 text-amber-400 border-amber-500/20">
  Paused
</span>
```

---

## Icons

### SVG Icon Template
```tsx
const Icon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="..." />
  </svg>
);
```

### Icon Library (Heroicons Outline)
- **Web App**: Globe icon
- **API**: Code bracket icon
- **Data**: Chart bar icon
- **Documentation**: Document icon
- **Database**: Database cylinder icon
- **General**: Folder icon
- **Plus**: Plus icon
- **Edit**: Pencil icon
- **Delete**: Trash icon
- **Arrow**: Arrow right icon

### Icon Sizing
- Small: `w-4 h-4` (16px)
- Medium: `w-5 h-5` (20px)
- Large: `w-6 h-6` (24px)

---

## Spacing System

```css
/* Based on 4px scale */
1  = 0.25rem (4px)
2  = 0.5rem  (8px)
3  = 0.75rem (12px)
4  = 1rem    (16px)
5  = 1.25rem (20px)
6  = 1.5rem  (24px)
8  = 2rem    (32px)
```

### Component Spacing Guidelines
- Card padding: `p-5` (20px)
- Form field gap: `space-y-4` (16px)
- Button gap: `gap-2` or `gap-3`
- Section padding: `p-6` or `p-8`

---

## Animations & Transitions

### Standard Transitions
```css
transition-all duration-200  /* Default for most interactions */
transition-colors            /* Color-only changes */
transition-shadow            /* Shadow changes */
```

### Hover Effects
- **Cards**: Increase shadow, lighten background
- **Buttons**: Lighten background, increase shadow
- **Icons**: Change color (slate-400 → blue-400)

### Focus States
```css
focus:outline-none 
focus:ring-2 
focus:ring-blue-500/50 
focus:border-transparent
```

---

## Layout Patterns

### Page Structure
```html
<div class="flex flex-col h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
  <!-- Header -->
  <div class="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
    <div class="px-8 py-6">
      <!-- Header content -->
    </div>
  </div>
  
  <!-- Content -->
  <div class="flex-1 overflow-y-auto px-8 py-6">
    <!-- Main content -->
  </div>
</div>
```

### Grid Layouts
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <!-- Cards -->
</div>
```

---

## Best Practices

### DO ✅
- Use consistent spacing (multiples of 4px)
- Apply backdrop blur to overlays/cards
- Add subtle shadows on hover
- Use semi-transparent colors for depth
- Keep transitions fast (200ms)
- Maintain clear visual hierarchy
- Use SVG icons, not emoji
- Apply antialiasing to text

### DON'T ❌
- Mix light and dark themes
- Use bright, saturated colors
- Add unnecessary animations
- Use emoji as functional icons
- Create jarring transitions (>300ms)
- Overuse effects (blur, shadow)
- Ignore keyboard focus states
- Use system default form controls

---

## Accessibility

### Color Contrast
- Text on backgrounds must meet WCAG AA (4.5:1)
- Interactive elements must have clear hover/focus states
- Don't rely solely on color to convey information

### Keyboard Navigation
- All interactive elements must be keyboard accessible
- Visible focus indicators required
- Logical tab order

### Screen Readers
- Semantic HTML elements
- ARIA labels where needed
- Alt text for icons used as content

---

## Code Examples

### Complete Button Component
```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'icon';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  onClick,
  disabled 
}) => {
  const variants = {
    primary: "px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30",
    secondary: "px-4 py-2 bg-slate-700/50 hover:bg-slate-700 text-slate-300",
    icon: "p-2 bg-slate-700/30 hover:bg-slate-700 text-slate-400 hover:text-slate-200",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${variants[variant]} rounded-lg transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
};
```

---

## Smart Factory Brand Alignment

### Professional Excellence
- Enterprise-grade polish in every detail
- Consistent, predictable interactions
- No visual bugs or glitches

### Premium Positioning
- Sophisticated color palette
- High-quality typography
- Attention to micro-interactions

### Innovation Focus
- Modern, forward-thinking aesthetic
- Cutting-edge UI patterns
- Technical credibility

---

## Version History

- **v1.0** (Dec 2024) - Initial design system for NeuroLine MVP
- Professional dark theme established
- Component library defined
- Smart Factory brand integration

---

**Maintained by:** Doug Richards, Smart Factory  
**Program:** AI Accelerator  
**Last Updated:** December 27, 2024
