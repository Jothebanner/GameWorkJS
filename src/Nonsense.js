
class writeToConsole
{
    static writer()
    {
        console.log("Im writing!");
    }
}

class notherWriter extends writeToConsole {
    constructor() {

    }

    test() {
        React.useEffect(() => {
            requestAnimationFrame(drawCircle);
            requestAnimationFrame(imageTest);
        })
    
        function createAndCallDog()
        {
            let fido = new dog("fido");
            fido.callDog();
        }

        this.notherWriter.writer();
        createAndCallDog();
    }
}

class dog {
    constructor (name) {
        this.name = name;
    }

    callDog()
    {
        console.log("Come're ", this.name);
    }
}