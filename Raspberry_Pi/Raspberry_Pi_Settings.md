# 라즈베리파이 설정

#### 목차

1. [라즈베리 파이 python 설치](#라즈베리-파이-python-설치)

2. [라즈베리파이 와이파이 연결](#라즈베리파이-와이파이-연결)

3. [라즈베리파이 가상환경](#라즈베리파이-가상환경)

---

### 라즈베리 파이 python 설치

* 현재 라즈베리파이에 설치된 파이썬은 **3.9.2**

* 파이썬 **3.7.9** 로 사용하기 위하여 새로운 파이썬 버전을 빌드하는 작업 필요
  [Python Version Up](https://karl27.tistory.com/110) : 향후 다른 파이썬 버전일지라도 숫자만 바꾸면 된다.

  

1. 파이썬 설치 전 필요 종속 패키지 설치

  ```bash
  sudo apt install -y build-essential tk-dev libncurses5-dev libncursesw5-dev \ libreadline6-dev libdb5.3-dev libgdbm-dev libsqlite3-dev \ libssl-dev libbz2-dev libexpat1-dev liblzma-dev zlib1g-dev \ libffi-dev tar wget vim
  ```

2. 파이썬 3.7.9버전 압축파일 다운로드

  ```bash
  wget https://www.python.org/ftp/python/3.7.9/Python-3.7.9.tgz
  ```

3. 압축파일 압축 해제

  ```bash
  sudo tar zxf Python-3.7.9.tgz
  ```

4. 압축 해제된 폴더로 이동

  ```bash
  cd Python-3.7.9
  ```

5. 설치 

  ```bash
  sudo ./configure --enable-optimizations
  sudo make -j4
  sudo make altinstall
  
  # 위 2,3번째 명령어에서 상당히 많은 시간 소모됨: 1~2시간
  ```

6. python 버전 확인

  ```bash
  python3.7 -V
  python -V
  ```

7. 환경변수 설정

  - python 명령어 실행 시 자동으로 3.7버전으로 수행되도록 하는 작업

    > shift + \ 키가 ~ 기호와 동일

  ```bash
  echo "alias python=/usr/local/bin/python3.7" >> ~/.bashrc
  source ~/.bashrc
  python --version
  ```

  

### 라즈베리파이 와이파이 연결

**터미널창 크기 키우기 : ctrl + shift + `+` **

1. 우상단 Wifi 아이콘으로 연결할 와이파이 접속

2. Wifi 아이콘 오른쪽 마우스 클릭

   * `Wireless & Wired Network Settings` 

   * ```bash
     Configure | Interface | wlan0
     IPv4 Address : ---
     Router : ---
     DNS Servers : ---
     ```

3. `sudo reboot` 실행

4. `sudo nano /etc/dhcpcd.conf` 실행 후 하단 내용 확인

   ```bash
   interface wlan0
   static ip_address=---
   static routers=---
   static domain_name_servers=---
   static netmask=---
   ```

   * 없을 시 추가

5. ` sudo /etc/init.d/networking restart` 실행 후 `sudo reboot` 실행



### 라즈베리파이 가상환경

1. 생성

   ```bash
   python3.x -m venv 디렉토리명
   ```

2. 가상환경 사용

   ```bash
   cd 디렉토리명
   cd bin
   . activate
   ```

3. 가상환경 종료

   ```bash
   deactivate
   ```