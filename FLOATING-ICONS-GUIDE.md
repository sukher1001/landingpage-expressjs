# Floating Icons Guide

## Overview
Floating icons adalah tombol sosial media yang melayang di pojok kanan bawah website dengan animasi naik-turun yang smooth.

## Features
- ✅ 4 Platform: WhatsApp, Instagram, TikTok, Shopee
- ✅ Animasi floating (naik-turun) dengan delay berbeda untuk efek bergelombang
- ✅ Hover effects dengan scale dan shadow
- ✅ Tooltip muncul saat hover (desktop only)
- ✅ Responsive design untuk mobile
- ✅ Fixed position - selalu terlihat saat scroll

## Icons Location
Icons berada di folder: `public/client/images/store/`
- `wa.png` - WhatsApp
- `insta.jpg` - Instagram
- `tiktok.png` - TikTok
- `shopee.jpg` - Shopee

## How to Update Links

Edit file: `views/widgets/floating-icons.ejs`

```html
<!-- WhatsApp -->
<a href="https://wa.me/6281234567890" target="_blank" class="floating-icon whatsapp">

<!-- Instagram -->
<a href="https://www.instagram.com/kuliitbeauty" target="_blank" class="floating-icon instagram">

<!-- TikTok -->
<a href="https://www.tiktok.com/@kuliitbeauty" target="_blank" class="floating-icon tiktok">

<!-- Shopee -->
<a href="https://shopee.co.id/kuliitbeauty" target="_blank" class="floating-icon shopee">
```

## Customization

### Change Icon Size
Edit CSS di `floating-icons.ejs`:
```css
.floating-icon {
    width: 60px;  /* Change this */
    height: 60px; /* Change this */
}
```

### Change Position
```css
.floating-icons {
    right: 20px;  /* Distance from right */
    bottom: 20px; /* Distance from bottom */
}
```

### Change Animation Speed
```css
@keyframes floatUpDown {
    /* Duration: 3s (change in animation property) */
}

.floating-icon {
    animation: floatUpDown 3s ease-in-out infinite; /* Change 3s */
}
```

### Change Float Distance
```css
@keyframes floatUpDown {
    50% {
        transform: translateY(-10px); /* Change -10px */
    }
}
```

### Change Gap Between Icons
```css
.floating-icons {
    gap: 15px; /* Change this */
}
```

## Add New Icon

1. Add image to `public/client/images/store/`
2. Add HTML in `floating-icons.ejs`:
```html
<a href="YOUR_LINK" target="_blank" class="floating-icon facebook" title="Facebook">
    <img src="/client/images/store/facebook.png" alt="Facebook">
</a>
```

3. Add animation delay:
```css
.floating-icon.facebook {
    animation-delay: 0.8s;
}
```

## Remove Icon

Simply delete or comment out the icon HTML in `floating-icons.ejs`

## Animation Details

### Floating Effect
- Duration: 3 seconds per cycle
- Movement: 10px up and down
- Easing: ease-in-out for smooth motion

### Wave Effect
Icons have different animation delays:
- WhatsApp: 0s
- Instagram: 0.2s
- TikTok: 0.4s
- Shopee: 0.6s

This creates a wave-like motion effect.

### Hover Effects
1. Scale up to 1.1x
2. Increase shadow
3. Stop floating animation
4. Show tooltip (desktop only)
5. Pulse effect

## Responsive Behavior

### Desktop (> 768px)
- Icon size: 60x60px
- Gap: 15px
- Tooltip: Visible on hover

### Tablet (≤ 768px)
- Icon size: 50x50px
- Gap: 12px
- Tooltip: Hidden

### Mobile (≤ 480px)
- Icon size: 45x45px
- Gap: 10px
- Tooltip: Hidden

## Browser Compatibility
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## Performance
- Lightweight CSS animations
- No JavaScript required
- GPU-accelerated transforms
- Minimal impact on page load

## Accessibility
- `title` attribute for screen readers
- `alt` text on images
- Keyboard accessible (tab navigation)
- High contrast on hover

## Tips
1. Use square images for best results
2. Optimize images (compress to reduce size)
3. Use PNG for transparency
4. Keep icon count to 4-6 for best UX
5. Test on mobile devices

## Troubleshooting

### Icons not showing
- Check image paths
- Verify images exist in `/public/client/images/store/`
- Check browser console for errors

### Animation not smooth
- Reduce animation duration
- Check browser performance
- Disable other heavy animations

### Icons overlap content
- Increase z-index in CSS
- Adjust position (right/bottom values)
- Check for conflicting CSS

---
Last Updated: February 15, 2026
