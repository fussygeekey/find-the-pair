function getRandomColor() {
    let red = Math.floor(Math.random() * 256),
        green = Math.floor(Math.random() * 256),
        blue = Math.floor(Math.random() * 256),
        color = 'rgb(' + red + ', ' + green + ', ' + blue + ')';

    return color;
}

function getArrayOfTiles() {
    let arrayOfTiles = new Array(),
        randomColor;

    // Array initialization
    for (let i = 0; i < 16; i += 2) {
        randomColor = getRandomColor();

        arrayOfTiles[i] = <Tile bgcolor={randomColor} />;
        arrayOfTiles[i + 1] = <Tile bgcolor={randomColor} />;
    }

    let randomIndex;

    // Array mixing
    for (let i = 16; i > 0; i--) {
        randomIndex = Math.floor(Math.random() * (i + 1));
        [arrayOfTiles[i], arrayOfTiles[randomIndex]] = [arrayOfTiles[randomIndex], arrayOfTiles[i]]; // Swapping elements
    }

    return arrayOfTiles;
}

let chosenTile,
    isSearching = false,
    openedTiles = 0,
    steps = 0;

function Tile(props) {
    const tileStyle = {
        height: 100,
        width: 100,
        margin: 10,
        background: 'transparent',
        border: '1px solid #DADADA',
        borderRadius: 5,
        display: 'inline-block',
        transition: '0.5s',
        cursor: 'pointer'
    };

    return (
        <div style={tileStyle} onClick={(event) => {
            let tile = event.target;

            if (tile.style.background == 'transparent') {
                steps++;
                tile.style.background = props.bgcolor;

                setTimeout(() => {
                    if (isSearching) {
                        isSearching = false;

                        if (tile.style.background == chosenTile.style.background) {
                            openedTiles += 2;
                            
                            if (openedTiles == 16) {
                                alert('You won! Quantity of steps: ' + steps + '. ');
                            }
                        }
                        else {
                            tile.style.background = 'transparent';
                            chosenTile.style.background = 'transparent';
                        }
                    }
                    else {
                        chosenTile = tile;
                        isSearching = true;
                    }
                }, 500);
            }
        }}></div>
    );
}

function Board() {
    const boardStyle = {
        width: 480,
        padding: 0,
        backgroundColor: 'white',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
        borderRadius: 5,
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    };

    let boardInner = getArrayOfTiles();

    return (
        <div style={boardStyle}>
            {boardInner}
        </div>
    );
}

function App() {
    return (
        <Board />
    );
}

export default App;