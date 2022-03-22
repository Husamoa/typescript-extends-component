import React from "react";

export interface IBaseComponentProps {
    className? : string; //klasa CSS komponentu (doklejana do nazwy klasy)
    classPrefix? : string; //prefix dodawany do klasy CSS komponentu
    pure? : false; //Jeśli komponent jest typu 'pure' to aktualizujemy go tylko jak zmieni się 'props' lub 'state'
}

export default class BaseComponent<P extends IBaseComponentProps, S extends {}> extends React.Component<P, S> {

    public static defaultProps = {
        classPrefix : null,
        className : null,
        pure : false
    };

    bindedItems: [] | null = [];
    initialized = false;
    disposed = false;
    displayName = null;
    _name = null;
    uid = "5as4das4das4d65as4d";

    constructor(props : P) {
        super(props);

        this.state = {} as S;
        this._onDataChange = this._onDataChange.bind(this);
    }

    setState(v : S) : void {
        if (!this.initialized) {
            this.state = Object.assign(this.state, v);
            return;
        }

        if (!this.disposed) {
            super.setState(v);
        } else {
            console.warn(this._name, this.uid, "setState", "can't set state - component not mounted!");
        }
    }

    private _onDataChange(event : Event) : void {
        if (!event || !event.target) {
            return;
        }

        if (this.disposed) {
            console.warn(this._name, this.uid, "is disposed, data item: ", event, this.bindedItems);
        }

    }

    /**
     * Subkomponenty mogą to overridować żeby sprawdzić czy faktycznie trzeba przerenderować
     */
    handleDataChange(event : Event) : void {
        if (!this.disposed) {
            try {
                this.setState({} as S);
            }
            catch (er : any) {
                console.log(this._name, this.uid, "can't update state", er.message, er.stack);
            }
        }
    }

    _clearBindings() : void {
        this.bindedItems = null;
    }

    _updateProps(props : P) : void {
        //override w podklasach
    }

    /**
     * JG: W tej chwili zostawiamy z dopiskiem UNSAFE (to nie oznacza, że jest niebezpieczne tylko, że może powodować spadek wydajności w niektórych sytuacjach.
     * Przerobienie tego wymaga przerobienia _updateProps we wszystkich subkomponentach - bardzo dużo do zrobienia i bardzo dużo się może popsuć.
     *
     * https://pl.reactjs.org/blog/2018/03/27/update-on-async-rendering.html
     */
    // eslint-disable-next-line camelcase
    UNSAFE_componentWillReceiveProps(nextProps: Readonly<P>) : void {
        if (!this.disposed) {
            //console.log(this.name, this.uid, "componentWillReceiveProps");
            try {
                this._updateProps(nextProps);
            }
            catch (er : any) {
                console.error(this._name, this.uid, "componentWillReceiveProps", er.message, er.stack);
            }
        }
    }

    UNSAFE_componentWillMount() : void {
        //console.log(this.name, this.uid, "componentWillMount", this.context, this.props);
        this.initialized = true;
        try {
            this.init(this.props);
        }
        catch (er : any) {
            console.error(this._name, this.uid, "componentWillMount", er.message, er.stack);
        }
    }

    componentDidMount() : void {
        this.componentMounted();
    }

    componentMounted() : void {
        //override w podklasach
    }

    init(props : P) : void {
        this._updateProps(this.props);
    }

    getClassName(baseName = null, prefix = null) : string {
        let className = "";
        if (prefix) {
            className += prefix;
        }

        let c ="";
        if (baseName && baseName !== c) {
            className += baseName + " ";
        }
        className += c;

        if (this.props.className) {
            className += " " + this.props.className;
        }

        return className;
    }

    componentWillUnmount() : void {
        this.dispose();
        this.disposed = true;
    }

    dispose() : void {
        //Do overridowania w podklasach
        this._clearBindings();
    }
}
