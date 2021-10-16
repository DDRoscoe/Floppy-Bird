title = "Floppy Bird";

description = `
Press [SPACE] to 
  jump higher!
`;

const G = {
  WIDTH: 150,
  HEIGHT: 150,
  CENTERX: 75,
  CENTERY: 75,

  GRASSBORDER: 110,

  FALLSPEED: 3,
  JUMPHEIGHT: 1.5,
};


characters = [
  `
    r
   rry
  rrr
 rrbr
 rbr
rrr
`,
  `
    r
b  rry
rbbrr
 rrbr
 rrr
rrr
`
];


/**
 * @typedef {{
 * pos: Vector,
 * vel: Vector,
 * }} Player
 */

/**
 * @type { Player }
 */
let player;


/**
 * @typedef {{
 * pos: Vector,
 * speed: number
 * }} Star
 */

/**
* @type  { Star [] }
*/
let stars;
///////////////////Bill's Code
/**
* @typedef {{
* pos: Vector,
* speed: number
* }} Pipe
*/

/**
* @type  { Pipe [] }
*/
let pipes;
/**
* @typedef {{
* pos: Vector,
* }} Hole
*/
/**
* @type  { Pipe [] }
*/
let holes;
////////////////////Bill's code

options = {
  viewSize: { x: G.WIDTH, y: G.HEIGHT },
  isPlayingBgm: true,
  isReplayEnabled: true,
  //seed: 42069,  // XD!!! 
  theme: "dark"
};

function update() {
  if (!ticks) {
    player = {
      pos: vec(G.WIDTH * 0.5 - 40, G.HEIGHT * 0.5 - 20),
      vel: vec(0, 0),//I changed it to 0,because it falls too fast at beginning-Larry
    };

    stars = [];
    for (let i = 0; i < 20; i++) {
      stars.push({
        pos: vec(rnd(0, G.WIDTH), rnd(0, G.HEIGHT)),
        speed: 0.2
      })
    }
    ///////////////////Bill's
    let i;
    pipes = times(3, () => {
      const posX = 96 + i * 40;
      i++
      const posY = 75;
      return {
        pos: vec(posX, posY),
        speed: .15
      };
    });
    i = 0;
    holes = times(3, () => {
      const posX = 96 + i * 40;
      i++
      const posY = Math.random() * 120;
      return {
        pos: vec(posX, posY),
        speed: .15
      };
    });
    ////////////////////////Bill's
  }

  stars.forEach((s) => {
    s.pos.x -= s.speed;
    s.pos.wrap(0, G.WIDTH, 0, G.HEIGHT);
    color("light_black");
    box(s.pos, 1);
  });
  ///////////////////////////Bill's
  pipes.forEach((s) => {
    s.pos.x -= s.speed;
    if (s.pos.x < 0) {
      s.pos.x = 120
    }
    color("black");
    box(s.pos, 8, 150);
  });
  holes.forEach((s) => {
    s.pos.x -= s.speed;
    if (s.pos.x < 0) {
      s.pos.x = 120
    }
    color("black");
    box(s.pos, 8, 40);
  });
  ////////////////////////////Bill's
  // render bird
  color("black");
  // add animation : flapping -Larry
  if (input.isPressed) {
    char("a", player.pos);
  } else {
    char("b", player.pos);
  }


  // grass border
  color("green");
  let grass = box(G.WIDTH / 2, G.HEIGHT, G.WIDTH, G.HEIGHT - G.GRASSBORDER)
  //added collider with player
  const isCollidingWithGrass = grass.isColliding.char.a || grass.isColliding.char.b;
  //↑↑↑                                                ↑↑
  //Since there are two characters, Make sure to check both of the collision -Larry
  if (isCollidingWithGrass) {
    // if fall on grass, end game
    console.log("hit")
    end("You Died");
  }

  // simulate gravity
  if (player.pos.y + player.vel.y >= 0) {//added boarder for the bird -Larry
    player.pos.y += player.vel.y;
  } else {
    player.vel.y = 0;               //now it won't fly out of the screen
  }
  player.vel.y += G.FALLSPEED / 60;

  if (input.isJustPressed) {
    player.vel.y = -G.JUMPHEIGHT;
    play("laser");
  }

}
