## 라즈베리 파이 NFC 센서 사용

#### 목차

1. [NFCpy 라이브러리 설치](#nfcpy-라이브러리-설치)

2. [NFC 센서 사용](#nfc-센서-사용)

3. [참고사항](#참고사항)

   

###  NFCpy 라이브러리 설치

1. NFCpy 라이브러리 필요
   * [NFCpy 설치 이동](https://nfcpy.readthedocs.io/en/latest/topics/get-started.html) 
   * usb 장치 인식 위해 `libusb` 라이브러리 필요

2. `python 3.5+ version` 필요

   ```bash
   pip install -U nfcpy
   python -m nfc
   ```

   * `no module named error` 발생 시

     * 사용하는 python 버전에 맞는 경로에 설치 됐는지 확인

     * 아니라면 경로 변경 후 재설치

       ```bash
       # 예시
       python3.7 -m pip install nfcpy
       ```

       

### NFC 센서 사용

#### 1. 회로연결

![RPi 핀맵](C:\Users\ssafy\Raspberry_Pi\RPi 핀맵.png)

|    회로     |        센서        |
| :---------: | :----------------: |
|    3.3V     |        3.3V        |
|     GND     |        GND         |
| SCL/RX `8`  | UART0 TX `GPIO 14` |
| SDA/TX `10` | UART0 RX `GPIO 15` |



#### 2. NFC 센서 연결

1. `sudo raspi-config` 실행 후 `Interface 설정` 에서 `P6 serial` 이동

   * `login shell ~` : `No`
   * `serial port ~` : `Yes`

2. 재실행 후 설치

   ```bash
   sudo reboot
   sudo apt-get install libusb-dev libcsclite-dev i2c-tools
   ```

3. 경로 이동

   ```bash
   cd ~
   ```

4. [`tar` 파일 다운](https://src.fedoraproject.org/repo/pkgs/libnfc/libnfc-1.7.0.tar.bz2/8d8aced79cc0859c605c04d59e4484b3/)

5. `tar` 파일 실행

   ```bash
   tar xvjf libnfc-1.7.0.tar.bz2
   ```

6. 경로 설정

   ```bash
   sudo mkdir /etc/nfc/
   cd libnfc-1.7.1/
   sudo cp libnfc/libnfc.conf.sample /etc/nfc/libnfc.conf
   ```

7. NFC 설정

   ```bash
   sudo nano /etc/nfc/libnfc.conf
   
   # 설정 수정 : 맵핑된 경로로 설정
   device.connstring = "pn532_uart:/dev/ttyAMA0"
   ```

8. 맵핑 확인

   ```bash
   # pn532_uart : YES
   ./configure --with-drivers=pn532_uart --sysconfdir=/etc --prefix=/usr
   ```

9. 재부팅

   ```bash
   sudo make clean 
   sudo make install all
   ```

10. 연결 확인

    ```bash
    nfc-poll
    ```



### 참고사항

#### UART 통신 설정

각 `UART` 가 사용하는 핀 정보는 `dtoverlay -h uart` 숫자 을 통해 확인할 수 있다 

* 라즈베리파이 4는 `0~5` 존재

  * `TX`, `RX`에 핀 꽂은 후 `sudo nano /boot/config.txt` 파일 수정

    > `dtoverlay = uart숫자 (사용할 uart 번호)` 
    >  `sudo reboot`
    >  설정 확인 : `raspi-gpio get 핀 번호-핀 번호` 입력 
    >
    > > 명령어 실행 안될 시 `sudo apt install raspi-gpio` 우선 실행)

* 하드웨어 `UART`인 `UART0`은 블루투스 통신을 위해 할당돼있으므로 수정 필요

  > `sudo nano /boot/config.txt` 에서` dtoverlay=miniuart-bt ` 맨 밑에 추가 후 저장
  > `sudo reboot` 
  > `raspi-gpio get 14-15`로 입력 시 `UART0`에 할당돼있음을 볼 수 있음
  > 맵핑된 디바이스는 `/dev/ttyAMA0` 을 사용하면 됨

* 시리얼 관련 정보

  * `GPIO`상 `BCM 14 (TX), 15 (RX) 번 핀`이 시리얼통신용 

    > 라스비안에서 `/dev/serial0`으로 불린다

  * 원래 시리얼통신 포트 이름은 `/dev/ttyAMA0`이다. 

    > 파이 3 의 경우, 이전에  `/dev/ttyAMA0`에 할당되어있던 시리얼포트가 블루투스에 할당 
    >
    > 시리얼포트가 `/dev/ttyS0`로 옮겨짐

  * 파이 3와 그 이전 기계에서 함께쓰는 코드를 쓰려면 `/dev/ttyAMA0` 는 불가능

  * 대신` /dev/serial0`라는 이름 사용

    > 파이 1, 2에서는` 시리얼 == /dev/ttyAMA0 == /dev/serial0` 
    > 파이 3에서는 `시리얼 == /dev/ttyS0 == /dev/serial0` 