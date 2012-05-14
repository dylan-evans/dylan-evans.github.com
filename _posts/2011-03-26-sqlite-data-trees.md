---
layout: post
title: SQLite data trees
published: true
---
# Hierarchical Data in SQLite 

*Yes, you can model tree structures in SQLite.* However there are certain
limitations to SQLite, it doesn't have some of the high level features of 
other databases, such as CTE (Common Table Expressions), which make these
operations simpler. This page contains some tips which might help in 
creating a hierarchical database in SQLite.

## Type Of Operations

Viewing the data as a hierarchy introduces some unique types of queries 
which are not well supported by SQLite. In order to be functional and 
practical some hacking and experimentation is required. In order to make 
a tree structure which is vaguely useful the following basic operations 
should be supported:

* Find the path of a given node
* Find a node from a path
* Find the children of a node

## Insert Triggers

This method uses a trigger in combination with a temporary table to recursively
scan a tree of data. The limitation of this method is that each record must 
have a unique field to query, although not a problem when using primary keys 
if you want to select a path by string then that string will need to be unique.

The key to using triggers is the [pragma](http://www.sqlite.org/pragma.html)
recursive_triggers which, if it is not clear, allows triggers to be fired
from within the body of a trigger. This is only possible after version 3.6.18
(released September 2009) and must be enabled explicitly.

	PRAGMA recursive_triggers = TRUE;

Create a table, any table which references it's parent node and has a unique 
identifier will be fine. If it's not practical to use the key to select the data
then another unique field should be added.
	
	CREATE TABLE Category (id INTEGER PRIMARY KEY, parent INTEGER, name VARCHAR(16) UNIQUE);
	

In order to execute the query a temporary table is used to hold the results. 
The easiest way to do this is to duplicate the schema of the data table.

	CREATE TEMP TABLE Path (node INTEGER, parent INTEGER, name VARCHAR(16) UNIQUE);
	
	CREATE TRIGGER find_path AFTER INSERT ON Path BEGIN
		INSERT INTO Path SELECT Category.* FROM Node WHERE 
			Node.id = new.parent;
	END;

Assuming that there is some appropriate data in the table the path can be found
by doing something a little unusual

	INSERT INTO Path SELECT * FROM Node WHERE label = "foo";

	SELECT * FROM Path ORDER BY node ASC;

	DROP TABLE Path;

The insert causes the trigger to fire with the selected node from Category, 
which then selects and inserts the parent node causing a recursive loop to the
root node. That is for each node that is inserted into Path it's parent is 
inserted, then a select is required in order to actually retrieve the values.
It's a good idea to clean up the Path table by dropping it, although this is
implied if the database is closed.

- [SQLite Create Trigger](http://sqlite.org/lang_createtrigger.html)

### Selecting A Path

Because this model specifies unique branch names retrieving a branch by name is
as simple as doing a select using the name.

	SELECT * from Category where name = 'foo';
		
## Using Path Names

The simplest way to store a tree is to store a full path on each record in the 
table.

	CREATE TABLE Tree (id INTEGER PRIMARY KEY, path VARCHAR(256), name VARCHAR(16));
	
So in order to find the nodes which make up a path 'foo.bar.monkey' you would 
do a query like:
	
	SELECT * FROM Tree WHERE path IN ('foo', 'foo.bar', 'foo.bar.monkey');

Or the more error prone but simpler:

	SELECT * from Tree where path like 'foo%';

### Combining Triggers and Absolute Paths

A more powerful extension to the trigger method is to use the absolute path
as the name on each node. Since branches are unique this resolves the limited
namespace of the node name although unless the actual node name (not path) is
also stored then selecting a node by name becomes a little more complicated.

	SELECT * FROM Category where name like '%.bar' and parent = 
		(select id from Category where name = 'foo';
		
## Alternative Methods

### Looping over a select

Looping over a select probably isn't as bad as it sounds in SQLite since in most cases
the database is opened locally and although not ideal the impact will be much lower than
the typical cost of network operations which affect other databases.

### Using an ORM

That is cheating! But that's ok since that's what software design is all about. Using
an ORM will seriously shortcut the work required to get a tree based data system up
and running, although in practice it will probably not be very efficient, doing a select 
for each node and going back for every node in the path.

## Example

This is an old and incomplete, but working, example of processing hierarchical data with triggers.

- [https://gist.github.com/887031](https://gist.github.com/887031)
 
{{ '<div class="small-gist"><script src="https://gist.github.com/887031.js"> <!-- --> </script></div>' }}

*Note: This article has been rewritten, it is not perfect but is a huge leap 
from the original. I am always learning when it comes to writing. (14/05/2012)*