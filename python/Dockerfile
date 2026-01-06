FROM python:3.12-alpine

RUN apk add git build-base ffmpeg
RUN pip install piper-tts

WORKDIR /workspace

CMD ["tail", "-f", "/dev/null"]