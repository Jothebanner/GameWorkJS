class Input {

    // I want this to by like Unity's static Input class, but seeing that they cheat and it's not REALLY static we're gonna have to have an instance of it :(
    // everytime I learn more things, I discover that every language cheats. Like C#'s C++ extern bois being static even though they can do whatever they want once out of the C# scope
    // I'm thinking like a buffer to store all of the button presses for that frame

    // but like what if instead I find a way to just pass on the event?? no, because you can't call an event result from a method :L
    // small brain, no thoughts.

    // each gameObject would have it's own input boi, future-proof multiplayer that will probably never happen lol
    // each input will have it's own buffer. The input.getkey(key) will just check if that key is in gameObjects buffer
    // when are key events processed? Hopefully before I need to check :L


    // SINGLETON :O
    // bruh

    // singleton vs inputcomponent

    // I think, based off of the current design of my framework, that I should use the inputComponent solution
    // The object would have to inherit from the inputComponent class, but like an input script should be in-charge of all the input gathering/processing then
    // other bois should use that data, right?
    // single responsibility or something?


    // Both is good

    /**
     * listen, what if it were a singleton with everything hidden?
     * like input.getkey();
      static getKey(key) {
          if (input.getInstance().heldKeys.find(currentKey => currentKey === key))
            return true;
          else
            return false;
      }

      static getInstance() {
        if (!InputSingleton.instance) {
            InputSingleton.instance = new InputSingleton();
        }
        return InputSingleton.instance;
     }

    */

    static setListeners()
    {
        window.addEventListener('keypress', (event) => {event.key});
    }

    static getKey(key) {
        window.onkeypress = (event) => {
        }
    }

    static getKeyDown(key) {

        window.onkeydown = (event) => {
            return true;
        }

        return false;
    }

    static getKeyUp(key) {
        window.onkeyup = (event) => {
            if (event.key == key) {
                return true;
            }
            else {
                return false;
            }
        }
    }

}

export default Input;