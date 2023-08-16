import {useState} from "react";

const Turn = {
    white: 0,
    black: 1
}
const FieldTypes = {
    default: 0,
    dot: 1,
    knightBlack: 2,
    knightWhite: 3,
    knightBlackAttacked: 4,
    knightWhiteAttacked: 5,
    queenBlack: 6,
    queenWhite: 7,
    queenBlackAttacked: 8,
    queenWhiteAttacked: 9,
}

function Square({value, onSquareClicked}){
  return(
      <button className="square" onClick={onSquareClicked}>
        {value}
      </button>
  );
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
    function parseCharacter(square){
        switch (square){
            case FieldTypes.dot:
                return "X";
            case FieldTypes.knightBlack:
                return "KB";
            case FieldTypes.knightWhite:
                return "KW";
            case FieldTypes.knightBlackAttacked:
                return "KBA";
            case FieldTypes.knightWhiteAttacked:
                return "KWA";
            case FieldTypes.queenBlack:
                return "QB";
            case FieldTypes.queenWhite:
                return "QW";
            case FieldTypes.queenBlackAttacked:
                return "QBA";
            case FieldTypes.queenWhiteAttacked:
                return "QWA";
            default:
                return "";
        }
    }
  return(
      <>
          <div className="board-row">
              <Square value={parseCharacter(squares[0])} onSquareClicked={() => handleSquareClicked(0)}/>
              <Square value={parseCharacter(squares[1])} onSquareClicked={() => handleSquareClicked(1)}/>
              <Square value={parseCharacter(squares[2])} onSquareClicked={() => handleSquareClicked(2)}/>
              <Square value={parseCharacter(squares[3])} onSquareClicked={() => handleSquareClicked(3)}/>
              <Square value={parseCharacter(squares[4])} onSquareClicked={() => handleSquareClicked(4)}/>
              <Square value={parseCharacter(squares[5])} onSquareClicked={() => handleSquareClicked(5)}/>
              <Square value={parseCharacter(squares[6])} onSquareClicked={() => handleSquareClicked(6)}/>
              <Square value={parseCharacter(squares[7])} onSquareClicked={() => handleSquareClicked(7)}/>
          </div>
          <div className="board-row">
              <Square value={parseCharacter(squares[8])} onSquareClicked={() => handleSquareClicked(8)}/>
              <Square value={parseCharacter(squares[9])} onSquareClicked={() => handleSquareClicked(9)}/>
              <Square value={parseCharacter(squares[10])} onSquareClicked={() => handleSquareClicked(10)}/>
              <Square value={parseCharacter(squares[11])} onSquareClicked={() => handleSquareClicked(11)}/>
              <Square value={parseCharacter(squares[12])} onSquareClicked={() => handleSquareClicked(12)}/>
              <Square value={parseCharacter(squares[13])} onSquareClicked={() => handleSquareClicked(13)}/>
              <Square value={parseCharacter(squares[14])} onSquareClicked={() => handleSquareClicked(14)}/>
              <Square value={parseCharacter(squares[15])} onSquareClicked={() => handleSquareClicked(15)}/>
          </div>
          <div className="board-row">
              <Square value={parseCharacter(squares[16])} onSquareClicked={() => handleSquareClicked(16)}/>
              <Square value={parseCharacter(squares[17])} onSquareClicked={() => handleSquareClicked(17)}/>
              <Square value={parseCharacter(squares[18])} onSquareClicked={() => handleSquareClicked(18)}/>
              <Square value={parseCharacter(squares[19])} onSquareClicked={() => handleSquareClicked(19)}/>
              <Square value={parseCharacter(squares[20])} onSquareClicked={() => handleSquareClicked(20)}/>
              <Square value={parseCharacter(squares[21])} onSquareClicked={() => handleSquareClicked(21)}/>
              <Square value={parseCharacter(squares[22])} onSquareClicked={() => handleSquareClicked(22)}/>
              <Square value={parseCharacter(squares[23])} onSquareClicked={() => handleSquareClicked(23)}/>
          </div>
          <div className="board-row">
              <Square value={parseCharacter(squares[24])} onSquareClicked={() => handleSquareClicked(24)}/>
              <Square value={parseCharacter(squares[25])} onSquareClicked={() => handleSquareClicked(25)}/>
              <Square value={parseCharacter(squares[26])} onSquareClicked={() => handleSquareClicked(26)}/>
              <Square value={parseCharacter(squares[27])} onSquareClicked={() => handleSquareClicked(27)}/>
              <Square value={parseCharacter(squares[28])} onSquareClicked={() => handleSquareClicked(28)}/>
              <Square value={parseCharacter(squares[29])} onSquareClicked={() => handleSquareClicked(29)}/>
              <Square value={parseCharacter(squares[30])} onSquareClicked={() => handleSquareClicked(30)}/>
              <Square value={parseCharacter(squares[31])} onSquareClicked={() => handleSquareClicked(31)}/>
          </div>
          <div className="board-row">
              <Square value={parseCharacter(squares[32])} onSquareClicked={() => handleSquareClicked(32)}/>
              <Square value={parseCharacter(squares[33])} onSquareClicked={() => handleSquareClicked(33)}/>
              <Square value={parseCharacter(squares[34])} onSquareClicked={() => handleSquareClicked(34)}/>
              <Square value={parseCharacter(squares[35])} onSquareClicked={() => handleSquareClicked(35)}/>
              <Square value={parseCharacter(squares[36])} onSquareClicked={() => handleSquareClicked(36)}/>
              <Square value={parseCharacter(squares[37])} onSquareClicked={() => handleSquareClicked(37)}/>
              <Square value={parseCharacter(squares[38])} onSquareClicked={() => handleSquareClicked(38)}/>
              <Square value={parseCharacter(squares[39])} onSquareClicked={() => handleSquareClicked(39)}/>
          </div>
          <div className="board-row">
              <Square value={parseCharacter(squares[40])} onSquareClicked={() => handleSquareClicked(40)}/>
              <Square value={parseCharacter(squares[41])} onSquareClicked={() => handleSquareClicked(41)}/>
              <Square value={parseCharacter(squares[42])} onSquareClicked={() => handleSquareClicked(42)}/>
              <Square value={parseCharacter(squares[43])} onSquareClicked={() => handleSquareClicked(43)}/>
              <Square value={parseCharacter(squares[44])} onSquareClicked={() => handleSquareClicked(44)}/>
              <Square value={parseCharacter(squares[45])} onSquareClicked={() => handleSquareClicked(45)}/>
              <Square value={parseCharacter(squares[46])} onSquareClicked={() => handleSquareClicked(46)}/>
              <Square value={parseCharacter(squares[47])} onSquareClicked={() => handleSquareClicked(47)}/>
          </div>
          <div className="board-row">
              <Square value={parseCharacter(squares[48])} onSquareClicked={() => handleSquareClicked(48)}/>
              <Square value={parseCharacter(squares[49])} onSquareClicked={() => handleSquareClicked(49)}/>
              <Square value={parseCharacter(squares[50])} onSquareClicked={() => handleSquareClicked(50)}/>
              <Square value={parseCharacter(squares[51])} onSquareClicked={() => handleSquareClicked(51)}/>
              <Square value={parseCharacter(squares[52])} onSquareClicked={() => handleSquareClicked(52)}/>
              <Square value={parseCharacter(squares[53])} onSquareClicked={() => handleSquareClicked(53)}/>
              <Square value={parseCharacter(squares[54])} onSquareClicked={() => handleSquareClicked(54)}/>
              <Square value={parseCharacter(squares[55])} onSquareClicked={() => handleSquareClicked(55)}/>
          </div>
          <div className="board-row">
              <Square value={parseCharacter(squares[56])} onSquareClicked={() => handleSquareClicked(56)}/>
              <Square value={parseCharacter(squares[57])} onSquareClicked={() => handleSquareClicked(57)}/>
              <Square value={parseCharacter(squares[58])} onSquareClicked={() => handleSquareClicked(58)}/>
              <Square value={parseCharacter(squares[59])} onSquareClicked={() => handleSquareClicked(59)}/>
              <Square value={parseCharacter(squares[60])} onSquareClicked={() => handleSquareClicked(60)}/>
              <Square value={parseCharacter(squares[61])} onSquareClicked={() => handleSquareClicked(61)}/>
              <Square value={parseCharacter(squares[62])} onSquareClicked={() => handleSquareClicked(62)}/>
              <Square value={parseCharacter(squares[63])} onSquareClicked={() => handleSquareClicked(63)}/>
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
