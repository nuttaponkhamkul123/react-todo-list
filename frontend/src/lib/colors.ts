/**
 * Utility to check if a color is "dark" based on perceived brightness (YIQ).
 */
export function isDark(hex: string): boolean {
    if (!hex || hex === 'transparent' || hex === '#ffffff') return false;

    // Remove hash if present
    const c = hex.replace('#', '');
    const r = parseInt(c.substring(0, 2), 16);
    const g = parseInt(c.substring(2, 4), 16);
    const b = parseInt(c.substring(4, 6), 16);

    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq < 128; // Standard threshold for dark colors
}

/**
 * Returns a high-contrast foreground color (white or black) for a given background hex.
 */
export function getContrastColor(hex: string): string {
    return isDark(hex) ? '#ffffff' : '#000000';
}

/**
 * Adjusts a color to be more readable on a given theme.
 * For light theme: darkens the color.
 * For dark theme: lightens/brightens the color.
 */
export function getAdjustedColor(hex: string, isDarkMode: boolean): string {
    if (!hex || hex === '#ffffff') return 'inherit';

    // For now, let's keep it simple: if color is set, and it's not white,
    // we return the color itself, but we can add logic later to ensure WCAG 4.5:1
    // If the user wants "more contrast", we can return a darker/lighter version.

    // Simple heuristic: if in light mode, the light colors like yellow need darkening.
    // In dark mode, dark colors like blue need lightening.

    return hex; // Start by just returning the color and see how it feels
}
