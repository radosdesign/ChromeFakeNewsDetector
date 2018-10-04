# Google Chrome extension: Warning of Fakenews websites

Warning of websites which knowingly or unknowingly spread fake news. List of Slovak and Czech websites was originally created by activist and history teacher Juraj Smatana. Current list is based on https://www.konspiratori.sk/en.
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

##### Install node packages
```
npm install
```

##### Update sites list
```
node generate-sites.js
```
This command updates 'extension/sites.js' file based on https://www.konspiratori.sk/assets/downloads/zoznam.txt 

##### Create distribution package
```
grunt
```
This will generate 'dist/extension.zip' which you can upload to Google's Chrome Webstore (https://chrome.google.com/webstore/devconsole)

![Google Chrome extension: Warning of pro-Putin propaganda](http://radosdesign.github.io/screenshot.jpg)
