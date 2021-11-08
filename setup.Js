const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const timeDisplayElement = document.getElementById('timer')

const finishTimeDisplay = document.getElementById('finishTime')

const resultTime = document.getElementById('speedCount')


const btRestart = document.getElementById('btRestart')

const insTxt = document.getElementById('startTyping')

var quote = ('')


console.log(quoteDisplayElement);






function getNewQuote(){
  return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}



let startTimer = null;
let endTimer = null;
let timeTaken = null;





async function renderNewQuote(){
    quote = await getNewQuote()    

    const charecters = quote.split("").map((char) =>{
      const span = document.createElement("span");
      span.innerText = char;
      quoteDisplayElement.appendChild(span);
      return span;
    
    });  
    

    let chrIndex = 0;

    let currentCharecter = charecters[chrIndex];
    currentCharecter.classList.add("coursour");

    const keylistner = document.addEventListener('keydown', ({key}) => {
      console.log(key);
      


      if(!startTimer && key === currentCharecter.innerText){
        
        insTxt.classList.replace("startTyping" , "hide")

        timeDisplayElement.innerText = 0
        startTimer = new Date();
        setInterval (() => {
          timeDisplayElement.innerText = getTimertime()
        },1000)
      }
      
      if (key === currentCharecter.innerText){
        currentCharecter.classList.remove("coursour");
        currentCharecter.classList.add("done");
        currentCharecter = charecters[++chrIndex];
        
      }
      



      if (chrIndex >= charecters.length){


        endTimer = new Date();

        

        const delta = endTimer - startTimer;
        const second = delta/ 1000;

        const numberOfWords = quote.split(" ").length;
        console.log(numberOfWords);

        const wps = numberOfWords / second;
        const wpm = Math.floor( wps* 60);
        
        resultTime.innerText = ("Your Speed= "+ wpm + "wpm");

        document.removeEventListener("keydown", keylistner);

        timeDisplayElement.classList.replace("timer", "hide");

        finishTimeDisplay.classList.replace("hide", "timer");
        finishTimeDisplay.innerText = ("Time Taken= "+ Math.floor((endTimer - startTimer) / 1000) + "sec");
        
        btRestart.classList.replace("hide", "sub-div");

        
        



        
        
        return;
      }

      currentCharecter.classList.add("coursour");


    })
    

    



}


function getTimertime(){
  return Math.floor((new Date() - startTimer) / 1000)
};







renderNewQuote()