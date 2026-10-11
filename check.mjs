import {readFile,access} from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
for(const page of ['index','services','contact']){
 const html=await readFile(`dist/${page}.html`,'utf8');
 assert(html.includes('id="main"'));assert(html.includes('<title>'));assert(html.includes('Toronto'));
 for(const [,link] of html.matchAll(/(?:href|src)="([^"#?]+)(?:[?#][^"]*)?"/g)) if(!/^(https?:|mailto:|tel:)/.test(link)) await access(path.join('dist',link));
 if(page!=='contact'){assert(html.includes('$90'));assert(html.includes('$120'));assert(!html.includes('Starting at'));}
}
console.log('All pages, local links, assets, and fixed prices verified.');
