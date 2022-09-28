import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
/*class Square extends React.Component {
  /*constructor(props) {
    super(props);
    
    properties: là trạng thái do parent component quản lý, truyền xuống cho 1 component
    Đối với 1 component thi properties là read only, chỉ xem thôi chứ không sửa được
    Muốn sửa, muốn quản lý thì phải thông qua state 
    State này chỉ sửa, đọc được bên trong component thôi, còn bên ngoài thì không giao tiếp
    
    this.state = {
      value: null,
    };
    Update 01: Xoá constructor
}
render() {
  return (
    <button
      className="square" 
      onClick = {() => this.props.onClick()}
    >
      {this.props.value}
    </button>
      /*
      <button className="square" onClick = { function() { console.log('click'); }}> => Nhân sự kiện click, thông báo số lần click ra màn hình console
      {this.props.value} => show the value - xuất các số ra
      Update 01: 
      - Thay {this.props.value} bằng {this.state.value} 
      - Thay onClick={...} bằng  onClick = {() => this.setState({value: 'X'})} 
      - Nên đặt className và onClick ở 2 dòng khác nhau để dễ đọc
      => để hiển thị chữ X vào ô trên màn hình khi click

      Update 02:
      - Thay đổi {this.state.value} thành {this.props.value}
      - Thay đổi this.setState{value: 'X'} thành this.props.onClick()
      - Xoá constructor ra khỏi class Square

      => Khi ô vuông (Square) được click, hàm onClick được viết trong Board sẽ được gọi. Bởi vì:
      1. onClick được xây ở DOM <button> sẽ gọi cho React để cài đặt sự kiện nghe
      2. Khi button được click, React sẽ gọi sự kiện onClick dược định nghĩa trong phương thức render của class Square
      3. Sự kiện xử lý (event handler) gọi this.props.onCick(). Mà onClick prop của Square được đặt tả trong Board.
      4. Kể từ Board passed onClick={() => this.handleClick(i)} đến Square thì Square sẽ gọi handleClick() của Board mỗi khi được click
      5. Ta sẽ chưa định nghĩa handleClick() method nên code lúc này sẽ crash. Nếu nhấn vào square lsc này sẽ bị báo lỗi
      
   
  );
  }
}

Update: Thay thế class Square bằng function Square(props) bên dưới và thay this.props thành props
*/

function Square(props) {
  return(
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
    /*
  Thêm 1 hàm tạo vào Board và đặt trạng thái ban đầu của Board để chứa 1 mảng 9 nulls tương ứng với 9 hình vuông
   
  constructor (props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true, //XIsNext là biến boolean để xác định biến nào sẽ tiếp theo và trạng thái game sẽ được lưu
    };
  }

  Update: Xoá construtor ở Board để đen xuuoosng history

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) { //Kiểm tra nếu có người thắng hoặc nếu full rồi thì không click được nữa
      return;
    }
    squares[i] = this.state.xIsNext ? 'X':'O';
    this.setState({
      squares:squares,
      xIsNext: !this.state.xIsNext, //X và O xoay vòng
    });

  }
  
  Sau khi thêm handleClick thì ta có thể fill square như lúc đầu.
  Tuy nhiên, lúc này state sẽ được lưu trữ trong Board component thay vì trong từng Square components riêng lẻ.
  Khi trạng thái của Board thay đổi, Square compopent sẽ re-render tự động.
  Giữ state ở tất cả các ô vuông trong Board component sẽ cho phép xác định người chiến thắng trong tương lai.

  Kể từ Square component không còn chưa state, thì Square component nhận giá trị từ Board component
  => Square components lúc này là component bị kiểm soát (controlled components)
  - gọi .slice() để tạp 1 bản sao của mảng squares để chỉnh sửa thay vì chỉnh sửa trên mảng đang tồn tại

  Update: Move handleClick đến Game component
  */

  renderSquare(i) {
      return (
      <Square 
        value = {this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
      ); 
  }
  /*passed a prop
  Update 01: 
  - Chuyển thành this.state.square[i]: Không truyền theo value nữa mà sẽ truyền theo vị trí của mảng
  - thêm vào onClick={() => this.handleClick(i)}
  Update 02:
  - Cài đặt hàm handleClick
  Update 03:
  - Thay this.state.square[i] bằng this.props.suqare[i]
  - Thay this.hanldleClick(i) với this.props.onClick(i)
  */


  render() {
  /*const winner = calculateWinner(this.state.squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O'); //Hiển thị X hay O ở câu Next player */
  return (
    <div>
      <div className="board-row">
        {this.renderSquare(0)}
        {this.renderSquare(1)}
        {this.renderSquare(2)}
      </div>
      <div className="board-row">
        {this.renderSquare(3)}
        {this.renderSquare(4)}
        {this.renderSquare(5)}
      </div>
      <div className="board-row">
        {this.renderSquare(6)}
        {this.renderSquare(7)}
        {this.renderSquare(8)}
      </div>
    </div>
  );
  }
}

class Game extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),

        // Khởi tạo biến col và row để lưu vị trí
        col: null,
        row: null
      }],
      stepNumber: 0,
      xIsNext: true, //XIsNext là biến boolean để xác định biến nào sẽ tiếp theo và trạng thái game sẽ được lưu
    };
  }


  
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber +1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    // Khai báo biến coordinate để tìm toạ độ (x,y) của 1 ô thứ i
    const coordinate = findCoordinate(i);
    if (calculateWinner(squares) || squares[i]) { //Kiểm tra nếu có người thắng hoặc nếu full rồi thì không click được nữa
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares : squares,
        row: coordinate[0],
        col: coordinate[1],
        
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext, //X và O xoay vòng
    });
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }
render() {
  const history = this.state.history;
  const current = history[this.state.stepNumber];
  const winner = calculateWinner (current.squares);

  const moves = history.map((step, move) => {

    //In đâm nut bước đi gần đây
    let currentButton = (move === this.state.stepNumber ? 'currentButton' : '')
    const desc = move ?
    ' Go to move #' + move +" at (" + step.col + "," + step.row + ")":
    'Go to game start';
    return (
      <li key={move}>
      <button 
      className={currentButton}
      onClick={() => this.jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    status ='Winner: ' + winner;
  }
  else {
    status = 'Next player: '+ (this.state.xIsNext ? 'X' : 'O');
  }
  return (
    <div className="game">
      <div className="game-board">
        <Board
           squares = {current.squares}
           onClick={(i) => this.handleClick(i)} 
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
  function findCoordinate (i) {
    let row;
    let col;
    switch(i) {
      case 0:
      case 1:
      case 2: 
          row = 1; //nếu là ô thứ 0, 1, 2 thì là hàng 1
          break;
      case 3:
      case 4:
      case 5:
          row = 2; //nếu là ô thứ 3, 4, 5 thì là hàng 2
          break;
      case 6:
      case 7:
      case 8:
          row = 3;
          break;
      default:
          break;
    }

    switch(i) {
      case 0:
      case 3:
      case 6: 
          col = 1; 
          break;
      case 1:
      case 4:
      case 7:
          col = 2; 
          break;
      case 2:
      case 5:
      case 8:
          col = 3;
          break;
      default:
          break;
    }
    return [row,col];
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  // 