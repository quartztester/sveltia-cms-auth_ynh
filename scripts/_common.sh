#!/bin/bash

#=================================================
# COMMON VARIABLES AND CUSTOM HELPERS
#=================================================

render_app_configs() {
    ynh_config_add --template="server.mjs" --destination="$install_dir/server.mjs"
    ynh_config_add --template="package.json" --destination="$install_dir/package.json"
    ynh_config_add --template="env" --destination="$install_dir/env"
    chmod 600 "$install_dir/env"
    chown "$app:$app" "$install_dir/env"
}

wait_for_listen() {
    local n=0
    until curl -s -o /dev/null -m 2 "http://127.0.0.1:$port/auth"; do
        n=$((n + 1))
        if [ $n -ge 20 ]; then
            ynh_die "$app does not answer on port $port"
        fi
        sleep 1
    done
}
