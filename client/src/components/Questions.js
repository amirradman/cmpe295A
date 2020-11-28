import React from 'react';
import ReactDOM from 'react-dom';

class Questions extends React.Component {

  constructor(props) {
    super();
    this.state = { G1question1: {} };
    this.state = { G1question2: {} };
    this.state = { G1question3: {} };
    this.state = { G1question4: {} };
    this.state = { G1question5: {} };
    
    this.state = { G2question1: {} };
    this.state = { G2question2: {} };
    this.state = { G2question3: {} };
    this.state = { G2question4: {} };
    this.state = { G2question5: {} };
    
    this.state = { G3question1: {} };
    this.state = { G3question2: {} };
    this.state = { G3question3: {} };
    this.state = { G3question4: {} };
    this.state = { G3question5: {} };
    
    this.myChangeHandler = this.myChangeHandler.bind(this);
  }




  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({
      [nam]: val,
    });
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
    return (
      <form onSubmit={this.mySubmitHandler}>
        {/* ................................................................ */}
        <h1>Please answer to the questions</h1>
        <p>Q1: Most probably how many deaths would there be one week ahead Sep. 25 in the US?</p>


        <label>
          <input
            value="205974"
            type='radio'
            name='G1question1'
            onChange={this.myChangeHandler}
            step="any"
          />
        205974
        </label>
        <label>
          <input
            value="199470"
            type='radio'
            name='G1question1'
            onChange={this.myChangeHandler}
            step="any"
          />
        199470
        </label>
        <label>
          <input
            value="201741"
            type='radio'
            name='G1question1'
            onChange={this.myChangeHandler}
            step="any"
          />
        201741
        </label>
        <label>
          <input
            value="Not sure"
            type='radio'
            name='G1question1'
            onChange={this.myChangeHandler}
            step="any"
          />
        Not sure
        </label>
        {/* ................................................. */}
        <p>Q2: At least how many deaths would there be one week ahead Sep. 25 in the US?</p>
        <label>
        <input
          value="205974"
          type='radio'
          name='G1question2'
          onChange={this.myChangeHandler}
          step="any"
        />
        205974
        </label>
        <label>
        <input
          value="199470"
          type='radio'
          name='G1question2'
          onChange={this.myChangeHandler}
          step="any"
        />
        199470
        </label>
        <label>
        <input
          value="201741"
          type='radio'
          name='G1question2'
          onChange={this.myChangeHandler}
          step="any"
        />
        201741
        </label>
        <label>
        <input
          value="Not sure"
          type='radio'
          name='G1question2'
          onChange={this.myChangeHandler}
          step="any"
        />
        Not sure
        </label>
{/*.................................................  */}
        {/* // disabled={this.state.flag === true ? true : false} */}
        

        <p>Question 3:What is the range of values on the (horizontal)
            scale?</p>

        <input
          value={this.state.question3}
          type='number'
          name='G1question3'
          onChange={this.myChangeHandler}
          step="any"
        />
        <p>Question 4:According to the bar graph, what was the approximate population of the city in 1970?</p>
        <input
          value={this.state.question4}
          type='number'
          name='G1question4'
          onChange={this.myChangeHandler}
          step="any"
        />
        <p>Question 5:According to the bar graph, what was the approximate population of the city in 1970?</p>
        <input
          value={this.state.question5}
          type='number'
          name='G1question5'
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
          name='G2question1'
          onChange={this.myChangeHandler}
          step="any"
        />
        <p>Question 2:According to the bar graph, what was the approximate population of the city in 1970?</p>
        <input value={this.state.value}
          type='number'
          name='G2question2'
          onChange={this.myChangeHandler}
          step="any"
        />


        <p>Question 3:What is the range of values on the (horizontal)
            scale?</p>

        <input value={this.state.value}
          type='number'
          name='G2question3'
          onChange={this.myChangeHandler}
          step="any"
        />
        <p>Question 4:According to the bar graph, what was the approximate population of the city in 1970?</p>
        <input value={this.state.value}
          type='number'
          name='G2question4'
          onChange={this.myChangeHandler}
          step="any"
        />
        <p>Question 5:According to the bar graph, what was the approximate population of the city in 1970?</p>
        <input value={this.state.value}
          type='number'
          name='G2question5'
          onChange={this.myChangeHandler}
          step="any"

        />
        <hr></hr>
        {/* ................................................................ */}
        <h4>Graph 3</h4>
        <p>Question 1:What is the range of values on the (horizontal)
            scale?</p>

        <input value={this.state.value}
          type='number'
          name='G3question1'
          onChange={this.myChangeHandler}
          step="any"
        />
        <p>Question 2:According to the bar graph, what was the approximate population of the city in 1970?</p>
        <input value={this.state.value}
          type='number'
          name='G3question2'
          onChange={this.myChangeHandler}
          step="any"
        />


        <p>Question 3:What is the range of values on the (horizontal)
            scale?</p>

        <input value={this.state.value}
          type='number'
          name='G3question3'
          onChange={this.myChangeHandler}
          step="any"
        />
        <p>Question 4:According to the bar graph, what was the approximate population of the city in 1970?</p>
        <input value={this.state.value}
          type='number'
          name='G3question4'
          onChange={this.myChangeHandler}
          step="any"
        />
        <p>Question 5:According to the bar graph, what was the approximate population of the city in 1970?</p>
        <input value={this.state.value}
          type='number'
          name='G3question5'
          onChange={this.myChangeHandler}


        />
        <hr></hr>
        <br />
        <br />
        <div>
          {/* Selected option is : {this.state.selectedOption} */}
        </div>
        <input type='submit' />
      </form>
    );
  }
}



ReactDOM.render(<Questions />, document.getElementById('root'));

export default Questions;