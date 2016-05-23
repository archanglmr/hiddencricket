# Hidden Cricket Tracker
Keeps track of the numbers found in a game of Hidden Cricket (because I have a horrible memory).

**Try it on your phone here!** - http://archanglmr.github.io/hiddencricket/

# Directions
As players hit numbers on the real life dartboard you tap picture where they hit or the number in the list to check it off. As long as there are undiscovered numbers you now have a visual and a list of what numbers are left on the board to aim for.

# What is Hidden Cricket?
It's basically the darts game Cricket except instead of the traditional 15-20 and bulls eye you don't know what numbers a have value until you explore the board by hitting them. This game variation is found on the Pheonix electronic soft-tip boards found in many bars.

More info on Cricket - https://en.wikipedia.org/wiki/Cricket_(darts)

# Built With
- **HTML5**
- **CSS3**
  - **Transitions** - Watch the menu move or the buttons transition instead of jump between states.
  - **Viewport (CSS Unit)** - Everything scales relative to the size of the viewport using `vw` and `vh` instead of pixels or percent. - https://css-tricks.com/viewport-sized-typography/
  - **Responsive** - Works equally well from iPhone to large desktop (though I was intending phone use).
  - **SASS** - To compile SCSS files.
    - **Compass** - Already includes my favorite browser reset as well as handy SCSS helpers.
- **JavaScript** - To make it all work of course!
  - **jQuery** - For DOM manipulation and AJAX.
  - **Single Page Web Application** - JavaScript generates and manages the page (no refreshing).
  - **Standalone Mode** - If you add the app to your iPhones home screen it is completely functional. I even overcame the antiquated builtin 300ms "click" delay to make it nice and snappy.
  - **Local Storage** - Standalone Mode reloads the page every time you launch it as an app. Sometimes if you haven't used the web browser in a while it will also reload the page. Local Storage lets me keep the state of the app so you don't lose your game.
- **Assets**
  - **SVG** - Found a sample SVG dartboard and restructured it completely to make it functional. SVG needs to be inline in order for CSS to be able to style each element so I loaded it with AJAX and inline it myself to keep the SVG file standalone.
  - **Font Awesome** - That pretty little menu back arrow thing is much nicer than using the less-than character (<). - http://fontawesome.io
- **Version Control**
  - **Git** - Really to play with GitHub.
  - **GitHub Pages** - Excellent for free hosting and automatically deploys using this guys tip. - http://brettterpstra.com/2012/09/26/github-tip-easily-sync-your-master-to-github-pages/



