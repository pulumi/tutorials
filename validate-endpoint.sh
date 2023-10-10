#!/bin/sh
esc run zephyr/app-env-test \
-- bash -c "python3 test-endpoints.py \$ENDPOINT_URL \$ENVIRONMENT \$API_KEY"
