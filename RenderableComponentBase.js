'use strict';

import Omnilist from "./Omnilist.js";
import Vector3 from "./Vector3.js";
import WorldComponentBase from "./WorldComponentBase.js";

class RenderableComponentBase extends WorldComponentBase {
    
    constructor(position)
    {
        super(position);

        // if it is renderable add it to the OMNILIST
        // ALL HAIL THE OMNILIST
        Omnilist.getInstance().add(this);
    }
}

export default RenderableComponentBase;