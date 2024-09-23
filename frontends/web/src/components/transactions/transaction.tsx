/**
 * Copyright 2024 Shift Crypto AG
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

import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import type { IAmount, TTransactionStatus, TTransactionType, ITransaction } from '@/api/account';
import { RatesContext } from '@/contexts/RatesContext';
import { useMediaQuery } from '@/hooks/mediaquery';
import { Loupe } from '@/components/icon/icon';
import { parseTimeLong, parseTimeShort } from '@/utils/date';
import { ProgressRing } from '@/components/progressRing/progressRing';
import { Amount } from '@/components/amount/amount';
import { Arrow } from './components/arrows';
import { getTxSign } from './utils';
import styles from './transaction.module.css';

type TTransactionProps = ITransaction & {
  onShowDetail: (internalID: ITransaction['internalID']) => void
}

export const Transaction = ({
  addresses,
  amount,
  onShowDetail,
  internalID,
  note,
  numConfirmations,
  numConfirmationsComplete,
  status,
  time,
  type,
}: TTransactionProps) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <section className={styles.tx}
      onClick={() => {
        if (isMobile) {
          onShowDetail(internalID);
        }
      }}>
      <div className={styles.txContent}>
        <span className={styles.txIcon}>
          <Arrow status={status} type={type} />
        </span>
        <Status
          addresses={addresses}
          note={note}
          numConfirmations={numConfirmations}
          numConfirmationsComplete={numConfirmationsComplete}
          status={status}
          time={time}
          type={type}
        />
        <Amounts amount={amount} type={type} />
        <button
          className={styles.txShowDetailBtn}
          onClick={() => !isMobile && onShowDetail(internalID)}
          type="button">
          <Loupe className={styles.iconLoupe} />
        </button>
      </div>
    </section>
  );
};

type TStatus = {
  addresses: string[];
  note?: ITransaction['note'];
  numConfirmations: number;
  numConfirmationsComplete: number;
  status: TTransactionStatus;
  time?: string | null;
  type: TTransactionType;
}

const Status = ({
  addresses,
  note,
  numConfirmations,
  numConfirmationsComplete,
  status,
  time,
  type,
}: TStatus) => {
  const { t } = useTranslation();
  const progress = numConfirmations < numConfirmationsComplete ? (numConfirmations / numConfirmationsComplete) * 100 : 100;
  const isComplete = numConfirmations >= numConfirmationsComplete;
  // keep the progress ring for one more confirmation so it shows complete
  const showProgress = !isComplete || numConfirmations === numConfirmationsComplete;

  return (
    <span className={styles.txInfoColumn}>
      <span className={styles.txNote}>
        {note || (
          <Addresses
            addresses={addresses}
            status={status}
            type={type}
          />
        )}
      </span>
      {(showProgress) && (
        <span className={styles.txProgress}>
          <span className={styles.txProgressText}>
            {t(`transaction.status.${status}`, {
              context: type
            })}
          </span>
          <ProgressRing
            className={styles.iconProgress}
            width={18}
            value={progress}
            isComplete={isComplete}
          />
        </span>
      )}
      {' '}
      {isComplete && !showProgress && time && (
        <Date time={time} />
      )}
    </span>
  );
};

type TAmountsProps = {
  amount: IAmount;
  type: TTransactionType;
}

const Amounts = ({
  amount,
  type,
}: TAmountsProps) => {
  const { defaultCurrency } = useContext(RatesContext);
  const conversion = amount?.conversions && amount?.conversions[defaultCurrency];
  const sign = getTxSign(type);
  const color = type === 'receive' ? { color: '#7aba7a' } : type === 'send' ? { color: '#E30613' } : {};
  return (
    <span className={styles.txAmountsColumn}>
      {/* <data value={amount.amount}> */}
      <span className={styles.txAmount}>
        {sign}
        <Amount amount={amount.amount} unit={amount.unit} />
        <span className={styles.txUnit}>
          {' '}
          {amount.unit}
        </span>
      </span>
      {/* </data> */}
      { conversion ? (
        <span className={styles.txConversionAmount} style={color}>
          {sign}
          <Amount amount={conversion} unit={defaultCurrency} />
          <span className={styles.txUnit}>
            {' '}
            {defaultCurrency}
          </span>
        </span>
      ) : null }
    </span>
  );
};

// <time dateTime="2018-07-07">July 7</time>

type TDateProps = {
  time: string | null;
}

const Date = ({
  time,
}: TDateProps) => {
  const { i18n } = useTranslation();
  if (!time) {
    return '---';
  }
  return (
    <span className={styles.txDate}>
      <span className={styles.txDateShort}>
        {parseTimeShort(time, i18n.language)}
      </span>
      <span className={styles.txDateLong}>
        {parseTimeLong(time, i18n.language)}
      </span>
    </span>
  );
};

type TAddresses = {
  addresses: ITransaction['addresses'];
  hidden?: boolean;
  status: TTransactionStatus;
  type: TTransactionType;
}

const Addresses = ({
  addresses,
  hidden = false,
  status,
  type,
}: TAddresses) => {
  const { t } = useTranslation();
  const label = (
    type === 'receive'
      ? t('transaction.tx.receive', {
        context: status
      })
      : t('transaction.tx.send', {
        context: status
      })
    // TODO: support failed
  );

  return (
    <span hidden={hidden}>
      <span>
        {label}
      </span>
      {' '}
      <span className={styles.addresses}>
        {addresses[0]}
        {addresses.length > 1 && (
          <span>
            {' '}
            (+{addresses.length - 1})
          </span>
        )}
      </span>
    </span>
  );
};
