#!/bin/bash

python3 -m venv /workspace/venv
source /workspace/venv/bin/activate
pip install --upgrade pip
pip install -r /workspace/requirements.txt

tail -f /dev/null