// ==UserScript==
// @name        Disqus Kill
// @namespace   maltera.com
// @include     https://disqus.com/embed/comments/*
// @version     0.0.1
// @grant       GM_addStyle
// ==/UserScript==

(function(){
"use strict";

console.log( 'disqus-kill frame' );

try {
  
GM_addStyle(
      ".post-meta .killed-notice {"
    + "    color: rgba( 146, 0, 0, .35 );"
    + "    font-weight: 500;"
    + "}"
);
    
var killedUsers = {
    'FelineCannonball': true
};
    
function doctorComment (root) {
    var author = root.querySelector( 'span.author a' ).getAttribute( 'data-username' );
    
    console.log( 'comment', author );
    
    var menu = root.querySelector( '.post-menu' );
    
    var button = document.createElement( 'li' );
    
    var link = document.createElement( 'a' );
    link.setAttribute( 'href', '#' );
    link.appendChild( document.createTextNode( 'Kill' ) );
    button.appendChild( link );
    menu.appendChild( button );
    
    
    
    if (killedUsers[ author ]) {
        console.log( 'killed', root );
        root.classList.add( 'collapsed', 'killed' );
    
        var meta = root.querySelector( '.post-meta' );

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
}
    
(new MutationObserver( function (changes) {
  try {
  for (var changeIdx = 0; changeIdx < changes.length; changeIdx++) {
    var change = changes[ changeIdx ];
      
    for (var nodeIdx = 0; nodeIdx < change.addedNodes.length; nodeIdx++) {
      var node = change.addedNodes[ nodeIdx ];
      if (!( node instanceof Node )) continue;
      if ("LI" !== node.tagName) continue;
      
      console.log( 'added', node );
      
      doctorComment( node );
       
      var comments = node.querySelectorAll( 'li.post' );
      for (var commentIdx = 0; commentIdx < comments.length; commentIdx++) {
        doctorComment( comments[ commentIdx ] );
      }
    }
  }
    
  } catch (caught) {
    console.log( 'disqus-kill cb error', caught );
  }
})).observe( document.body, {
  childList: true,
  subtree: true,
});
  
} catch (caught) {
  console.log( 'disqus-kill error', caught );
}
    
})();
