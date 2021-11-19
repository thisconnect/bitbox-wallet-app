import React, { Children, cloneElement, Component, isValidElement, PropsWithChildren, ReactElement } from 'react';
import style from './steps.module.css';

interface State {
    activeStep: number;
}

type ReactChilds = ReturnType<typeof Children.toArray> 

class Steps extends Component<{}, State> {
    constructor(props: PropsWithChildren<{}>) {
        super(props);
        this.state = {
            activeStep: this.getActiveStep(Children.toArray(props.children)),
        };
    }

    public componentWillReceiveProps(nextProps: PropsWithChildren<{}>) {
        const step = this.getActiveStep(Children.toArray(nextProps.children));
        if (this.state.activeStep !== step) {
            this.setState({ activeStep: step });
        }
    }

    private childrenElements = (children: ReactChilds) => (children.filter(child => isValidElement(child)) as ReactElement[])

    private getActiveStep = (children: ReactChilds) => {
        return this.childrenElements(children).findIndex(child => child.props.active) + 1;
    }

    public render() {
        const { children } = this.props;
        const { activeStep } = this.state;
        return (
            <div className={style.steps}>
                {this.childrenElements(Children.toArray(children)).map((child, i) => cloneElement(child, { order: i + 1, activeStep }))}
            </div>
        );
    }
}

export { Steps };
