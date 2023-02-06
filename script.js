const string = document.querySelector('#string')
const hook = document.querySelector('#hook')
const game_container = document.querySelector('.game_container')
document.addEventListener('keydown', keyDown)
var base_hook
var top_rock
var move_right_interval
var move_left_interval
let increase_value = 0
var initial_length = 0
var drop_interval
var string_pos = -500
var string_length = string.offsetTop
var dropString_interval
var string_length_control
var push_rock_interval
var retreat_string_interval
var string_length_control
var isJumping = false
var going_left = true
var retreat_interval

const claw_articulation_l = document.querySelector('.claw_articulation_l')
const claw_articulation_r = document.querySelector('.claw_articulation_r')

const screen_game_over = document.querySelector('.screen_game_over')
const btn_newGame = document.querySelector('#btn_new_game')


//==================================================================

//Ok



let grids = document.querySelectorAll('.grid')
let kok = -1
function deploy_rocks() {
    //Loop that creates and deploys rocks to random positions of the game
    for (let i = 0; i < 10; i++) {
        let random_y_spawn = (Math.floor(Math.random() * 260) + 300)
        let random_x_spawn = (Math.floor(Math.random() * 10) + 45)

        const rock = document.createElement('div')
        rock.classList.add('rock')
        rock.style.top = random_y_spawn + 'px'
        rock.style.left = random_x_spawn + 'px'

        kok++
        grids[kok].appendChild(rock)
    }

    //Sets random id for every rock created
    let all_rocks = document.querySelectorAll('.rock')
    for (let i = 0; i < all_rocks.length; i++) {
        let random_id = (Math.floor(Math.random() * 10) + 1)
        all_rocks[i].setAttribute('id', random_id)

    }

    //Verify rocks's id and set correct background color to it
    for (let i = 0; i < all_rocks.length; i++) {
        if (all_rocks[i].id == 1) {
            all_rocks[i].classList.add('gold')
        } else if (all_rocks[i].id == 2) {
            all_rocks[i].classList.add('gold')
        } else if (all_rocks[i].id == 3) {
            all_rocks[i].classList.add('copper')
        } else if (all_rocks[i].id == 4) {
            all_rocks[i].classList.add('copper')
        } else if (all_rocks[i].id == 5) {
            all_rocks[i].classList.add('copper')
        } else if (all_rocks[i].id == 6) {
            all_rocks[i].classList.add('stone')
        } else if (all_rocks[i].id == 7) {
            all_rocks[i].classList.add('stone')
        } else if (all_rocks[i].id == 8) {
            all_rocks[i].classList.add('stone')
        } else if (all_rocks[i].id == 9) {
            all_rocks[i].classList.add('stone')
        } else if (all_rocks[i].id == 10) {
            all_rocks[i].classList.add('stone')
        }
    }
}


//String X movement
function moving_left_right() {
    if (going_left == true) {//something is true
        move_right_interval = setInterval(() => {
            increase_value += 5
            string.style.left = increase_value + 'px'
            if (increase_value >= game_container.offsetLeft + 980) {
                going_left = false
                clearInterval(move_right_interval)
                moving_left_right()
            }
        }, 20)
    } else if (going_left == false) {
        move_left_interval = setInterval(() => {
            increase_value -= 5
            string.style.left = increase_value + 'px'
            if (increase_value <= game_container.offsetLeft + 20) {
                going_left = true
                clearInterval(move_left_interval)
                moving_left_right()
            }
        }, 20)
    }
}

//String Y movement
function dropString() {
    isJumping = true
    drop_interval = setInterval(() => {
        string_pos += 10
        string.style.top = string_pos + 'px'

        //If hook hits bottom
        if (string.offsetTop >= -80) {
            clearInterval(drop_interval)
            setTimeout(() => {
                retreat_string()
            }, 20)
        }
        //If hook hits rock
        let available_rocks = document.getElementsByClassName('rock')

        for (let i = 0; i < available_rocks.length; i++) {
            if (available_rocks[i]) {
                if (string.offsetTop + 680 >= available_rocks[i].offsetTop 
                    && string.offsetLeft + 10 >= available_rocks[i].offsetLeft//or
                    && string.offsetLeft <= available_rocks[i].offsetLeft + 40) {

                    clearInterval(drop_interval)
                    
                    menage_score(available_rocks[i])

                    setTimeout(() => {
                        retreat_string()
                        //Grabs rock
                        let grap_rock_interval
                        let pos = available_rocks[i].offsetTop

                        grap_rock_interval = setInterval(() => {
                            pos -= 10
                            available_rocks[i].style.top = pos + 'px'

                            if (pos <= 160) {

                                clearInterval(grap_rock_interval)
                                available_rocks[i].remove()
                            }
                        }, 20)
                    }, 20)
                }
            }
        }
    }, 20)
}


function retreat_string() {
    retreat_interval = setInterval(() => {
        string_pos -= 10
        string.style.top = string_pos + 'px'
        if (string_pos <= -500) {
            clearInterval(retreat_interval)
            moving_left_right()
            isJumping = false
        }
    }, 20)
}


//Drops string when Space button is pressed
function keyDown(e) {
    if (e.key == ' ') {
        //If 'isJumping....'
        if (isJumping == false) {
            clearInterval(move_left_interval)
            clearInterval(move_right_interval)
            dropString()
        }
    }
}


let score_counter = 0 
function menage_score(rock) {
    let score = document.querySelector('#score')
    const create_score = document.createElement('p')
    create_score.classList.add('p')
    let rock_pos_y = rock.offsetTop
    let rock_pos_x = rock.offsetLeft
    create_score.style.top = rock_pos_y + 'px'
    create_score.style.left = rock_pos_x + 'px'
    
    if (rock.classList[1] === 'gold') {
        create_score.textContent = '50'
        score_counter+=50
        score.textContent=score_counter
    } else if (rock.classList[1] === 'copper') {
        create_score.textContent = '30'
        score_counter+=30
        score.textContent=score_counter
    } else if (rock.classList[1] == 'stone') {
        create_score.textContent = '15'
        score_counter+=15
        score.textContent=score_counter
 
    }

    document.body.appendChild(create_score)
    //Moves score to top
    let score_pos_y = rock_pos_y
    setInterval(() => {
        score_pos_y -= 3
        create_score.style.top = score_pos_y + 'px'
        if (create_score.offsetTop <= 100) {
            create_score.remove()
        }

    }, 20)

    //Decreases score opacity
    let score_transparency = 10
    setInterval(() => {
        score_transparency--
        create_score.style.opacity = `0.${score_transparency}`

    }, 150)
}



//Main control
var game_control
function main() {
    deploy_rocks()
    moving_left_right()
    game_control = setInterval(() => {

        //Controls rock quantity and ends game if it equals 0
        let available_rocks = document.getElementsByClassName('rock')
        if (available_rocks.length === 0) {
            clearInterval(game_control)
            clearInterval(move_right_interval)
            clearInterval(move_left_interval)
            clearInterval(drop_interval)
            clearInterval(retreat_interval)

            screen_game_over.style.display = 'flex'

        }

    }, 20)
}
main()



btn_newGame.addEventListener('click', ()=>{
    window.location.reload()
}
)

