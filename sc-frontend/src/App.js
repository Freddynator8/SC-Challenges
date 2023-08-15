import {useState} from "react";

function Square({value, onSquareClicked}){
  return(
      <button className="square" onClick={onSquareClicked}>
        {value}
      </button>
  );
}

export enum FieldTypes {
    default,
    dot,
    knightBlack,
    knightWhite,
    knightBlackAttacked,
    knightWhiteAttacked,
    queenBlack,
    queenWhite,
    queenBlackAttacked,
    queenWhiteAttacked,
}
export enum Turn {
    white,
    black,
}

function Board({squares,isSelected}){

    function removeDots(fields){
        for(let field = 0; field < fields.length; field++){
            if(fields[field] === FieldTypes.dot)
            {
                fields[field] = FieldTypes.default;
            }
        }
        return fields;
    }
    function setPrediction(square, turn) {
        if (turn === Turn.white
            ? square !== FieldTypes.knightWhite && square !== FieldTypes.queenWhite
            : square !== FieldTypes.knightBlack && square !== FieldTypes.queenBlack) {
            switch (square) {
                case FieldTypes.knightBlack:
                {
                    square = FieldTypes.knightBlackAttacked;
                    break;
                }
                case FieldTypes.knightWhite:
                {
                    square = FieldTypes.knightWhiteAttacked;
                    break;
                }
                case FieldTypes.queenBlack:
                {
                    square = FieldTypes.queenBlackAttacked;
                    break;
                }
                case FieldTypes.queenWhite:
                {
                    square = FieldTypes.queenWhiteAttacked;
                    break;
                }
                default:
                    square = FieldTypes.dot;
            }
        }
    }
    function setQueenPrediction(square,turn){
        if(turn === Turn.white)
        {
            if(square === FieldTypes.queenWhite || square === FieldTypes.knightWhite)
                return true;
            setPrediction(square, turn);
            if(square === FieldTypes.queenBlack || square === FieldTypes.knightBlack)
                return true;
        }
        else {
            if(square === FieldTypes.queenBlack || square === FieldTypes.knightBlack)
                return true;
            setPrediction(square, turn);
            if(square === FieldTypes.queenWhite || square === FieldTypes.knightWhite)
                return true;
        }
    }
    function handleSquareClicked(i,turn){
        if(isSelected !== -1)
        {
            //Clicked on invalid field
            if(i === isSelected || squares[i] === FieldTypes.default || squares[i] === FieldTypes.knightBlack
                || squares[i] === FieldTypes.knightWhite || squares[i] === FieldTypes.queenBlack
                || squares[i] === FieldTypes.queenWhite)
            {
                isSelected = -1;
            }
            //Clicked on valid field dot
            else{
                squares = removeDots(squares);
                squares[i] = squares[isSelected];
                squares[isSelected] = FieldTypes.default;
                isSelected = -1;
            }
        }
        else {
            isSelected = i;
            switch (squares[i]){
                case FieldTypes.knightBlack || FieldTypes.knightWhite:
                {
                    //***
                    // *
                    // k
                    if(i-16 >= 0){
                        if(i % 8 !== 7 )
                            setPrediction(squares[i-15], turn);
                        if(i % 8 !== 0)
                            setPrediction(squares[i-17], turn);
                    }

                    // k
                    // *
                    //***
                    if(i+16 <= 63){
                        if(i % 8 !== 7)
                            setPrediction(squares[i+17], turn);
                        if(i % 8 !== 0)
                            setPrediction(squares[i+15], turn);
                    }

                    //    *
                    //k * *
                    //    *
                    if(i % 8 < 6){
                        if(i-8 > 0 )
                            setPrediction(squares[i-6], turn);
                        if(i+8 < 63)
                            setPrediction(squares[i+10], turn);
                    }

                    //*
                    //* * k
                    //*
                    if(i % 8 > 1){
                        if(i-8 > 0 )
                            setPrediction(squares[i-10], turn);
                        if(i+8 < 63)
                            setPrediction(squares[i+6], turn);
                    }
                    break;
                }
                case FieldTypes.queenBlack || FieldTypes.queenWhite:
                {
                    // q - right
                    for(let q = i + 1; q % 8 > 0 && q < 64; q++)
                    {
                        if(setQueenPrediction(squares[q],turn))
                            break;
                    }

                    // q - left
                    for(let q = i-1; q % 8 < 7 && q >= 0; q--)
                    {
                        if(setQueenPrediction(squares[q],turn))
                            break;
                    }

                    // q - up
                    for(let q = i - 8; q >= 0; q = q - 8)
                    {
                        if(setQueenPrediction(squares[q],turn))
                            break;
                    }

                    // q - down
                    for(let q = i + 8; q < 64; q = q + 8)
                    {
                        if(setQueenPrediction(squares[q],turn))
                            break;
                    }
                    // q - right/up
                    for(let q = i - 7; q > 0 && q % 8 > 0; q = q - 7)
                    {
                        if(setQueenPrediction(squares[q],turn))
                            break;
                    }
                    // q - right/down
                    for(let q = i + 9; q < 64 && q % 8 > 0; q = q + 9)
                    {
                        if(setQueenPrediction(squares[q],turn))
                            break;
                    }
                    // q - left/up
                    for(let q = i - 9; q >= 0 && q % 8 < 7; q = q - 9)
                    {
                        if(setQueenPrediction(squares[q],turn))
                            break;
                    }
                    // q - left/down
                    for(let q = i + 7; q < 64 && q % 8 < 7; q = q + 7)
                    {
                        if(setQueenPrediction(squares[q],turn))
                            break;
                    }
                    break;
                }
                default:
                {
                    isSelected = -1;
                }
            }
        }
    }
  return(
      <>
          <div className="board-row">
              <Square value={squares[0]} onSquareClicked={() => handleSquareClicked(0)}/>
              <Square value={squares[1]} onSquareClicked={() => handleSquareClicked(1)}/>
              <Square value={squares[2]} onSquareClicked={() => handleSquareClicked(2)}/>
              <Square value={squares[3]} onSquareClicked={() => handleSquareClicked(3)}/>
              <Square value={squares[4]} onSquareClicked={() => handleSquareClicked(4)}/>
              <Square value={squares[5]} onSquareClicked={() => handleSquareClicked(5)}/>
              <Square value={squares[6]} onSquareClicked={() => handleSquareClicked(6)}/>
              <Square value={squares[7]} onSquareClicked={() => handleSquareClicked(7)}/>
          </div>
          <div className="board-row">
              <Square value={squares[8]} onSquareClicked={() => handleSquareClicked(8)}/>
              <Square value={squares[9]} onSquareClicked={() => handleSquareClicked(9)}/>
              <Square value={squares[10]} onSquareClicked={() => handleSquareClicked(10)}/>
              <Square value={squares[11]} onSquareClicked={() => handleSquareClicked(11)}/>
              <Square value={squares[12]} onSquareClicked={() => handleSquareClicked(12)}/>
              <Square value={squares[13]} onSquareClicked={() => handleSquareClicked(13)}/>
              <Square value={squares[14]} onSquareClicked={() => handleSquareClicked(14)}/>
              <Square value={squares[15]} onSquareClicked={() => handleSquareClicked(15)}/>
          </div>
          <div className="board-row">
              <Square value={squares[16]} onSquareClicked={() => handleSquareClicked(16)}/>
              <Square value={squares[17]} onSquareClicked={() => handleSquareClicked(17)}/>
              <Square value={squares[18]} onSquareClicked={() => handleSquareClicked(18)}/>
              <Square value={squares[19]} onSquareClicked={() => handleSquareClicked(19)}/>
              <Square value={squares[20]} onSquareClicked={() => handleSquareClicked(20)}/>
              <Square value={squares[21]} onSquareClicked={() => handleSquareClicked(21)}/>
              <Square value={squares[22]} onSquareClicked={() => handleSquareClicked(22)}/>
              <Square value={squares[23]} onSquareClicked={() => handleSquareClicked(23)}/>
          </div>
          <div className="board-row">
              <Square value={squares[24]} onSquareClicked={() => handleSquareClicked(24)}/>
              <Square value={squares[25]} onSquareClicked={() => handleSquareClicked(25)}/>
              <Square value={squares[26]} onSquareClicked={() => handleSquareClicked(26)}/>
              <Square value={squares[27]} onSquareClicked={() => handleSquareClicked(27)}/>
              <Square value={squares[28]} onSquareClicked={() => handleSquareClicked(28)}/>
              <Square value={squares[29]} onSquareClicked={() => handleSquareClicked(29)}/>
              <Square value={squares[30]} onSquareClicked={() => handleSquareClicked(30)}/>
              <Square value={squares[31]} onSquareClicked={() => handleSquareClicked(31)}/>
          </div>
          <div className="board-row">
              <Square value={squares[32]} onSquareClicked={() => handleSquareClicked(32)}/>
              <Square value={squares[33]} onSquareClicked={() => handleSquareClicked(33)}/>
              <Square value={squares[34]} onSquareClicked={() => handleSquareClicked(34)}/>
              <Square value={squares[35]} onSquareClicked={() => handleSquareClicked(35)}/>
              <Square value={squares[36]} onSquareClicked={() => handleSquareClicked(36)}/>
              <Square value={squares[37]} onSquareClicked={() => handleSquareClicked(37)}/>
              <Square value={squares[38]} onSquareClicked={() => handleSquareClicked(38)}/>
              <Square value={squares[39]} onSquareClicked={() => handleSquareClicked(39)}/>
          </div>
          <div className="board-row">
              <Square value={squares[40]} onSquareClicked={() => handleSquareClicked(40)}/>
              <Square value={squares[41]} onSquareClicked={() => handleSquareClicked(41)}/>
              <Square value={squares[42]} onSquareClicked={() => handleSquareClicked(42)}/>
              <Square value={squares[43]} onSquareClicked={() => handleSquareClicked(43)}/>
              <Square value={squares[44]} onSquareClicked={() => handleSquareClicked(44)}/>
              <Square value={squares[45]} onSquareClicked={() => handleSquareClicked(45)}/>
              <Square value={squares[46]} onSquareClicked={() => handleSquareClicked(46)}/>
              <Square value={squares[47]} onSquareClicked={() => handleSquareClicked(47)}/>
          </div>
          <div className="board-row">
              <Square value={squares[48]} onSquareClicked={() => handleSquareClicked(48)}/>
              <Square value={squares[49]} onSquareClicked={() => handleSquareClicked(49)}/>
              <Square value={squares[50]} onSquareClicked={() => handleSquareClicked(50)}/>
              <Square value={squares[51]} onSquareClicked={() => handleSquareClicked(51)}/>
              <Square value={squares[52]} onSquareClicked={() => handleSquareClicked(52)}/>
              <Square value={squares[53]} onSquareClicked={() => handleSquareClicked(53)}/>
              <Square value={squares[54]} onSquareClicked={() => handleSquareClicked(54)}/>
              <Square value={squares[55]} onSquareClicked={() => handleSquareClicked(55)}/>
          </div>
          <div className="board-row">
              <Square value={squares[56]} onSquareClicked={() => handleSquareClicked(56)}/>
              <Square value={squares[57]} onSquareClicked={() => handleSquareClicked(57)}/>
              <Square value={squares[58]} onSquareClicked={() => handleSquareClicked(58)}/>
              <Square value={squares[59]} onSquareClicked={() => handleSquareClicked(59)}/>
              <Square value={squares[60]} onSquareClicked={() => handleSquareClicked(60)}/>
              <Square value={squares[61]} onSquareClicked={() => handleSquareClicked(61)}/>
              <Square value={squares[62]} onSquareClicked={() => handleSquareClicked(62)}/>
              <Square value={squares[63]} onSquareClicked={() => handleSquareClicked(63)}/>
          </div>
      </>
  )
}

export default function Game(){
const [squares, setSquare] = useState(Array(64).fill(0));
const [isSelected, setSelected] = useState(-1);
return(
    <div className="game">
        <Board squares={squares} isSelected={isSelected} />
    </div>
)
}
