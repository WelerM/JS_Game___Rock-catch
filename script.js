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
var string_length = string.offsetTop
var dropString_interval
var string_length_control
var push_rock_interval
var retreat_string_interval
var string_length_control
//==================================================================

function keyDown(e) {
    if (e.key == ' ') {
        clearInterval(move_left_interval)
        clearInterval(move_right_interval)
        dropString()
    }
}

function load_rocks() {
    for (let i = 0; i < 10; i++) {
        let random_x_spawn = (Math.floor(Math.random() * 900) + 10)
        let random_y_spawn = (Math.floor(Math.random() * 300) + 300)
        const rock = document.createElement('div')
        rock.classList.add('rock')
        rock.style.left = random_x_spawn + 'px'
        rock.style.top = random_y_spawn + 'px'
        game_container.appendChild(rock)
    }
}
load_rocks()


//String behavior
function moving_left_right() {
    move_right_interval = setInterval(() => {
        increase_value += 5
        string.style.left = increase_value + 'px'
        if (increase_value >= game_container.offsetLeft + 980) {
            clearInterval(move_right_interval)

            move_left_interval = setInterval(() => {
                increase_value -= 5
                string.style.left = increase_value + 'px'
                if (increase_value <= game_container.offsetLeft + 20) {
                    clearInterval(move_left_interval)
                    moving_left_right()
                }
            }, 20)
        }
    }, 20)
}
moving_left_right()


function dropString() {
    initial_length = string_length
    //Drops string
    dropString_interval = setInterval(() => {
        initial_length += 15
        string.style.top = initial_length + 'px'
    }, 20)
  
    //Limit control
    string_length_control = setInterval(() => {
        if (string.offsetTop + 680 >= game_container.offsetTop + 630) {
            clearInterval(dropString_interval)
            clearInterval(string_length_control)
            retreat_string()
                  
        }
    }, 20)
}

function retreat_string() {
    //Pushes back string
    retreat_string_interval = setInterval(() => {
        initial_length -= 15
        console.log(initial_length);
        string.style.top = initial_length + 'px'
    }, 20)
//
    //Stops retreat of string
    string_length_control = setInterval(() => {
        if (string.offsetTop + 680 <= game_container.offsetTop + 200) {
            clearInterval(retreat_string_interval)
            clearInterval(string_length_control)
            //Required for good function of string
            clearInterval(game_control)
            //Required for good function of string
            main()
            moving_left_right()
        }
    })
}

function push_rock() {
    push_rock_interval = setInterval(() => {
        let available_rocks = document.getElementsByClassName('rock')
        for (let i = 0; i < available_rocks.length; i++) {
            if (available_rocks[i]) {
                available_rocks[i].style.top -= 15 + 'px'
                if (available_rocks[i].offsetTop <= 200) {
                    clearInterval(push_rock_interval)
                    available_rocks[i].remove()
                }
            }
        }
    }, 20)
}

//Main control
var game_control
function main() {
    game_control = setInterval(() => {
        let available_rocks = document.getElementsByClassName('rock')

        for (let i = 0; i < available_rocks.length; i++) {
            if (available_rocks[i]) {
                if (string.offsetTop + 680 >= available_rocks[i].offsetTop + 40
                    && string.offsetLeft + 10 >= available_rocks[i].offsetLeft
                    && string.offsetLeft <= available_rocks[i].offsetLeft + 40) {

                    console.log('impact');
                    //Stops string from descenting
                    clearInterval(dropString_interval)
                    //Clears this scope's interval so functions bellow are called once
                    clearInterval(game_control)
                    retreat_string()
                    push_rock()
                }
                //Rock removal
            }
        }
    }, 20)
}
main()









/*    setInterval(() => {
base_hook = hook.offsetTop + 10
top_rock = random_rock.offsetTop
}, 20) */