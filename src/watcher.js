"use strict";

import {EventEmitter} from 'events';

export class DisqusPost {
    constructor (node) {
        this.node = node;
    }

    get author() {
        return this.node
            .querySelector( 'span.author a' )
            .getAttribute( 'data-username' );
    }

    get date() {
        return new Date(
            this.node.querySelector( '.post-meta .time-ago' )
                .getAttribute( 'title' )
        );
    }

    get body() {
        return this.node
            .querySelector( '.post-message' )
            .textContent;
    }
}

export class DisqusPostWatcher
extends EventEmitter {
    constructor () {
        super();

        this.observer = new MutationObserver( (changes) => {
            for (let change of changes) {
                for (let node of change.addedNodes) {
                    this.walkPost( node );
                }
            }
        } );
    }

    observe (element) {
        this.observer.observe( element, {
            childList: true,
            subtree: true,
        } );
    }

    walkPost (node) {
        if (! node instanceof Element) return;
        if ('LI' !== node.tagName) return;
        if (!node.classList.contains( 'post' )) return;

        let stop = false;
        this.emit( 'post',
                new DisqusPost( node ),
                () => { stop = true; }
            );

        if (stop) return;

        let children = node.querySelector( 'ul.children' );
        for (let child of children.childNodes) {
            this.walkPost( child );
        }
    }
}
