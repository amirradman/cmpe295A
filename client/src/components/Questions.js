import React from 'react';
import ReactDOM from 'react-dom';

class Questions extends React.Component {

  constructor(props) {
    super();
    this.state = { question1: {} };
    this.state = { question2: {} };
    this.state = { question3: {} };
    this.state = { question4: {} };
    this.state = { question5: {} };
    this.myChangeHandler = this.myChangeHandler.bind(this);

  }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  }


  mySubmitHandler = (event) => {
    event.preventDefault();
    async function postData(url = '', data = {}) {
      // Default options are marked with *
      const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
      return response.json(); // parses JSON response into native JavaScript objects
      ;
    }

    postData('http://localhost:8081/routes/Save', this.state)
      .then(data => {
        console.log("here is data");
        console.log(data);
        sessionStorage.setItem('id', data._id);
      }, (error) => {
        console.log(error);
      })
  }

  render() {

    // const flag = this.state.flag;
    // console.log(flag);
    return (
      <form onSubmit={this.mySubmitHandler}>
        {/* ................................................................ */}
        <h1>Please answer to the questions</h1>
        <h4>Graph 1 </h4>
        <p>Question 1:According to the bar graph, what was the approximate population of the city in 1970?</p>
        <input
          value={this.state.question1}
          type='number'
          name='question1'
          onChange={this.myChangeHandler}
          step="any"

        />
        <p>Question 2:According to the bar graph, what was the approximate population of the city in 1970?</p>
        <input
          value={this.state.question2}
          type='number'
          name='question2'
          onChange={this.myChangeHandler}
          step="any"
        // disabled={this.state.flag === true ? true : false}
        />

        <p>Question 3:What is the range of values on the (horizontal)
            scale?</p>

        <input
          value={this.state.question3}
          type='number'
          name='question3'
          onChange={this.myChangeHandler}
          // disabled={this.state.id === false ? false : true}
          step="any"
        />
        <p>Question 4:According to the bar graph, what was the approximate population of the city in 1970?</p>
        <input
          value={this.state.question4}
          type='number'
          name='question4'
          onChange={this.myChangeHandler}
          step="any"
        />
        <p>Question 5:According to the bar graph, what was the approximate population of the city in 1970?</p>
        <input
          value={this.state.question5}
          type='number'
          name='question5'
          onChange={this.myChangeHandler}
          step="any"

        />
        {/* ................................................................ */}
        <hr></hr>
        <h4>Graph 2</h4>
        <p>Question 1:What is the range of values on the (horizontal)
            scale?</p>

        <input value={this.state.value}
          type='number'
          name='question1'
          onChange={this.myChangeHandler}
          // disabled={this.state.flag === true ? true : false}
          step="any"
        />
        <p>Question 2:According to the bar graph, what was the approximate population of the city in 1970?</p>
        <input value={this.state.value}
          type='number'
          name='question2'
          onChange={this.myChangeHandler2}
          // disabled={this.state.flag === true ? true : false}
          step="any"
        />


        <p>Question 3:What is the range of values on the (horizontal)
            scale?</p>

        <input value={this.state.value}
          type='number'
          name='Question3'
          onChange={this.myChangeHandler}
          // disabled={this.state.id === false ? false : true}
          step="any"
        />
        <p>Question 4:According to the bar graph, what was the approximate population of the city in 1970?</p>
        <input value={this.state.value}
          type='number'
          name='Question4'
          onChange={this.myChangeHandler2}
          step="any"
        />
        <p>Question 5:According to the bar graph, what was the approximate population of the city in 1970?</p>
        <input value={this.state.value}
          type='number'
          name='Question5'
          onChange={this.myChangeHandler2}
          step="any"

        />
        <hr></hr>
        {/* ................................................................ */}
        <h4>Graph 3</h4>
        <p>Question 1:What is the range of values on the (horizontal)
            scale?</p>

        <input value={this.state.value}
          type='number'
          name='question1'
          onChange={this.myChangeHandler}
          // disabled={this.state.flag === true ? true : false}
          step="any"
        />
        <p>Question 2:According to the bar graph, what was the approximate population of the city in 1970?</p>
        <input value={this.state.value}
          type='number'
          name='question2'
          onChange={this.myChangeHandler2}
          // disabled={this.state.flag === true ? true : false} 
          step="any"
        />


        <p>Question 3:What is the range of values on the (horizontal)
            scale?</p>

        <input value={this.state.value}
          type='number'
          name='Question3'
          onChange={this.myChangeHandler}
          // disabled={this.state.id === false ? false : true}
          step="any"
        />
        <p>Question 4:According to the bar graph, what was the approximate population of the city in 1970?</p>
        <input value={this.state.value}
          type='number'
          name='Question4'
          onChange={this.myChangeHandler2}
          step="any"
        />
        <p>Question 5:According to the bar graph, what was the approximate population of the city in 1970?</p>
        <input value={this.state.value}
          type='number'
          name='Question5'
          onChange={this.myChangeHandler2}


        />
        <hr></hr>
        <br />
        <br />
        <input type='submit' />
      </form>
    );
  }
}



ReactDOM.render(<Questions />, document.getElementById('root'));

export default Questions;