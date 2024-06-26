
      let score = JSON.parse(localStorage.getItem('score')) || {
          wins: 0,
          losses: 0,
          ties: 0
        };

        updateScoreElement();

      function updateScoreElement(){
        document.querySelector('.score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
      }

      function pickComputerMove(){
        const randomNumber = Math.random();
        let computerMove = '';

        if (randomNumber >= 0 && randomNumber < (1/3)){
          computerMove ='rock';
        }
        else if (randomNumber >= (1/3) && randomNumber < (2/3)){
          computerMove ='paper';
        }
        else if (randomNumber >= (2/3) && randomNumber < 1){
          computerMove ='scissors';
        }
        return computerMove;
      }

      let isAutoPlaying = false;
      let intervalID;

      function autoPlay(){
        if(!isAutoPlaying){
          intervalID = setInterval(() =>{
            const playerMove = pickComputerMove();
            playGame(playerMove);
          }, 1000);
          isAutoPlaying = true;
        } else {
          clearInterval(intervalID);
          isAutoPlaying = false;
        }
      }

      document.querySelector('.rock-button').addEventListener('click', () => {
        playGame('rock');
      });

      document.querySelector('.paper-button').addEventListener('click', () => {
        playGame('paper');
      });

      document.querySelector('.scissor-button').addEventListener('click', () => {
        playGame('scissors');
      });

      document.querySelector('.reset-button').addEventListener('click', () => {
        score.wins = 0;
        score.losses = 0;
        score.ties = 0;
        localStorage.removeItem('score'); 
        updateScoreElement();
      })

      document.querySelector('.autoPlay-button').addEventListener('click', () => {
        autoPlay();
      });

      document.body.addEventListener('keydown', (event) => {
        if (event.key === 'r'){
          playGame('rock');
        }
        else if (event.key === 'p'){
          playGame('paper');
        }
        else if ( event.key === 's'){
          playGame('scissors');
        }
      });

      function playGame(playerMove){
        const computerMove = pickComputerMove();
        let result = ''
        
        if (playerMove === 'scissors'){
          if (computerMove === 'rock'){
            result = 'Loss';
          }
          else if (computerMove === 'paper'){
            result = 'Win';
          }
          else if (computerMove === 'scissors'){
            result = 'Tie'
          }
        } 
        
        else if (playerMove === 'paper'){
          if (computerMove === 'rock'){
            result = 'Win';
          }
          else if (computerMove === 'paper'){
            result = 'Tie';
          }
          else if (computerMove === 'scissors'){
            result = 'Loss'
          }
        }

        else if (playerMove === 'rock'){
          if (computerMove === 'rock'){
            result = 'Tie';
          }
          else if (computerMove === 'paper'){
            result = 'Loss';
          }
          else if (computerMove === 'scissors'){
            result = 'Win'
          }
        }

        if (result === 'Win'){
          score.wins += 1;
        } 
        else if (result === 'Loss'){
          score.losses += 1;
        }
        else if (result === 'Tie'){
          score.ties += 1;
        }

        localStorage.setItem('score', JSON.stringify(score));

        updateScoreElement();

        document.querySelector('.result').innerHTML = result;
        document.querySelector('.moves').innerHTML = `You --> <img src="images/${playerMove}-emoji.png" class="icon"><img src="images/${computerMove}-emoji.png" class="icon"> <-- Computer`;


      }

  