#
# NGHT MOBILE APP
#
# VERSION               0.0.1

FROM      ubuntu
LABEL Description="this is used to build the NGHT app" Vendor="NGHT" Version="0.1"

ENV GITHUB_TOKEN="c2c917c3e98479f368ada2743735a7cf5f1d4121"

# Install Dependencies
RUN apt update
RUN apt install -y inotify-tools openssh-server default-jre default-jdk nodejs npm git curl unzip
RUN echo "Node Installed!"

# Install Android SDK
RUN wget https://dl.google.com/android/android-sdk_r24.4.1-linux.tgz
RUN tar -xvzf android-sdk_r24.4.1-linux.tgz
RUN mv android-sdk-linux /usr/local/android-sdk
RUN rm android-sdk_r24.4.1-linux.tgz

ENV ANDROID_COMPONENTS platform-tools,android-23,build-tools-23.0.2,build-tools-24.0.0

# Install Android tools
RUN echo y | /usr/local/android-sdk/tools/android update sdk --no-ui --all --filter "${ANDROID_COMPONENTS}"

# Install Android NDK
RUN wget http://dl.google.com/android/repository/android-ndk-r12-linux-x86_64.zip
RUN unzip android-ndk-r12-linux-x86_64.zip
RUN mv android-ndk-r12 /usr/local/android-ndk
RUN rm android-ndk-r12-linux-x86_64.zip

# Environment variables
ENV ANDROID_HOME /usr/local/android-sdk
ENV ANDROID_SDK_HOME $ANDROID_HOME
ENV ANDROID_NDK_HOME /usr/local/android-ndk
ENV PATH $PATH:$ANDROID_SDK_HOME/tools
ENV PATH $PATH:$ANDROID_SDK_HOME/platform-tools
ENV PATH $PATH:$ANDROID_SDK_HOME/build-tools/23.0.2
ENV PATH $PATH:$ANDROID_SDK_HOME/build-tools/24.0.0
ENV PATH $PATH:$ANDROID_NDK_HOME

RUN chmod -R a+rx $ANDROID_HOME $ANDROID_SDK_HOME $ANDROID_NDK_HOME

RUN echo "Installing React Native!"
RUN npm install -g react-native-cli
RUN echo "React-Native Installed!"

RUN echo "Cloning Repo from GitHub..."
RUN git clone -b dev https://$GITHUB_TOKEN:x-oauth-basic@github.com/NGHTCREATION/RNNghtApp.git
WORKDIR RNNghtApp
# NODEJS SPAWN_SYNC WORKAROUND
RUN ln -s `which nodejs` /usr/bin/node
RUN npm i

RUN echo "Starting React Native Packager in the background"
RUN nohup react-native start &

RUN echo "Running Android APK Build Script"
RUN nohup sh -c ./buildAndroidAPK.sh
RUN echo "If you made it this far, you win!"
