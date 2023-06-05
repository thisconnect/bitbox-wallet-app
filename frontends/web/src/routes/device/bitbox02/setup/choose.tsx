/**
 * Copyright 2023 Shift Crypto AG
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

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { VersionInfo } from '../../../../api/bitbox02';
import { View, ViewContent, ViewHeader } from '../../../../components/view/view';
import { Column, ColumnButtons, Grid } from '../../../../components/layout';
import { Button, Label } from '../../../../components/forms';
import { Toggle } from '../../../../components/toggle/toggle';
import { Info } from '../../../../components/icon';
import style from './choose.module.css';

export type TWalletCreateOptions = {
  withMnemonic: boolean;
  with12Words: boolean;
};

type Props = {
  onSelectSetup: (
    type: 'create-wallet' | 'restore-sdcard' | 'restore-mnemonic',
    options?: TWalletCreateOptions,
  ) => void;
  versionInfo: VersionInfo;
}

export const SetupOptions = ({
  onSelectSetup,
  versionInfo,
}: Props) => {
  const { t } = useTranslation();
  const [advanced, setAdvanced] = useState(false);
  const [withMnemonic, setWithMnemonic] = useState(false);
  const [with12Words, setWith12Words] = useState(false);

  if (advanced) {
    const { canBackupWithRecoveryWords/*, canCreate12Words */ } = versionInfo;
    // test dummy, needs https://github.com/digitalbitbox/bitbox-wallet-app/pull/2136
    const canCreate12Words = Math.random() >= 0.5;
    return (
      <View
        fullscreen
        textCenter
        verticallyCentered
        withBottomBar
        width="1100px">
        <ViewHeader title={t('seed.create')}>
          <p>
            <Info style={{ marginRight: '.5em', verticalAlign: 'text-bottom', height: '1.2em' }} />
            The BitBox has deliberate defaults, however custom setup options are provided here.
          </p>
        </ViewHeader>
        <ViewContent fullWidth>
          <Grid col="1" textAlign="left">
            <Column asCard>
              <h3 className="title">
                Advanced backup options
              </h3>
              <div style={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
                <Label
                  htmlFor="with-mnemonic"
                  style={{
                    flexGrow: 1, paddingRight: 'var(--space-half)',
                    ...(!canBackupWithRecoveryWords && { color: 'var(--color-disabled)' }),
                  }}>
                  Use recovery words
                  {' '}
                  { !canBackupWithRecoveryWords && (
                    <span style={{ color: 'var(--color-warning)' }}>(supported with firmware v9.13.0)</span>
                  )}
                </Label>
                <Toggle
                  checked={withMnemonic}
                  className={style.toggle}
                  disabled={!canBackupWithRecoveryWords}
                  id="with-mnemonic"
                  onChange={() => setWithMnemonic(!withMnemonic)} />
                <p className="m-top-quarter m-bottom-default">
                  <small>
                    Skip microSD card backup and write down 24 recovery words instead.
                    You always have the option to create a microSD card backup and write your recovery words after setup.
                    This can be done from device settings.
                  </small>
                </p>
              </div>

              <div style={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
                <Label
                  htmlFor="with-12words"
                  style={{
                    flexGrow: 1, paddingRight: 'var(--space-half)',
                    ...(canCreate12Words && { color: 'var(--color-disabled)' }),
                  }}>
                  With 12 words
                  {' '}
                  { canCreate12Words && (
                    <span style={{ color: 'var(--color-warning)' }}>(supported with firmware v9.6.0)</span>
                  )}
                </Label>
                <Toggle
                  checked={with12Words}
                  className={style.toggle}
                  disabled={canCreate12Words}
                  id="with-12words"
                  onChange={() => setWith12Words(!with12Words)} />
                <p className="m-top-quarter m-bottom-default">
                  <small>
                    Use 12 instead of the default 24 words. The number of words above 12 does not add to security.
                    Both produce a 128bit secret key which means they are just as secure regardless of the permutations of the seed words.
                    You always have the option to write your recovery words after setup, but after creation a 24 words seed cannot be converted to 12 or vice versa.
                  </small>
                </p>
              </div>
              <ColumnButtons inline>
                <Button
                  onClick={() => onSelectSetup('create-wallet', {
                    withMnemonic,
                    with12Words,
                  })}
                  primary>
                  {t('seed.create')}
                </Button>
                <Button
                  onClick={() => setAdvanced(false)}
                  transparent>
                  {t('button.back')}
                </Button>
              </ColumnButtons>
            </Column>
          </Grid>
        </ViewContent>
      </View>
    );
  }

  return (
    <View
      fullscreen
      textCenter
      verticallyCentered
      withBottomBar
      width="1100px">
      <ViewHeader title={t('bitbox02Wizard.stepUninitialized.title')}>
        <p>
          <Info style={{ marginRight: '.5em', verticalAlign: 'text-bottom', height: '1.2em' }} />
          {t('bitbox02Wizard.initialize.tip')}
        </p>
      </ViewHeader>
      <ViewContent fullWidth>
        <Grid>
          <Column asCard className="m-bottom-default">
            <h3 className="title">
              {t('button.create')}
            </h3>
            <p>
              {t('bitbox02Wizard.stepUninitialized.create')}
            </p>
            <ColumnButtons>
              <Button
                primary
                onClick={() => onSelectSetup('create-wallet', {
                  withMnemonic: false,
                  with12Words: false,
                })}>
                {t('seed.create')}
              </Button>
              <Button
                onClick={() => setAdvanced(true)}
                style={{ border: 'none', height: '1.75rem' }}
                transparent>
                <small>
                  Advanced settings
                </small>
              </Button>
            </ColumnButtons>
          </Column>
          <Column asCard className="m-bottom-default">
            <h3 className="title">
              {t('button.restore')}
            </h3>
            <p>
              {t('bitbox02Wizard.stepUninitialized.restore')}
            </p>
            <ColumnButtons>
              <Button
                onClick={() => onSelectSetup('restore-sdcard')}
                transparent>
                {t('bitbox02Wizard.stepUninitialized.restoreMicroSD')}
              </Button>
              <Button
                className="m-bottom-default"
                onClick={() => onSelectSetup('restore-mnemonic')}
                transparent>
                {t('bitbox02Wizard.stepUninitialized.restoreMnemonic')}
              </Button>
            </ColumnButtons>
          </Column>
        </Grid>
      </ViewContent>
    </View>
  );
};
