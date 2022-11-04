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
import { useState } from 'react';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

//////////////////////LangContext//////////////////////////////

function makeNewLang (newLocaleString) {
  let myStr = newLocaleString.toString();
  let l = new Lang();
  l.setLocale(myStr);
  l.setMessages({...messageData});
  return l;
}

const locales = [
  "en", "ru",
];

const lang = new Lang();
lang.setMessages({...messageData});

export const LangContext = createContext({lang, locales});

export const LangContextProvider = ({lang, locales, children}) => {
  const [langState, setLangState] = useState(lang);

  const setNewLocale = (newLocaleString) => {    
    let newlang = makeNewLang(newLocaleString)
    setLangState(newlang);   
  }

  return <LangContext.Provider value={{lang: langState, locales, setNewLocale}}>
    {children}
  </LangContext.Provider>
}

//////////////////////////////////////////////////

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),    
    setup({ el, App, props }) {      
        return render(<LangContextProvider lang={lang} locales={locales}><App {...props} /></LangContextProvider>, el);
    },
});

InertiaProgress.init({ 
  delay: 250,  
  color: '#29d', 
  includeCSS: true, 
  showSpinner: true,
});
