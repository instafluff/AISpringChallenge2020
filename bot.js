/**
 * Grab the pellets as fast as you can!
 **/

var inputs = readline().split(' ');
const width = parseInt(inputs[0]); // size of the grid
const height = parseInt(inputs[1]); // top left corner is (x=0, y=0)
for (let i = 0; i < height; i++) {
    const row = readline(); // one line of the grid: space " " is floor, pound "#" is wall
}

var myPacs = [];
var pellets = [];

// game loop
while (true) {
    myPacs = [];
    pellets = [];
    var inputs = readline().split(' ');
    const myScore = parseInt(inputs[0]);
    const opponentScore = parseInt(inputs[1]);
    const visiblePacCount = parseInt(readline()); // all your pacs and enemy pacs in sight
    for (let i = 0; i < visiblePacCount; i++) {
        var inputs = readline().split(' ');
        const pacId = parseInt(inputs[0]); // pac number (unique within a team)
        const mine = inputs[1] !== '0'; // true if this pac is yours
        const x = parseInt(inputs[2]); // position in the grid
        const y = parseInt(inputs[3]); // position in the grid
        const typeId = inputs[4]; // unused in wood leagues
        const speedTurnsLeft = parseInt(inputs[5]); // unused in wood leagues
        const abilityCooldown = parseInt(inputs[6]); // unused in wood leagues
        if( mine ) {
            myPacs.push( {
                id: pacId,
                x, y
            });
        }
    }
    const visiblePelletCount = parseInt(readline()); // all pellets in sight
    for (let i = 0; i < visiblePelletCount; i++) {
        var inputs = readline().split(' ');
        const x = parseInt(inputs[0]);
        const y = parseInt(inputs[1]);
        const value = parseInt(inputs[2]); // amount of points this pellet is worth
        pellets.push( { x, y, value } );
    }

    myPacs.forEach( x => {
        let pt = findClosestPellet( x );
        console.error( x, pt.x, pt.y );
        console.log( `MOVE ${x.id} ${pt.x} ${pt.y}` );
    });

    // Write an action using console.log()
    // To debug: console.error('Debug messages...');

    // console.log('MOVE 0 15 10');     // MOVE <pacId> <x> <y>

}

function findClosestPellet( pac ) {
    var closest = 1000 * 1000;
    var cX = 0, cY = 0;
    pellets.forEach( p => {
        var distSq = ( pac.x - p.x ) * ( pac.x - p.x ) + ( pac.y - p.y ) * ( pac.y - p.y );
        if( distSq < closest ) {
            closest = distSq;
            cX = p.x;
            cY = p.y;
        }
    } );
    return { x: cX, y: cY };
}
