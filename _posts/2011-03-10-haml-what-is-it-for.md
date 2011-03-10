---
layout: post
title: HAML - What is it for?
published: true
---
# {{page.title}}
When i started testing HAML last week i knew that this was what i had been
looking for in a template system. A simple concise syntax with it's
unambiguous indented format which presents data directly without the cruft and
syntactic sugar which overwhelm so many template systems. It is unassuming 
producing only XML, promotes the principles of KISS and DRY, and maintains 
it's readability without being overtly technical or complex. On the other 
hand HAML does what liquid, django templates and clearsilver do, so what is 
HAML really good for?

In contrast to HAML most of the template languages i have encountered proudly declare that they
can be used to generate any text based format, although the purpose and almost
exclusive use of these systems is in creating dynamic HTML. Effectively they
are based on a design goal without a clear target and which, while
occasionally useful, demands that the template syntax be flexible enough to 
fit into any unknown format, often requiring an uncommon syntax and the ability to
escape it's own tags so as not to clash with the host format. These templates
are naturally embedded and behave as functional languages which tends to be a reactive
approach to the problem at hand.

The rigidity of HAML in only producing XML provides the basis for the declarative 
syntax which models the underlying (DOM) tree structure of HTML/XML documents. This
model also encapsulates the data of the document, the opposite of an embedded format,
and provides a readable reference when developing javascript and stylesheets. 
I find the delarative syntax allows more attention to the task of modelling the 
document without the effort of formatting HTML, the structure of
HAML maintains itself. HAML also borrows syntax from ruby providing developers
a familiar environment and further enhancing it's nature as a task oriented 
tool, it does not attempt to be cross platform.

A comment i encountered suggested that HAML should be avoided due to the 
editing difficulties when adding a tag at a lower level of the document, 
requiring much re-indentation. This bothered me, aside from solving the problem
with a good editor it reflects lessons learnt from C and mentioned in Linus
Torvalds style guide for the Linux kernel, which suggests if you are using more
than three levels of indentation the program is too complex. In this way HAML highlights
what all templates should be; small, modular and reusable pieces of an application.
When editing becomes difficult perhaps it is time to split the file into smaller 
modules, and HAML does this nicely.

## Conclusion
There is no reason to immediately scrap every other template language, HAML only
provides another type of solution. This blog is writen in markdown with liquid
templates, not an appropriate application for HAML since i am writing text
with occasional embedded liquid markup. However as i have argued in this blog
it does provide a powerful alternate and may be a better fit for the design goals 
of many projects using other templates. I will certainly be adding it to my
tool belt.
