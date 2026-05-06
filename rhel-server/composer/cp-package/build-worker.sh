#!/bin/bash 

set -a 
source worker.secrets.env
set +a 

envsubst < worker.toml.template > worker.toml

composer-cli blueprints push worker.toml

composer-cli compose start worker image-installer

composer-cli compose status

echo "composer-cli compose image <uuid> # to pull image" 

UUID=$(composer-cli compose list | awk 'NR>1 {print $1}')

while true; do

    STATUS=$(composer-cli compose list | awk 'NR>1 {print $2}')

    if [[ "$STATUS" == "FINISHED" ]]; then 
        composer-cli compose image $UUID
        break
    elif [[ "$STATUS" == "FAILED" ]]; then
        echo "Error: Build $UUID failed"
        break
    else
        sleep 30
    fi
done