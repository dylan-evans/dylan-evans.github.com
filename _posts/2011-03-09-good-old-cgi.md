---
layout: post
title: Good Old CGI
published: false
---
# {{page.title}}
CGI is the original and still the simplest way to deliver dynamic content to
the browser. However with the rise of modern frameworks, advanced interfaces 
used to connect to the web server (e.g. WSGI) and layers of reusbable 
middleware, CGI is an archaic technology which is being left for dead. And
yet i still find the simplicity of CGI elegant and often the easiest way
to test out an idea before breaking out django. As a standard it may be
a hack but often the most fun you can have is by dumping the overhead
you don't need and diving into code.

I wrote a small script enabling the execution of CGI files (from python) and was 
surprised by the simplicity of the standard. The intention was to develop a CGI handler for 
[tornado](http://www.tornadoweb.org) but after i began it was difficult to
see a use for it. Still while i deleted the repository i left the script
as a gist in part to demonstrate the directness of the protocol in delivering
content to the browser and also in the hope that it became useful to myself
or someone else.

As for the future, i certainly hope there is a place for CGI in smaller apps
and simple services. The protocol is so basic it might be harder to get rid
of than is worth the effort. I don't have any plans to develop with CGI however, 
and with the abundance of new and exciting tools on offer it may be all too easy 
for the standard which started it all to slip away into obscurity. 

###cgiexec.py
{{'<div class="small-gist"><script src="https://gist.github.com/80113a377d2e526e9b34.js?file=cgiexec.py"><!-- --></script></div>'}}
