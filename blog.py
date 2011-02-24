"""\
Create a blog post without even thinking about the date.

This program will:
* Create a file named by the -t option with year-month-day
* Add front matter
* Open the file with the default $EDITOR or vi
* When the editor exits it will check if the file has changed
* If it has not it will delete the file and exit
* Add the file with git and commit according to the -m option

This program currently
* Prints TODO and exits
"""

print "TODO"
#success

import os
import sys
import stat
import re
import datetime
from optparse import OptionParser

def safe_title(title):
    t = re.sub('[^A-Za-z0-9\s]', '', title) #Remove all symbols
    t = re.sub('\s+', '-', t.strip().lower())
    return t[0:50] if len(t) > 50 else t

def file_name(title):
    return datetime.date.today().strftime('%Y-%m-%d') + '-' + safe_title(title)

def create_post(title):
    filename = os.path.join('_posts', file_name(title) + '.md')
    print 'Creating file: %s' % filename
    try:
        f = open(filename, 'w')
    except:
        print 'Failed to create file'
        sys.exit(1)
    f.write('---\ntitle: %s\npublish: true\nlayout: post\n---\n' % title)
    f.close()
    return filename
    
if __name__ == '__main__':
    opt = OptionParser()
    opt.add_option('-t', '--title', help='Blog Title')
    opt.add_option('-m', '--message', help='Commit message', default='Add new blog' )
    (options, args) = opt.parse_args()
    
    if not options.title:
        print("The -t TITLE argument is required")
        sys.exit()
    
    create_post(options.title)
    