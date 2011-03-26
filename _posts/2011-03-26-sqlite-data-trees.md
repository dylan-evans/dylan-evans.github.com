---
layout: post
title: SQLite data trees
published: true
---
#SQLite data trees
SQL is a good tool i cannot love. I really enjoyed studying relational algebra
at university, it is a simple and elegant way to represent and query data 
however when it is applied in SQL it becomes tougher to model data in an object
oriented fashion that in popular, requiring either a compromise in the program
or inefficient SQL hacks. Of course the power of databases, most of which use
SQL, is unquestionable, tools like SQLite allow a program to easily scale and
manage it's data while professional databases like MySQL and Oracle provide
fast access to large amounts of data and pave the way for modern web apps.
This wierd incohesion between SQL and object oriented languages has led to the
popularity of ORMs simplfying otherwise complex projects.

I like to model data in hierarchies, it is a natural structure which applies
to many problems. SQL allows this easily but it becomes increasingly difficult
to make complex queries which would be more suited to a functional language such
as lisp. Many enterprise databases now provide common table expressions(CTE), 
a recent addition which simplify hierarchical queries by allowing recursion, 
however it could be argued that a more elegant solution would be to scrap SQL
and start over with a better langauge. Millions of lines of enterprise queries
ensure that this will not happen anytime soon.

I still enjoy writing SQL even if it is sometimes frustrating limited. SQLite
is definitely my first call for storing embedded data and it's wide spread
availability makes it an axiomatic tool. I will always have my eyes open for
something new however. :-)

###tree.sql
This is a simple example of an SQL trigger called recursively to query
a tree structure. I could not find a solution for this so i made it up.
{{ '<div class="small-gist"><script src="https://gist.github.com/887031.js"> <!-- --> </script></div>' }}
