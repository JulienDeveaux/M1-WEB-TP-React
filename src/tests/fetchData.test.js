import {act, render, fireEvent} from '@testing-library/react';
import {unmountComponentAtNode} from "react-dom";
import FetchData from "../fetchData";
import React from "react";

describe('affichage input url + renvoi de l\'url', () => {
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

    it("bon affichage de l'input", () => {
        let url = "";
        act(() => {
            render(
                <FetchData getJson={(txt) => url = txt}/>,
                container
            );
        });
        expect(url).toBe("/data.json");
        let textInput = document.getElementsByTagName("input");
        fireEvent.change(textInput.item(0), {target: {value: "http://pigne.org/teaching/sensors_data.json"}});
        expect(url).toBe("http://pigne.org/teaching/sensors_data.json");
    });
});