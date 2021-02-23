#!/bin/bash

set -e

readonly SCRIPT_NAME=$(basename "$0")
readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly root_dir="$(cd "$SCRIPT_DIR/.." && pwd)"

# Log to stderr, as we use stdout to return values from functions
function log {
  local -r level="$1"
  local -r message="$2"
  local -r timestamp=$(date +"%Y-%m-%d %H:%M:%S")
  >&2 echo -e "${timestamp} [${level}] [$SCRIPT_NAME] ${message}"
}

function log_info {
  local -r message="$1"
  log "INFO" "$message"
}

function log_warn {
  local -r message="$1"
  log "WARN" "$message"
}

function log_error {
  local -r message="$1"
  log "ERROR" "$message"
}

function start_app {
  local -r vpc_name="$1"
  local -r aws_region="$2"
  local -r config_path="$3"
  
  log_info "Starting app"
  log_info "VPC name is set to $vpc_name, starting up application"
  exec npm run "$vpc_name" -- $config_path
}

function run_app {
  local -r vpc_name="$1"
  local -r aws_region="$2"
  local -r config_file="$root_dir/config/config-$vpc_name.json"

  start_app "$vpc_name" "$aws_region" "$config_file"
}

# These environment variables are set by docker-compose
run_app "$VPC_NAME" "$AWS_REGION"
