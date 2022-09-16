class Renderable {
    
    constructor()
    {
        this.xScale = 1;
        this.yScale = 1;
    }

    setXScale(eventResponse) {
        this.xScale = eventResponse.detail;
    }

    setYScale(eventResponse) {
        this.yScale = eventResponse.detail;
    }
}

export default Renderable;