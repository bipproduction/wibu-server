# source .env
# curl -H "Authorization: Bearer $WIBU_GH_TOKEN" https://api.github.com/repos/bipproduction/wibu-server/actions/artifacts

E=$(cat <<EOF
console.log("Hello World");
EOF
)

bun -e "$E"
