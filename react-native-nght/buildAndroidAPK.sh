#!/bin/sh

LOCALPACKAGER="http://localhost:8081/index.android.bundle?platform=android"
OUTPUTARTIFACT="android/app/src/main/assets/index.android.bundle"

# UNCOMMENT TO RUN Non-Interactively
nohup sh -c "react-native start" &
sleep 15

curl $LOCALPACKAGER -o $OUTPUTARTIFACT
(cd android/ && ./gradlew assembleDebug)

exit 0

# EOF
