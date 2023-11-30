echo "" >> templates/parameter-overrides/.overrides

array=(
  Stage
  Project
  DynamoApplicationTable
  EncryptSecret
  RecaptchaEnabled
  RecaptchaThreshold
  RecaptchaSecret
)

for i in "${array[@]}"
do
    NAME=$(echo "$i")
    VAL=$(eval echo \${$i})
    echo "${NAME}=\"${VAL}\"" >> templates/parameter-overrides/.overrides
done