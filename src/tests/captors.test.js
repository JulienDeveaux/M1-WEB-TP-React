import {act, render} from '@testing-library/react';
import {unmountComponentAtNode} from "react-dom";
import Captors from "../captors";

describe('Affichage de la liste de composants', () => {
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
        {id: 0, name: "switch", type: "SWITCH", value: 0},
        {id: 1, name: "porte l'étrange", type: "DOOR", value: 1},
        {id: 2, name: "temp", type: "TEMPERATURE", values: [0, 1, 2, 3, 4], data: ["0", "1", "2", "3", "4"]},
        {id: 3, name: "lum", type: "LIGHT", value: 0},
        {id: 4, name: "porteBad", type: "DOOR", value: "OPEN"},
        {id: 5, name: "random", type: "UNKNOWN", value: 0},
        {id: 6, name: "random2", type: "UNKNOWN2", values: [0, 1]}
    ];

    it("Affichage de la liste des composants initiaux et de leurs liens", () => {
        act(() => {
            render(
                <Captors Parentjson={JSON.stringify(sensors)} idSelected="null"/>,
                container
            );
        });
        const sensorList = document.getElementsByTagName("a");
        expect(sensorList[0].textContent).toBe("switch");
        expect(sensorList[1].textContent).toBe("porte l'étrange");
        expect(sensorList[4].textContent).toBe("porteBad");
        expect(sensorList[1].href).toBe("http://localhost/porte-ltrange")
        expect(sensorList[2].href).toBe("http://localhost/temp")
        expect(sensorList[5].href).toBe("http://localhost/random")
        expect(sensorList[7]).toBeUndefined();
    });
    it("clic, sélection et transfert d'id sélectionné", () => {
        let idSelected = undefined;
        act(() => {
            render(
                <Captors Parentjson={JSON.stringify(sensors)} getSelected={(id) => idSelected = id}/>,
                container
            );
        });
        const sensorList = document.getElementsByTagName("a");
        expect(idSelected).toBe(undefined);
        act(() => {
            sensorList[0].dispatchEvent(new MouseEvent('click', {bubbles: true}));
        });
        expect(idSelected).toBe(0);
        act(() => {
            sensorList[3].dispatchEvent(new MouseEvent('click', {bubbles: true}));
        });
        expect(idSelected).toBe(3);
    });
});
