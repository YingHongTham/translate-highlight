Firefox Extension for Translating Highlighted Text DE-EN
=================

Some future problems to fix:
- trennbare Verbs are not handle perfectly..
- even some basic words are not found, e.g. "mensch", but
there are many close entries, e.g. "menscheln", "menschenaffenartig", ...
- before deploying, matching all_urls means it will load on all pages,
which will probably be very bad for performance, since it loads
a copy of the entire dictionary; two steps to ameliorate:
-- only load the JS when click on icon on toolbar
-- make calls to a local mysql server
