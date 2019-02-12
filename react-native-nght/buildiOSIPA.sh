
APPLICATION_NAME="RNNghtApp"
PROVISIONING_PROFILE="RNNghtApp"
PLIST_DIR="${APPLICATION_NAME}/Info.plist"

# Enter ios folder
cd ios/

# Build app into .app file
xcodebuild -scheme "${APPLICATION_NAME}" clean archive -archivePath "build/${APPLICATION_NAME}"

# Build and sign IPA
xcodebuild -exportArchive -exportFormat ipa -archivePath "build/${APPLICATION_NAME}.xcarchive" -exportPath "build/${APPLICATION_NAME}.ipa" -exportProvisioningProfile "${PROVISIONING_PROFILE}"

#EOF

