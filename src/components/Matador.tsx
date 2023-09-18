import React, { useEffect } from "react";
import { memo } from "react";
import MatadorImage from "../assets/matador.png";

interface InterfaceMatador {
    applause?: number;
    matadorPosition?: number;
    setMatadorPosition?: Function;
}

export const Matador = memo(
    function ({applause,matadorPosition,setMatadorPosition}: InterfaceMatador) {
    useEffect(() => {
        function changePosition(e: Event) {
            const event = e as CustomEvent<{ position: number }>;
            if (event.detail.position === matadorPosition) {
                let newPosition: number = Math.floor(Math.random() * 8);
                while (newPosition === matadorPosition) {
                    newPosition = Math.floor(Math.random() * 8);
                }
                console.log(
                    `Matador is moving from ${matadorPosition} to ${newPosition}`
                );
                setMatadorPosition?.(newPosition);
            }
        }
        document.addEventListener("bullRun", changePosition);
        if (applause === 3) {
            let applause1 = new Audio("../../src/assets/applause.wav");
            applause1.play();
        }
        return () => document.removeEventListener("bullRun", changePosition);
    }, [matadorPosition, applause]);
    return (
        <div>
            <img src={MatadorImage} height="200px" alt="Matador" />
        </div>
    );
}, (previousProps, nextProps) => {
    return nextProps.applause !== 3 && previousProps.applause === 3;
}
);
