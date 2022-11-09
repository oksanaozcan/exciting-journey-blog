import Lang from 'lang.js';
import messageData from '../../../public/messages.json';
import { createContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

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

const LangContext = createContext({lang, locales});

const LangContextProvider = ({lang, locales, children}) => {
  const storageLocale = window.localStorage.getItem('MY_LOCALE');   

  const [isCookieAccepted, setIsCookieAccepted] = useState(storageLocale !== null ? true : false);
  
  const [langState, setLangState] = useState(storageLocale !== null ? makeNewLang(storageLocale) : lang);

  useEffect(() => {
    if (isCookieAccepted) {
      window.localStorage.setItem('MY_LOCALE', langState.locale)
    } else {
      window.sessionStorage.setItem('MY_LOCALE', langState.locale);  
    }    
  }, [langState, isCookieAccepted, setIsCookieAccepted])

  const setNewLocale = (newLocaleString) => {    
    let newlang = makeNewLang(newLocaleString)
    setLangState(newlang);   
  }

  return <LangContext.Provider value={{lang: langState, locales, setNewLocale, isCookieAccepted, setIsCookieAccepted}}>
    {children}
  </LangContext.Provider>
}

export {locales, lang, LangContext, LangContextProvider}