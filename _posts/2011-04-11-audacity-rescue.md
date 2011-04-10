---
layout: post
title: Audacity Rescue
published: true
---
# {{page.title}}
I created a shell script in order to reassemble a large number of .au files 
after [Audacity](http://audacity.sourceforge.net) crashed. I'm not a regular
user of Audacity so it is perhaps not as general purpose as it could be, but
it does a good job of removing headers and assembling the files into one big
.au file. I don't think it will work with stereo however since Audacity splits
channels over multiple files, but it may be a starting point for anyone
attempting crash recovery.

Usage is simple:

    ./audacity_rescue.sh [SOURCE PATH] [DESTINATION FILE]

For example:

    ./audacity_rescue.sh /export/archive/jess/jessonair_data onair.au

*If there is an interest i will develop something more general purpose, leave a 
comment or email me*

### audacity_rescue.sh


<div class="small-gist">
    <script src="https://gist.github.com/912222.js"> </script>
</div>
