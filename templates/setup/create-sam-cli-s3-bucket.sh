Buckets="$(aws s3api list-buckets --query "Buckets[].Name")"

if [[ "$Buckets" == *"${Project}-sam-cli"* ]]; then
  echo "Bucket already exists."
else
  aws s3api create-bucket --bucket "${Project}-sam-cli"
fi
