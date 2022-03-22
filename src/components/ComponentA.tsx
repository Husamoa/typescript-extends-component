// eslint-disable-next-line no-use-before-define
import React, {SyntheticEvent} from "react";
import BaseComponent, {IBaseComponentProps} from "./BaseComponent";

export type TUIComponentEventCallback = (event : SyntheticEvent) => void;

export interface IComponentAProps extends IBaseComponentProps {
    hoverable? : boolean;
    focusable? : boolean;
    modifier? : string;
    tooltip? : string;
    className? : string;
    disabled? : boolean;
    onFocus? : TUIComponentEventCallback;
    onBlur? : TUIComponentEventCallback;
    onMouseDown? : TUIComponentEventCallback;
    onMouseUp? : TUIComponentEventCallback;
    onMouseEnter? : TUIComponentEventCallback;
    onMouseLeave? : TUIComponentEventCallback;
    onClick? : TUIComponentEventCallback;
    onClickInterval? : number; //minimalny odstęp między zdarzeniami 'onClick'
    style? : object;
    visible? : boolean;
}

export interface IComponentAState {
    hovered? : boolean;
    focused? : boolean;
    visible? : boolean;
}

export default class ComponentA<P extends IComponentAProps, S extends IComponentAState> extends BaseComponent<IComponentAProps, IComponentAState> {
    customPropsList = ["children", "className", "onClick", "onMouseDown", "onDoubleClick", "onChange", "style",
        "disabled", "title", "onMouseLeave", "onMouseEnter", "onMouseOver", "onMouseOut", "onContextMenu",
        "onDragOver", "onDrop", "onDragEnd", "onDragLeave", "onDragStart", "draggable", "data-testid"];
    validProps = [];

    static defaultProps = {
        ...BaseComponent.defaultProps,
        hoverable : false,
        focusable : false,
        disabled : false,
        tooltip : null,
        onClickInterval : 500, //minimalny odstęp między zdarzeniami 'onClick'
        visible : true
    };


    constructor(props : IComponentAProps){
        super(props);

        this.state = {
            hovered : false,
            focused : false,
            visible : true
        };

    }

    _getValidProps() : {} {
        const p = this.props;
        for (let prop in p) {
            if (p.hasOwnProperty(prop)) {
                return true;
            }
        }
        return this.validProps;
    }

    render() : JSX.Element {
        if (!this.state.visible) {
            return <div />;
        }

        return  <div {...this._getValidProps()}>
            {this.props.children}
        </div>;
    }
}
