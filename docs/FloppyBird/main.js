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
      vel: vec(0,G.FALLSPEED),
		};

    stars = [];
    for (let i = 0; i < 20; i++) {
      stars.push({
        pos: vec(rnd(0, G.WIDTH), rnd(0, G.HEIGHT)),
        speed: 0.2
      })
    }
  }

  stars.forEach((s) => {
    s.pos.x -= s.speed;
    s.pos.wrap(0, G.WIDTH, 0, G.HEIGHT);
    color("light_black");
    box(s.pos, 1);
  });

  // render bird
  color("black");
  char("a", player.pos);


  // grass border
  color("green");
  //added collider with player
  const isCollidingWithGrass = box(G.WIDTH / 2, G.HEIGHT, G.WIDTH, G.HEIGHT - G.GRASSBORDER).isColliding.char.a;
  if(isCollidingWithGrass){
    // if fall on grass, end game
    console.log("hit")
    end("You Died");
  }
  
  // simulate gravity
  player.pos.y += player.vel.y;
  player.vel.y += G.FALLSPEED/60;
  if(input.isJustPressed) {
    player.vel.y = -G.JUMPHEIGHT;
    play("laser");
  }
}
