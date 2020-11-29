import React from 'react';
import ReactDOM from 'react-dom';

class Questions2 extends React.Component {

  constructor(props) {
    super();
    this.state = { question1: Number };
    this.state = { question2: Number };
    // flag equal to true (deactive),and flag equal to false(active)
    // this.state = {flag: true};
    // this.state ={ id: Number};

  }
  componentDidMount() {
    // let id = sessionStorage.getItem('id');
    // console.log(id);

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
    // create 
    postData('http://localhost:8081/routes/Save', this.state)
      .then(data => {
        console.log(data); // JSON data parsed by `data.json()` call

        // this.setState({flag: true});


      }, (error) => {
        console.log(error);
      })
  }


  myChangeHandler = (event) => {
    this.setState({ set2Question1: event.target.value });
  }
  myChangeHandler2 = (event) => {
    this.setState({ set2Question2: event.target.value });
  }

  render() {

    // const flag = this.state.flag;


    // let id = sessionStorage.getItem('id');
    // console.log(id);
    return (
      <form onSubmit={this.mySubmitHandler}>
        <h1>Set 2 :Please answer to the questions</h1>
        <p>Question 1:What is the range of values on the (horizontal)
            scale?</p>

        <input value={this.state.value}
          type='number'
          name='set2Question1'
          onChange={this.myChangeHandler}
        // disabled={this.state.id === false ? false : true}

        />
        <p>Question 2:According to the bar graph, what was the approximate population of the city in 1970?</p>
        <input value={this.state.value}
          type='number'
          name='set2Question1'
          onChange={this.myChangeHandler2}


        />
        <br />
        <br />
        <input type='submit' />
      </form>
    );
  }


}

ReactDOM.render(<Questions2 />, document.getElementById('root'));

export default Questions2;