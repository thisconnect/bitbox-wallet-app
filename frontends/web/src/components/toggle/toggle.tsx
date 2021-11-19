import { Component, SyntheticEvent } from 'react';
import style from './toggle.module.css';

interface ToggleProps {
    checked: boolean;
    disabled?: boolean;
    onChange: (event: SyntheticEvent) => void;
    id?: string;
    value?: string;
    name?: string;
    [key: string]: any;
}

class Toggle extends Component<ToggleProps> {
    public render() {
        return (
            <label className={style.container}>
                <input
                    type="checkbox"
                    {...this.props} />
                <span className={style.slider}></span>
            </label>
        );
    }
}

export { Toggle };
