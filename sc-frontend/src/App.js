import './App.css';
import {useState} from "react";

const Turn = {
    white: 0,
    black: 1
}
const FieldColor = {
    white: "white",
    black: "black"
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

function Square({color, value, onSquareClicked}){
    const divStyle = {
        backgroundColor: color,
        color: (color === FieldColor.white? FieldColor.black: FieldColor.white),
    }
  return(
      <div style={divStyle} className="square" onClick={onSquareClicked}>
        {value}
      </div>
  );
}

function Board({squares,isSelected, turn, onPlay, onIsSelected, onChangeTurn}){

    function removeDots(){
        for(let i = 0; i < squares.length; i++){
            if(squares[i] === FieldTypes.dot)
            {
                squares[i] = FieldTypes.default;
            }
        }
    }
    function setPrediction(i, turn) {
        if (turn === Turn.white
            ? squares[i] !== FieldTypes.knightWhite && squares[i] !== FieldTypes.queenWhite
            : squares[i] !== FieldTypes.knightBlack && squares[i] !== FieldTypes.queenBlack) {
            switch (squares[i]) {
                case FieldTypes.knightBlack:
                {
                    squares[i] = FieldTypes.knightBlackAttacked;
                    break;
                }
                case FieldTypes.knightWhite:
                {
                    squares[i] = FieldTypes.knightWhiteAttacked;
                    break;
                }
                case FieldTypes.queenBlack:
                {
                    squares[i] = FieldTypes.queenBlackAttacked;
                    break;
                }
                case FieldTypes.queenWhite:
                {
                    squares[i] = FieldTypes.queenWhiteAttacked;
                    break;
                }
                default:
                    squares[i] = FieldTypes.dot;
            }
        }
    }
    function setQueenPrediction(i,turn){
        if(turn === Turn.white)
        {
            console.log(turn,Turn.white,squares[i],FieldTypes.knightWhite);
            if(squares[i] === FieldTypes.queenWhite || squares[i] === FieldTypes.knightWhite)
                return true;
            setPrediction(i, turn);
            if(squares[i] === FieldTypes.queenBlackAttacked || squares[i] === FieldTypes.knightBlackAttacked)
                return true;
        }
        else {
            console.log(turn,Turn.black,squares[i],FieldTypes.knightBlack);
            if(squares[i] === FieldTypes.queenBlack || squares[i] === FieldTypes.knightBlack)
                return true;
            setPrediction(i, turn);
            if(squares[i] === FieldTypes.queenWhiteAttacked || squares[i] === FieldTypes.knightWhiteAttacked)
                return true;
        }
    }
    function handleSquareClicked(i,turn){
        console.log(isSelected,i);
        if(isSelected !== -1)
        {
            //Clicked on invalid field
            if(i === isSelected || squares[i] === FieldTypes.default || squares[i] === FieldTypes.knightBlack
                || squares[i] === FieldTypes.knightWhite || squares[i] === FieldTypes.queenBlack
                || squares[i] === FieldTypes.queenWhite)
            {
                removeDots();
                onPlay(squares);
                onIsSelected(-1);
            }
            //Clicked on valid field dot
            else{
                removeDots();
                squares[i] = squares[isSelected];
                squares[isSelected] = FieldTypes.default;
                onPlay(squares);
                onIsSelected(-1);
                onChangeTurn(turn);
            }
        }
        else if(((squares[i] === FieldTypes.knightWhite || squares[i] === FieldTypes.queenWhite) && turn === Turn.white)
            ||((squares[i] === FieldTypes.knightBlack|| squares[i] === FieldTypes.queenBlack) && turn === Turn.black))
        {
            onIsSelected(i);
            if(squares[i] === FieldTypes.knightWhite || squares[i] === FieldTypes.knightBlack)
            {
                //***
                // *
                // k
                if(i-16 >= 0){
                    if(i % 8 !== 7 )
                        setPrediction(i-15, turn);
                    if(i % 8 !== 0)
                        setPrediction(i-17, turn);
                }

                // k
                // *
                //***
                if(i+16 <= 63){
                    if(i % 8 !== 7)
                        setPrediction(i+17, turn);
                    if(i % 8 !== 0)
                        setPrediction(i+15, turn);
                }

                //    *
                //k * *
                //    *
                if(i % 8 < 6){
                    if(i-8 > 0 )
                        setPrediction(i-6, turn);
                    if(i+8 < 63)
                        setPrediction(i+10, turn);
                }

                //*
                //* * k
                //*
                if(i % 8 > 1){
                    if(i-8 > 0 )
                        setPrediction(i-10, turn);
                    if(i+8 < 63)
                        setPrediction(i+6, turn);
                }
                onPlay(squares);
            }
            else if(squares[i] === FieldTypes.queenBlack || squares[i] === FieldTypes.queenWhite)
            {
                // q - right
                for(let q = i + 1; q % 8 > 0 && q < 64; q++)
                {
                    if(setQueenPrediction(q,turn))
                        break;
                }

                // q - left
                for(let q = i-1; q % 8 < 7 && q >= 0; q--)
                {
                    if(setQueenPrediction(q,turn))
                        break;
                }

                // q - up
                for(let q = i - 8; q >= 0; q = q - 8)
                {
                    if(setQueenPrediction(q,turn))
                        break;
                }

                // q - down
                for(let q = i + 8; q < 64; q = q + 8)
                {
                    if(setQueenPrediction(q,turn))
                        break;
                }
                // q - right/up
                for(let q = i - 7; q > 0 && q % 8 > 0; q = q - 7)
                {
                    if(setQueenPrediction(q,turn))
                        break;
                }
                // q - right/down
                for(let q = i + 9; q < 64 && q % 8 > 0; q = q + 9)
                {
                    if(setQueenPrediction(q,turn))
                        break;
                }
                // q - left/up
                for(let q = i - 9; q >= 0 && q % 8 < 7; q = q - 9)
                {
                    if(setQueenPrediction(q,turn))
                        break;
                }
                // q - left/down
                for(let q = i + 7; q < 64 && q % 8 < 7; q = q + 7)
                {
                    if(setQueenPrediction(q,turn))
                        break;
                }
                onPlay(squares);
            }
            else
            {
                onIsSelected(-1);
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
      <div className="game-container">
          <div className="board-row">
              <Square color={FieldColor.white} value={parseCharacter(squares[0])} onSquareClicked={() => handleSquareClicked(0,turn)}/>
              <Square color={FieldColor.black} value={parseCharacter(squares[1])} onSquareClicked={() => handleSquareClicked(1,turn)}/>
              <Square color={FieldColor.white} value={parseCharacter(squares[2])} onSquareClicked={() => handleSquareClicked(2,turn)}/>
              <Square color={FieldColor.black} value={parseCharacter(squares[3])} onSquareClicked={() => handleSquareClicked(3,turn)}/>
              <Square color={FieldColor.white} value={parseCharacter(squares[4])} onSquareClicked={() => handleSquareClicked(4,turn)}/>
              <Square color={FieldColor.black} value={parseCharacter(squares[5])} onSquareClicked={() => handleSquareClicked(5,turn)}/>
              <Square color={FieldColor.white} value={parseCharacter(squares[6])} onSquareClicked={() => handleSquareClicked(6,turn)}/>
              <Square color={FieldColor.black} value={parseCharacter(squares[7])} onSquareClicked={() => handleSquareClicked(7,turn)}/>
          </div>
          <div className="board-row">
              <Square color={FieldColor.black} value={parseCharacter(squares[8])} onSquareClicked={() => handleSquareClicked(8,turn)}/>
              <Square color={FieldColor.white} value={parseCharacter(squares[9])} onSquareClicked={() => handleSquareClicked(9,turn)}/>
              <Square color={FieldColor.black} value={parseCharacter(squares[10])} onSquareClicked={() => handleSquareClicked(10,turn)}/>
              <Square color={FieldColor.white} value={parseCharacter(squares[11])} onSquareClicked={() => handleSquareClicked(11,turn)}/>
              <Square color={FieldColor.black} value={parseCharacter(squares[12])} onSquareClicked={() => handleSquareClicked(12,turn)}/>
              <Square color={FieldColor.white} value={parseCharacter(squares[13])} onSquareClicked={() => handleSquareClicked(13,turn)}/>
              <Square color={FieldColor.black} value={parseCharacter(squares[14])} onSquareClicked={() => handleSquareClicked(14,turn)}/>
              <Square color={FieldColor.white} value={parseCharacter(squares[15])} onSquareClicked={() => handleSquareClicked(15,turn)}/>
          </div>
          <div className="board-row">
              <Square color={FieldColor.white} value={parseCharacter(squares[16])} onSquareClicked={() => handleSquareClicked(16,turn)}/>
              <Square color={FieldColor.black} value={parseCharacter(squares[17])} onSquareClicked={() => handleSquareClicked(17,turn)}/>
              <Square color={FieldColor.white} value={parseCharacter(squares[18])} onSquareClicked={() => handleSquareClicked(18,turn)}/>
              <Square color={FieldColor.black} value={parseCharacter(squares[19])} onSquareClicked={() => handleSquareClicked(19,turn)}/>
              <Square color={FieldColor.white} value={parseCharacter(squares[20])} onSquareClicked={() => handleSquareClicked(20,turn)}/>
              <Square color={FieldColor.black} value={parseCharacter(squares[21])} onSquareClicked={() => handleSquareClicked(21,turn)}/>
              <Square color={FieldColor.white} value={parseCharacter(squares[22])} onSquareClicked={() => handleSquareClicked(22,turn)}/>
              <Square color={FieldColor.black} value={parseCharacter(squares[23])} onSquareClicked={() => handleSquareClicked(23,turn)}/>
          </div>
          <div className="board-row">
              <Square color={FieldColor.black} value={parseCharacter(squares[24])} onSquareClicked={() => handleSquareClicked(24,turn)}/>
              <Square color={FieldColor.white} value={parseCharacter(squares[25])} onSquareClicked={() => handleSquareClicked(25,turn)}/>
              <Square color={FieldColor.black} value={parseCharacter(squares[26])} onSquareClicked={() => handleSquareClicked(26,turn)}/>
              <Square color={FieldColor.white} value={parseCharacter(squares[27])} onSquareClicked={() => handleSquareClicked(27,turn)}/>
              <Square color={FieldColor.black} value={parseCharacter(squares[28])} onSquareClicked={() => handleSquareClicked(28,turn)}/>
              <Square color={FieldColor.white} value={parseCharacter(squares[29])} onSquareClicked={() => handleSquareClicked(29,turn)}/>
              <Square color={FieldColor.black} value={parseCharacter(squares[30])} onSquareClicked={() => handleSquareClicked(30,turn)}/>
              <Square color={FieldColor.white} value={parseCharacter(squares[31])} onSquareClicked={() => handleSquareClicked(31,turn)}/>
          </div>
          <div className="board-row">
              <Square color={FieldColor.white} value={parseCharacter(squares[32])} onSquareClicked={() => handleSquareClicked(32,turn)}/>
              <Square color={FieldColor.black} value={parseCharacter(squares[33])} onSquareClicked={() => handleSquareClicked(33,turn)}/>
              <Square color={FieldColor.white} value={parseCharacter(squares[34])} onSquareClicked={() => handleSquareClicked(34,turn)}/>
              <Square color={FieldColor.black} value={parseCharacter(squares[35])} onSquareClicked={() => handleSquareClicked(35,turn)}/>
              <Square color={FieldColor.white} value={parseCharacter(squares[36])} onSquareClicked={() => handleSquareClicked(36,turn)}/>
              <Square color={FieldColor.black} value={parseCharacter(squares[37])} onSquareClicked={() => handleSquareClicked(37,turn)}/>
              <Square color={FieldColor.white} value={parseCharacter(squares[38])} onSquareClicked={() => handleSquareClicked(38,turn)}/>
              <Square color={FieldColor.black} value={parseCharacter(squares[39])} onSquareClicked={() => handleSquareClicked(39,turn)}/>
          </div>
          <div className="board-row">
              <Square color={FieldColor.black} value={parseCharacter(squares[40])} onSquareClicked={() => handleSquareClicked(40,turn)}/>
              <Square color={FieldColor.white} value={parseCharacter(squares[41])} onSquareClicked={() => handleSquareClicked(41,turn)}/>
              <Square color={FieldColor.black} value={parseCharacter(squares[42])} onSquareClicked={() => handleSquareClicked(42,turn)}/>
              <Square color={FieldColor.white} value={parseCharacter(squares[43])} onSquareClicked={() => handleSquareClicked(43,turn)}/>
              <Square color={FieldColor.black} value={parseCharacter(squares[44])} onSquareClicked={() => handleSquareClicked(44,turn)}/>
              <Square color={FieldColor.white} value={parseCharacter(squares[45])} onSquareClicked={() => handleSquareClicked(45,turn)}/>
              <Square color={FieldColor.black} value={parseCharacter(squares[46])} onSquareClicked={() => handleSquareClicked(46,turn)}/>
              <Square color={FieldColor.white} value={parseCharacter(squares[47])} onSquareClicked={() => handleSquareClicked(47,turn)}/>
          </div>
          <div className="board-row">
              <Square color={FieldColor.white} value={parseCharacter(squares[48])} onSquareClicked={() => handleSquareClicked(48,turn)}/>
              <Square color={FieldColor.black} value={parseCharacter(squares[49])} onSquareClicked={() => handleSquareClicked(49,turn)}/>
              <Square color={FieldColor.white} value={parseCharacter(squares[50])} onSquareClicked={() => handleSquareClicked(50,turn)}/>
              <Square color={FieldColor.black} value={parseCharacter(squares[51])} onSquareClicked={() => handleSquareClicked(51,turn)}/>
              <Square color={FieldColor.white} value={parseCharacter(squares[52])} onSquareClicked={() => handleSquareClicked(52,turn)}/>
              <Square color={FieldColor.black} value={parseCharacter(squares[53])} onSquareClicked={() => handleSquareClicked(53,turn)}/>
              <Square color={FieldColor.white} value={parseCharacter(squares[54])} onSquareClicked={() => handleSquareClicked(54,turn)}/>
              <Square color={FieldColor.black} value={parseCharacter(squares[55])} onSquareClicked={() => handleSquareClicked(55,turn)}/>
          </div>
          <div className="board-row">
              <Square color={FieldColor.black} value={parseCharacter(squares[56])} onSquareClicked={() => handleSquareClicked(56,turn)}/>
              <Square color={FieldColor.white} value={parseCharacter(squares[57])} onSquareClicked={() => handleSquareClicked(57,turn)}/>
              <Square color={FieldColor.black} value={parseCharacter(squares[58])} onSquareClicked={() => handleSquareClicked(58,turn)}/>
              <Square color={FieldColor.white} value={parseCharacter(squares[59])} onSquareClicked={() => handleSquareClicked(59,turn)}/>
              <Square color={FieldColor.black} value={parseCharacter(squares[60])} onSquareClicked={() => handleSquareClicked(60,turn)}/>
              <Square color={FieldColor.white} value={parseCharacter(squares[61])} onSquareClicked={() => handleSquareClicked(61,turn)}/>
              <Square color={FieldColor.black} value={parseCharacter(squares[62])} onSquareClicked={() => handleSquareClicked(62,turn)}/>
              <Square color={FieldColor.white} value={parseCharacter(squares[63])} onSquareClicked={() => handleSquareClicked(63,turn)}/>
          </div>
      </div>
  )
}

export default function Game(){
function initField()
{
    const start = Array(64).fill(0);
    start[14] = FieldTypes.knightBlack;
    start[9] = FieldTypes.queenBlack;
    start[53] = FieldTypes.knightWhite;
    start[50] = FieldTypes.queenWhite;
    return start.slice();
}
const [fields, setFields] = useState(initField());
const [isSelected, setSelected] = useState(-1)
const [turn,setTurn] = useState(Turn.white);

function changeSquares(f){
    const updateSquares = f.slice();
    setFields(updateSquares);
}

function changeIsSelected(isSel){
    setSelected(isSel);
}
function changeTurn(t){
    if(t === Turn.black)
        setTurn(Turn.white);
    else
        setTurn(Turn.black);

}

return(
    <div className="container">
        <Board squares={fields} isSelected={isSelected} turn={turn} onPlay={changeSquares} onIsSelected={changeIsSelected} onChangeTurn={changeTurn} />
    </div>
)
}
