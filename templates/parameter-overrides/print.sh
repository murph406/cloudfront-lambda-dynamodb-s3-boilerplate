override_file=$(cat ./templates/parameter-overrides/.overrides)
set -f # turn off globbing
IFS='
' # split at newlines only

overrides_split=($(cat ./templates/parameter-overrides/.overrides))

for i in "${overrides_split[@]}"
do
    key=$(echo "$i" | awk -F= '{print $1}')
    value=$(echo "$i" | awk -F= '{print $2}' | sed 's/"//g')
    echo "$key=$value"
done

unset IFS
set +f
