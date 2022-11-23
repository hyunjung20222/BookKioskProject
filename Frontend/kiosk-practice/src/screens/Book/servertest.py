import socketio

sio = socketio.Client()
sio.connect('http://192.168.0.35:9994')

global flag
flag = 0

@sio.event
def flag(data):
    global flag
    flag = data
    prnit(flag)
    return flag

# 실행 코드
while True:
    sio.on('inputdata', flag)
    if flag == 1:
        print("Hi")
    else:
        print("Hello")
