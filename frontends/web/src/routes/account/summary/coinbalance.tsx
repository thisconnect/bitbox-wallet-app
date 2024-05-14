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

import { useTranslation } from 'react-i18next';
import * as accountApi from '../../../api/account';
import { SubTotalCoinRow } from './subtotalrow';
import { Amount } from '../../../components/amount/amount';
import { Skeleton } from '../../../components/skeleton/skeleton';
import style from './accountssummary.module.css';

type TProps = {
  summaryData?: accountApi.ISummary;
  coinsBalances?: accountApi.TCoinsTotalBalance;
}

export function CoinBalance ({
  summaryData,
  coinsBalances,
}: TProps) {
  const { t } = useTranslation();

  const CoinCodeList = coinsBalances && Object.keys(coinsBalances) as accountApi.CoinCode[];

  if (!CoinCodeList) {
    return null;
  }

  return (
    <div>
      <div className={style.accountName}>
        <p>{t('accountSummary.total')}</p>
      </div>
      <div className={style.balanceTable}>
        <table className={style.table}>
          <colgroup>
            <col width="33%" />
            <col width="33%" />
            <col width="*" />
          </colgroup>
          <thead>
            <tr>
              <th>{t('accountSummary.coin')}</th>
              <th>{t('accountSummary.balance')}</th>
              <th>{t('accountSummary.fiatBalance')}</th>
            </tr>
          </thead>
          <tbody>
            {CoinCodeList.map((coinCode) => (
              <SubTotalCoinRow
                key={coinCode}
                coinCode={coinCode}
                // the frontend should have a utils function to get the coinname from coincode.
                coinName={'Bitcoin or altcoin'}
                balance={coinsBalances && coinsBalances[coinCode]}
              />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th>
                <strong>{t('accountSummary.total')}</strong>
              </th>
              <td colSpan={2}>
                {(summaryData && summaryData.formattedChartTotal !== null) ? (
                  <>
                    <strong>
                      <Amount amount={summaryData.formattedChartTotal} unit={summaryData.chartFiat}/>
                    </strong>
                    {' '}
                    <span className={style.coinUnit}>
                      {summaryData.chartFiat}
                    </span>
                  </>
                ) : (<Skeleton />) }
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}