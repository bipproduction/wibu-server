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

APP_VERSION=$(date +%Y-%m-%d_%H-%M-%S)

echo "WIBU=${APP_VERSION}"
