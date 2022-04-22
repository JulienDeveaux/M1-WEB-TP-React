import {act, fireEvent, render} from '@testing-library/react';
import App from '../App';
import {unmountComponentAtNode} from "react-dom";

describe("Tests de la racine + récupération json par fetch", () => {
    let container = null;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
        jest.useRealTimers();
    });

    it("Test navigation", () => {
        act(() => {
            render(
                <App/>, container
            );
        });
        let textInput = document.getElementsByTagName("input");
        fireEvent.change(textInput.item(0), {target: {value: "/data.json"}});
        setTimeout(() => {          //attends la récupération du json et le parse (0.5s)
            const sensorList = document.getElementsByTagName("a");
            expect(sensorList.length).toBe(11);
            act(() => {
                sensorList[0].dispatchEvent(new MouseEvent('click', {bubbles: true}));
            });
            let title = document.getElementsByTagName("h1");
            let type = document.getElementsByTagName("h2");
            let status = document.getElementsByTagName("h3");
            expect(title).toBe("Température Bureau");
            expect(type).toBe("TEMPERATURE");
            expect(status).toBe("");
        }, 50000);
    });
})
