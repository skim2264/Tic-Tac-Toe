//Load gameboard with current XO markers
const gameBoard = (() => {
    const players = (name, marker, turn) => {
        return {name, marker, turn};
    }
    const player1 = players('Player One', 'X', true);
    const player2 = players('Player Two', 'O', false);

    //markers location based on id name of divs
    const XOs = {};

    //create the gameboard visually 
    const gameBoardDiv = document.querySelector('.gameboard');
    for (let i=1; i < 10; i++) {
        const newDiv = document.createElement('div');
        newDiv.textContent = XOs[i];
        newDiv.id = i;
        gameBoardDiv.appendChild(newDiv);
    }

    const boxes = document.querySelectorAll('div.gameboard>div');
    var player = '';
    var otherplayer = '';

    //set players turn
    const playersTurn = () => {
        if (player1.turn == true) {
            player = player1;
            otherplayer = player2;
        } else if (player2.turn == true) {
            player = player2;
            otherplayer = player1;
        }
    }

    //check win
    const checkWin = () => {
        const winCombos = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
        winCombos.forEach(combo => {
            var indexOne = [combo][0][0];
            var indexTwo = [combo][0][1];
            var indexThree = [combo][0][2];

            if (typeof XOs[indexOne] !== "undefined") {
                if (XOs[indexOne] == XOs[indexTwo] && XOs[indexTwo] == XOs[indexThree]) {
                    alert("You win!");
                };
            }
        });
    };

    //players place marker on their turn
    boxes.forEach(box => {
        box.addEventListener('click', e => {
            if (e.target.textContent == '') {
                playersTurn();
                box.textContent = player.marker;
                otherplayer.turn = true;
                player.turn = false;
                XOs[box.id] = player.marker;
                checkWin();
            } else {
                alert("Marker already present, please select another box!");
            }
        })
    });

})();
