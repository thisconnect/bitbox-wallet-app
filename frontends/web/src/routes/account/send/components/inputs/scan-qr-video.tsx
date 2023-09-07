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

import { useRef/*, useState */ } from 'react';
import { useQRScanner } from '../../../../../hooks/qrcodescanner';
// import { SpinnerAnimation } from '../../../../../components/spinner/SpinnerAnimation';
import style from '../../send.module.css';

type TProps = {
  onResult: (result: string) => void;
}

export const ScanQRVideo = ({
  onResult,
}: TProps) => {
  // unfortunatelly chaning videoLoading state unmounts the effect in useQRScanner causing the video stop after it is loaded
  // const [videoLoading, setVideoLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useQRScanner(videoRef, {
    // onStart: () => setVideoLoading(false),
    onResult: result => onResult(result.data),
    onError: console.error
  });

  return (
    <>
      {/* {videoLoading &&
        <div className={style.spinnerAnimationContainer}>
          <SpinnerAnimation />
        </div>
      } */}
      <video
        className={style.qrVideo}
        ref={videoRef}
      />
    </>
  );
};
