/**
 * TraitCompass - Publisher Ad Management & Container Handler
 * Compliance: Google AdSense / Publisher Policies
 * 
 * Note: Deceptive mock ads, artificial partner copy, and dummy '#' links have been
 * completely removed to strictly adhere to Google Publisher Policies regarding ad
 * presentation, imitation of content, and accidental click prevention.
 *
 * To integrate live Google AdSense ads:
 * 1. Add your AdSense account script to the <head> of your pages:
 *    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
 * 2. Replace or populate the ad slot containers (.ad-slot) with your <ins class="adsbygoogle"> tags.
 */

(function () {
  'use strict';

  // Standard policy-compliant label for reserved advertising space
  function renderCompliantPlaceholder(slotEl, labelText) {
    if (!slotEl) return;

    // Check if the container already has live ad tags or content
    if (slotEl.querySelector('ins.adsbygoogle') || slotEl.children.length > 0) {
      return;
    }

    const placeholder = document.createElement('div');
    placeholder.className = 'ad-compliance-placeholder';
    placeholder.setAttribute('aria-hidden', 'true');
    placeholder.style.cssText = [
      'display: flex',
      'flex-direction: column',
      'align-items: center',
      'justify-content: center',
      'min-height: 80px',
      'padding: 0.75rem 1rem',
      'background: var(--bg-card-secondary, #f8fafc)',
      'border: 1px dashed var(--border-color, #cbd5e1)',
      'border-radius: var(--radius-md, 8px)',
      'color: var(--text-light, #94a3b8)',
      'font-size: 0.75rem',
      'text-transform: uppercase',
      'letter-spacing: 0.08em',
      'margin: 0.5rem 0'
    ].join(';');

    placeholder.innerHTML = `<span>Advertisement &bull; ${labelText || 'Sponsored'}</span>`;
    slotEl.appendChild(placeholder);
  }

  function initAdContainers() {
    // Leaderboard units
    document.querySelectorAll('.ad-slot-leaderboard').forEach(el => {
      renderCompliantPlaceholder(el, 'Leaderboard');
    });

    // Sidebar units
    document.querySelectorAll('.ad-slot-sidebar').forEach(el => {
      renderCompliantPlaceholder(el, 'Display');
    });

    // Native in-article units
    document.querySelectorAll('.ad-slot-native').forEach(el => {
      renderCompliantPlaceholder(el, 'In-Article');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdContainers);
  } else {
    initAdContainers();
  }
})();
