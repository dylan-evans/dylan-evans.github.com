---
layout: post
title: The correct size of a name
published: false
---
# {{ page.title }}
A word of warning, this is a blog without a conclusion. It is inevitable when
considering any constraint in a new system that the final values will be a stab
in the dark, a best guess for what the future may hold. Imposed data limits are a fact of life for programmers, 
as most common databases require a predefined size, there are limitations in 
available storage, unicode which can quarter the size of a byte encoded field and
old APIs which assume a greatly limited environment by modern standards. So how 
can something as abstract as a name be defined?

The longest name in the world must be some reasonable finite value, if it is
known at all. Although the synical rules of human nature suggest that if it is 
ever known then someone will come up with yet a longer name. So databases exist
where a single name may be up to 64 bytes long, a silly length which would take 
a full minute just to speak, although also a more reasonable 16 unicode 
characters. Programmers tend to err on the side of caution in order to future
proof applications against the rediculous, hard lessons learnt from Y2K and
a host of bugs or security issues. 

Google in all it's wisdom has announced via blog that gmail labels will be 
extended from 40 characters to 225. It truly is fantastic for an independent 
developer to see a massive company such as google experience the same 
doubt and confusion about a hard limit in a field. While 225 characters may have
some internal significance it surely seems like a stab in the dark, a huge number
intended to account for some rediculous unprecedented use. And will it work? It
certainly will.



