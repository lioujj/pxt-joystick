//% weight=0 color=#920dc6 icon="\uf047" block="joystick"
namespace joystick {

    let myXPin = AnalogPin.P0;
    let myYPin = AnalogPin.P1;
    let mySWPin = DigitalPin.P2;

    export enum valueType {
        //% block="X"
        X,
        //% block="Y"
        Y,
        //% block="SW"
        SW
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

    //% blockId=setPullMode block="set joystick SW pin PullMode %myPullMode" blockExternalInputs=false
    //% weight=60
    export function setPullMode(myPullMode: PinPullMode = PinPullMode.PullUp): void {
        pins.setPull(mySWPin, myPullMode);
    }



    //% blockId=getJoystickValue block="joystick value of %myType"
    export function getJoystickValue(myType: valueType): number {
        switch (myType) {
            case valueType.X: return pins.analogReadPin(myXPin);
            case valueType.Y: return pins.analogReadPin(myYPin);
            case valueType.SW: return pins.digitalReadPin(mySWPin);
            default: return 0;
        }
    }
}    