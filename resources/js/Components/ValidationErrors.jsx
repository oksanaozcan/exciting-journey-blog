import React from 'react';
import { useContext } from 'react';
import {LangContext} from '../Context/LangContext';

export default function ValidationErrors({ errors }) {
  const {lang} = useContext(LangContext); 
    return (
        Object.keys(errors).length > 0 && (
            <div className="mb-4">
                <div className="font-medium text-red-600">Whoops! Something went wrong.</div>

                <ul className="mt-3 list-disc list-inside text-sm text-red-600">
                    {Object.keys(errors).map(function (key, index) {
                        return <li key={index}>{lang.get(`validation.${key}`, {attribute: `${key}`})}</li>;
                        // return <li key={index}>{errors[key]}</li>;
                    })}
                </ul>
            </div>
        )
    );
}
