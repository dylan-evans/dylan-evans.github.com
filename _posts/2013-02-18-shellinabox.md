---
layout: post
published: true
title: Shell in a box
---
# The best web app ever is a shell!

[Shell in a box](http://code.google.com/p/shellinabox/)

Opening up a browser and seeing a login prompt is surprisingly cool. I wasn't
expecting much having played with a few web based terminals in the past, Java 
applet based emulators mostly which could only connect back to the web host. 
After reading some good stuff about shellinabox i decided to give it a try. 
Install is easy on debian, just an apt-get and the default configuration runs on 
all interfaces, which i was a bit surprised about. The application runs a web 
server which serves the html/javascript of the client and handles the ongoing 
connection.

The emulation is pretty complete, no problems with vim, aptitude or any other
curses program i have tried. Default fonts and colours are great (fairly close
to my gnome-terminal setup actually) and can be adjusted through well understood
stylesheets. The interface is simple and featureless, which is elegant in a 
minimalist way, but lacks the power of a modern emulator. Compared to the stock
putty terminal it's definantly a potential replacement (assuming you don't need
to forward ports or use X applications), being a browser bound gives it the
advantage of tabs a definite weakness of putty.

Pairing shellinabox and tmux makes efficient use of screen space and i have 
been experimenting with using it for development where i find it useful to
have system monitoring, an SQL prompt and shell alongside my IDE. The downside
so far is that i open 10 more tabs in the same window and lose my shells. As for 
remote administration, which i don't have much need for, i expect the app would 
be perfect for the type of unexpected maintainance that takes place on a tablet 
or at your mother's house.

Recommended to anyone that works in a shell.

![Screenshot](/images/shellinabox2013-02-18.png)

 

