"use client";
import context from './cinemateca.js';
import { useEffect } from 'react';

export default function Cinemateca() {
  useEffect(() => {
    const {
      handleFetchXML,
      XMLtoJavascriptObject,
      JavaScriptObjectToHTML,
      saveJsonToFile
    } = context();

    (async () => {
      const doc = await handleFetchXML();
      const obj = await XMLtoJavascriptObject(doc);
      await JavaScriptObjectToHTML(obj);
    })();
  }, []);

  return (
    <div id="container">
    </div>
  );
}