---
layout: post
title: Glorious Javascript
published: true
categories:
- javascript
- nodejs
- v8
---
# {{ page.title }}
From time to time i have a fantastic and innovative idea which will revolutionise
the internet and transform the web from a desolate wasteland into a modern
day garden of eden! The only problem is i can never pick an environment to
develop it in. It's not that they are all bad, the problem is that they are
all so good, i can't split the difference much of the time and when i can
it's X versus Y feature, both of which i need. And so like magic when i embarked
on my [RoboBall](http://dylan-evans.github.com/2011/03/01/roboball.html)
project, Node.js popped out of thin air to taunt me with it's javascript goodness.

Javascript has been hanging around for a long time now. I seem to remember i 
didn't much like it in the 90s, and warmed to it only a little in the 2000s, 
after all it was used mostly for web pages and didn't come with the complete
libraries of Java, Python or any other language. In fact Javascript doesn't
come with much of anything, just a wierd little classless OO language, which
led me to consider embedding [SpiderMonkey](http://www.mozilla.org/js/spidermonkey/)
into [COSMud](http://www.willowhaven.org) (a now extinct mud server). This is where
Javascript really shines, as an embedded language it will become whatever you need
it to be while remaining in a secure sandbox.
    
Or at least it did until V8 and [node.js](http://nodejs.org) came along. V8
itself is fairly straight forward to embed in a C++ program and provides the
rediculous speeds which it was designed for. Node.js provides an awesome evented
IO layer which opens javascript to the world making on not only a viable option but
an awesome environment for server programming. Using Node.js also maintains the 
options for including C++ code and runnning sandboxed scripts (with some limitations)


## The future of RoboBall
It seems a little strange that all dynamic languages can't be easily sandboxed, 
some effort is required to seperate the code from the standard libraries of Python, 
but Javascript does this natively. In the context of games robots are just embedded 
scripts V8 with or without
Node.js is an ideal environment for RoboBall. This is where the spanner is thrown
in the works, should i ignore V8 and hack python into submission,
perhaps accepting some compromise on security or complexity. Or should i ditch
python, the language which inspired the project, and move to an environment which
was created for the purpose of being embedded, and develop what will probably
be a very elegant program. I can't be certain yet, but this is my dilemma for today.

####See also
[Lua](http://lua.org) - Another embedded language

