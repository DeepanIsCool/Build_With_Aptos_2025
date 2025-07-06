#!/usr/bin/env bash
set -e

# 1) Deploy agent_template and capture its address
AGENT_ADDR=0xbf63114b92ed90297f1886ede79305269d163a3b368ba8ff448f0b1b6a744bbb
cd agent_template
aptos move publish \
  --named-addresses agent_template=$AGENT_ADDR \
  --skip-fetch-latest-git-deps \
  --max-gas 20000

# 2) Deploy solyrix_arena using both addresses
cd ../solyrix_arena
aptos move publish \
  --named-addresses room_manager=$AGENT_ADDR,agent_template=$AGENT_ADDR \
  --skip-fetch-latest-git-deps \
  --max-gas 20000
