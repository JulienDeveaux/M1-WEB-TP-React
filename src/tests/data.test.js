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

    let sensors = [
        {id: 0, name: "switch", type: "SWITCH", data: {value: 0}},
        {id: 1, name: "porte l'étrange", type: "DOOR", data: {value: 1}},
        {id: 2, name: "temp", type: "TEMPERATURE", data: {values: [0, 1, 2, 3, 4], labels: ["0", "1", "2", "3", "4"]}},
        {id: 3, name: "lum", type: "LIGHT", data: {value: 0}},
        {id: 4, name: "porteBad", type: "DOOR", data: {value: "OPEN"}},
        {id: 5, name: "random", type: "UNKNOWN", data: {value: 0}},
        {id: 6, name: "random2", type: "UNKNOWN2", data: {values: [0, 1]}},
        {id: 7, name: "my Fan", type: "FAN_SPEED", data: {
                    values: [1073, 1800, 2299, 2176, 1899, 1400],
                    labels: [
                        "2021-01-19T10:00:00.000Z",
                        "2021-01-19T10:05:00.000Z",
                        "2021-01-19T10:10:00.000Z",
                        "2021-01-19T10:15:00.000Z",
                        "2021-01-19T10:20:00.000Z",
                        "bad Date"
                    ]
            }
        },
        {id: 9, name: "Capteur d'humidité", type: "HUMIDITY", data: {
                values: [0, 1, 2, 3],
                labels: ["01", "02", "03", "04"]
            }
        }
    ];

    it("bon affichage des températures", () => {
        let idSelected = 2;
        act(() => {
            render(
                <Data Parentjson={JSON.stringify(sensors)} idSelected={idSelected}/>, container
            );
        });
        let title = document.getElementsByTagName("h1");
        let type = document.getElementsByTagName("h2");
        let status = document.getElementsByTagName("h3");
        expect(title[0].textContent).toBe("temp");
        expect(type[0].textContent).toBe("Type : TEMPERATURE");
        expect(status[0].textContent).toBe("Valeur Actuelle : 0°");     //TODO add arrays verif
    });
    it("bon affichage des ventilateurs", () => {
        let idSelected = 7;
        act(() => {
            render(
                <Data Parentjson={JSON.stringify(sensors)} idSelected={idSelected}/>, container
            );
        });
        let title = document.getElementsByTagName("h1");
        let type = document.getElementsByTagName("h2");
        let status = document.getElementsByTagName("h3");
        expect(title[0].textContent).toBe("my Fan");
        expect(type[0].textContent).toBe("Type : FAN_SPEED");
        expect(status[0].textContent).toBe("Valeur Actuelle : 1073rpm");     //TODO add arrays verif
    });
    it("bon affichage de l'humidité", () => {
        let idSelected = 9;
        act(() => {
            render(
                <Data Parentjson={JSON.stringify(sensors)} idSelected={idSelected}/>, container
            );
        });
        let title = document.getElementsByTagName("h1");
        let type = document.getElementsByTagName("h2");
        let status = document.getElementsByTagName("h3");
        expect(title[0].textContent).toBe("Capteur d'humidité");
        expect(type[0].textContent).toBe("Type : HUMIDITY");
        expect(status[0].textContent).toBe("Valeur Actuelle : 0%");     //TODO add arrays verif
    });
    it("bon affichage de la porte ouverte", () => {
        let idSelected = 1;
        act(() => {
            render(
                <Data Parentjson={JSON.stringify(sensors)} idSelected={idSelected}/>, container
            );
        });
        let title = document.getElementsByTagName("h1");
        let type = document.getElementsByTagName("h2");
        let status = document.getElementsByTagName("img");
        expect(title[0].textContent).toBe("porte l'étrange");
        expect(type[0].textContent).toBe("Type : DOOR");
        expect(status[0].src).toBe("http://localhost/ressources/door_OPEN.png");
    });
    it("bon affichage de la lumière éteinte", () => {
        let idSelected = 3;
        act(() => {
            render(
                <Data Parentjson={JSON.stringify(sensors)} idSelected={idSelected}/>, container
            );
        });
        let title = document.getElementsByTagName("h1");
        let type = document.getElementsByTagName("h2");
        let status = document.getElementsByTagName("img");
        expect(title[0].textContent).toBe("lum");
        expect(type[0].textContent).toBe("Type : LIGHT");
        expect(status[0].src).toBe("http://localhost/ressources/lightbulb_OFF.png");
    });
    it("bon affichage des switch éteint", () => {
        let idSelected = 0;
        act(() => {
            render(
                <Data Parentjson={JSON.stringify(sensors)} idSelected={idSelected}/>, container
            );
        });
        let title = document.getElementsByTagName("h1");
        let type = document.getElementsByTagName("h2");
        let status = document.getElementsByTagName("img");
        expect(title[0].textContent).toBe("switch");
        expect(type[0].textContent).toBe("Type : SWITCH");
        expect(status[0].src).toBe("http://localhost/ressources/switch_OFF.png");
    });
});