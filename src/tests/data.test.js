import {act, render} from '@testing-library/react';
import {unmountComponentAtNode} from "react-dom";
import Data from "../data";
import React from "react";

describe('affichage des différents types de données', () => {
    let container = null;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it("bon affichage des températures", () => {

    });
});