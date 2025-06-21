const { useState } = React;

function Grid({ setResult }) {
  function handleClick(e) {
    const value = e.target.dataset.value;
    const operations = ['+', '-', '*', '/', '.'];

    setResult((prev) => {
      if ((prev === 'Error' || prev === 'Infinity') && /\d/.test(value)) {
        return value;
      }

      if (value === 'D') {
        return prev.slice(0, -1) || '0';
      }

      if (value === "AC") {
        setResult("0");
        return "0";
      }

      if (value === '=') {
        try {
          return String(Number(eval(prev).toFixed(10)));
        } catch {
          return 'Error';
        }
      }

      const lastChar = prev[prev.length - 1];
      if (
        operations.includes(value) &&
        operations.includes(lastChar) &&
        !(value === '-' && lastChar !== '-')
      ) {
        return prev;
      }

      let updated = prev + value;
      if (
        updated.length > 1 &&
        updated[0] === '0' &&
        !operations.includes(updated[1])
      ) {
        updated = updated.slice(1);
      }

      return updated;
    });
  }

  return (
    <div className="ui-buttons">
      <div className="numbers">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.'].map((n) => (
          <button
            key={n}
            data-value={n}
            className="btn-number"
            onClick={handleClick}
          >
            {n}
          </button>
        ))}
        <button
          data-value="D"
          className="btn-delete"
          onClick={handleClick}
        >
          D
        </button>
        <button
          data-value="("
          className="btn-brackets"
          onClick={handleClick}
        >
          (
        </button>
        <button
          data-value=")"
          className="btn-brackets"
          onClick={handleClick}
        >
          )
        </button>
        <button
          data-value="AC"
          className="btn-delete"
          onClick={handleClick}
        >
          AC
        </button>
      </div>
      <div className="operators">
        {['+', '-', '*', '/', '='].map((op) => (
          <button
            key={op}
            data-value={op}
            className="btn-operator"
            onClick={handleClick}
          >
            {op}
          </button>
        ))}
      </div>
    </div>
  );
}

function Main() {
  const [result, setResult] = useState('0');

  const handleChange = (e) => {
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    const operations = ['+', '-', '*', '/', '(', ')', '.'];
    const validChars = [...numbers, ...operations];

    let input = e.target.value;

    if ((result === 'Error' || result === 'Infinity') && numbers.includes(input[0])) {
      input = input[0];
    }

    input = input
      .split('')
      .filter(char => validChars.includes(char))
      .join('');

    if (input.length > 1 && input[0] === '0' && input[1] !== '.') {
      input = input.slice(1);
    }

    const lastChar = input[input.length - 1];
    const secondLastChar = input[input.length - 2];
    if (
      operations.includes(lastChar) &&
      operations.includes(secondLastChar) &&
      !(lastChar === '-' && secondLastChar !== '-')
    ) {
      input = input.slice(0, -1);
    }

    const hasNumber = /\d/.test(input);
    const hasLetter = /[a-zA-Z]/.test(input);
    if (hasLetter && hasNumber) {
      input = "" + input[0];
    }

    setResult(input || '0');
  };

  return (
    <div className="main">
      <h1>Calculator</h1>
      <div className="ui-wrapper">
        <input
          type="text"
          value={result}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              try {
                setResult(String(Number(eval(result).toFixed(10))));
              } catch {
                setResult('Error');
              }
            }
          }}
        />
        <Grid
          setResult={setResult}
        />
      </div>
      <hr />
      <p>v1.0 Developed by Matías 💻</p>
    </div>
  );
}

ReactDOM.render(<Main />, document.getElementById('root'));