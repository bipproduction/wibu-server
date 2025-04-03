#!/bin/bash
# source .env
# # Encode gambar ke base64
# BASE64_CONTENT=$(base64 red.jpg | tr -d '\n')

# RANDOM_NAME=$(date +%s%N | md5sum | head -c 10)

# # Upload ke repository
# RESULT=$(curl -X PUT \
#   -s \
#   -H "Authorization: token $WIBU_GH_TOKEN" \
#   -H "Accept: application/vnd.github.v3+json" \
#   -d '{
#     "message": "Upload image",
#     "content": "'"$BASE64_CONTENT"'",
#     "branch": "main"
#   }' \
#   https://api.github.com/repos/bipproduction/assets/contents/images/${RANDOM_NAME}.jpg | jq -r '.content.download_url'
# )

# echo $RESULT

#  curl -X POST http://localhost:3006/api/etc/upload \
#     -F "file=@./xsampah/hipmi-staging.wibu.yml" \
#     -F "name=hipmi-staging"

# bunx openapi-typescript http://localhost:3006/api/docs/json -o ApiSchema.d.ts --make-paths-enum

# CONFIG=$(cat lib/config.txt)
# NAME="hipmi"
# NAMESPACE="hipmi-staging"
# bun -e "$CONFIG({name: /"$NAME/", namespace: /"$NAMESPACE/"})"

# TEXT=$(cat lib/config-generator.txt)
# CONFIG=$(echo -n "$TEXT" | base64)

# # echo "\"$CONFIG\""

# DCONFIG=$(echo -n "$CONFIG" | base64 -d)

# echo "$DCONFIG"

# echo "apa kabarnya ini darimana" 2>&1 | tee build.log
# LOG=$(cat build.log)
# curl -X POST \
# -H "Content-Type: application/json" \
# -H "x-api-key: makuro" \
# -H "x-api-path: hipmi/hipmi-staging" \
# -d "{\"log\": \"$LOG\"}" http://localhost:3006/api/webhook/build-log


# curl -X GET http://localhost:3006/api/config/config-log/logs

curl -X PUT -d "{\"log\": \"data log baru\"}" https://wibu-5281e-default-rtdb.asia-southeast1.firebasedatabase.app/logs/build/hipmi-staging/log.json