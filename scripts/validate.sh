#!/bin/bash
result=$(curl -s http://localhost:8080/)

if [[ "$result" == *"$status"* ]]; then
    exit 0
else
    exit 1
fi
