import './bootstrap';
import '../css/app.css';
import React from 'react';
import { render } from 'react-dom';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { LangContextProvider, locales, lang } from './Context/LangContext';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),    
    setup({ el, App, props }) {      
        return render(<LangContextProvider 
          lang={lang} 
          locales={locales}
        ><App {...props} /></LangContextProvider>, el);
    },
});

InertiaProgress.init({ 
  delay: 250,  
  color: '#29d', 
  includeCSS: true, 
  showSpinner: true,
});
