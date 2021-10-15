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

  GRASSBORDER: 110
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
 * pos: Vector
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
			pos: vec(G.WIDTH * 0.5 - 40, G.HEIGHT * 0.5 - 20)
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

  // grass border
  color("green");
  box(G.WIDTH / 2, G.HEIGHT, G.WIDTH, G.HEIGHT - G.GRASSBORDER);

  color("black");
  char("a", player.pos); 
}
