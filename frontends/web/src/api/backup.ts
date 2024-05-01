import { apiGet } from '../utils/request';
import { FailResponse } from './response';
import { TSubscriptionCallback, subscribeEndpoint } from './subscribe';

export type Backup = {
    id: string;
    date: string;
    name: string;
};

type BackupResponse = {
    success: true;
    backups: Backup[];
}

export const getBackupList = (
  deviceID: string
): Promise<BackupResponse | FailResponse> => {
  return apiGet(`devices/bitbox02/${deviceID}/backups/list`);
};

export const subscribeBackupList = (deviceID: string) => (
  (cb: TSubscriptionCallback<BackupResponse>) => (
    subscribeEndpoint(`devices/bitbox02/${deviceID}/backups/list`, cb)
  )
);

type BitBox01BackupResponse = {
  backupList: Backup[];
  sdCardInserted: boolean;
  success: true;
} | {
  errorMessage?: string;
  success: false;
};

export const getBitBox01BackupList = (deviceID: string): Promise<BitBox01BackupResponse> => {
  return apiGet(`devices/${deviceID}/backups/list`);
};
