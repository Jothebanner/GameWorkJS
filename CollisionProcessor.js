// singleton to manager colliders
// we need something to hold lists of the layer and colliders that reside in them
// global variables would work, though I think a singleton could be better because of lazy loading, ease of use (especially for beginners), and would follow the module schema I've been using for this project

// I guess I could have the collider track it's layer then have an OMNILIST, but for colliders
// Find which colliders are listening then run through the array and distribute events accordingly

// could have several lists, then move colliders to different layers

// loop through all colliders

// maybe just check for colliders around listening bois


// hear me out, what if you had one huge box with all of the colliders in it, then if there are more than idk like two colliders split the box such as this: http://www.mikechambers.com/blog/2011/03/21/javascript-quadtree-implementation/
// but like the biggest box would be measured by the distance of all of the colliders // downside is that everything would have to be rebuilt if the farthest colliders moved
// but like, if it were halved it could happen pretty fast. Rebuilding arrays could be spendy tho. Maybe some sort of hashmap or linked list perhaps


class CollisionProcessor {
    constructor() {
        //super();

        // I'm gonna try to build the solution from wikipedia

        // the basic idea is that we want to impliment a broad phase check using axis-aligned minimum bounding boxes; specifically, sweep and prune



        // list of colliders
        this.colliderList = [];
        // these lists will hold the start point and end point of each axis of each collider
        // a sorting algorithm will run each frame. There will be two endpoints in each list for each collider, 
        // if there is an endpoint of another collider between the two endpoints the the matrix for that vector will be updated and the other matrices will be checked to see if they are set to colliding
        // if all matricies are set to colliding then then the objects will be flagged for the narrow phase check

        // list of x axis
        this.xIntervalList = [];  // actually labeled endpoints? // example: {id: 50393, endpoint: 5}
        //NOTE: how is the matrix going to grow?? Will it be expensive?? // the matrix will consist of bool or int at one byte a per object per object
        // this will be exponentially expensive for memory
        // fug
        // we really only need to track the colliders that are moving tho

        //IDEA: potential optimization: space partitioning
        this.xIntersectMatrix = [];
        // list of y axis
        this.yIntervalList = [];
        this.yIntersectMatrix= [];
        // list of z axis
        this.zIntervalList = [];
        this.zIntersectMatrix = [];

        this.flaggedThisTick = []
    }


    static sortAndFlag(list)
    {
        // insertion sort I guess

        let sortedList = [];
        // prime list so there is something to compare and we don't have to run an if function to see i is 0
        sortedList.push(list[0]);

        for (let i = 1; i <= list.length -1; i++)
        {
            // new list to add to
            sortedList.push(list[i]);

            let j = sortedList.length - 1;

            while (list[i].endpoint < sortedList[j - 1].endpoint)
            {
                sortedList[j] = sortedList[j - 1];
                j--;
                if (j <= 0)
                    break;
            }

            sortedList[j] = list[i];
        }
        return sortedList;
    }
}

export default CollisionProcessor;