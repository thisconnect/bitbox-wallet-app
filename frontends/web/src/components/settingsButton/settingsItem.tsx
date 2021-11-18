import { FunctionComponent } from 'react';
import * as style from './settingsButton.css';

interface SettingsItemProps {
    optionalText?: string | null;
}

const SettingsItem: FunctionComponent<SettingsItemProps> = ({ optionalText, children }) => {
    return (
        <div className={[style.container, style.item].join(' ')}>
            {children}
            {
                optionalText && (
                    <span className={style.optionalText}>{optionalText}</span>
                )
            }
        </div>
    );
}

export { SettingsItem };
