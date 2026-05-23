export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              
              var theme = 'light';
              var hasUserSetTheme = false;
              var themeData = localStorage.getItem('vsuet_schedule_theme');
              
              
              
              if (themeData) {
                var parsed = JSON.parse(themeData);
                if (parsed.state && parsed.state.theme) {
                  theme = parsed.state.theme;
                  hasUserSetTheme = parsed.state.hasUserSetTheme || false;
                  
                }
              } else {
                
                var systemIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                theme = systemIsDark ? 'dark' : 'light';
                
                
               
                var initialState = {
                  state: {
                    theme: theme,
                    hasUserSetTheme: false,
                    isMounted: false,
                    isInitialized: false
                  }
                };
                localStorage.setItem('vsuet_schedule_theme', JSON.stringify(initialState));
                
              }
              
              
              document.documentElement.setAttribute('data-theme', theme);
              document.documentElement.style.colorScheme = theme;
              
            } catch (e) {
              console.warn('ThemeScript: ошибка:', e);
              document.documentElement.setAttribute('data-theme', 'light');
              document.documentElement.style.colorScheme = 'light';
            }
          })();
        `,
      }}
    />
  );
}
