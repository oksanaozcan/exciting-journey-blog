import React from "react";
import { useContext } from "react";
import { LangContext } from "../../Context/LangContext";
import { formatDistance } from "date-fns";
import { enUS, ru } from 'date-fns/locale';

export default function ReplyComment ({reply}) {
  const {lang} = useContext(LangContext);

  return (
    <div className="flex-1 bg-gray-100 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
      <strong>{reply.user_name}</strong> <span className="text-xs text-gray-400">
      {formatDistance(
        new Date(reply.created_at), new Date(), 
        {addSuffix: true, locale: lang.getLocale() == 'en' ? enUS : ru}
      )}
      </span>
      <p className="text-xs sm:text-sm"><strong>to {reply.parent_user}: </strong> {reply.message}</p>
    </div>
  )
}