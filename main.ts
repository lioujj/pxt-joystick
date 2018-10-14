//% weight=0 color=#920dc6 icon="\uf11b" block="joystick"
namespace joystick {

    let myXPin = AnalogPin.P0;
    let myYPin = AnalogPin.P1;
    let mySWPin = DigitalPin.P2;

    export enum valueType {
        //% block="X"
        X,
        //% block="Y"
        Y
    }
    export enum pushType {
        //% block="pressed"
        down = PulseValue.High,
        //% block="released"
        up = PulseValue.Low
    }
    //% blockId=setJoystick block="set joystick pins : X pin %XPin|Y pin %YPin|SW pin %SWPin" blockExternalInputs=false
    //% weight=70
    //% XPin.fieldEditor="gridpicker" XPin.fieldOptions.columns=4
    //% XPin.fieldOptions.tooltips="false" XPin.fieldOptions.width="300"
    //% YPin.fieldEditor="gridpicker" YPin.fieldOptions.columns=4
    //% YPin.fieldOptions.tooltips="false" YPin.fieldOptions.width="300"
    //% SWPin.fieldEditor="gridpicker" SWPin.fieldOptions.columns=4
    //% SWPin.fieldOptions.tooltips="false" SWPin.fieldOptions.width="300"
    export function setJoystick(XPin: AnalogPin, YPin: AnalogPin, SWPin: DigitalPin): void {
        myXPin = XPin;
        myYPin = YPin;
        mySWPin = SWPin;
        pins.setPull(mySWPin, PinPullMode.PullUp);
    }

    //% blockId=getJoystickValue block="joystick value of %myType"
    //% weight=60
    export function getJoystickValue(myType: valueType): number {
        switch (myType) {
            case valueType.X: return pins.analogReadPin(myXPin);
            case valueType.Y: return pins.analogReadPin(myYPin);
            default: return 0;
        }
    }

    //% blockId=getJoystickSW block="joystick SW pressed"
    //% weight=55
    export function getJoystickSW(): boolean {
        return (pins.digitalReadPin(mySWPin) == 0 ? true : false)
    }

    //% blockId=onSWchanged block="on joystick SW %dir" blockExternalInputs=false
    //% weight=50
    export function onSWchanged(dir: pushType, handler: Action): void {
        pins.onPulsed(mySWPin, <number>dir, handler);
    }

    //% blockId=setPullMode block="set joystick SW pin PullMode %myPullMode" blockExternalInputs=false
    //% weight=40
    export function setPullMode(myPullMode: PinPullMode = PinPullMode.PullUp): void {
        pins.setPull(mySWPin, myPullMode);
    }

}
