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
from subprocess import Popen, PIPE

def safe_title(title):
    "Convert the title string into a safe format"
    t = re.sub('[^A-Za-z0-9\s]', '', title) #Remove all symbols
    t = re.sub('\s+', '-', t.strip().lower())
    return t[0:50] if len(t) > 50 else t

def file_name(title):
    "Create the date coded filename"
    return datetime.date.today().strftime('%Y-%m-%d') + '-' + safe_title(title)

def create_front_matter(title, published=True):
    "Create a front matter for the post"
    return ("---\n" "layout: post\n" "title:%s\n" "published: %s\n" "---\n") % \
          (title, 'true' if published else 'false')
          
def create_post(title, published):
    "Create a post file and write the front matter"
    filename = os.path.join('_posts', file_name(title) + '.md')
    print 'Creating file: %s' % filename
    try:
        f = open(filename, 'w')
    except:
        print 'Failed to create file'
        sys.exit(1)
    f.write(create_front_matter(title, published))
    f.close()
    return filename
    
if __name__ == '__main__':
    default_editor = os.environ['EDITOR'] if os.environ.has_key('EDITOR') else '/usr/bin/vi'
    opt = OptionParser()
    opt.add_option('-t', '--title', help='Blog Title')
    opt.add_option('-m', '--message', help='Commit message', default='Add new blog' )
    opt.add_option('-P', '--no-publish', action='store_true', default=False, help='Do not publish post')
    opt.add_option('-e', '--editor', default=default_editor)
    (options, args) = opt.parse_args()
    
    if not options.title:
        print("The -t TITLE argument is required")
        sys.exit()
    
    filename = create_post(options.title, not options.no_publish)
    # I have to get back to that
    #p = Popen([options.editor, filename], stdin=sys.stdout, stdout=sys.stdout)
    #p.wait()
    
    