import React, { Component } from "react";
import MatadorImage from "../assets/matador.png";

interface InterfaceOldMatador {
    applause?: number;
    matadorPosition?: number;
    setMatadorPosition?: Function;
}

export class OldMatador extends Component<InterfaceOldMatador>{ 

    changePosition = (e: Event) => {
        const event = e as CustomEvent<{ position: number }>;
        if (event.detail.position === this.props.matadorPosition) {
            let newPosition: number = Math.floor(Math.random() * 8);
            while (newPosition === this.props.matadorPosition) {
                newPosition = Math.floor(Math.random() * 8);
            }
            console.log(
                `Matador is moving from ${this.props.matadorPosition} to ${newPosition}`
            );
            this.props.setMatadorPosition?.(newPosition);
        }
    }

    componentDidMount(): void {
        document.addEventListener("bullRun", this.changePosition);
    }

    componentWillUnmount(): void {
        document.removeEventListener("bullRun", this.changePosition);
    }

    componentDidUpdate(prevProps: InterfaceOldMatador): void {
        if (prevProps.applause !== 3 && this.props.applause === 3) { 
            let applause1 = new Audio("../../src/assets/applause.wav");
            applause1.play();
        }
    }

    shouldComponentUpdate(nextProps: InterfaceOldMatador): boolean {
        return nextProps.applause === 3;
    }

    render() {
        return (
            <div>
                <img src={MatadorImage} height="200px" alt="Matador" />
            </div>
        );
    }
}
