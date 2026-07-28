export const THEME_STORAGE_KEY = "sarava-theme";

export const THEME_DEFAULT = "default" as const;
export const THEME_LOGO_PASTEL = "logo-pastel" as const;
export const THEME_LILAC_GREEN = "lilac-green" as const;

export type SaravaTheme =
  | typeof THEME_DEFAULT
  | typeof THEME_LOGO_PASTEL
  | typeof THEME_LILAC_GREEN;

export const THEMES: readonly {
  id: SaravaTheme;
  label: string;
  description: string;
}[] = [
  {
    id: THEME_DEFAULT,
    label: "Original",
    description: "Terracota y crema",
  },
  {
    id: THEME_LOGO_PASTEL,
    label: "Pastel",
    description: "Colores pastel del logo",
  },
  {
    id: THEME_LILAC_GREEN,
    label: "Lila / verde",
    description: "Violeta suave y verde del logo",
  },
] as const;

export function isSaravaTheme(value: string | null): value is SaravaTheme {
  return (
    value === THEME_DEFAULT ||
    value === THEME_LOGO_PASTEL ||
    value === THEME_LILAC_GREEN
  );
}

/** Inline boot script to avoid theme flash on reload. */
export const themeBootScript = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t==='${THEME_LOGO_PASTEL}'||t==='${THEME_LILAC_GREEN}'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`;
