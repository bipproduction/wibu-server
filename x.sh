source .env
curl -L -o artifact.zip \
-H "Authorization: Bearer $WIBU_GH_TOKEN" \
https://api.github.com/repos/bipproduction/wibu-server/actions/artifacts/2798186096/zip

