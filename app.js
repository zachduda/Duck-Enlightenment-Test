const version = "v1.2";

function id(sid) {
    return document.getElementById(sid);
}

function hide(sid) {
    id(sid).style.display = "none";
}

function show(sid) {
    id(sid).style.display = null;
}

function set(sid, txt) {
    id(sid).innerHTML = txt;
}

const maxrounds = 4;
let Game = {};
function reset() {
    Game = {};
    Game.Round = 0;
    id("frame").style.maxWidth = "800px";
    show("helpbar");
    set("helpbar", "Out of the following, pick the duck that speaks to you the most in this moment.");
    set("top", "<i class='fa-solid fa-circle-info text-secondary pe-3'></i>About the Test");
    hide("grid-lay");
    hide("results-lay");
    show("start-lay");
}

function getPics() {
    if(Game.Round > 1) {
        hide("helpbar");
    }
    let ducks = [1, 2, 3, 4];
    let alph = ['a', 'b', 'c'];
    const round = Game.Round;
    const base = "img/"+round;
    const ext = ".png";
    ducks.forEach(s => {
        let sur = 'duck-'+s;
        let cur = id(sur);
        hide(sur);
        setTimeout(() => {
          if(Game.Round == 2) {
              show("helpbar");
              set("helpbar", "<b>Great!</b> Now pick one of these fine fellows.");
          } else if(Game.Round >= maxrounds) {
              show("helpbar");
              set("helpbar", "<b>Nice!</b> This is the last one, so choose wisely!");
          } else if(Game.Round > 1){
              hide("helpbar");
          }
          cur.src = base + alph[s-1]+ext;
          show(sur);
        }, 200);
    });
}

function done() {
    hide("grid-lay");
    show("results-lay");
    set("top", "<i class='fa-solid fa-square-poll-vertical text-secondary pe-2'></i>Your Results");
    id("frame").style.maxWidth = "500px";
    let result = "";

    Traits = {};

    Traits.Fun = 0;
    Traits.Social = 0;
    Traits.Creative = 0;
    Traits.Anxious = 0;
    Traits.Positive = 0;
    Traits.Sleepy = 0;

    if(Game[1] == 1) {
        Traits.Fun++;
        Traits.Social++;
        Traits.Positive++;
    }
    if(Game[1] == 2) {
        Traits.Creative++;
        Traits.Sleepy++;
    }
    if(Game[1] == 3) {
        Traits.Anxious++;
        Traits.Social++;
        Traits.Positive++;
    }

    if(Game[2] == 1) {
        Traits.Fun = Traits.Fun+2;
        Traits.Creative++;
    }

    if(Game[2] == 2) {
        Traits.Sleepy++;
        Traits.Anxious++;
        Traits.Positive++;
    }

    if(Game[2] == 3) {
        Traits.Sleepy = Traits.Sleepy+2;
        Traits.Fun += 1;
    }

if(Game[3] == 1) {
Traits.Social += 1;
}

if(Game[3] == 1) {
Traits.Social -= 1;
}

if(Game[3] == 2) {
Traits.Fun += 1;
}

if(Game[3] == 3) {
Traits.Social += 1;
}

if(Game[4] == 1) {
Traits.Anxious += 1;
Traits.Fun -= 1;
}

if(Game[4] == 2) {
Traits.Social += 1;
}

if(Game[4] == 3) {
Traits.Creative += 1;
}

    result += "According to the ducks, it looks like ";

    let i = 0;
    let maintrait = "";
    let TraitsSort = Object.keys(Traits)
       .sort(function(keya, keyb) {
           return Traits[keyb] - Traits[keya];
       })
       .forEach(function(key) {
           i++;
           console.log(key, Traits[key]);
           if(i == 1) {
                maintrait = key;
                // MOSTLY
                if(key == "Sleepy") {
                    result += "you're almost always napping or half-asleep, ";
                }
                if(key == "Fun") {
                    result += "you're always the funniest whenever you're in a group, ";
                }
                if(key == "Creative") {
                    result += "your creativity knows no bounds as the artist of the group, ";
                }
                if(key == "Social") {
                    result += "you're out partying 24/7 and are a little crazy, ";
                }
                if(key == "Positive") {
                    result += "you're always putting up a smile, ";
                }
            } else
            if(i == 2) {
                // SOMEWHAT
                if(key == "Sleepy") {
                    result += "you're just barely staying awake right now, ";
                }
                if(key == "Fun") {
                    result += "you've got some funny skills, ";
                }
                if(key == "Creative") {
                    result += "you have an artistic side that you don't always show, ";
                }
                if(key == "Social") {
                    result += "some might find you an extrovert but you really like being inside, ";
                }
                if(key == "Positive") {
                    result += "you're constantly in tune with the people around you, ";
                }
            } else
            if(i == 6) {
                // NOT AT ALL
                if(key == "Sleepy") {
                    result += "you're cracked out on energy drinks, ";
                }
                if(key == "Fun") {
                    result += "you need to chillax on the 1,000 side-hobbies, ";
                }
                if(key == "Creative") {
                    result += "you should watch some Bob Ross videos, ";
                }
                if(key == "Social") {
                    result += "you need to go outside, ";
                }
                if(key == "Positive") {
                    result += "you might need something to brighten up your day, ";
                }
            }
       });
    console.log(TraitsSort);
    console.log("----------------");


    result += "and love bread!";
    result += "<br><br>Your <b>primary trait</b> is that you're overwhelmingly <b class='text-primary' style='font-size:20px'>" + maintrait + "</b><hr>";
    set("results", result);
}
function next() {
    if(Game.Round+1 > maxrounds) {
        done();
        return;
    }
    Game.Round++;
    set("top", "Round " + Game.Round);

    getPics();
}

function duck(num) {
    Game[Game.Round] = num;
    next();
}

reset();

function start() {
    id("frame").style.maxWidth = null;
    hide("start-lay");
    show("grid-lay");
    next();
}

function tweload() {
    twemoji.parse(document.body, {
      folder: 'svg',
      ext: '.svg'
    });
}
tweload();

window.onload = (event) => {
    setTimeout(() => {
          console.log("hi");
          document.body.style.overflow = null;
    }, 1000);
    tweload();
    id("version").innerHTML = version;
}
