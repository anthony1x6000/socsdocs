
#!/bin/bash 

set -a 
source secrets.env
set +a 

envsubst < worker.toml.template > worker.toml
envsubst < controlplane.toml.template > controlplane.toml

composer-cli blueprints push worker.toml
composer-cli blueprints push controlplane.toml

composer-cli compose start controlplane image-installer

composer-cli compose status

echo "composer-cli compose image <uuid> # to pull image" 