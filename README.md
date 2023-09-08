Environment set-up
1. install npm via
    1.1. If you have a mac, you might need to install homebrew first. Follow this link for instructions-"https://docs.brew.sh/Installation"

    1.2. And for Windows or Linux-"https://docs.brew.sh/Homebrew-on-Linux"
2. install npm
    npm install -g npm
    
3. Download Visual Studio Code
4. Connect to GitLabs repo
    3.1. Clone repo via "https://capstone-cs.eng.utah.edu/h2no/h2no" -> "clone" -> Visual Studio Code (https) -> Select     download location.
5. Install xCode from App Store for iOS simulator. If you have Windows, you will not be able to download this app. However, this link
provides alternatives for windows. https://www.softwaretestinghelp.com/best-ios-emulator-for-pc/
6. Install Android Studio for Android simulator. Open Android studio and set up a simulator by following the 
steps in this link: https://developer.android.com/studio/run/managing-avds

Run and Build Application
1. install packages by running 'npm install' *might take awhile*
2. run 'npm start' from command line at H2NO-Main/H2NO/ root directory

Run application with simulators
1. run 'npm start' from command line making sure you are in the root directory (H2NO-Main/H2NO/). 
2. you will be prompted to enter 'a' if wanting to open an android simulator or 'i' if wanting to open iOS simulator. 

Run Python Web Scrapers
1. Run pip install -r requirements.txt
2. Run individual files using python3

Run Image Classification server
1. Run pip install tensorflow
2. Run pip install flask

Run Recycle Web Scraper
1. Run pip install beautifulsoup4
