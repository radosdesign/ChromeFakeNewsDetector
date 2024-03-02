# Google Chrome extension: Warning of Fakenews websites

Warning of websites that knowingly or unknowingly spread fake news. The list of Slovak and Czech websites was originally created by activist and history teacher Juraj Smatana. The current list is based on https://konspiratori.sk/kriteria/en.
When you visit a site from this list you will see a message which asks you to use caution and common sense.  
You have been warned :-)

Media:  
Slovak newspaper "Dennik N": http://goo.gl/R0h2rX  
Slovak news website "Tvnoviny.sk": http://goo.gl/BuVELL  
Slovak TV station "Markiza": http://goo.gl/MD25rX  
Czech news website "Tiscali.cz": http://goo.gl/mT2izL  
Czech news website "Eurozpravy.cz": http://goo.gl/CFBLjP  

[View in Store](https://chrome.google.com/webstore/detail/detektor-dezinforma%C4%8Dn%C3%BDch/ajfhmidimnkpbhnkcckllicmhhdipmoo?hl=en)  

## How to build

### Prerequisites

- Install Python 3: `sudo apt install python3`
- Install Python Setuptools: `sudo apt install python-setuptools`
- Install PIP: `sudo apt install python3-pip`
- Install oauth2client: `pip3 install oauth2client`
- Install httplib2: `pip3 install httplib2`
- Install NodeJS: `sudo apt install nodejs`
- Install NPM: `sudo apt install npm`
- Install Grunt: `sudo npm install -g grunt`

### Setup OAuth 2.0 credentials

- Go to [https://console.developers.google.com/apis/credentials](https://console.developers.google.com/apis/credentials)
- Create new OAuth Client ID
  - Authorized JavaScript origins: 
    - `https://accounts.google.com`
    - `http://localhost:8080`
  - Authorized redirect URIs:
    - `http://localhost:8080/`
- Download JSON credentials to `refresh_publish/webstore_client_secret.json`
- `cd refresh_publish`
- After you execute `python3 build.py` OAuth flow will be initiated in which you have to confirm access to your Google account
- In case last step was successful, new file will be created: `refresh_publish/oauth2.dat` which contains needed credentials


### Refresh sites.js and upload new extension version to the Webstore
```
cd refresh_publish
python build.py
```
This command:
1. updates 'extension/sites.js' file based on https://www.konspiratori.sk/assets/downloads/zoznam.txt
2. Increases extension version number
3. Uploads new extension version to the Webstore
4. Updates GIT repository 


![Google Chrome extension: Fake News Website Detector](http://radosdesign.github.io/screenshot.jpg)
