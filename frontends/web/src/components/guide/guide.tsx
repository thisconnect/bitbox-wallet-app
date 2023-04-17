/**
 * Copyright 2018 Shift Devices AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component } from 'react';
import { share } from '../../decorators/share';
import { Store } from '../../decorators/store';
import { translate, TranslateProps } from '../../decorators/translate';
import { setConfig } from '../../utils/config';
import { apiGet } from '../../utils/request';
import A from '../anchor/anchor';
import { CloseXWhite } from '../icon';
import style from './guide.module.css';

export interface SharedProps {
    shown: boolean;
    // eslint-disable-next-line react/no-unused-prop-types
    activeSidebar: boolean;
    // eslint-disable-next-line react/no-unused-prop-types
    sidebarStatus: string;
    // eslint-disable-next-line react/no-unused-prop-types
    guideExists: boolean;
}

export const store = new Store<SharedProps>({
  shown: false,
  activeSidebar: false,
  sidebarStatus: '',
  guideExists: false,
});

// if apiGet() is invoked immediately this can error due to cyclic dependencies
// request.js:64 Uncaught TypeError: Cannot read properties of undefined
// (reading 'runningInQtWebEngine')
// TODO: this should probably be in a context
setTimeout(() => {
  apiGet('config').then(({ frontend }) => {
    if (frontend && frontend.guideShown !== undefined) {
      store.setState({ shown: frontend.guideShown });
    } else {
      store.setState({ shown: true });
    }
  });
}, 0);

function setGuideShown(shown: boolean) {
  store.setState({ shown });
  setConfig({ frontend: { guideShown: shown } });
}

export function toggle() {
  setGuideShown(!store.state.shown);
}

export function show() {
  setGuideShown(true);
}

export function hide() {
  setGuideShown(false);
}

type Props = SharedProps & TranslateProps;

class Guide extends Component<Props> {
  public componentDidMount() {
    store.setState({ guideExists: true });
  }

  public componentWillUnmount() {
    store.setState({ guideExists: false });
  }

  private getEmailText() {
    const lang = this.props.i18n.language.toUpperCase();
    const date = new Date().toISOString().split('T')[0];
    return encodeURI(`mailto:translations@shiftcrypto.ch?subject=BitBoxApp translation feedback (#${lang} ${date})&body=I would like to report a translation issue in the BitBoxApp.
AppView: ${window.location.pathname}
AppLanguage: ${this.props.i18n.language}
(Please keep this information to help us locate the issue)

Description of the translation issue:
`);
  }

  private getSupportLink(language: string) {
    switch (language) {
    case 'de':
      return 'https://shiftcrypto.ch/de/support/';
    case 'es':
      return 'https://shiftcrypto.ch/es/soporte/';
    default:
      return 'https://shiftcrypto.ch/support/';
    }
  }

  public render() {
    const { shown, t, i18n, children } = this.props;
    return (
      <div className={style.wrapper}>
        <div className={[style.overlay, shown && style.show].join(' ')} onClick={toggle}></div>
        <div className={[style.guide, shown && style.show].join(' ')}>
          <div className={[style.header, 'flex flex-row flex-between flex-items-center'].join(' ')}>
            <h2>{t('guide.title')}</h2>
            <a href="#" className={style.close} onClick={toggle}>
              {t('guide.toggle.close')}
              <CloseXWhite />
            </a>
          </div>
          <div className={style.content}>
            {children}
            <div className={style.entry}>
              {t('guide.appendix.text')}
              {' '}
              <A href={this.getSupportLink(i18n.language)}>{t('guide.appendix.link')}</A>
              <br />
              <br />
              Translation feedback:
              {' '}
              <A href={this.getEmailText()}>
                translations@shiftcrypto.ch
              </A>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const HOC = translate()(share<SharedProps, TranslateProps>(store)(Guide));
export { HOC as Guide };
