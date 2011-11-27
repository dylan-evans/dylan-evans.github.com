---
layout: post
title: Prototype Programming in C
published: true
---
# {{ page.title }}
As part of my research into prototype programming i have been exploring how
prototype objects can be created and used in C. An understanding of how to
best implement such dynamic structures in a low level language is critical
when considering how it can be used in a dynamic language since most of them
are written in C. The obvious restrictions of C do not permit a
clean addition to the language, however by using procedures to proxy methods
and delegate to actual functions it is possible to present a working prototype 
capable API.

This implementation is incomplete and is only intended as an example.

[Direct link](https://gist.github.com/986154)


<script src="https://gist.github.com/986154.js"> </script>
