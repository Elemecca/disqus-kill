"use strict";

console.log( 'disqus-kill' );

import {DisqusPostWatcher} from './watcher.js';
import './style.css';

try {

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

    let button = document.createElement( 'li' );
    let link = document.createElement( 'a' );
    link.setAttribute( 'href', '#' );
    let icon = document.createElement( 'i' );
    icon.className = "fa fa-ban";
    link.appendChild( icon );
    button.appendChild( link );

    let menu = post.node.querySelector( '.post-menu' );
    menu.appendChild( button );

    if (killedUsers[ post.author ]) {
        console.log( 'killed', post );
        post.node.classList.add( 'collapsed', 'killed' );
    
        var meta = post.node.querySelector( '.post-meta' );

        var bullet = document.createElement( 'span' );
        bullet.className = "bullet";
        bullet.appendChild( document.createTextNode( '•' ) );
        meta.appendChild( bullet );

        var note = document.createElement( 'a' );
        note.className = "killed-notice";
        note.setAttribute( 'href', '#' );
        note.appendChild( document.createTextNode( " killed " ) );
        meta.appendChild( note );
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
