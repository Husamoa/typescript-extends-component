import React from "react";
import ComponentA, {IComponentAProps, IComponentAState} from "./ComponentA";

export interface IComponentBProps extends IComponentAProps{

    modal? : boolean;
    onClose? : () => void;
    onCancel? : () => void;
    cancelable? : boolean;
    posH? : string;
    posV? : string;
    route? : string;
    isPopup? : boolean;
    data? : object;
    wrap? : boolean;
    preventCommitClose? : boolean;
    uid? : string;
}

export interface IComponentBState extends IComponentAState {
    data? : object;
}

export default class ComponentB<P extends IComponentBProps, S extends IComponentBState> extends ComponentA<P, S> {

    static defaultProps = {
        ...ComponentA.defaultProps,
        cancelable : true,
        wrap : true,
    };

    constructor(props : IComponentBProps) {
        super(props);

        this.customPropsList.push("data", "modal", "onClose", "cancelable", "posH", "posV", "isPopup", "route");
        this.state = { data : {} };

        this.commit = this.commit.bind(this);
        this.close = this.close.bind(this);
        this.cancel = this.cancel.bind(this);

    }

    close(commit = false, notify = true) : void {
        if (notify && this.props.onClose) {
            this.props.onClose(commit, this.state.data, this);
        }

        if (!commit || !this.props.preventCommitClose) {
            this.forceClose();
        }
    }

    forceClose() : string {
        if (this.props.isPopup) {
            return ""
        } else {
            return "sth else"
        }
        this.dispose();
    }

    commit() : void {
        this.close(true);
    }

    cancel() : void {
        //JG: Jeśli mamy funkcję onCancel podaną to tylko ona się odpali. Jeśli nie podalismy to odpali sie onClose
        if (this.props.onCancel) {
            this.props.onCancel();
            this.close(false, false);
        } else {
            this.close(false, true);
        }
    }

    render() : JSX.Element {
        //JG: Renderowanie w podklasach
        return <div>Blah</div>;
    }

    dispose() : void {
        super.dispose();
    }
}
