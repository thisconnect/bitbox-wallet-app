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

import { useEffect, useState } from 'react';
import type { AccountCode, ITransaction } from '@/api/account';
import { getTransaction } from '@/api/account';
import { usePrevious } from '@/hooks/previous';
import { TxDetailsDialog } from './components/details';
import { getTxSign } from './utils';

type TProps = {
  accountCode: AccountCode;
  explorerURL: string;
  internalID: ITransaction['internalID'] | null;
  onClose: () => void;
}

export const TransactionDetails = ({
  accountCode,
  internalID,
  explorerURL,
  onClose,
}: TProps) => {
  const [open, setOpen] = useState(false);
  const [transactionInfo, setTransactionInfo] = useState<ITransaction | null>(null);
  const prevInternalID = usePrevious(internalID);

  useEffect(() => setOpen(false), [accountCode]);

  useEffect(() => {
    if (prevInternalID !== internalID) {
      setTransactionInfo(null);
    }
  }, [internalID, prevInternalID]);

  useEffect(() => {
    if (internalID && !transactionInfo) {
      getTransaction(accountCode, internalID).then(transaction => {
        if (!transaction) {
          console.error(`Unable to retrieve transaction ${internalID}`);
        }
        setTransactionInfo(transaction);
        setOpen(true);
      }).catch(console.error);
    } else {
      setOpen(true);
    }
  }, [accountCode, internalID, transactionInfo]);

  if (!transactionInfo) {
    return null;
  }

  return (
    <TxDetailsDialog
      open={open}
      onClose={() => {
        setOpen(false);
        onClose();
      }}
      accountCode={accountCode}
      explorerURL={explorerURL}
      sign={getTxSign(transactionInfo.type)}
      {...transactionInfo}
    />
  );
};
