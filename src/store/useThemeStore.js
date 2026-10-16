import { create } from 'zustand';

const getInitialTheme = () => {
  const saved = localStorage.getItem('campus_theme');
  if (saved === 'light' || saved === 'dark') {
    return saved;
  }
  // Default to dark mode for CampusWhisper aesthetic
  return 'dark';
};

// Apply theme to HTML root element
const applyThemeToDocument = (theme) => {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  localStorage.setItem('campus_theme', theme);
};

// Initialize immediately on load
const initialTheme = getInitialTheme();
applyThemeToDocument(initialTheme);

export const useThemeStore = create((set) => ({
  theme: initialTheme,

  toggleTheme: () => {
    set((state) => {
      const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
      applyThemeToDocument(nextTheme);
      return { theme: nextTheme };
    });
  },

  setTheme: (theme) => {
    applyThemeToDocument(theme);
    set({ theme });
  },
}));
