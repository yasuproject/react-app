#!/usr/bin/env bash
# ==============================================================================
# OmniDrawer Android Build Script (Capacitor Native)
# ==============================================================================
set -e

echo "🚀 Building Web Assets with Vite..."
npm run build

echo "🔄 Syncing Capacitor Android Platform..."
npx cap sync android

echo "📱 Navigating to android directory..."
cd android

echo "=============================================================================="
echo "Android Gradle Commands available:"
echo "1. Build Debug APK:          ./gradlew assembleDebug"
echo "   Output: android/app/build/outputs/apk/debug/app-debug.apk"
echo ""
echo "2. Build Release APK:        ./gradlew assembleRelease"
echo "   Output: android/app/build/outputs/apk/release/app-release-unsigned.apk"
echo ""
echo "3. Build Release Bundle (AAB): ./gradlew bundleRelease"
echo "   Output: android/app/build/outputs/bundle/release/app-release.aab"
echo "=============================================================================="

# If an argument is provided (e.g. debug, release, bundle)
if [ "$1" == "debug" ]; then
  ./gradlew assembleDebug
elif [ "$1" == "release" ]; then
  ./gradlew assembleRelease
elif [ "$1" == "bundle" ]; then
  ./gradlew bundleRelease
fi
