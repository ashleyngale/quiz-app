// when the user clicks the start button
function startQuiz(){
    $('#start').on('click', function(event){
      renderAQuestion();
    }
    );
  }
  
  
  //Display question number and score obtained
  function updateQuestionAndScore(){
    const html = $(`<ul> <li id="js-answered"> Question Number:${STORE.currentQuestion + 1}/${STORE.questions.length}</li> <li id="js-score">Score: ${STORE.score}/${STORE.questions.length}</li>
    </ul>`);
    $(".question-and-score").html(html);
  }
  
  //Display options for the current question
  function updateOptions()
  {
    let question = STORE.questions[STORE.currentQuestion];
    //display new question while the #question doesnt exceeded the # of questions in store 
    for(let i=0; i<question.options.length; i++)
  {
    //add the question options 
  $('.jsOptions').append(`<input type= "radio" name="options" id="option${i+1}" value= "${question.options[i]}" tabinex = "${i+1}">
  <label for= "option${i+1}"> ${question.options[i]}
  </label> <br/>
  <span id="js-r${i+1}"></span>
  `);
  }
  }
  
  //display the question
  function renderAQuestion(){
    let question = STORE.questions[STORE.currentQuestion];
    updateQuestionAndScore();
    //indert html for the question
    const questionHtml = $(`
    <div>
    <form id= "jsQuestions" class= "question-form">
  
    <fieldset>
    <div class= "main question">
          <div class= "header-container">
            
            <legend> ${question.question}</legend>
          </div>
        </div> 
  
        <div class= "main options">
          <div class= "header-container">
            <div class="jsOptions"> </div>
        </div>
      </div>
    
  
      <div class= "main">
        <div class= "header-container">
          <button type = "submit" id="answer" tabindex="5">Submit</button>
          <button type = "button" id="next-question" tabindex="6"> Next </button>
        </div>
      </div>
    </fieldset>
    </form>
  </div>`);
  //add the above html in the main tag
  $("main").html(questionHtml);
  updateOptions();
  $("#next-question").hide();
  }
  
  //display results & restart quiz button
  function displayResults(){
    let resultHtml = $(
      `<div class= "results">
      <form id="js-restart-quiz">
      <fieldset>
         <div class= "main">
        <div class= "header-container">
            <legend>Score: ${STORE.score}/${STORE.questions.length}</legend>
          </div>
        </div>
      
       <div class= "main">
        <div class= "header-container">
            <button type="button" id="restart"> Restart Quiz </button>
          </div>
        </div>
      </fieldset>
  </form>
  </div>`);
  //update current question and score
  STORE.currentQuestion = 0;
  STORE.score = 0;
  $("main").html(resultHtml);
  }
  
  //check whether it reaches the end of the questions list
  function endQuestions(){
    //when the next button is clicked check if lenght matches questions length and display results or display next question
    $('body').on('click','#next-question', (event) => {
      STORE.currentQuestion === STORE.questions.length?displayResults() : renderAQuestion();
    });
  }
  
  //check whether the option is right or wrong
  function handleSelectedOption(){
    //when the submit button is clicked 
    $('body').on("submit",'#jsQuestions', function(event) {
      event.preventDefault();
      let currentQues = STORE.questions [STORE.currentQuestion];
      //alert the user if they didnt check an option
      let selectedOption = $("input[name=options]:checked").val();
      if (!selectedOption){
        alert("Choose an option");
        return;
      }
          let id_num = currentQues.options.findIndex
          (i => i === selectedOption);
          let id = "#js-r" + ++id_num;
          $('span').removeClass("right-answer wrong-answer");
          if(selectedOption === currentQues.answer)
          {
            STORE.score++;
            $(`${id}`).append(`You got it right<br/>`);
            $(`${id}`).addClass("right-answer");
          }
          else{
            $(`${id}`).append(`You got it wrong <br/> The answer is "${currentQues.answer}"<br/>`);
        $(`${id}`).addClass("wrong-answer");
      } 
  //display score, hide submit button and show next button
            STORE.currentQuestion++;
          $("#js-score").text(`Score: ${STORE.score}/${STORE.questions.length}`);
          $('#answer').hide();
          $("input[type=radio]").attr('disabled', true);
          $('#next-question').show();
        });
        }
  
        function restartQuiz(){
          $('body').on('click','#restart', (event) => 
          {
            renderAQuestion();
          });
        }
  
        function handleQuizApp(){
        startQuiz();
        endQuestions();
        handleSelectedOption();
        restartQuiz();
        }
        $(handleQuizApp);
      
  
  