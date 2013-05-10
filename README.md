
# SKULLWALL 
### the Catacombs of the Internet
Developed by The Real Jay Z in 2013

Much thanks to John Schimmel and Teammates at ITP

```

         _,.-------.,_
     ,;~'             '~;, 
   ,;                     ;,
  ;                         ;
 ,'                         ',
,;                           ;,
; ;      .           .      ; ;
| ;   ______       ______   ; | 
|  `/~"     ~" . "~     "~\'  |
|  ~  ,-~~~^~, | ,~^~~~-,  ~  |
 |   |        }:{        |   | 
 |   l       / | \       !   |
 .~  (__,.--" .^. "--.,__)  ~. 
 |     ---;' / | \ `;---     |  
  \__.       \/^\/       .__/  
   V| \                 / |V  
    | |T~\___!___!___/~T| |  
    | |`IIII_I_I_I_IIII'| |  
    |  \,III I I I III,/  |  
     \   `~~~~~~~~~~'    /
       \   .       .   /
         \.    ^    ./   
           ^~~~^~~~^ 

```

-------------------------------------------------

## Installation Instructions :

Pre-1. If you haven't already, you'll want to install Git : http://git-scm.com/downloads
new to git? : http://skli.se/2012/09/22/introduction-to-git/

1. Install Node : http://nodejs.org/
Node is a platform on which to build web applications with Javascript.

2. Register Heroku Account & Install Heroku Tool : https://www.heroku.com/
See this great guide for more detailed heroku setup : http://itpwebclass.herokuapp.com/notes/week-3

3. Setup MongoDB on Heroku Account. A good guide for this : http://itpwebclass.herokuapp.com/notes/week-5
MongoDB is a Mongoose Database Client. This is where we store our users, skulldrawings, session+cookie info, and references to photos

4. run "npm install" in terminal while inside the skullwall directory.
NPM stands for Node Package Module / Manager. Packages extend Node's functionality.
the command below should install all the requisite packages. Might be good to run with "Super User Do", i.e.

     sudo npm install

5. This app also uses an Amazon S3 Bucket to handle Photo Uploads. I know this is all somewhat involved, but! To learn about buckets, check out : 
http://itpwebclass.herokuapp.com/notes/week-11

6. Foreman and Nodemon are nice tools for running and automatically reloading your app running on localhost, or a local server instance.
To start playing with a local instance of skullwall, in terminal, run :

      foreman run nodemon app.js

This should launch your app.js, and get your node-ball running.

7. Email me if you are lost : jz@thenewsentry.net

-------------------------------------------------

// SKULLWALL =+=  Yet to do:

* show rules on hover <-- rules are 1. Must Contain Skull 2. No Pure Writing 3. No Hate
* Sort skulls by kudos
* Add more types of Kudos, including White Lotus
* candleCount refresh on kudos add
* scroll load more using ajax

* Kindof Big Thing : Second Pen - 50% opacity white for making fills (sorta done)

* back burner dreams
	1. Scale skulls to size of document.window - responsive equivalent
	3. There is no # 3. 

* tidy up code and document clearly (ongoing)

-------------------------------------

// questions & notes to self : 

* best way to handle shrinking dataURL's to images? <-- Found Node Handler
* best way to handle relationship between user account and login / pw stuff? <-- Found Passport-Anon Module

 ------------------------------------

 // SKULLWALL =+=  now done: 

 * Admin page - add stuff like delete(done), name check stuff
 * fixed ajax oddness with candling system ajax skullUpdate call and ajax returning error
 * barebones photo admin page <-- weird problem here
 * SkullName Hover Font Line Spacing Wonkyness
 * Add anon user passport strategy <-- addresses dumb redundancies with routes
 * custom horizontal rules
 * cuztom skull "favorite icon" favicon
 * Reconsider size of skull in wall

 -------------------------------------

