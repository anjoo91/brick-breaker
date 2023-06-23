                                                              
    _/_/_/                      _/                    _/      
    _/    _/      _/  _/_/                _/_/_/      _/  _/   
    _/_/_/        _/_/          _/      _/            _/_/      
    _/    _/      _/            _/      _/            _/  _/     
    _/_/_/        _/            _/        _/_/_/      _/    _/    
                                                                
                                                                
                                                                                            
    _/_/_/                                               _/                                
    _/    _/      _/  _/_/       _/_/        _/_/_/      _/  _/       _/_/       _/  _/_/   
    _/_/_/        _/_/         _/_/_/_/    _/    _/      _/_/       _/_/_/_/     _/_/        
    _/    _/      _/           _/          _/    _/      _/  _/     _/           _/           
    _/_/_/        _/            _/_/_/      _/_/_/      _/    _/     _/_/_/     _/            


- By: anjoo91
- GitHub Repo: https://github.com/anjoo91/brick-breaker
- GitHub Deployment Page: https://anjoo91.github.io/brick-breaker/
- Game Version: 0.1a


**File Structure:**

    BrickBreaker 
    ├── assets
    │   ├── images
    │   └── sounds
    ├── css
    │   └── style.css
    ├── index.html
    ├── js
    │   └── app.js
    └── README.md

# Brick Breaker: Clone of Arkanoid


**About This Game:**

    A classic brick-breaking game built with HTML, CSS, & Javascript. HTML Canvas is used.

    Your goal is to break all the bricks, using the paddle to return the ball towards the bricks each time. 
    Clearing all bricks will result in a victory, while missing the ball will result in a loss of a life.
    When all lives have been exhausted, the game will end - you lost. 
    
    You may restart the round when the restart button appears.
    Pressing Escape at any time will pause the game.
    You may progress to the next round. 

**Screenshots:**    
Game Start Page: 
    ![Game Start Page](https://anjoo91.github.io/brick-breaker/assets/images/landing_page.PNG)

Game Page:
    ![Game Page](https://anjoo91.github.io/brick-breaker/assets/images/game_page.PNG)

Game Pause: 
    ![Game Pause](https://anjoo91.github.io/brick-breaker/assets/images/game_pause.PNG)

Game Win: 
    ![Game Win](https://anjoo91.github.io/brick-breaker/assets/images/game_win.PNG)

Player Scores:
    ![Player Scores](https://anjoo91.github.io/brick-breaker/assets/images/player_scores.PNG)


**Technologies Used:**
* HTML & HTML Canvas
* CSS
* Javascript
* GitHub


**Getting Started:**
    
    Play the game here: https://anjoo91.github.io/brick-breaker/

    You can start the game by clicking on the "Press Start to Play" button. 
    The game automatically starts upon loading.
    
    Basic Controls: 
        + paddle movement: left or right arrow key
        + pause game: escape key
        + unpause game: escape key or click the resume button
        + debug mode/cheat: backslash twice consecutively

    Mechanics: 
        You control a paddle that can move left and right. Use the paddle to catch the ball.
        Every time you fail to catch the ball, you lose a life. When you've lost all your lives, you lose the game.
    
        The goal of the game is to return the ball and hit the bricks. Every time a brick is hit, it will disappear and your score increases by 1.
        You win the stage when all the bricks are cleared from the screen. You can choose to advance to the next level or go view player scores. 
        Your score is carried over to the next stage until you either lose or choose to go view player scores. 

        If your score is in the top 10 player scores, it will be stored, removing any scores that fall out of the top 10.
        Scores are stored in local storage, so scores are only specific to each session and browser.

        You may pause the game at any point by pressing ESC on your keyboard. Resume the game at any poitn by pressing ESC again, or clicking on the resume button.

**Next Steps:**    
* Sound effects for ball bounce, brick break, and other in-game events
* More levels & brick configurations
* Utilize database instead of local storage
* Add occasional powerups
* Add difficulty settings that will affect ball speed and powerup frequency


