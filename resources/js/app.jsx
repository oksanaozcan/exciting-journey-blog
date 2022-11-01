import './bootstrap';
import '../css/app.css';

import React from 'react';
import { render } from 'react-dom';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import Lang from 'lang.js';
import messageData from '../../public/messages.json';
import { createContext } from 'react';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

//////////////////////LangContext//////////////////////////////

const lang = new Lang();
lang.setMessages({...messageData});

export const LangContext = createContext();

//////////////////////////////////////////////////


createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        return render(<LangContext.Provider value={lang}><App {...props} /></LangContext.Provider>, el);
    },
});

InertiaProgress.init({ 
  delay: 250,  
  color: '#29d', 
  includeCSS: true, 
  showSpinner: true,
});
