'use strict';

// All hail the OMNILIST
class Omnilist {
    static #instance = null;
    constructor() {
        if (Omnilist.#instance)
            throw new Error("You're not supposed to make new singletons ya goof.");

        this.listOfAllThings = [];
        Omnilist.#instance = this;
    }

    add = (item) =>
    {
        this.listOfAllThings.push(item);
    }

    remove = (item) =>
    {
        let index = this.listOfAllThings.findIndex(currentItem => currentItem === item)
        if (index !== -1) {
            this.listOfAllThings.splice(index, 1);
        }
    }

    getList = () =>
    {
        return this.listOfAllThings;
    }

    static getInstance() {
        if (!Omnilist.#instance) {
            Omnilist.#instance = new Omnilist();
        }
        return Omnilist.#instance;
    }
}

export default Omnilist;