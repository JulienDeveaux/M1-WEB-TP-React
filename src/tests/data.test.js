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
        {id: 6, name: "random2", type: "UNKNOWN2", data: {values: [0, 1], labels: ["qu'un seul"]}},
        {id: 7, name: "my Fan", type: "FAN_SPEED", data: {
                    values: [1073, 1899, 1400],
                    labels: [
                        "2021-01-19T10:00:00.000Z",
                        "2021-01-19T10:20:00.000Z",
                        "bad Date ici"
                    ]
            }
        },
        {id: 9, name: "Capteur d'humidité", type: "HUMIDITY", data: {
                values: [0, 1, 2, 3],
                labels: ["C1", "C2", "C3", "C4"]
            }
        }
    ];

    it("aucun affichage sans json", () => {
        act(() => {
            render(
                <Data />, container
            );
        });
        let title = document.getElementsByTagName("h1");
        let type = document.getElementsByTagName("h2");
        let statusNormal = document.getElementsByTagName("h3");
        let statusImg = document.getElementsByTagName("img");
        expect(title.textContent).toBeUndefined();
        expect(type.textContent).toBeUndefined();
        expect(statusNormal.textContent).toBeUndefined();
        expect(statusImg.src).toBeUndefined();
    });
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
        let rows = document.getElementById("table").getElementsByTagName("tr");
        let array = [];
        let iterator = 0;
        for(let i = 0; i < rows.length; i++) {
            array[iterator] = rows[i].getElementsByTagName("th")[0].innerHTML;
            iterator++;
            array[iterator] = rows[i].getElementsByTagName("th")[1].innerHTML;
            iterator++;
        }
        expect(title[0].textContent).toBe("temp");
        expect(type[0].textContent).toBe("Type : TEMPERATURE");
        expect(status[0].textContent).toBe("Valeur Actuelle : 0°");
        expect(array[0]).toBe("labels");
        expect(array[1]).toBe("data");
        expect(array[2]).toBe("Fri, 31 Dec 1999 23:00:00 GMT");
        expect(array[3]).toBe("0°");
        expect(array[10]).toBe("Sat, 31 Mar 2001 22:00:00 GMT");
        expect(array[11]).toBe("4°");
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
        let rows = document.getElementById("table").getElementsByTagName("tr");
        let array = [];
        let iterator = 0;
        for(let i = 0; i < rows.length; i++) {
            array[iterator] = rows[i].getElementsByTagName("th")[0].innerHTML;
            iterator++;
            array[iterator] = rows[i].getElementsByTagName("th")[1].innerHTML;
            iterator++;
        }
        expect(title[0].textContent).toBe("my Fan");
        expect(type[0].textContent).toBe("Type : FAN_SPEED");
        expect(status[0].textContent).toBe("Valeur Actuelle : 1073rpm");
        expect(array[0]).toBe("labels");
        expect(array[1]).toBe("data");
        expect(array[2]).toBe("Tue, 19 Jan 2021 10:00:00 GMT");
        expect(array[3]).toBe("1073rpm");
        expect(array[4]).toBe("Tue, 19 Jan 2021 10:20:00 GMT");
        expect(array[5]).toBe("1899rpm");
        expect(array[6]).toBe("bad Date ici");
        expect(array[7]).toBe("1400rpm");
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
        let rows = document.getElementById("table").getElementsByTagName("tr");
        let array = [];
        let iterator = 0;
        for(let i = 0; i < rows.length; i++) {
            array[iterator] = rows[i].getElementsByTagName("th")[0].innerHTML;
            iterator++;
            array[iterator] = rows[i].getElementsByTagName("th")[1].innerHTML;
            iterator++;
        }
        expect(title[0].textContent).toBe("Capteur d'humidité");
        expect(type[0].textContent).toBe("Type : HUMIDITY");
        expect(status[0].textContent).toBe("Valeur Actuelle : 0%");
        expect(array[0]).toBe("labels");
        expect(array[1]).toBe("data");
        expect(array[2]).toBe("C1");
        expect(array[3]).toBe("0%");
        expect(array[4]).toBe("C2");
        expect(array[5]).toBe("1%");
        expect(array[6]).toBe("C3");
        expect(array[7]).toBe("2%");
        expect(array[8]).toBe("C4");
        expect(array[9]).toBe("3%");
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
    it("bon affichage de la porte fermée", () => {
        let idSelected = 1;
        sensors[1].data.value = 0;
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
        expect(status[0].src).toBe("http://localhost/ressources/door_CLOSED.png");
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
    it("bon affichage de la lumière allumée", () => {
        let idSelected = 3;
        sensors[3].data.value = 1;
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
        expect(status[0].src).toBe("http://localhost/ressources/lightbulb_ON.png");
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
    it("bon affichage des switch allumé", () => {
        let idSelected = 0;
        sensors[0].data.value = 1;
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
        expect(status[0].src).toBe("http://localhost/ressources/switch_ON.png");
    });
    it("bon affichage d'une donnée étrange", () => {
        let idSelected = 5;
        act(() => {
            render(
                <Data Parentjson={JSON.stringify(sensors)} idSelected={idSelected}/>, container
            );
        });
        let title = document.getElementsByTagName("h1");
        let type = document.getElementsByTagName("h2");
        let status = document.getElementsByTagName("h3");
        expect(title[0].textContent).toBe("random");
        expect(type[0].textContent).toBe("Type : UNKNOWN");
        expect(status[0].textContent).toBe("Status : 0");
    });
    it("bon affichage d'un tableau de donnés étranges", () => {
        let idSelected = 6;
        act(() => {
            render(
                <Data Parentjson={JSON.stringify(sensors)} idSelected={idSelected}/>, container
            );
        });
        let title = document.getElementsByTagName("h1");
        let type = document.getElementsByTagName("h2");
        let status = document.getElementsByTagName("h3");
        let rows = document.getElementById("table").getElementsByTagName("tr");
        let array = [];
        let iterator = 0;
        for(let i = 0; i < rows.length; i++) {
            array[iterator] = rows[i].getElementsByTagName("th")[0].innerHTML;
            iterator++;
            array[iterator] = rows[i].getElementsByTagName("th")[1].innerHTML;
            iterator++;
        }
        expect(title[0].textContent).toBe("random2");
        expect(type[0].textContent).toBe("Type : UNKNOWN2");
        expect(status[0].textContent).toBe("Valeur Actuelle : 0");
        expect(array[0]).toBe("labels");
        expect(array[1]).toBe("data");
        expect(array[2]).toBe("qu'un seul");
        expect(array[3]).toBe("0");
        expect(array[4]).toBe("no label");
        expect(array[5]).toBe("1");
    });
});