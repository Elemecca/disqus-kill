"use strict";

console.log( 'disqus-kill' );

import {DisqusPostWatcher} from './watcher.js';
import './style.css';

try {

function tmpl (template) {
    return function (context) {
        let frag = document.createElement( 'template' );
        frag.innerHTML = template.apply( null, arguments );
        return frag.content;
    }
}

let tmplPostMenu = tmpl(require( './post-menu-add.hbs' ));
let tmplPostNotice = tmpl(require( './post-kill-notice.hbs' ));

// add Font Awesome to the page for icons
let faStyle = document.createElement( 'link' );
faStyle.setAttribute( 'rel', 'stylesheet' );
faStyle.setAttribute( 'type', 'text/css' );
faStyle.setAttribute( 'href',
    'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css'
);
document.head.appendChild( faStyle );

let killedUsers = {
    'FelineCannonball': true,
}

let watcher = new DisqusPostWatcher();
watcher.on( 'post', (post) => {
    console.log( 'post', post.author, post.date, post.body );
    try {

    let menu = post.node.querySelector( '.post-menu' );
    menu.appendChild( tmplPostMenu() );

    if (killedUsers[ post.author ]) {
        console.log( 'killed', post );
        post.node.classList.add( 'collapsed', 'killed' );

        let meta = post.node.querySelector( '.post-meta' );
        meta.appendChild( tmplPostNotice() );
    }

    } catch (caught) {
        console.log( 'disqus-kill post error', caught );
    }
} );

watcher.observe( document.body );

} catch (caught) {
    console.log( 'disqus-kill error', caught );
}
console.log( 'disqus-kill end' );
