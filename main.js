let rightAns, rightNum = 0,
  wrongNum = 0,qNum =0;
let check = document.getElementById('check');
document.getElementById('begin').addEventListener('click',function(){
document.querySelector('#begin').style.display = 'none';
addQuestion();
eventListeners();
check.style.display = 'flex';
  
})
/*document.addEventListener('DOMContentLoaded', () => {
  
  
    addQuestion();
    eventListeners();
  
});*/


eventListeners = () => {
check.addEventListener('click',validateAns)
};
addQuestion = () => {
  const url = "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple";
  fetch(url)
    .then(data => data.json())
    .then(result => showQuestion(result.results))
};



showQuestion = question =>{
  

    const questionHtml = document.createElement('div');
  questionHtml.classList.add('questions');
  question.forEach(question=>{
    rightAns = question.correct_answer;
    
    let possibleAns = question.incorrect_answers;
    
    possibleAns.splice(Math.floor(Math.random()*3),0,rightAns);
    questionHtml.innerHTML =`${qNum+1}. ${question.question}`;
   
 
 const answerDiv = document.createElement('div');
 answerDiv.classList.add('answers');
 possibleAns.forEach(answer=>{
   
 
  const answerHtml = document.createElement('li');
   
   answerDiv.classList.add('answers');
   
   answerHtml.classList.add('answer');
   answerHtml.textContent=answer;
 answerHtml.onclick = selectAnswer;
  
   answerDiv.appendChild(answerHtml);
  
 })
 questionHtml.appendChild(answerDiv);
document.querySelector('#app').appendChild(questionHtml);
})
}

selectAnswer = (e) =>{
  if (document.querySelector('.active')) {
    const activeAns = document.querySelector('.active');
    activeAns.classList.remove('active');
  }
  e.target.classList.add('active');
}






validateAns=()=>{
  
  if (document.querySelector('.questions .active')) {
    verifyanswer();
  }
  else{
    const errorDiv = document.createElement('div');
    errorDiv.classList.add('Error')
    errorDiv.textContent= 'please Select 1 answer '
    const questionDiv = document.querySelector('.questions');
    
    questionDiv.appendChild(errorDiv);
   setTimeout(()=>{
     document.querySelector('.Error').remove()
   },2000)
  }
}






verifyanswer = () => {
  const userAns = document.querySelector('.questions .active');
  if (userAns.innerText === rightAns) {
    qNum++;
    rightNum++;
  
  } else {
  qNum++;
    wrongNum++;
  }
  if (qNum === 10) {
    document.createElement('div');
    document.querySelector('#rightNum').innerHTML = ` Your points :  ${rightNum}`;
    document.createElement('div');
    document.querySelector('#wrongNum').innerHTML = `wrong answers : ${wrongNum}`
    document.querySelector('#score').style.display = 'flex';
    document.querySelector('.questions').style.display = 'none';
    check.innerText = 'New Game';
    check.addEventListener('click',()=>{
      window.location.reload();
    })
  }
  const app = document.querySelector('#app');
  while (app.firstChild){
    
    app.removeChild(app.firstChild);
    
  }
  addQuestion();
}
