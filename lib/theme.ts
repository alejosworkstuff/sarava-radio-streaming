export const THEME_STORAGE_KEY = "sarava-theme";
export const THEME_LOGO_PASTEL = "logo-pastel";

/** Inline boot script to avoid pastel theme flash on reload. */
export const themeBootScript = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t==='${THEME_LOGO_PASTEL}'){document.documentElement.setAttribute('data-theme','${THEME_LOGO_PASTEL}');}}catch(e){}})();`;
