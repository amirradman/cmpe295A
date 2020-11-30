import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

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

    postData('https://floating-wildwood-66664.herokuapp.com/routes/Save', this.state)
      .then(data => {
        console.log("here is data");
        console.log(data);
        sessionStorage.setItem('id', data._id);
        alert("Successfully Submitted. Thank you!")
        $('#submit1').prop('disabled', true);
      }, (error) => {
        console.log(error);
        alert("There Are Some Errors.Please Try Again.")
      })
  }

  render() {
    const mystyle = {           
     margin:"7px"
    };
    return (
      <form  onSubmit={this.mySubmitHandler}>
        <div className="form-group">
        {/* ................................................................ */}
        <h1>Please answer to the questions</h1>
        <h4>Graph 1</h4>
        {/* Graph 1 Question 1 Below */}
        <p><span class="bold">Q1.</span> Most probably how many deaths would there be the week following Oct. 3 in the US?</p>

          <label class="radio-inline">
          <input
            value="215897"
            type='radio'
            name='G1question1'
            onChange={this.myChangeHandler}
            step="any"
            required
          />
        A. 215897
        </label>
       

      
        <label class="radio-inline">
          <input
            value="202300"
            type='radio'
            name='G1question1'
            onChange={this.myChangeHandler}
            step="any"
          />
        B. 202300
        </label>
    
       
        <label class="radio-inline">
          <input
            value="206652"
            type='radio'
            name='G1question1'
            onChange={this.myChangeHandler}
            step="any"
          />
        C. 206652
        </label>
        
      
        <label class="radio-inline">
          <input style={mystyle} 
            value="Not sure"
            type='radio'
            name='G1question1'
            onChange={this.myChangeHandler}
            step="any"
          />
        D. Not sure
        </label>
       
        {/* ................................................. */}
        {/* Graph 1 Question 2 Below */}
        <p><span class="bold">Q2.</span> At least how many deaths would there be the week following Oct. 3 in the US?</p>
        <label>
        <input
          value="215897"
          type='radio'
          name='G1question2'
          onChange={this.myChangeHandler}
          step="any"
          required
        />
        A. 215897
        </label>
        <label>
        <input
          value="202300"
          type='radio'
          name='G1question2'
          onChange={this.myChangeHandler}
          step="any"
        />
        B. 202300
        </label>
        <label>
        <input
          value="206652"
          type='radio'
          name='G1question2'
          onChange={this.myChangeHandler}
          step="any"
        />
        C. 206652
        </label>
        <label>
        <input style={mystyle}
          value="Not sure"
          type='radio'
          name='G1question2'
          onChange={this.myChangeHandler}
          step="any"
        />
        D. Not sure
        </label>
{/*.................................................  */}
        {/* // disabled={this.state.flag === true ? true : false} */}
        
        {/* Graph 1 Question 3 Below */}
        <p><span class="bold">Q3.</span>In which week could there be the most deaths in the next 4 weeks in the US?</p>
        <label>
        <input
          value="The Week of Sep. 19th"
          type='radio'
          name='G1question3'
          onChange={this.myChangeHandler}
          step="any"
          required
        />
        A. The Week of Sep. 19th
        </label>
        <label>
        <input
          value="The Week of Sep. 26th"
          type='radio'
          name='G1question3'
          onChange={this.myChangeHandler}
          step="any"
        />
        B. The Week of Sep. 26th
        </label>
        <label>
        <input
          value="The Week of OCt. 3rd"
          type='radio'
          name='G1question3'
          onChange={this.myChangeHandler}
          step="any"
        />
        C. The Week of Oct. 3rd
        </label>
        <label>
        <input
          value="The Week of Oct. 10th"
          type='radio'
          name='G1question3'
          onChange={this.myChangeHandler}
          step="any"
        />
        D. The Week of Oct. 10th
        </label>
        {/* Graph 1 Question 4 Below */}
        <p><span class="bold">Q4.</span>In which week could there be the least deaths in the next 4 weeks in the US?</p>
        <label>
        <input
          value="The Week of Sep. 19th"
          type='radio'
          name='G1question4'
          onChange={this.myChangeHandler}
          step="any"
          required
        />
        A. The Week of Sep. 19th
        </label>
        <label>
        <input
          value="The Week of Sep. 26th"
          type='radio'
          name='G1question4'
          onChange={this.myChangeHandler}
          step="any"
        />
        B. The Week of Sep. 26th
        </label>
        <label>
        <input
          value="The Week of OCt. 3rd"
          type='radio'
          name='G1question4'
          onChange={this.myChangeHandler}
          step="any"
        />
        C. The Week of Oct. 3rd
        </label>
        <label>
        <input
          value="The Week of Oct. 10th"
          type='radio'
          name='G1question4'
          onChange={this.myChangeHandler}
          step="any"
        />
        D. The Week of Oct. 10th
        </label>
        {/* Graph 1 Question 5 Below */}
        <p><span class="bold">Q5. </span>Does the shade look confusing to you? (Scale 0 Extremely confusing - 10 Very clear)</p>
        <input class="form-control"
          value={this.state.question5}
          type='number'
          min="0"
          max="10"
          name='G1question5'
          onChange={this.myChangeHandler}
          step="any"
          required
        />
        {/* ................................................................ */}
        <hr></hr>
        <h4>Graph 2</h4>
        {/* Graph 2 Question 1 */}
        <p><span class="bold">Q1. </span>Most probably how many deaths would there be the week following Sep.19 in the US?</p>
        <label class="radio-inline">
          <input
            value="199222"
            type='radio'
            name='G2question1'
            onChange={this.myChangeHandler}
            step="any"
            required
          />
          A. 199222
        </label>
       

      
        <label class="radio-inline">
          <input
            value="196682"
            type='radio'
            name='G2question1'
            onChange={this.myChangeHandler}
            step="any"
          />
          B. 196682
        </label>
    
       
        <label class="radio-inline">
          <input
            value="197666"
            type='radio'
            name='G2question1'
            onChange={this.myChangeHandler}
            step="any"
          />
          C. 197666
        </label>
        
      
        <label class="radio-inline">
          <input
            value="Not sure"
            type='radio'
            name='G2question1'
            onChange={this.myChangeHandler}
            step="any"
          />
          D. Not sure
        </label>
        {/* Graph 2 Question 2 */}
        <p><span class="bold">Q2. </span>What does the top line tell you?</p>
        <label class="radio-inline">
          <input
            value="High bound"
            type='radio'
            name='G2question2'
            onChange={this.myChangeHandler}
            step="any"
            required
          />
          A. High Bound
        </label>
       

      
        <label class="radio-inline">
          <input
            value="One possible high bound"
            type='radio'
            name='G2question2'
            onChange={this.myChangeHandler}
            step="any"
          />
          B. One possible High Bound
        </label>
    
       
        <label class="radio-inline">
          <input
            value="Random"
            type='radio'
            name='G2question2'
            onChange={this.myChangeHandler}
            step="any"
          />
          C. Random
        </label>
        
      
        <label class="radio-inline">
          <input
            value="Not sure"
            type='radio'
            name='G2question2'
            onChange={this.myChangeHandler}
            step="any"
          />
          D. Not sure
        </label>

        {/* Graph 2 Question 3 */}
        <p><span class="bold">Q3. </span>What do all these lines represent?</p>
        <label class="radio-inline">
          <input
            value="Uncertainty of data"
            type='radio'
            name='G2question3'
            onChange={this.myChangeHandler}
            step="any"
            required
          />
          A. Uncertainty of data
        </label>
       
      
        <label class="radio-inline">
          <input
            value="Distribution of uncertainty"
            type='radio'
            name='G2question3'
            onChange={this.myChangeHandler}
            step="any"
          />
          B. Distribution of uncertainty
        </label>
    
       
        <label class="radio-inline">
          <input
            value="Similar to progress icon/loading icon"
            type='radio'
            name='G2question3'
            onChange={this.myChangeHandler}
            step="any"
          />
          C. Similar to progress icon/loading icon
        </label>
        
      
        <label class="radio-inline">
          <input
            value="Not sure"
            type='radio'
            name='G2question3'
            onChange={this.myChangeHandler}
            step="any"
          />
          D. Not sure
        </label>

        {/* Graph 2 Question 4 */}
        <p><span class="bold">Q4. </span>What does the bold line tell you?</p>
        <label class="radio-inline">
          <input
            value="Ensemble mean"
            type='radio'
            name='G2question4'
            onChange={this.myChangeHandler}
            step="any"
            required
          />
          A. Ensemble mean
        </label>
       
      
        <label class="radio-inline">
          <input
            value="Highest possibility"
            type='radio'
            name='G2question4'
            onChange={this.myChangeHandler}
            step="any"
          />
          B. Highest possibility
        </label>
    
       
        <label class="radio-inline">
          <input
            value="Observed data"
            type='radio'
            name='G2question4'
            onChange={this.myChangeHandler}
            step="any"
          />
          C. Observed data
        </label>
        
      
        <label class="radio-inline">
          <input
            value="Not sure"
            type='radio'
            name='G2question4'
            onChange={this.myChangeHandler}
            step="any"
          />
          D. Not sure
        </label>

        {/* Graph 2 Question 5 */}
        <p><span class="bold">Q5. </span>Do you find this graph useful? (Scale 0 Not at all - 10 Very useful)</p>
          <input class="form-control"
            value={this.state.value}
            min="0"
            max="10"
            type='number'
            name='G2question5'
            onChange={this.myChangeHandler}
            step="any"
            required
          />
        <hr></hr>
        {/* ................................................................ */}
        <h4>Graph 3</h4>
        {/* Graph 3 Question 1 */}
        <p><span class="bold">Q1. </span>The opacity of the red line is varied by the probability of the predictive data. Does this feature help you to better visualize the uncertainty of the predictive data?Please rate it from 1 to 4. </p>
        <label class="radio-inline">
          <input
            value="1"
            type='radio'
            name='G3question1'
            onChange={this.myChangeHandler}
            step="any"
            required
          />
          A. 1
        </label>
       
      
        <label class="radio-inline">
          <input
            value="2"
            type='radio'
            name='G3question1'
            onChange={this.myChangeHandler}
            step="any"
          />
          B. 2
        </label>
    
       
        <label class="radio-inline">
          <input
            value="3"
            type='radio'
            name='G3question1'
            onChange={this.myChangeHandler}
            step="any"
          />
          C. 3
        </label>
        
      
        <label class="radio-inline">
          <input
            value="4"
            type='radio'
            name='G3question1'
            onChange={this.myChangeHandler}
            step="any"
          />
          D. 4
        </label>
        {/* Graph 3 Question 2 */}
        <p><span class="bold">Q2.</span>The graph randomly animates through all the possible predictive data. Does that help you better understand the uncertainty nature of the predictive data?Please rate it from 1 to 4.</p>
        <label class="radio-inline">
          <input
            value="1"
            type='radio'
            name='G3question2'
            onChange={this.myChangeHandler}
            step="any"
            required
          />
          A. 1
        </label>
       
      
        <label class="radio-inline">
          <input
            value="2"
            type='radio'
            name='G3question2'
            onChange={this.myChangeHandler}
            step="any"
          />
          B. 2
        </label>
    
       
        <label class="radio-inline">
          <input
            value="3"
            type='radio'
            name='G3question2'
            onChange={this.myChangeHandler}
            step="any"
          />
          C. 3
        </label>
        
      
        <label class="radio-inline">
          <input
            value="4"
            type='radio'
            name='G3question2'
            onChange={this.myChangeHandler}
            step="any"
          />
          D. 4
        </label>

        {/* Graph 3 Question 3 */}
        <p><span class="bold">Q3. </span>How many people will most likely pass away due to COVID-19 on August 1?</p>
        <label class="radio-inline">
          <input
            value="18880"
            type='radio'
            name='G3question3'
            onChange={this.myChangeHandler}
            step="any"
            required
          />
          A. 18880
        </label>
       
      
        <label class="radio-inline">
          <input
            value="17000"
            type='radio'
            name='G3question3'
            onChange={this.myChangeHandler}
            step="any"
          />
          B. 17000
        </label>
    
       
        <label class="radio-inline">
          <input
            value="19800"
            type='radio'
            name='G3question3'
            onChange={this.myChangeHandler}
            step="any"
          />
          C. 19800
        </label>
        
      
        <label class="radio-inline">
          <input
            value="20000"
            type='radio'
            name='G3question3'
            onChange={this.myChangeHandler}
            step="any"
          />
          D. 20000
        </label>

        {/* Graph 3 Question 4 */}
        <p><span class="bold">Q4. </span>What’s the maximum number of people that will pass away due to COVID-19 on July 1st?</p>
        <label class="radio-inline">
          <input
            value="31383"
            type='radio'
            name='G3question4'
            onChange={this.myChangeHandler}
            step="any"
            required
          />
          A. 31383
        </label>
       
      
        <label class="radio-inline">
          <input
            value="22000"
            type='radio'
            name='G3question4'
            onChange={this.myChangeHandler}
            step="any"
          />
          B. 22000
        </label>
    
       
        <label class="radio-inline">
          <input
            value="35000"
            type='radio'
            name='G3question4'
            onChange={this.myChangeHandler}
            step="any"
          />
          C. 35000
        </label>
        
      
        <label class="radio-inline">
          <input
            value="28000"
            type='radio'
            name='G3question4'
            onChange={this.myChangeHandler}
            step="any"
          />
          D. 28000
        </label>

        {/* Graph 3 Question 5 */}
        <p><span class="bold">Q5. </span>What’s your overall experience of this uncertainty visualization with HOP and color gradient features?(Scale 0 Not at all - 10 Very useful)</p>
        <input class="form-control"  value={this.state.value}
          type='number'
          min="0"
          max="10"
          name='G3question5'
          onChange={this.myChangeHandler}
          required
        />
        <hr></hr>
        <br />
        <br />
        <div>
          {/* Selected option is : {this.state.selectedOption} */}
        </div>
        <input class="btn btn-lg  button" type='submit' id="submit1"/>
        </div>
      </form>
    );
  }
}


ReactDOM.render(<Questions />, document.getElementById('root'));

export default Questions;