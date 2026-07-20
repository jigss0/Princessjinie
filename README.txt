=====================================================
 TO MY BEAUTIFUL PRINCESS — a magical apology website
=====================================================

WHAT THIS IS
------------
A fully responsive, animated 4-page fairytale website:
  Page 1 — Magical welcome with portrait, typing animation, "Begin Our Story"
  Page 2 — Heartfelt apology that reveals line by line, with confetti
  Page 3 — Hanging Polaroid memory wall with a lightbox viewer
  Page 4 — Theatre curtain reveal + final video + closing message

Built with plain HTML, CSS and vanilla JavaScript only.
No React, Vue, Tailwind, Bootstrap, Node, npm, or build step.

HOW TO RUN
----------
Just double-click "index.html" (or open it in any browser).
That's it — nothing to install, nothing to build.

Note: the page uses Google Fonts (Great Vibes, Playfair Display,
Quicksand) loaded from the web, so an internet connection is
needed the first time a browser opens it in order to fetch the
fonts. The site still works perfectly without internet — it will
just fall back to your system's default serif/sans-serif fonts.

HOW TO ADD YOUR OWN PHOTOS & VIDEO
-----------------------------------
Simply replace these files — no code editing required:

  assets/images/princess.png   → the circular portrait on Page 1
                                  (any image works; a square/portrait
                                  photo looks best, it will be cropped
                                  into a circle automatically)

  assets/images/photo1.jpg     → Polaroid 1  "You became my favorite place."
  assets/images/photo2.jpg     → Polaroid 2  "My safest smile."
  assets/images/photo3.jpg     → Polaroid 3  "The day my world became brighter."
  assets/images/photo4.jpg     → Polaroid 4  "My forever comfort."
  assets/images/photo5.jpg     → Polaroid 5  "Our little universe."

  assets/videos/finalvideo.mp4 → the video that plays on Page 4
                                  after the curtains open
                                  (MP4, H.264 video / AAC audio is the
                                  safest format for browser support)

Just keep the exact same file names and drop your files into the
matching folders — the website will pick them up automatically.

If a file is missing or hasn't been added yet, the site will not
break — it gracefully shows a soft pastel placeholder instead of a
broken image icon, so you can safely preview the site before all
assets are ready.

OPTIONAL: BACKGROUND MUSIC
---------------------------
An "assets/music" folder is included if you'd like to add a song.
To enable music, add a file at assets/music/theme.mp3 and add this
line inside the <body> of index.html, near the top:

  <audio id="bgMusic" src="assets/music/theme.mp3" loop></audio>

Then in script.js you can call bgMusic.play() from inside the
"Begin Our Story" button click handler (browsers require a user
interaction before audio can play, so tying it to that button
click is the reliable way to do it).

CUSTOMIZING THE TEXT
---------------------
All wording lives directly in index.html:
  - Page 1 headline & typing message: search for "typingLine" / "title-script"
  - Page 2 apology paragraphs: inside the <div id="apologyText">
  - Page 3 Polaroid captions: each <p class="polaroid-caption">
  - Page 4 closing lines: inside <div id="finaleText"> and
    <div id="endingMessage">

Edit the text directly — no other code changes are needed for
plain text edits.

CUSTOMIZING COLORS
-------------------
Every color in the design is defined once at the top of style.css
inside the ":root { ... }" block (soft pink, baby pink, blush pink,
pastel blue, sky blue, white, gold). Changing a value there updates
it everywhere on the site automatically.

BROWSER SUPPORT
----------------
Tested against modern versions of Chrome, Safari, Firefox and Edge,
on both mobile (390px–430px wide) and desktop widths, plus iOS
Safari and Android Chrome. Uses only standard, widely supported CSS
and JavaScript — no experimental features.

ACCESSIBILITY
--------------
- Semantic headings and alt text on every image
- Visible keyboard focus states on all interactive elements
- All buttons and Polaroid photos are reachable and operable by
  keyboard (Tab, Enter, Space, and Arrow keys in the photo viewer)
- Respects the operating system's "Reduce Motion" setting — when
  enabled, animations are minimized automatically
- Text/background color combinations meet comfortable contrast

FOLDER STRUCTURE
-----------------
project/
├── index.html          → the whole site (all 4 pages)
├── style.css            → all styling & animation
├── script.js             → all interactivity (vanilla JS)
├── assets/
│   ├── images/            → princess.png, photo1.jpg – photo5.jpg
│   ├── videos/             → finalvideo.mp4
│   ├── music/               → (optional) theme.mp3
│   └── icons/                → (optional) favicon / extra icons
└── README.txt              → this file

Made with care. Replace the photos and video above, open
index.html, and the story is ready to share. ❤
